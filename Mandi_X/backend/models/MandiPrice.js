const mongoose = require('mongoose');

// MandiPrice Schema - stores agricultural commodity prices from mandis
const mandiPriceSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    market: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    minPrice: {
        type: Number,
        required: true,
        min: 0
    },
    maxPrice: {
        type: Number,
        required: true,
        min: 0
    },
    modalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    },
    unit: {
        type: String,
        default: 'quintal'
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
mandiPriceSchema.index({ cropName: 1, district: 1, date: -1 });
mandiPriceSchema.index({ state: 1, date: -1 });

module.exports = mongoose.model('MandiPrice', mandiPriceSchema);
