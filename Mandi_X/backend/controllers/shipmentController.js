const Shipment = require('../models/Shipment');
const Order = require('../models/Order');
const TransportJob = require('../models/TransportJob');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @desc    Get shipment by ID
 * @route   GET /api/shipments/:id
 * @access  Private
 */
exports.getShipment = [
    protect,
    asyncHandler(async (req, res) => {
        const shipment = await Shipment.findById(req.params.id)
            .populate('orderId')
            .populate('transporterId', 'name phone');

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: 'Shipment not found'
            });
        }

        res.status(200).json({
            success: true,
            data: shipment
        });
    })
];

/**
 * @desc    Update shipment status (transporter only)
 * @route   PUT /api/shipments/:id/status
 * @access  Private (Transporter)
 */
exports.updateShipmentStatus = [
    protect,
    roleMiddleware('transporter'),
    asyncHandler(async (req, res) => {
        const { status, message } = req.body;

        const shipment = await Shipment.findById(req.params.id);

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: 'Shipment not found'
            });
        }

        // Update status
        shipment.status = status;

        // Add tracking update
        shipment.trackingUpdates.push({
            status,
            message: message || `Status updated to ${status}`,
            timestamp: new Date()
        });

        // Set actual delivery if delivered
        if (status === 'delivered') {
            shipment.actualDelivery = new Date();

            // Release escrow payment
            const order = await Order.findById(shipment.orderId);
            if (order) {
                order.paymentStatus = 'released';
                order.status = 'delivered';
                await order.save();
            }
        }

        await shipment.save();

        res.status(200).json({
            success: true,
            data: shipment
        });
    })
];

/**
 * @desc    Get shipment by order ID
 * @route   GET /api/shipments/order/:orderId
 * @access  Private
 */
exports.getShipmentByOrder = [
    protect,
    asyncHandler(async (req, res) => {
        const shipment = await Shipment.findOne({ orderId: req.params.orderId })
            .populate('transporterId', 'name phone vehicleType vehicleNumber');

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: 'Shipment not found'
            });
        }

        res.status(200).json({
            success: true,
            data: shipment
        });
    })
];
