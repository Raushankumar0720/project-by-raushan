const express = require('express');
const router = express.Router();
const {
    getWeather,
    getWeatherForecast,
    getHarvestRisk
} = require('../controllers/weatherController');

router.get('/', getWeather);
router.get('/forecast', getWeatherForecast);
router.get('/risk', getHarvestRisk);

module.exports = router;
