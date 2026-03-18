const mongoose = require('mongoose');

// Crop Schema
const cropSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    cropName: {
        type: String,
        required: true,
        trim: true
    },
    variety: {
        type: String,
        trim: true
    },
    quantityKg: {
        type: Number,
        required: true,
        min: 0
    },
    pricePerKg: {
        type: Number,
        required: true,
        min: 0
    },
    harvestDate: {
        type: Date,
        required: true
    },
    availableFrom: {
        type: Date
    },
    availableTill: {
        type: Date
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
    village: {
        type: String,
        trim: true
    },
    district: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['available', 'in_cluster', 'sold', 'cancelled'],
        default: 'available'
    },
    images: [{
        type: String
    }],
    qualityGrade: {
        type: String,
        enum: ['A', 'B', 'C', 'ungraded'],
        default: 'ungraded'
    },
    clusterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cluster',
        default: null
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Create 2dsphere index for geospatial queries
cropSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Crop', cropSchema);
