const axios = require('axios');

const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * Get current weather for a location
 */
exports.getWeather = async (lat, lon) => {
    try {
        if (!API_KEY) {
            // Return mock data if no API key
            return {
                temperature: 28,
                humidity: 65,
                description: 'Partly cloudy',
                rainfall: 0,
                wind: 12,
                feels_like: 30
            };
        }

        const response = await axios.get(`${OPENWEATHER_API_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });

        const data = response.data;

        return {
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            rainfall: data.rain?.['1h'] || 0,
            wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            feels_like: Math.round(data.main.feels_like)
        };
    } catch (error) {
        console.error('Weather API error:', error.message);
        return {
            temperature: 28,
            humidity: 65,
            description: 'Data unavailable',
            rainfall: 0,
            wind: 0,
            feels_like: 30
        };
    }
};

/**
 * Get 7-day weather forecast
 */
exports.getWeatherForecast = async (lat, lon) => {
    try {
        if (!API_KEY) {
            // Return mock data
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const forecast = [];

            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);

                forecast.push({
                    day: days[date.getDay()],
                    date: date.toISOString().split('T')[0],
                    temp: Math.round(25 + Math.random() * 10),
                    humidity: Math.round(50 + Math.random() * 30),
                    description: ['Sunny', 'Cloudy', 'Partly cloudy', 'Light rain'][Math.floor(Math.random() * 4)],
                    rainfall: Math.round(Math.random() * 20)
                });
            }

            return forecast;
        }

        const response = await axios.get(`${OPENWEATHER_API_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });

        // Process forecast data (group by day)
        const dailyData = {};
        response.data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyData[date]) {
                dailyData[date] = [];
            }
            dailyData[date].push(item);
        });

        const forecast = Object.entries(dailyData).slice(0, 7).map(([date, items]) => {
            const temps = items.map(i => i.main.temp);
            const humidity = items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length;
            const rain = items.reduce((sum, i) => sum + (i.rain?.['3h'] || 0), 0);

            const d = new Date(date);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            return {
                day: days[d.getDay()],
                date,
                temp: Math.round(Math.max(...temps)),
                humidity: Math.round(humidity),
                description: items[0].weather[0].description,
                rainfall: Math.round(rain * 10) / 10
            };
        });

        return forecast;
    } catch (error) {
        console.error('Forecast API error:', error.message);
        return [];
    }
};

/**
 * Calculate harvest risk score based on weather forecast
 */
exports.getHarvestRiskScore = async (lat, lon, cropName) => {
    try {
        // Get 3-day forecast
        const forecast = await exports.getWeatherForecast(lat, lon);
        const next3Days = forecast.slice(0, 3);

        let riskLevel = 'low';
        let reasons = [];
        let recommendations = [];

        // Check for high rainfall
        const totalRainfall = next3Days.reduce((sum, day) => sum + day.rainfall, 0);
        if (totalRainfall > 50) {
            riskLevel = 'high';
            reasons.push(`Heavy rainfall expected: ${totalRainfall}mm in next 3 days`);
            recommendations.push('Harvest immediately if crop is ready, or delay harvest');
        } else if (totalRainfall > 25) {
            riskLevel = riskLevel === 'high' ? 'high' : 'medium';
            reasons.push(`Moderate rainfall expected: ${totalRainfall}mm`);
            recommendations.push('Monitor weather and be prepared to cover harvested crop');
        }

        // Check for extreme temperature
        const maxTemp = Math.max(...next3Days.map(d => d.temp));
        if (maxTemp > 40) {
            riskLevel = 'high';
            reasons.push(`Extreme heat expected: ${maxTemp}°C`);
            recommendations.push('Water crops early morning or late evening');
        } else if (maxTemp > 35) {
            riskLevel = riskLevel === 'high' ? 'high' : 'medium';
            reasons.push(`High temperature: ${maxTemp}°C`);
            recommendations.push('Ensure adequate irrigation');
        }

        // Check humidity
        const avgHumidity = next3Days.reduce((sum, d) => sum + d.humidity, 0) / next3Days.length;
        if (avgHumidity > 85) {
            riskLevel = riskLevel === 'high' ? 'high' : 'medium';
            reasons.push(`High humidity: ${Math.round(avgHumidity)}%`);
            recommendations.push('Watch for fungal diseases');
        }

        return {
            riskLevel,
            reasons,
            recommendations,
            forecast: next3Days
        };
    } catch (error) {
        console.error('Risk score error:', error);
        return {
            riskLevel: 'unknown',
            reasons: ['Unable to calculate risk'],
            recommendations: ['Check weather manually'],
            forecast: []
        };
    }
};

/**
 * Send weather alert to farmers
 */
exports.sendWeatherAlert = async (farmers, alert) => {
    // This would integrate with notification service
    console.log(`Weather alert to ${farmers.length} farmers:`, alert);
};

module.exports = exports;
