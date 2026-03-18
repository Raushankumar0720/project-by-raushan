const axios = require('axios');
const cron = require('node-cron');
const MandiPrice = require('../models/MandiPrice');

const AGMARKNET_API_URL = 'https://api.data.gov.in/resource/9ef84268-d54d-4b81-ab36-d51300f806a9';
const API_KEY = process.env.AGMARKNET_API_KEY || 'demo_key';

// Mock data for fallback
const MOCK_PRICES = {
    tomato: { min: 800, max: 1500, modal: 1200 },
    onion: { min: 600, max: 1200, modal: 900 },
    potato: { min: 400, max: 800, modal: 600 },
    wheat: { min: 1500, max: 2200, modal: 1900 },
    rice: { min: 1800, max: 2800, modal: 2200 },
    maize: { min: 1200, max: 1800, modal: 1500 },
    cotton: { min: 4500, max: 6000, modal: 5200 },
    soybean: { min: 3000, max: 4500, modal: 3800 },
    chilli: { min: 2000, max: 4000, modal: 3000 },
    garlic: { min: 1500, max: 3000, modal: 2200 },
    ginger: { min: 1800, max: 3500, modal: 2500 },
    mango: { min: 2000, max: 5000, modal: 3500 },
    banana: { min: 400, max: 900, modal: 600 },
    orange: { min: 1500, max: 3500, modal: 2500 },
    apple: { min: 3000, max: 7000, modal: 5000 }
};

/**
 * Fetch and store prices from Agmarknet API
 * Runs daily at 7 AM
 */
exports.fetchAndStorePrices = async () => {
    try {
        // In production, call actual Agmarknet API
        // For now, use mock data as fallback
        const crops = Object.keys(MOCK_PRICES);
        const districts = ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Bhavnagar'];
        const markets = ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Vashi'];
        const states = ['Gujarat', 'Maharashtra'];

        const prices = [];

        for (const crop of crops) {
            for (let i = 0; i < districts.length; i++) {
                const mockPrice = MOCK_PRICES[crop];
                const variation = (Math.random() - 0.5) * 0.3; // ±15% variation

                prices.push({
                    cropName: crop,
                    market: markets[i],
                    district: districts[i],
                    state: states[0],
                    minPrice: Math.round(mockPrice.min * (1 + variation)),
                    maxPrice: Math.round(mockPrice.max * (1 + variation)),
                    modalPrice: Math.round(mockPrice.modal * (1 + variation)),
                    date: new Date(),
                    unit: 'quintal'
                });
            }
        }

        // Store prices
        await MandiPrice.insertMany(prices);

        console.log(`Stored ${prices.length} mandi prices`);
        return prices;
    } catch (error) {
        console.error('Error fetching mandi prices:', error);
        return [];
    }
};

/**
 * Get prices by crop and district
 */
exports.getPricesByCrop = async (cropName, district) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const prices = await MandiPrice.find({
        cropName: new RegExp(cropName, 'i'),
        district: new RegExp(district, 'i'),
        date: { $gte: thirtyDaysAgo }
    }).sort({ date: 1 });

    // Calculate trends
    if (prices.length > 0) {
        const oldest = prices[0];
        const latest = prices[prices.length - 1];
        const change = ((latest.modalPrice - oldest.modalPrice) / oldest.modalPrice) * 100;

        return {
            prices,
            trend: {
                direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
                percentage: Math.abs(change).toFixed(1)
            }
        };
    }

    return { prices: [], trend: { direction: 'stable', percentage: '0' } };
};

/**
 * Get multiple crop prices for a district
 */
exports.getMultipleCropPrices = async (district) => {
    const crops = [
        'tomato', 'onion', 'potato', 'wheat', 'rice', 'maize',
        'cotton', 'soybean', 'chilli', 'garlic', 'ginger',
        'mango', 'banana', 'orange', 'apple'
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const prices = await Promise.all(
        crops.map(async (crop) => {
            const price = await MandiPrice.findOne({
                cropName: crop,
                district: new RegExp(district, 'i'),
                date: { $gte: today }
            }).sort({ date: -1 });

            return price ? {
                cropName: crop,
                modalPrice: price.modalPrice,
                minPrice: price.minPrice,
                maxPrice: price.maxPrice
            } : {
                cropName: crop,
                modalPrice: MOCK_PRICES[crop]?.modal || 0,
                minPrice: MOCK_PRICES[crop]?.min || 0,
                maxPrice: MOCK_PRICES[crop]?.max || 0
            };
        })
    );

    return prices;
};

/**
 * Schedule daily price fetch
 */
exports.schedulePriceFetch = () => {
    // Run at 7 AM every day
    cron.schedule('0 7 * * *', async () => {
        console.log('Running daily mandi price fetch...');
        await exports.fetchAndStorePrices();
    });

    console.log('Mandi price fetch scheduled: runs daily at 7 AM');
};

module.exports = exports;
