const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 3;
    let retries = 0;

    const connectWithRetry = async () => {
        try {
            const mongoURI = process.env.MONGO_URI;

            if (!mongoURI) {
                console.log('⚠️ MONGO_URI not found in .env, running in demo mode (no database)');
                return;
            }

            const conn = await mongoose.connect(mongoURI, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

            // Connection event listeners
            mongoose.connection.on('error', (err) => {
                console.error('MongoDB connection error:', err.message);
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
            });

            mongoose.connection.on('reconnected', () => {
                console.log('MongoDB reconnected');
            });

            return conn;
        } catch (error) {
            retries++;
            console.error(`❌ MongoDB connection attempt ${retries}/${maxRetries} failed:`, error.message);

            if (retries < maxRetries) {
                console.log(`Retrying in 5 seconds...`);
                await new Promise(resolve => setTimeout(resolve, 5000));
                return connectWithRetry();
            }

            console.error('All MongoDB connection attempts failed');
            throw error;
        }
    };

    return connectWithRetry();
};

module.exports = connectDB;
