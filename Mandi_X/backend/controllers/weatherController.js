const weatherService = require('../services/weatherService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get current weather
 * @route   GET /api/weather
 * @access  Public
 */
exports.getWeather = asyncHandler(async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({
            success: false,
            message: 'lat and lon are required'
        });
    }

    const weather = await weatherService.getWeather(parseFloat(lat), parseFloat(lon));

    res.status(200).json({
        success: true,
        data: weather
    });
});

/**
 * @desc    Get weather forecast
 * @route   GET /api/weather/forecast
 * @access  Public
 */
exports.getWeatherForecast = asyncHandler(async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({
            success: false,
            message: 'lat and lon are required'
        });
    }

    const forecast = await weatherService.getWeatherForecast(parseFloat(lat), parseFloat(lon));

    res.status(200).json({
        success: true,
        data: forecast
    });
});

/**
 * @desc    Get harvest risk score
 * @route   GET /api/weather/risk
 * @access  Public
 */
exports.getHarvestRisk = asyncHandler(async (req, res) => {
    const { lat, lon, crop } = req.query;

    if (!lat || !lon || !crop) {
        return res.status(400).json({
            success: false,
            message: 'lat, lon, and crop are required'
        });
    }

    const risk = await weatherService.getHarvestRiskScore(
        parseFloat(lat),
        parseFloat(lon),
        crop
    );

    res.status(200).json({
        success: true,
        data: risk
    });
});
