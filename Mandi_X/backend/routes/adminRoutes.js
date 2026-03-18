const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
    getPendingUsers,
    approveUser,
    rejectUser,
    getDashboardStats,
    getAllOrders,
    resolveDispute
} = require('../controllers/adminController');

// All routes protected and admin only
router.use(protect);
router.use(roleMiddleware('admin'));

router.get('/pending-users', getPendingUsers);
router.get('/dashboard', getDashboardStats);
router.get('/orders', getAllOrders);
router.put('/users/:id/approve', approveUser);
router.put('/users/:id/reject', rejectUser);
router.put('/orders/:id/dispute', resolveDispute);

module.exports = router;
