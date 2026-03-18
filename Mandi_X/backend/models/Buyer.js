const mongoose = require('mongoose');

// Buyer Schema
const buyerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    businessName: {
        type: String,
        trim: true
    },
    businessType: {
        type: String,
        enum: ['restaurant', 'wholesaler', 'supermarket', 'grocery_chain', 'food_processor'],
        default: 'wholesaler'
    },
    address: {
        type: String,
        trim: true
    },
    gstNumber: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Buyer', buyerSchema);
