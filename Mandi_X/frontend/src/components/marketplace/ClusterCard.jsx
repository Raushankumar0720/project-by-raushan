import { Link } from 'react-router-dom'
import { MapPin, Users, Calendar, TrendingUp, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const ClusterCard = ({ cluster }) => {
    const { user, isAuthenticated } = useAuthStore()
    const isBuyer = user?.role === 'buyer'

    const getQualityColor = (grade) => {
        switch (grade) {
            case 'A': return 'bg-green-100 text-green-800'
            case 'B': return 'bg-yellow-100 text-yellow-800'
            case 'C': return 'bg-orange-100 text-orange-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
        })
    }

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-agri-primary group">
            {/* Header */}
            <div className="bg-gradient-to-r from-agri-primary to-green-500 p-4">
                <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full">
                        {cluster.cropName}
                    </span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getQualityColor(cluster.qualityGrade)}`}>
                        Grade {cluster.qualityGrade || 'N/A'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-500">Total Quantity</p>
                        <p className="text-xl font-bold text-gray-900">{cluster.totalQuantityKg} kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Avg Price</p>
                        <p className="text-xl font-bold text-agri-primary">₹{cluster.averagePricePerKg}/kg</p>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{cluster.district}, {cluster.state}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{cluster.farmerCount || cluster.farmerIds?.length || 0} Farmers</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                            {formatDate(cluster.harvestWindowStart)} - {formatDate(cluster.harvestWindowEnd)}
                        </span>
                    </div>
                </div>

                {/* Distance */}
                {cluster.distance && (
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>{cluster.distance} km away</span>
                    </div>
                )}

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                    <Link
                        to={`/marketplace/${cluster._id}`}
                        className="flex-1 py-2 px-4 border-2 border-agri-primary text-agri-primary font-semibold rounded-lg text-center hover:bg-agri-primary hover:text-white transition-colors"
                    >
                        View Details
                    </Link>
                    {isAuthenticated && isBuyer && (
                        <button
                            className="flex-1 py-2 px-4 bg-agri-primary text-white font-semibold rounded-lg hover:bg-agri-dark transition-colors flex items-center justify-center"
                            onClick={() => window.location.href = `/marketplace/${cluster._id}?action=order`}
                        >
                            Order
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ClusterCard
