import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Loader2, Package, MapPin, Calendar } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'

const MyCrops = () => {
    const [crops, setCrops] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    // Mock data
    const mockCrops = [
        {
            _id: '1',
            cropName: 'Tomato',
            variety: 'Cherry',
            quantityKg: 500,
            pricePerKg: 25,
            harvestDate: '2024-03-15',
            status: 'available',
            district: 'Rajkot',
            village: 'Dhoraji',
            clusterId: null,
        },
        {
            _id: '2',
            cropName: 'Onion',
            variety: 'Red',
            quantityKg: 800,
            pricePerKg: 18,
            harvestDate: '2024-03-10',
            status: 'in_cluster',
            district: 'Rajkot',
            village: 'Dhoraji',
            clusterId: { cropName: 'Onion', totalQuantityKg: 4000 },
        },
        {
            _id: '3',
            cropName: 'Potato',
            variety: 'Kufri',
            quantityKg: 1200,
            pricePerKg: 15,
            harvestDate: '2024-03-01',
            status: 'sold',
            district: 'Rajkot',
            village: 'Dhoraji',
            clusterId: null,
        },
    ]

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCrops(mockCrops)
            setLoading(false)
        }, 500)
    }, [])

    const getStatusBadge = (status) => {
        const statusConfig = {
            available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Available' },
            in_cluster: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Cluster' },
            sold: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Sold' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
        }
        const config = statusConfig[status] || statusConfig.available
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        )
    }

    const filteredCrops = filter === 'all' ? crops : crops.filter(c => c.status === filter)

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to cancel this crop listing?')) {
            setCrops(crops.map(c => c._id === id ? { ...c, status: 'cancelled' } : c))
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <Link
                    to="/dashboard/farmer"
                    className="inline-flex items-center text-gray-600 hover:text-agri-primary mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Crops</h1>
                    <Link
                        to="/dashboard/farmer/add-crop"
                        className="px-4 py-2 bg-agri-primary text-white rounded-lg hover:bg-agri-dark"
                    >
                        + Add New Crop
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {['all', 'available', 'in_cluster', 'sold'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === status
                                ? 'bg-agri-primary text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {status === 'all' ? 'All' : status.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-10 h-10 text-agri-primary animate-spin" />
                    </div>
                ) : filteredCrops.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-16 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No crops found</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first crop</p>
                        <Link
                            to="/dashboard/farmer/add-crop"
                            className="inline-block px-6 py-3 bg-agri-primary text-white rounded-lg hover:bg-agri-dark"
                        >
                            Add Crop
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredCrops.map((crop) => (
                            <div key={crop._id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold">{crop.cropName}</h3>
                                            {getStatusBadge(crop.status)}
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span className="flex items-center">
                                                <Package className="w-4 h-4 mr-1" />
                                                {crop.quantityKg} kg
                                            </span>
                                            <span className="flex items-center">
                                                ₹{crop.pricePerKg}/kg
                                            </span>
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {crop.village}, {crop.district}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(crop.harvestDate).toLocaleDateString()}
                                            </span>
                                        </div>

                                        {crop.clusterId && crop.status === 'in_cluster' && (
                                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-blue-700">
                                                    <strong>Part of {crop.clusterId.cropName} Cluster</strong> —
                                                    Total {crop.clusterId.totalQuantityKg}kg
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {crop.status !== 'cancelled' && crop.status !== 'sold' && (
                                        <div className="flex gap-2">
                                            <button className="p-2 text-gray-600 hover:text-agri-primary hover:bg-gray-100 rounded-lg">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(crop._id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyCrops
