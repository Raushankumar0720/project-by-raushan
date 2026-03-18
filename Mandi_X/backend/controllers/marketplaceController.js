const Cluster = require('../models/Cluster');
const Crop = require('../models/Crop');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get marketplace - all open clusters
 * @route   GET /api/marketplace
 * @access  Public
 */
exports.getMarketplace = asyncHandler(async (req, res) => {
    const { cropName, district, state, page = 1, limit = 12 } = req.query;

    const query = { status: 'open' };

    if (cropName) query.cropName = new RegExp(cropName, 'i');
    if (district) query.district = new RegExp(district, 'i');
    if (state) query.state = new RegExp(state, 'i');

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const clusters = await Cluster.find(query)
        .populate('farmerIds', 'name village')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

    // Add summary info to each cluster
    const clustersWithSummary = clusters.map(cluster => {
        const summary = {
            _id: cluster._id,
            cropName: cluster.cropName,
            district: cluster.district,
            state: cluster.state,
            totalQuantityKg: cluster.totalQuantityKg,
            averagePricePerKg: cluster.averagePricePerKg,
            farmerCount: cluster.farmerIds.length,
            harvestWindowStart: cluster.harvestWindowStart,
            harvestWindowEnd: cluster.harvestWindowEnd,
            status: cluster.status
        };
        return summary;
    });

    const total = await Cluster.countDocuments(query);

    res.status(200).json({
        success: true,
        data: clustersWithSummary,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
        }
    });
});

/**
 * @desc    Get single marketplace item (cluster details)
 * @route   GET /api/marketplace/:id
 * @access  Public
 */
exports.getMarketplaceItem = asyncHandler(async (req, res) => {
    const cluster = await Cluster.findById(req.params.id)
        .populate({
            path: 'cropIds',
            populate: {
                path: 'farmerId',
                select: 'name phone village district state'
            }
        })
        .populate('farmerIds', 'name phone village district state');

    if (!cluster) {
        return res.status(404).json({
            success: false,
            message: 'Cluster not found'
        });
    }

    res.status(200).json({
        success: true,
        data: cluster
    });
});

/**
 * @desc    Get featured/recommended clusters
 * @route   GET /api/marketplace/featured
 * @access  Public
 */
exports.getFeaturedClusters = asyncHandler(async (req, res) => {
    const clusters = await Cluster.find({ status: 'open' })
        .sort({ totalQuantityKg: -1 })
        .limit(6)
        .populate('farmerIds', 'name village');

    res.status(200).json({
        success: true,
        data: clusters
    });
});
