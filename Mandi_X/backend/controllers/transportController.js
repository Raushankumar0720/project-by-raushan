const TransportJob = require('../models/TransportJob');
const Shipment = require('../models/Shipment');
const Transporter = require('../models/Transporter');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @desc    Get available transport jobs
 * @route   GET /api/transport-jobs
 * @access  Private (Transporter)
 */
exports.getAvailableJobs = [
    protect,
    roleMiddleware('transporter'),
    asyncHandler(async (req, res) => {
        const { lat, lng, radius = 50 } = req.query;

        let query = { status: 'open' };

        // If location provided, filter by proximity
        if (lat && lng) {
            query.pickupLocation = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(radius) * 1000 // Convert km to meters
                }
            };
        }

        const jobs = await TransportJob.find(query)
            .populate('orderId', 'totalAmount')
            .populate('shipmentId')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: jobs
        });
    })
];

/**
 * @desc    Accept a transport job
 * @route   PUT /api/transport-jobs/:id/accept
 * @access  Private (Transporter)
 */
exports.acceptJob = [
    protect,
    roleMiddleware('transporter'),
    asyncHandler(async (req, res) => {
        const job = await TransportJob.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        if (job.status !== 'open') {
            return res.status(400).json({
                success: false,
                message: 'Job is not available'
            });
        }

        // Get transporter's vehicle capacity
        const transporter = await Transporter.findOne({ userId: req.user._id });

        if (!transporter || transporter.capacityKg < job.requiredCapacityKg) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle capacity insufficient'
            });
        }

        // Accept the job
        job.status = 'accepted';
        job.acceptedBy = req.user._id;
        await job.save();

        // Update shipment
        await Shipment.findByIdAndUpdate(job.shipmentId, {
            transporterId: req.user._id,
            status: 'picked_up'
        });

        // TODO: Send SMS notifications

        res.status(200).json({
            success: true,
            data: job,
            message: 'Job accepted successfully'
        });
    })
];

/**
 * @desc    Get my jobs (transporter's accepted/completed jobs)
 * @route   GET /api/transport-jobs/my
 * @access  Private (Transporter)
 */
exports.getMyJobs = [
    protect,
    roleMiddleware('transporter'),
    asyncHandler(async (req, res) => {
        const jobs = await TransportJob.find({
            acceptedBy: req.user._id,
            status: { $in: ['accepted', 'completed'] }
        })
            .populate('orderId')
            .populate('shipmentId')
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            data: jobs
        });
    })
];

/**
 * @desc    Update job status
 * @route   PUT /api/transport-jobs/:id/status
 * @access  Private (Transporter)
 */
exports.updateJobStatus = [
    protect,
    roleMiddleware('transporter'),
    asyncHandler(async (req, res) => {
        const { status } = req.body;

        const job = await TransportJob.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        if (job.acceptedBy?.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        job.status = status;
        await job.save();

        // Update shipment status
        const shipmentStatusMap = {
            'accepted': 'picked_up',
            'completed': 'delivered'
        };

        if (shipmentStatusMap[status]) {
            await Shipment.findByIdAndUpdate(job.shipmentId, {
                status: shipmentStatusMap[status]
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    })
];
