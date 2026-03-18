const mandiService = require('../services/mandiService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get prices by crop and district
 * @route   GET /api/mandi/prices
 * @access  Public
 */
exports.getPricesByCrop = asyncHandler(async (req, res) => {
    const { crop, district } = req.query;

    if (!crop || !district) {
        return res.status(400).json({
            success: false,
            message: 'crop and district are required'
        });
    }

    const result = await mandiService.getPricesByCrop(crop, district);

    res.status(200).json({
        success: true,
        data: result
    });
});

/**
 * @desc    Get multiple crop prices for a district
 * @route   GET /api/mandi/multiple
 * @access  Public
 */
exports.getMultipleCropPrices = asyncHandler(async (req, res) => {
    const { district } = req.query;

    if (!district) {
        return res.status(400).json({
            success: false,
            message: 'district is required'
        });
    }

    const prices = await mandiService.getMultipleCropPrices(district);

    res.status(200).json({
        success: true,
        data: prices
    });
});

/**
 * @desc    Fetch latest prices (admin)
 * @route   POST /api/mandi/fetch
 * @access  Private (Admin)
 */
exports.fetchPrices = asyncHandler(async (req, res) => {
    const prices = await mandiService.fetchAndStorePrices();

    res.status(200).json({
        success: true,
        message: `Fetched ${prices.length} prices`,
        data: prices
    });
});

/**
 * @desc    Get today's top crop prices (for ticker)
 * @route   GET /api/mandi/ticker
 * @access  Public
 */
exports.getTickerPrices = asyncHandler(async (req, res) => {
    const prices = await mandiService.getMultipleCropPrices('Rajkot');

    // Return top 5 by price
    const topPrices = prices
        .sort((a, b) => b.modalPrice - a.modalPrice)
        .slice(0, 5)
        .map(p => ({
            cropName: p.cropName,
            price: p.modalPrice
        }));

    res.status(200).json({
        success: true,
        data: topPrices
    });
});
