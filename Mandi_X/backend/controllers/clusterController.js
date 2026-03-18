const clusterService = require('../services/clusterService');
const Cluster = require('../models/Cluster');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all clusters
 * @route   GET /api/clusters
 * @access  Public
 */
exports.getAllClusters = asyncHandler(async (req, res) => {
    const { cropName, district, state, page = 1, limit = 10 } = req.query;

    const filters = { cropName, district, state };
    const clusters = await clusterService.getAllClusters(filters);

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = clusters.length;
    const paginatedClusters = clusters.slice(skip, skip + limitNum);

    res.status(200).json({
        success: true,
        data: paginatedClusters,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
        }
    });
});

/**
 * @desc    Get cluster by ID
 * @route   GET /api/clusters/:id
 * @access  Public
 */
exports.getClusterById = asyncHandler(async (req, res) => {
    const cluster = await Cluster.findById(req.params.id)
        .populate('cropIds')
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
 * @desc    Manually trigger cluster generation
 * @route   POST /api/clusters/generate
 * @access  Private (Admin)
 */
exports.generateClusters = asyncHandler(async (req, res) => {
    const { cropName, district } = req.body;

    if (!cropName || !district) {
        return res.status(400).json({
            success: false,
            message: 'cropName and district are required'
        });
    }

    await clusterService.generateClusters(cropName, district);

    res.status(200).json({
        success: true,
        message: 'Cluster generation completed'
    });
});

/**
 * @desc    Remove crop from cluster
 * @route   DELETE /api/clusters/crop/:cropId
 * @access  Private
 */
exports.removeCropFromCluster = asyncHandler(async (req, res) => {
    await clusterService.removeCropFromCluster(req.params.cropId);

    res.status(200).json({
        success: true,
        message: 'Crop removed from cluster'
    });
});
