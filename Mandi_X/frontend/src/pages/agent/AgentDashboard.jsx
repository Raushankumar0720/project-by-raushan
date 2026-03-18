import { Link } from 'react-router-dom'
import { Users, Package, MapPin, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const AgentDashboard = () => {
  const { user } = useAuthStore()

  const stats = [
    { icon: Users, label: 'Farmers Managed', value: '45', color: 'bg-blue-100 text-blue-600', trend: '+5 this month' },
    { icon: Package, label: 'Crops Listed', value: '120', color: 'bg-green-100 text-green-600', trend: '+15 new' },
    { icon: MapPin, label: 'Active Clusters', value: '8', color: 'bg-purple-100 text-purple-600', trend: 'View map' },
    { icon: TrendingUp, label: 'Pending Orders', value: '15', color: 'bg-orange-100 text-orange-600', trend: '3 urgent' },
  ]

  const farmers = [
    { name: 'Rameshbhai Patel', village: 'Dhoraji', crops: 3, status: 'Active' },
    { name: 'Bhikhabhai Solanki', village: 'Gondal', crops: 2, status: 'Active' },
    { name: 'Jagjivan Ram', village: 'Jetpur', crops: 4, status: 'Active' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-bold">{user?.name?.charAt(0) || 'A'}</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Agent Dashboard</h1>
                <p className="text-indigo-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse"></span>
                  Welcome, {user?.name || 'Agent'}!
                </p>
              </div>
            </div>
            <button className="inline-flex items-center px-5 py-2.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-md">
              <Plus className="w-5 h-5 mr-2" /> Register Farmer
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">My Farmers</h2>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-medium">
                <Plus className="w-4 h-4 mr-2" /> Add Farmer
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Farmer</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Village</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Crops</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map((farmer, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{farmer.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{farmer.village}</td>
                      <td className="px-4 py-3 text-sm font-medium">{farmer.crops}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{farmer.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-left border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Add Crop</p>
                    <p className="text-xs text-gray-500">List a new crop</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-left border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">View Clusters</p>
                    <p className="text-xs text-gray-500">Your districts</p>
                  </div>
                </div>
              </button>
              <Link to="/marketplace" className="w-full p-5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Market Prices</p>
                    <p className="text-xs text-indigo-200">Check rates</p>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard
