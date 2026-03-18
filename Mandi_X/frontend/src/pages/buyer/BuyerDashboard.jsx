import { Link } from 'react-router-dom'
import { ShoppingCart, Package, TrendingUp, MapPin, ArrowRight, Wallet } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const BuyerDashboard = () => {
  const { user } = useAuthStore()
  const stats = [
    { icon: ShoppingCart, label: 'Active Orders', value: '3', color: 'bg-blue-100 text-blue-600' },
    { icon: Wallet, label: 'Total Spent', value: '₹1,25,000', color: 'bg-green-100 text-green-600' },
    { icon: Package, label: 'Deliveries', value: '12', color: 'bg-purple-100 text-purple-600' },
    { icon: MapPin, label: 'Saved Clusters', value: '5', color: 'bg-orange-100 text-orange-600' },
  ]
  const orders = [
    { id: 'ORD001', crop: 'Tomato', qty: '500kg', status: 'In Transit' },
    { id: 'ORD002', crop: 'Onion', qty: '300kg', status: 'Confirmed' },
    { id: 'ORD003', crop: 'Potato', qty: '1000kg', status: 'Delivered' },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">{user?.name?.charAt(0) || 'B'}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Buyer Dashboard</h1>
              <p className="text-blue-100 text-sm">Welcome, {user?.name || 'Buyer'}!</p>
            </div>
          </div>
          <Link to="/marketplace" className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg text-sm">Marketplace</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}><stat.icon className="w-5 h-5" /></div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Active Orders</h2>
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              {orders.map((order, index) => (
                <div key={index} className="p-4 border-b flex justify-between items-center">
                  <div><p className="font-medium">{order.crop}</p><p className="text-sm text-gray-500">{order.qty}</p></div>
                  <span className={`px-2.5 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Escrow</h2>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
              <p className="text-sm opacity-80">Balance</p>
              <p className="text-2xl font-bold">₹50,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BuyerDashboard
