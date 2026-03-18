import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Loader2, MapPin, Users, Calendar, TrendingUp, ArrowRight, Leaf } from 'lucide-react'
import axiosInstance from '../lib/axiosInstance'

const Marketplace = () => {
    const [clusters, setClusters] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        cropName: '',
        district: '',
        state: '',
        minQty: '',
        maxPrice: '',
        sortBy: 'date',
    })
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        fetchClusters()
    }, [filters])

    const fetchClusters = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (filters.cropName) params.append('cropName', filters.cropName)
            if (filters.district) params.append('district', filters.district)
            if (filters.state) params.append('state', filters.state)
            if (filters.minQty) params.append('minQty', filters.minQty)
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
            params.append('sortBy', filters.sortBy)

            const response = await axiosInstance.get(`/marketplace?${params.toString()}`)
            if (response.data.success) {
                setClusters(response.data.data)
            }
        } catch (error) {
            console.error('Error fetching clusters:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setFilters({ ...filters, cropName: searchQuery })
    }

    const clearFilters = () => {
        setFilters({
            cropName: '',
            district: '',
            state: '',
            minQty: '',
            maxPrice: '',
            sortBy: 'date',
        })
        setSearchQuery('')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Agricultural Marketplace</h1>
                        <p className="text-green-100 text-lg max-w-2xl mx-auto">
                            Browse clusters of fresh produce directly from farmers. Buy in bulk at competitive prices.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-8 max-w-3xl mx-auto">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search crops..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-6 py-4 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2"
                            >
                                <Filter className="w-5 h-5" />
                                Filters
                            </button>
                        </div>
                    </form>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="mt-6 bg-white rounded-xl p-6 shadow-lg animate-fade-in">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-800">Filter Options</h3>
                                <button onClick={clearFilters} className="text-sm text-green-600 hover:text-green-700">Clear All</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                                    <select
                                        value={filters.cropName}
                                        onChange={(e) => setFilters({ ...filters, cropName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">All Crops</option>
                                        <option value="Tomato">Tomato</option>
                                        <option value="Onion">Onion</option>
                                        <option value="Potato">Potato</option>
                                        <option value="Wheat">Wheat</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <select
                                        value={filters.district}
                                        onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">All Districts</option>
                                        <option value="Rajkot">Rajkot</option>
                                        <option value="Ahmedabad">Ahmedabad</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Quantity (kg)</label>
                                    <input
                                        type="number"
                                        value={filters.minQty}
                                        onChange={(e) => setFilters({ ...filters, minQty: e.target.value })}
                                        placeholder="Min kg"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹/kg)</label>
                                    <input
                                        type="number"
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                        placeholder="Max ₹/kg"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                        <span className="ml-2 text-gray-600">Loading clusters...</span>
                    </div>
                ) : clusters.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Leaf className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Clusters Found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your filters or check back later.</p>
                        <button onClick={clearFilters} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Clear Filters</button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">Showing <span className="font-semibold text-gray-800">{clusters.length}</span> clusters</p>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                className="px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="date">Newest First</option>
                                <option value="price">Price: Low to High</option>
                                <option value="priceDesc">Price: High to Low</option>
                                <option value="quantity">Quantity: Most</option>
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clusters.map((cluster) => (
                                <Link
                                    key={cluster._id}
                                    to={`/marketplace/${cluster._id}`}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
                                        <div className="flex justify-between items-start">
                                            <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                                                {cluster.cropName}
                                            </span>
                                            <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full capitalize">
                                                {cluster.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Price/kg</p>
                                                    <p className="font-semibold text-gray-800">₹{cluster.averagePricePerKg}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                                                    <Users className="w-4 h-4 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Farmers</p>
                                                    <p className="font-semibold text-gray-800">{cluster.farmerCount}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span>{cluster.district}, {cluster.state}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    {new Date(cluster.harvestWindowStart).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} -
                                                    {new Date(cluster.harvestWindowEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-500">Total Quantity</p>
                                                <p className="text-lg font-bold text-green-600">{cluster.totalQuantityKg.toLocaleString()} kg</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-green-600 font-medium group-hover:gap-2 transition-all">
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Marketplace
