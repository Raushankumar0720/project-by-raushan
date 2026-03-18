const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

/**
 * Send SMS using Twilio
 */
exports.sendSMS = async (phone, message) => {
    try {
        if (!client) {
            // Log to console in development
            console.log(`📱 SMS to ${phone}: ${message}`);
            return { success: true, mode: 'log' };
        }

        const result = await client.messages.create({
            body: message,
            from: twilioPhone,
            to: phone
        });

        console.log(`📱 SMS sent to ${phone}: ${result.sid}`);
        return { success: true, sid: result.sid };
    } catch (error) {
        console.error('SMS error:', error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Send order confirmation SMS to farmer
 */
exports.sendOrderConfirmationSMS = async (farmer, order) => {
    const message = `Mandi_X: Your ${order.cropName || 'crop'} order of ${order.quantityKg}kg has been confirmed. Pickup scheduled. Order ID: ${order._id}`;

    if (farmer.phone) {
        return await exports.sendSMS(farmer.phone, message);
    }
    return { success: false, error: 'No phone number' };
};

/**
 * Send pickup reminder SMS
 */
exports.sendPickupReminderSMS = async (farmer, job) => {
    const message = `Mandi_X: Reminder: Transporter will arrive tomorrow for your ${job.cropName || 'crop'} pickup.`;

    if (farmer.phone) {
        return await exports.sendSMS(farmer.phone, message);
    }
    return { success: false, error: 'No phone number' };
};

/**
 * Send price alert SMS
 */
exports.sendPriceAlertSMS = async (phone, crop, market, price) => {
    const message = `Mandi_X Alert: ${crop} price in ${market} is ₹${price}/kg today. Check Mandi_X app for details!`;

    return await exports.sendSMS(phone, message);
};

/**
 * Send delivery confirmation SMS to buyer
 */
exports.sendDeliveryConfirmationSMS = async (buyer, order) => {
    const message = `Mandi_X: Your order #${order._id} of ${order.cropName || 'crop'} ${order.quantityKg}kg has been delivered. Thank you!`;

    if (buyer.phone) {
        return await exports.sendSMS(buyer.phone, message);
    }
    return { success: false, error: 'No phone number' };
};

module.exports = exports;
