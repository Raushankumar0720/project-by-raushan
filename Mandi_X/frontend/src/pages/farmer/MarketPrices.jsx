import { useState } from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, Cloud, AlertTriangle, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'

const MarketPrices = () => {
    const [district, setDistrict] = useState('Rajkot')

    const priceData = [
        { crop: 'Tomato', price: 2500, change: 5.2, trend: [22, 24, 23, 26, 25] },
        { crop: 'Onion', price: 1800, change: -2.1, trend: [19, 18, 20, 17, 18] },
        { crop: 'Potato', price: 1500, change: 1.5, trend: [14, 15, 14, 16, 15] },
        { crop: 'Wheat', price: 2200, change: 3.2, trend: [21, 22, 21, 23, 22] },
        { crop: 'Rice', price: 2800, change: 0.8, trend: [27, 28, 27, 29, 28] },
        { crop: 'Cotton', price: 6500, change: 8.5, trend: [60, 62, 61, 65, 65] },
        { crop: 'Soybean', price: 4800, change: -1.2, trend: [49, 48, 50, 47, 48] },
        { crop: 'Maize', price: 1900, change: 4.1, trend: [18, 19, 18, 20, 19] },
    ]

    const weatherData = {
        temp: 32,
        humidity: 45,
        condition: 'Partly Cloudy',
        rainfall: 0,
        wind: 12,
        forecast: [
            { day: 'Mon', high: 34, low: 22, condition: 'Sunny', risk: 'low' },
            { day: 'Tue', high: 33, low: 21, condition: 'Cloudy', risk: 'low' },
            { day: 'Wed', high: 30, low: 20, condition: 'Rain', risk: 'high' },
        ]
    }

    const districts = ['Rajkot', 'Ahmedabad', 'Surat', 'Bhavnagar', 'Jamnagar']

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <Link
                    to="/dashboard/farmer"
                    className="inline-flex items-center text-gray-600 hover:text-agri-primary mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <h1 className="text-2xl font-bold mb-6">Market Prices</h1>

                {/* District Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select District</label>
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                    >
                        {districts.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                {/* Weather Widget */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Cloud className="w-16 h-16" />
                            <div>
                                <p className="text-4xl font-bold">{weatherData.temp}°C</p>
                                <p className="text-blue-100">{weatherData.condition} • Humidity: {weatherData.humidity}%</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-center">
                                <p className="text-sm text-blue-100">Wind</p>
                                <p className="font-semibold">{weatherData.wind} km/h</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-blue-100">Rainfall</p>
                                <p className="font-semibold">{weatherData.rainfall} mm</p>
                            </div>
                        </div>
                    </div>

                    {/* 3-Day Forecast */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {weatherData.forecast.map((day, i) => (
                            <div key={i} className="bg-white/20 rounded-lg p-3 text-center">
                                <p className="font-medium">{day.day}</p>
                                <p className="text-2xl my-1">{day.high}°</p>
                                <p className="text-sm text-blue-100">{day.condition}</p>
                                <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs ${day.risk === 'high' ? 'bg-red-500' : 'bg-green-500'
                                    }`}>
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    {day.risk} risk
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {priceData.map((item, index) => {
                        const isPositive = item.change >= 0
                        const maxPrice = Math.max(...item.trend)
                        const minPrice = Math.min(...item.trend)

                        return (
                            <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-lg">{item.crop}</h3>
                                    <span className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                        {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                                        {Math.abs(item.change)}%
                                    </span>
                                </div>

                                <p className="text-2xl font-bold text-gray-900">₹{item.price}</p>
                                <p className="text-sm text-gray-500 mb-3">per quintal</p>

                                {/* Sparkline */}
                                <div className="h-12 flex items-end gap-1 mb-3">
                                    {item.trend.map((p, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-agri-primary rounded-t"
                                            style={{ height: `${(p / maxPrice) * 100}%` }}
                                        />
                                    ))}
                                </div>

                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Min: ₹{minPrice}</span>
                                    <span>Max: ₹{maxPrice}</span>
                                </div>

                                {/* Opportunity Alert */}
                                {item.change > 5 && (
                                    <div className="mt-3 p-2 bg-green-50 rounded-lg flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                        <span className="text-sm text-green-700">Price is rising - good time to sell!</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MarketPrices
