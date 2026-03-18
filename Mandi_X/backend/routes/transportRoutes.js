const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAvailableJobs,
    acceptJob,
    getMyJobs,
    updateJobStatus
} = require('../controllers/transportController');

router.get('/', protect, getAvailableJobs);
router.get('/my', protect, getMyJobs);
router.put('/:id/accept', protect, acceptJob);
router.put('/:id/status', protect, updateJobStatus);

module.exports = router;
