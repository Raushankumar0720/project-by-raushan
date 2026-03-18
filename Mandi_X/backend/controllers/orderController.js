const { z } = require('zod');
const Order = require('../models/Order');
const Cluster = require('../models/Cluster');
const Crop = require('../models/Crop');
const Shipment = require('../models/Shipment');
const TransportJob = require('../models/TransportJob');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Zod validation
const createOrderSchema = z.object({
    clusterId: z.string().optional(),
    cropId: z.string().optional(),
    quantityKg: z.number().positive('Quantity must be positive'),
    deliveryAddress: z.string().min(1, 'Delivery address is required'),
    notes: z.string().optional()
});

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private (Buyer)
 */
exports.createOrder = [
    protect,
    roleMiddleware('buyer'),
    asyncHandler(async (req, res) => {
        const validatedData = createOrderSchema.parse(req.body);
        const { clusterId, cropId, quantityKg, deliveryAddress, notes } = validatedData;

        let pricePerKg;
        let totalAmount;
        let orderCrops = [];

        if (clusterId) {
            // Order from cluster
            const cluster = await Cluster.findById(clusterId);
            if (!cluster || cluster.status !== 'open') {
                return res.status(400).json({
                    success: false,
                    message: 'Cluster not available'
                });
            }

            if (quantityKg > cluster.totalQuantityKg) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity exceeds cluster availability'
                });
            }

            pricePerKg = cluster.averagePricePerKg;
            totalAmount = quantityKg * pricePerKg;
            orderCrops = cluster.cropIds;
        } else if (cropId) {
            // Order single crop
            const crop = await Crop.findById(cropId);
            if (!crop || crop.status !== 'available') {
                return res.status(400).json({
                    success: false,
                    message: 'Crop not available'
                });
            }

            if (quantityKg > crop.quantityKg) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity exceeds available quantity'
                });
            }

            pricePerKg = crop.pricePerKg;
            totalAmount = quantityKg * pricePerKg;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Either clusterId or cropId is required'
            });
        }

        // Create order
        const order = await Order.create({
            buyerId: req.user._id,
            clusterId: clusterId || null,
            cropId: cropId || null,
            quantityKg,
            pricePerKg,
            totalAmount,
            status: 'pending',
            paymentStatus: 'escrow', // In production, integrate payment gateway
            deliveryAddress,
            notes
        });

        // Create shipment
        const shipment = await Shipment.create({
            orderId: order._id,
            deliveryAddress,
            status: 'assigned',
            trackingUpdates: [{
                status: 'assigned',
                message: 'Order placed, awaiting pickup'
            }]
        });

        // Create transport job
        let pickupAddress = '';
        if (clusterId) {
            const cluster = await Cluster.findById(clusterId);
            pickupAddress = `${cluster.district}, ${cluster.state}`;
        } else if (cropId) {
            const crop = await Crop.findById(cropId);
            pickupAddress = `${crop.village || ''}, ${crop.district}, ${crop.state}`;
        }

        await TransportJob.create({
            shipmentId: shipment._id,
            orderId: order._id,
            pickupLocation: clusterId ? (await Cluster.findById(clusterId)).centerLocation : (await Crop.findById(cropId)).location,
            deliveryLocation: { type: 'Point', coordinates: [0, 0] }, // Will be updated with buyer location
            requiredCapacityKg: quantityKg,
            status: 'open',
            cropName: clusterId ? (await Cluster.findById(clusterId)).cropName : (await Crop.findById(cropId)).cropName
        });

        // TODO: Send SMS notification to farmers

        res.status(201).json({
            success: true,
            data: order,
            shipment,
            message: 'Order created successfully'
        });
    })
];

/**
 * @desc    Get my orders (buyer or farmer)
 * @route   GET /api/orders
 * @access  Private
 */
exports.getMyOrders = [
    protect,
    asyncHandler(async (req, res) => {
        let query = {};

        if (req.user.role === 'buyer') {
            query.buyerId = req.user._id;
        } else if (req.user.role === 'farmer') {
            // Get orders for farmer's crops
            const farmerCrops = await Crop.find({ farmerId: req.user._id });
            const cropIds = farmerCrops.map(c => c._id);
            query.$or = [
                { cropId: { $in: cropIds } },
                { clusterId: { $in: farmerCrops.map(c => c.clusterId).filter(id => id) } }
            ];
        }

        const orders = await Order.find(query)
            .populate('buyerId', 'name email')
            .populate('clusterId', 'cropName district state')
            .populate('cropId', 'cropName variety')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders
        });
    })
];

/**
 * @desc    Get single order
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getOrder = [
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id)
            .populate('buyerId', 'name email phone')
            .populate('clusterId')
            .populate('cropId');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Get shipment
        const shipment = await Shipment.findOne({ orderId: order._id });

        res.status(200).json({
            success: true,
            data: {
                order,
                shipment
            }
        });
    })
];

/**
 * @desc    Cancel order
 * @route   PUT /api/orders/:id/cancel
 * @access  Private (Buyer)
 */
exports.cancelOrder = [
    protect,
    roleMiddleware('buyer'),
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (order.buyerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel order that is not pending'
            });
        }

        order.status = 'cancelled';
        order.paymentStatus = 'refunded';
        await order.save();

        // Update related records
        await Shipment.findOneAndUpdate(
            { orderId: order._id },
            { status: 'cancelled' }
        );

        await TransportJob.findOneAndUpdate(
            { orderId: order._id },
            { status: 'cancelled' }
        );

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully'
        });
    })
];

/**
 * @desc    Update order status (admin only)
 * @route   PUT /api/orders/:id/status
 * @access  Private (Admin)
 */
exports.updateOrderStatus = [
    protect,
    roleMiddleware('admin'),
    asyncHandler(async (req, res) => {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    })
];
