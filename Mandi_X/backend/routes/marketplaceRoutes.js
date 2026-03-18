const express = require('express');
const router = express.Router();
const {
    getMarketplace,
    getMarketplaceItem,
    getFeaturedClusters
} = require('../controllers/marketplaceController');

router.get('/', getMarketplace);
router.get('/featured', getFeaturedClusters);
router.get('/:id', getMarketplaceItem);

module.exports = router;
