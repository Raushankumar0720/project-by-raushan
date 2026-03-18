const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
    getPricesByCrop,
    getMultipleCropPrices,
    fetchPrices,
    getTickerPrices
} = require('../controllers/mandiController');

router.get('/prices', getPricesByCrop);
router.get('/multiple', getMultipleCropPrices);
router.get('/ticker', getTickerPrices);
router.post('/fetch', protect, roleMiddleware('admin'), fetchPrices);

module.exports = router;
