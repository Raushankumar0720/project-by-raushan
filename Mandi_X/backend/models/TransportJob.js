const mongoose = require('mongoose');

// TransportJob Schema
const transportJobSchema = new mongoose.Schema({
    shipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipment',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    pickupLocation: {
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
    deliveryLocation: {
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
    distanceKm: {
        type: Number,
        default: 0
    },
    payAmount: {
        type: Number,
        default: 0
    },
    requiredCapacityKg: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['open', 'accepted', 'completed', 'cancelled'],
        default: 'open'
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    stops: [{
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },
        farmerName: {
            type: String
        },
        quantityKg: {
            type: Number
        },
        address: {
            type: String
        }
    }],
    cropName: {
        type: String,
        trim: true
    },
    vehicleTypeRequired: {
        type: String,
        enum: ['truck', 'pickup', 'tempo', 'mini_truck'],
        default: 'truck'
    }
}, {
    timestamps: true
});

// Create 2dsphere indexes for geospatial queries
transportJobSchema.index({ pickupLocation: '2dsphere' });
transportJobSchema.index({ deliveryLocation: '2dsphere' });

module.exports = mongoose.model('TransportJob', transportJobSchema);
