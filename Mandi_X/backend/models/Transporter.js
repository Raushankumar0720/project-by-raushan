const mongoose = require('mongoose');

// Transporter Schema
const transporterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['truck', 'pickup', 'tempo', 'mini_truck'],
        default: 'truck'
    },
    vehicleNumber: {
        type: String,
        trim: true
    },
    capacityKg: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [0, 0]
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create 2dsphere index for geospatial queries
transporterSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Transporter', transporterSchema);
