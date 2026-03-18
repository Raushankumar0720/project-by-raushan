const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clusterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cluster',
        default: null
    },
    cropId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        default: null
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
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'escrow', 'released', 'refunded'],
        default: 'pending'
    },
    deliveryAddress: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
