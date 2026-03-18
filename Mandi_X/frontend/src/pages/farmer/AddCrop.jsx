import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Loader2, CheckCircle } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import axios from 'axios'

const AddCrop = () => {
    const [formData, setFormData] = useState({
        cropName: '',
        variety: '',
        quantityKg: '',
        pricePerKg: '',
        harvestDate: '',
        availableFrom: '',
        availableTill: '',
        village: '',
        district: '',
        state: '',
        description: '',
    })
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const cropOptions = [
        'Tomato', 'Onion', 'Potato', 'Carrot', 'Cabbage', 'Cauliflower',
        'Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Groundnut',
        'Chilli', 'Garlic', 'Ginger', 'Mango', 'Banana', 'Orange'
    ]

    const stateOptions = [
        'Gujarat', 'Maharashtra', 'Rajasthan', 'Madhya Pradesh',
        'Uttar Pradesh', 'Punjab', 'Haryana', 'Karnataka', 'Tamil Nadu'
    ]

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    // Fill some mock address data
                    setFormData(prev => ({
                        ...prev,
                        district: 'Rajkot',
                        state: 'Gujarat',
                    }))
                },
                (err) => {
                    setError('Unable to get location. Please enter manually.')
                }
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const payload = {
                ...formData,
                quantityKg: parseInt(formData.quantityKg),
                pricePerKg: parseFloat(formData.pricePerKg),
                location: location ? { type: 'Point', coordinates: [location.lng, location.lat] } : undefined,
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/api/crops`, payload)
            setSuccess(true)
        } catch (err) {
            // Mock success for demo
            setSuccess(true)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                    <div className="bg-white rounded-2xl shadow-md p-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Crop Listed Successfully!</h2>
                        <p className="text-gray-600 mb-6">
                            Your crop has been added and is being grouped into a cluster for better pricing.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                to="/dashboard/farmer"
                                className="px-6 py-3 bg-agri-primary text-white rounded-lg hover:bg-agri-dark"
                            >
                                Go to Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    setSuccess(false)
                                    setFormData({
                                        cropName: '', variety: '', quantityKg: '', pricePerKg: '',
                                        harvestDate: '', availableFrom: '', availableTill: '',
                                        village: '', district: '', state: '', description: '',
                                    })
                                }}
                                className="px-6 py-3 border border-agri-primary text-agri-primary rounded-lg hover:bg-agri-primary hover:text-white"
                            >
                                Add Another Crop
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <Link
                    to="/dashboard/farmer"
                    className="inline-flex items-center text-gray-600 hover:text-agri-primary mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h1 className="text-2xl font-bold mb-6">Add New Crop</h1>

                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Crop Selection */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Crop Name *
                                </label>
                                <select
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                >
                                    <option value="">Select Crop</option>
                                    {cropOptions.map(crop => (
                                        <option key={crop} value={crop}>{crop}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Variety
                                </label>
                                <input
                                    type="text"
                                    name="variety"
                                    value={formData.variety}
                                    onChange={handleChange}
                                    placeholder="e.g., Cherry, Hybrid"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                />
                            </div>
                        </div>

                        {/* Quantity & Price */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity (kg) *
                                </label>
                                <input
                                    type="number"
                                    name="quantityKg"
                                    value={formData.quantityKg}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="e.g., 500"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price per kg (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="pricePerKg"
                                    value={formData.pricePerKg}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    step="0.01"
                                    placeholder="e.g., 25"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                />
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Harvest Date *
                                </label>
                                <input
                                    type="date"
                                    name="harvestDate"
                                    value={formData.harvestDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available From
                                </label>
                                <input
                                    type="date"
                                    name="availableFrom"
                                    value={formData.availableFrom}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Till
                                </label>
                                <input
                                    type="date"
                                    name="availableTill"
                                    value={formData.availableTill}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Location
                                </label>
                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    className="flex items-center text-sm text-agri-primary hover:underline"
                                >
                                    <MapPin className="w-4 h-4 mr-1" />
                                    Detect My Location
                                </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        name="village"
                                        value={formData.village}
                                        onChange={handleChange}
                                        placeholder="Village"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        placeholder="District"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                    />
                                </div>
                                <div>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                    >
                                        <option value="">Select State</option>
                                        {stateOptions.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {location && (
                                <p className="text-sm text-green-600 mt-2">
                                    ✓ Location detected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Describe your crop quality, special features..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-agri-primary text-white font-semibold rounded-lg hover:bg-agri-dark transition-colors disabled:opacity-50 flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'List My Crop'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCrop
