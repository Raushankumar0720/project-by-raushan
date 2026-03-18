const mongoose = require('mongoose');

// Cluster Schema
const clusterSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    centerLocation: {
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
    totalQuantityKg: {
        type: Number,
        default: 0,
        min: 0
    },
    cropIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop'
    }],
    farmerIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    harvestWindowStart: {
        type: Date
    },
    harvestWindowEnd: {
        type: Date
    },
    averagePricePerKg: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['open', 'fulfilled', 'expired'],
        default: 'open'
    },
    radius: {
        type: Number,
        default: 20 // km
    }
}, {
    timestamps: true
});

// Create 2dsphere index for geospatial queries
clusterSchema.index({ centerLocation: '2dsphere' });

module.exports = mongoose.model('Cluster', clusterSchema);
