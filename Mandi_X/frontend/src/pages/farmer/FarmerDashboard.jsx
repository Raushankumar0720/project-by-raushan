import { Link } from 'react-router-dom'
import { Plus, Package, TrendingUp, ShoppingCart, ArrowRight, MapPin, Wallet } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const FarmerDashboard = () => {
    const { user } = useAuthStore()

    const stats = [
        { icon: Package, label: 'My Crops', value: '3', color: 'bg-green-100 text-green-600', trend: '+2 this week' },
        { icon: ShoppingCart, label: 'Active Orders', value: '2', color: 'bg-blue-100 text-blue-600', trend: '1 pending' },
        { icon: Wallet, label: 'Total Revenue', value: '₹32,900', color: 'bg-purple-100 text-purple-600', trend: '+15%' },
        { icon: TrendingUp, label: 'Avg Price/kg', value: '₹24.50', color: 'bg-orange-100 text-orange-600', trend: '+₹2.30' },
    ]

    const quickActions = [
        { name: 'Add New Crop', icon: Plus, href: '/dashboard/farmer/add-crop', color: 'from-green-500 to-green-600', description: 'List your harvest' },
        { name: 'View My Crops', icon: Package, href: '/dashboard/farmer/my-crops', color: 'from-blue-500 to-blue-600', description: 'Manage listings' },
        { name: 'Check Prices', icon: TrendingUp, href: '/dashboard/farmer/market-prices', color: 'from-purple-500 to-purple-600', description: 'Market rates' },
        { name: 'My Orders', icon: ShoppingCart, href: '/dashboard/farmer/orders', color: 'from-orange-500 to-orange-600', description: 'Track sales' },
    ]

    const recentActivity = [
        { action: 'Crop Listed', detail: 'Tomato - 500kg added', time: '2 hours ago' },
        { action: 'Order Confirmed', detail: 'Tomato sold to Bharat Mart', time: '1 day ago' },
        { action: 'Payment Received', detail: '₹12,000 credited', time: '2 days ago' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
            {/* Compact Header */}
            <div className="bg-gradient-to-r from-agri-primary to-green-500 text-white shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-xl font-bold">{user?.name?.charAt(0) || 'F'}</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Farmer Dashboard</h1>
                                <p className="text-green-100 text-sm">Welcome, {user?.name || 'Farmer'}!</p>
                            </div>
                        </div>
                        <Link to="/marketplace" className="inline-flex items-center px-4 py-2 bg-white text-agri-primary font-semibold rounded-lg hover:bg-gray-100 text-sm">
                            Marketplace <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 sm:p-5 border border-gray-100">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                            {quickActions.map((action, index) => (
                                <Link key={index} to={action.href} className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center`}>
                                            <action.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="font-medium text-gray-800">{action.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <h2 className="text-lg font-bold text-gray-800 mb-4">My Clusters</h2>
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div>
                                    <h3 className="font-semibold">Tomato Cluster - Rajkot</h3>
                                    <p className="text-sm text-gray-500">5 farmers - 2500kg - ₹24/kg</p>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                            <div className="space-y-3">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-2 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">{activity.action}</p>
                                            <p className="text-xs text-gray-500">{activity.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FarmerDashboard
