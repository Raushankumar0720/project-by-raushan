const express = require('express');
const router = express.Router();
const {
    createCrop,
    getAllCrops,
    getCropById,
    updateCrop,
    deleteCrop,
    getMyCrops
} = require('../controllers/cropController');

// Public routes
router.get('/', getAllCrops);
router.get('/:id', getCropById);

// Protected routes
router.post('/', createCrop);
router.put('/:id', updateCrop);
router.delete('/:id', deleteCrop);
router.get('/my/listings', getMyCrops);

module.exports = router;
