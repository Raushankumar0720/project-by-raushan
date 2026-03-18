const mongoose = require('mongoose');

// Agent Schema
const agentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmerIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    district: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    totalFarmersManaged: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Agent', agentSchema);
