const User = require('../models/User');
const Order = require('../models/Order');
const Crop = require('../models/Crop');
const Cluster = require('../models/Cluster');
const Farmer = require('../models/Farmer');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const notificationService = require('../services/notificationService');

/**
 * @desc    Get pending users
 * @route   GET /api/admin/pending-users
 * @access  Private (Admin)
 */
exports.getPendingUsers = [
    protect,
    roleMiddleware('admin'),
    asyncHandler(async (req, res) => {
        const users = await User.find({ isApproved: false })
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: users
        });
    })
];

/**
 * @desc    Approve user
 * @route   PUT /api/admin/users/:id/approve
 * @access  Private (Admin)
 */
exports.approveUser = [
    protect,
    roleMiddleware('admin'),
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.isApproved = true;
        await user.save();

        // Send approval SMS
        if (user.phone) {
            await notificationService.sendSMS(
                user.phone,
                `Mandi_X: Your account has been approved! You can now login and use the platform.`
            );
        }

        res.status(200).json({
            success: true,
            message: 'User approved successfully',
            user
        });
    })
];

/**
 * @desc    Reject user
 * @route   PUT /api/admin/users/:id/reject
 * @access  Private (Admin)
 */
exports.rejectUser = [
    protect,
    roleMiddleware('admin'),
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Send rejection SMS
        if (user.phone) {
            await notificationService.sendSMS(
                user.phone,
                `Mandi_X: Your registration has been rejected. Please contact support for more information.`
            );
        }

        // Delete user
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'User rejected and deleted'
        });
    })
];

/**
 * @desc    Get dashboard stats
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin)
 */
exports.getDashboardStats = [
    protect,
    roleMiddleware('admin'),
    asyncHandler(async (req, res) => {
        const [
            totalUsers,
            totalFarmers,
            totalAgents,
            totalBuyers,
            totalTransporters,
            totalCrops,
            totalClusters,
            totalOrders,
            revenueResult
        ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'farmer' }),
            User.countDocuments({ role: 'agent' }),
            User.countDocuments({ role: 'buyer' }),
            User.countDocuments({ role: 'transporter' }),
            Crop.countDocuments(),
            Cluster.countDocuments(),
            Order.countDocuments(),
            Order.aggregate([
                { $match: { status: 'delivered' } },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ])
        ]);

        const totalRevenue = revenueResult[0]?.total || 0;

        res.status(200).json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    farmers: totalFarmers,
                    agents: totalAgents,
                    buyers: totalBuyers,
                    transporters: totalTransporters
                },
                crops: totalCrops,
                clusters: totalClusters,
                orders: totalOrders,
                revenue: totalRevenue
            }
        });
    })
];

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/admin/orders
 * @access  Private (Admin)
 */
exports.getAllOrders = [
    protect,
    roleMiddleware('admin'),
    asyncHandler(async (req, res) => {
        const { status, startDate, endDate } = req.query;

        const query = {};

        if (status) query.status = status;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const orders = await Order.find(query)
            .populate('buyerId', 'name email phone')
            .populate('clusterId', 'cropName district')
            .populate('cropId', 'cropName variety')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders
        });
    })
];

/**
 * @desc    Resolve dispute
 * @route   PUT /api/admin/orders/:id/dispute
 * @access  Private (Admin)
 */
exports.resolveDispute = [
    protect,
    roleMiddleware('admin'),
    asyncHandler(async (req, res) => {
        const { resolution, action } = req.body; // action: 'force_release' or 'force_refund'

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (action === 'force_release') {
            order.paymentStatus = 'released';
            order.status = 'delivered';
        } else if (action === 'force_refund') {
            order.paymentStatus = 'refunded';
            order.status = 'cancelled';
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: `Order ${action === 'force_release' ? 'delivered' : 'refunded'} successfully`,
            data: order
        });
    })
];
