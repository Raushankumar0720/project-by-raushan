import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { MapPin, Users, Calendar, TrendingUp, ShoppingCart, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import Navbar from '../components/layout/Navbar'
import axios from 'axios'

const ClusterDetail = () => {
    const { clusterId } = useParams()
    const [searchParams] = useSearchParams()
    const { user, isAuthenticated } = useAuthStore()
    const [cluster, setCluster] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [orderQuantity, setOrderQuantity] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [ordering, setOrdering] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const isBuyer = user?.role === 'buyer'

    // Mock cluster data
    const mockCluster = {
        _id: clusterId,
        cropName: 'Tomato',
        totalQuantityKg: 2500,
        averagePricePerKg: 25,
        district: 'Rajkot',
        state: 'Gujarat',
        centerLocation: { type: 'Point', coordinates: [70.9, 22.3] },
        farmerIds: ['f1', 'f2', 'f3', 'f4', 'f5'],
        cropIds: ['c1', 'c2', 'c3', 'c4', 'c5'],
        harvestWindowStart: '2024-03-15',
        harvestWindowEnd: '2024-03-25',
        averagePricePerKg: 25,
        qualityGrade: 'A',
        status: 'open',
        farmers: [
            { _id: 'f1', name: 'Rameshbhai Patel', village: 'Dhoraji', quantityKg: 500 },
            { _id: 'f2', name: 'Bhikhabhai Solanki', village: 'Gondal', quantityKg: 600 },
            { _id: 'f3', name: 'Jagjivan Ram', village: 'Jetpur', quantityKg: 400 },
            { _id: 'f4', name: 'Laxmanbhai', village: 'Kotda', quantityKg: 700 },
            { _id: 'f5', name: 'Mohanbhai', village: 'Dusara', quantityKg: 300 },
        ],
        description: 'Fresh, high-quality tomatoes directly from farmers in Rajkot district. Grade A quality with proper ripeness and no damage.',
    }

    // Mock price history
    const priceHistory = [
        { date: '2024-02-15', price: 22 },
        { date: '2024-02-18', price: 24 },
        { date: '2024-02-21', price: 23 },
        { date: '2024-02-24', price: 26 },
        { date: '2024-02-27', price: 25 },
        { date: '2024-03-02', price: 28 },
        { date: '2024-03-05', price: 25 },
        { date: '2024-03-08', price: 24 },
        { date: '2024-03-11', price: 25 },
    ]

    useEffect(() => {
        fetchCluster()

        // Check if should open order form
        if (searchParams.get('action') === 'order') {
            setActiveTab('order')
        }
    }, [clusterId])

    const fetchCluster = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/clusters/${clusterId}`)
            setCluster(response.data.data)
        } catch (error) {
            // Use mock data
            setCluster(mockCluster)
        } finally {
            setLoading(false)
        }
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        if (!isAuthenticated || !isBuyer) {
            alert('Please login as a buyer to place an order')
            return
        }

        setOrdering(true)
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
                clusterId: cluster._id,
                quantityKg: parseInt(orderQuantity),
                deliveryAddress,
            })
            setOrderSuccess(true)
        } catch (error) {
            // Mock success for demo
            setOrderSuccess(true)
        } finally {
            setOrdering(false)
        }
    }

    const getQualityColor = (grade) => {
        switch (grade) {
            case 'A': return 'bg-green-100 text-green-800'
            case 'B': return 'bg-yellow-100 text-yellow-800'
            case 'C': return 'bg-orange-100 text-orange-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-screen pt-20">
                    <Loader2 className="w-10 h-10 text-agri-primary animate-spin" />
                </div>
            </div>
        )
    }

    if (!cluster) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-2xl font-bold">Cluster not found</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-r from-agri-primary to-green-500 text-white py-16 mt-16">
                <div className="max-w-7xl mx-auto px-4">
                    <a href="/marketplace" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Marketplace
                    </a>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">{cluster.cropName} Cluster</h1>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getQualityColor(cluster.qualityGrade)}`}>
                                    Grade {cluster.qualityGrade}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-white/80">
                                <span className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {cluster.district}, {cluster.state}
                                </span>
                                <span className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    {cluster.farmers?.length || 0} Farmers
                                </span>
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {new Date(cluster.harvestWindowStart).toLocaleDateString()} - {new Date(cluster.harvestWindowEnd).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">₹{cluster.averagePricePerKg}/kg</p>
                            <p className="text-white/80">{cluster.totalQuantityKg} kg available</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    {['overview', 'farmers', 'price-history', 'order'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-medium capitalize transition-colors ${activeTab === tab
                                ? 'text-agri-primary border-b-2 border-agri-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4">Cluster Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Crop Type</span>
                                    <span className="font-medium">{cluster.cropName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Total Quantity</span>
                                    <span className="font-medium">{cluster.totalQuantityKg} kg</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Price per kg</span>
                                    <span className="font-medium text-agri-primary">₹{cluster.averagePricePerKg}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Quality Grade</span>
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${getQualityColor(cluster.qualityGrade)}`}>
                                        Grade {cluster.qualityGrade}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Harvest Window</span>
                                    <span className="font-medium">
                                        {new Date(cluster.harvestWindowStart).toLocaleDateString()} - {new Date(cluster.harvestWindowEnd).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Location</span>
                                    <span className="font-medium">{cluster.district}, {cluster.state}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4">Description</h3>
                            <p className="text-gray-600">{cluster.description}</p>

                            <h3 className="text-xl font-semibold mt-6 mb-4">Quality Report</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span>Freshly harvested</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span>Properly sorted and graded</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span>No damage or pest infection</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span>Optimal moisture content</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'farmers' && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-semibold">Farmers in this Cluster</h3>
                            <p className="text-gray-500">{cluster.farmers?.length || 0} farmers contributing to this cluster</p>
                        </div>
                        <div className="divide-y">
                            {cluster.farmers?.map((farmer) => (
                                <div key={farmer._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-green-600 font-semibold">{farmer.name[0]}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{farmer.name}</p>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {farmer.village}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{farmer.quantityKg} kg</p>
                                        <p className="text-sm text-gray-500">contributing</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'price-history' && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-6">Price History (Last 30 Days)</h3>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {priceHistory.map((item, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-agri-primary rounded-t"
                                        style={{ height: `${(item.price / 30) * 100}%` }}
                                    ></div>
                                    <p className="text-xs text-gray-500 mt-2 transform -rotate-45">
                                        {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-500">Current cluster price: <span className="font-bold text-agri-primary">₹{cluster.averagePricePerKg}/kg</span></p>
                            <p className="text-sm text-gray-400">Mandi price: ₹{priceHistory[priceHistory.length - 1].price}/kg</p>
                        </div>
                    </div>
                )}

                {activeTab === 'order' && (
                    <div className="max-w-2xl mx-auto">
                        {orderSuccess ? (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Order Placed Successfully!</h3>
                                <p className="text-gray-600 mb-6">Your order has been confirmed. You will receive updates via SMS.</p>
                                <a
                                    href="/dashboard/buyer"
                                    className="inline-block px-6 py-3 bg-agri-primary text-white rounded-lg hover:bg-agri-dark"
                                >
                                    Go to Dashboard
                                </a>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-6">Place Order</h3>
                                <div className="bg-green-50 p-4 rounded-lg mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Available</span>
                                        <span className="font-semibold">{cluster.totalQuantityKg} kg</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Price per kg</span>
                                        <span className="font-semibold">₹{cluster.averagePricePerKg}</span>
                                    </div>
                                </div>

                                <form onSubmit={handlePlaceOrder} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Quantity (kg) *
                                        </label>
                                        <input
                                            type="number"
                                            value={orderQuantity}
                                            onChange={(e) => setOrderQuantity(e.target.value)}
                                            max={cluster.totalQuantityKg}
                                            min={1}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                            placeholder="Enter quantity in kg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Delivery Address *
                                        </label>
                                        <textarea
                                            value={deliveryAddress}
                                            onChange={(e) => setDeliveryAddress(e.target.value)}
                                            required
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                            placeholder="Enter your delivery address"
                                        />
                                    </div>

                                    {orderQuantity && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total Amount</span>
                                                <span className="text-agri-primary">
                                                    ₹{(parseInt(orderQuantity) || 0) * cluster.averagePricePerKg}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={ordering || !isAuthenticated}
                                        className="w-full py-3 bg-agri-primary text-white font-semibold rounded-lg hover:bg-agri-dark transition-colors disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {ordering ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : !isAuthenticated ? (
                                            'Login to Order'
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5 mr-2" />
                                                Place Order
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClusterDetail
