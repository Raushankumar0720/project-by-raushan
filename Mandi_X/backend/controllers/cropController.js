const { z } = require('zod');
const Crop = require('../models/Crop');
const Cluster = require('../models/Cluster');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Zod validation schemas
const createCropSchema = z.object({
    cropName: z.string().min(1, 'Crop name is required'),
    variety: z.string().optional(),
    quantityKg: z.number().positive('Quantity must be positive'),
    pricePerKg: z.number().positive('Price must be positive'),
    harvestDate: z.string().transform(str => new Date(str)),
    availableFrom: z.string().optional().transform(str => str ? new Date(str) : undefined),
    availableTill: z.string().optional().transform(str => str ? new Date(str) : undefined),
    village: z.string().optional(),
    district: z.string().min(1, 'District is required'),
    state: z.string().min(1, 'State is required'),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    images: z.array(z.string()).optional(),
    qualityGrade: z.enum(['A', 'B', 'C', 'ungraded']).optional(),
    description: z.string().optional()
});

const updateCropSchema = z.object({
    cropName: z.string().min(1).optional(),
    variety: z.string().optional(),
    quantityKg: z.number().positive().optional(),
    pricePerKg: z.number().positive().optional(),
    harvestDate: z.string().transform(str => new Date(str)).optional(),
    availableFrom: z.string().optional().transform(str => str ? new Date(str) : undefined),
    availableTill: z.string().optional().transform(str => str ? new Date(str) : undefined),
    status: z.enum(['available', 'in_cluster', 'sold', 'cancelled']).optional(),
    qualityGrade: z.enum(['A', 'B', 'C', 'ungraded']).optional(),
    description: z.string().optional()
});

// Helper to generate clusters asynchronously
const triggerClusterGeneration = async (cropName, district) => {
    // This will be implemented in TASK 6
    // For now, it's a placeholder
    console.log(`Cluster generation triggered for ${cropName} in ${district}`);
};

/**
 * @desc    Create a new crop
 * @route   POST /api/crops
 * @access  Private (Farmer, Agent)
 */
exports.createCrop = [
    protect,
    roleMiddleware('farmer', 'agent'),
    asyncHandler(async (req, res) => {
        const validatedData = createCropSchema.parse(req.body);

        // Build crop data
        const cropData = {
            ...validatedData,
            farmerId: req.user._id,
            // Add location if coordinates provided
            location: validatedData.latitude && validatedData.longitude ? {
                type: 'Point',
                coordinates: [validatedData.longitude, validatedData.latitude]
            } : undefined
        };

        // Remove extra fields
        delete cropData.latitude;
        delete cropData.longitude;

        // If agent is creating, link the farmer
        if (req.user.role === 'agent' && req.body.farmerId) {
            cropData.farmerId = req.body.farmerId;
            cropData.agentId = req.user._id;
        }

        const crop = await Crop.create(cropData);

        // Trigger cluster generation (async, don't wait)
        triggerClusterGeneration(crop.cropName, crop.district);

        res.status(201).json({
            success: true,
            data: crop
        });
    })
];

/**
 * @desc    Get all crops with filters
 * @route   GET /api/crops
 * @access  Public
 */
exports.getAllCrops = asyncHandler(async (req, res) => {
    const {
        cropName,
        district,
        state,
        minQty,
        maxPrice,
        status,
        page = 1,
        limit = 10
    } = req.query;

    // Build query
    const query = {};

    if (cropName) query.cropName = new RegExp(cropName, 'i');
    if (district) query.district = new RegExp(district, 'i');
    if (state) query.state = new RegExp(state, 'i');
    if (status) query.status = status;
    if (minQty) query.quantityKg = { $gte: parseInt(minQty) };
    if (maxPrice) {
        query.pricePerKg = query.pricePerKg || {};
        query.pricePerKg.$lte = parseInt(maxPrice);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const crops = await Crop.find(query)
        .populate('farmerId', 'name phone village')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

    const total = await Crop.countDocuments(query);

    res.status(200).json({
        success: true,
        data: crops,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
        }
    });
});

/**
 * @desc    Get single crop by ID
 * @route   GET /api/crops/:id
 * @access  Public
 */
exports.getCropById = asyncHandler(async (req, res) => {
    const crop = await Crop.findById(req.params.id)
        .populate('farmerId', 'name phone village district state');

    if (!crop) {
        return res.status(404).json({
            success: false,
            message: 'Crop not found'
        });
    }

    res.status(200).json({
        success: true,
        data: crop
    });
});

/**
 * @desc    Update a crop
 * @route   PUT /api/crops/:id
 * @access  Private (Owner or Agent)
 */
exports.updateCrop = [
    protect,
    asyncHandler(async (req, res) => {
        let crop = await Crop.findById(req.params.id);

        if (!crop) {
            return res.status(404).json({
                success: false,
                message: 'Crop not found'
            });
        }

        // Check ownership or agent
        const isOwner = crop.farmerId.toString() === req.user._id.toString();
        const isAgent = req.user.role === 'agent' && crop.agentId?.toString() === req.user._id.toString();

        if (!isOwner && !isAgent && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this crop'
            });
        }

        const validatedData = updateCropSchema.parse(req.body);

        crop = await Crop.findByIdAndUpdate(
            req.params.id,
            validatedData,
            { new: true, runValidators: true }
        );

        // Trigger cluster recalculation if status changed
        if (validatedData.status) {
            triggerClusterGeneration(crop.cropName, crop.district);
        }

        res.status(200).json({
            success: true,
            data: crop
        });
    })
];

/**
 * @desc    Delete (cancel) a crop
 * @route   DELETE /api/crops/:id
 * @access  Private (Owner or Agent)
 */
exports.deleteCrop = [
    protect,
    asyncHandler(async (req, res) => {
        const crop = await Crop.findById(req.params.id);

        if (!crop) {
            return res.status(404).json({
                success: false,
                message: 'Crop not found'
            });
        }

        // Check ownership or agent
        const isOwner = crop.farmerId.toString() === req.user._id.toString();
        const isAgent = req.user.role === 'agent' && crop.agentId?.toString() === req.user._id.toString();

        if (!isOwner && !isAgent && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this crop'
            });
        }

        // Update status to cancelled instead of deleting
        crop.status = 'cancelled';
        await crop.save();

        // Remove from cluster if assigned
        if (crop.clusterId) {
            const cluster = await Cluster.findById(crop.clusterId);
            if (cluster) {
                cluster.cropIds = cluster.cropIds.filter(id => id.toString() !== crop._id.toString());
                // Recalculate totals from remaining crops
                const remainingCrops = await Crop.find({ _id: { $in: cluster.cropIds } });
                cluster.totalQuantityKg = remainingCrops.reduce((sum, c) => sum + c.quantityKg, 0);
                cluster.averagePricePerKg = remainingCrops.length > 0
                    ? remainingCrops.reduce((sum, c) => sum + c.pricePerKg, 0) / remainingCrops.length
                    : 0;
                await cluster.save();
            }
        }

        res.status(200).json({
            success: true,
            message: 'Crop cancelled successfully'
        });
    })
];

/**
 * @desc    Get my crops (for farmer/agent)
 * @route   GET /api/crops/my/listings
 * @access  Private (Farmer, Agent)
 */
exports.getMyCrops = [
    protect,
    roleMiddleware('farmer', 'agent'),
    asyncHandler(async (req, res) => {
        const query = {};

        if (req.user.role === 'farmer') {
            query.farmerId = req.user._id;
        } else if (req.user.role === 'agent') {
            query.agentId = req.user._id;
        }

        const crops = await Crop.find(query)
            .populate('farmerId', 'name phone village')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: crops
        });
    })
];
