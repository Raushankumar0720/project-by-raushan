const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getShipment,
    updateShipmentStatus,
    getShipmentByOrder
} = require('../controllers/shipmentController');

router.get('/:id', protect, getShipment);
router.get('/order/:orderId', protect, getShipmentByOrder);
router.put('/:id/status', protect, updateShipmentStatus);

module.exports = router;
