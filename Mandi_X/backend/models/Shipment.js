const mongoose = require('mongoose');

// Shipment Schema
const shipmentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    transporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: ['assigned', 'picked_up', 'in_transit', 'delivered'],
        default: 'assigned'
    },
    pickupAddress: {
        type: String,
        trim: true
    },
    deliveryAddress: {
        type: String,
        trim: true
    },
    estimatedDelivery: {
        type: Date
    },
    actualDelivery: {
        type: Date
    },
    trackingUpdates: [{
        status: {
            type: String
        },
        message: {
            type: String
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    coldChainAlert: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Shipment', shipmentSchema);
