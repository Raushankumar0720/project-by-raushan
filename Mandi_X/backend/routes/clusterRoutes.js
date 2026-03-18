const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
    getAllClusters,
    getClusterById,
    generateClusters,
    removeCropFromCluster
} = require('../controllers/clusterController');

// Public routes
router.get('/', getAllClusters);
router.get('/:id', getClusterById);

// Protected routes
router.post('/generate', protect, roleMiddleware('admin'), generateClusters);
router.delete('/crop/:cropId', protect, removeCropFromCluster);

module.exports = router;
