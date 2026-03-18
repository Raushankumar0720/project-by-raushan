import { Users, ShoppingCart, TrendingUp, DollarSign, CheckCircle, XCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const AdminDashboard = () => {
  const { user } = useAuthStore()

  const stats = [
    { icon: Users, label: 'Total Users', value: '15,234', color: 'bg-blue-100 text-blue-600', change: '+12%' },
    { icon: ShoppingCart, label: 'Total Orders', value: '8,456', color: 'bg-purple-100 text-purple-600', change: '+8%' },
    { icon: TrendingUp, label: 'Clusters', value: '892', color: 'bg-green-100 text-green-600', change: '+15%' },
    { icon: DollarSign, label: 'Revenue', value: '₹4.2Cr', color: 'bg-orange-100 text-orange-600', change: '+22%' },
  ]

  const pendingApprovals = [
    { name: 'John Doe', email: 'john@example.com', role: 'Buyer' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Transporter' },
  ]

  const recentOrders = [
    { id: 'ORD001', crop: 'Tomato', buyer: 'Bharat Supermart', amount: '₹12,500', status: 'Delivered' },
    { id: 'ORD002', crop: 'Onion', buyer: 'Fresh Veggies', amount: '₹5,400', status: 'In Transit' },
    { id: 'ORD003', crop: 'Potato', buyer: 'Gujarat Hotels', amount: '₹15,000', status: 'Pending' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold">{user?.name?.charAt(0) || 'A'}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-red-100">Welcome, {user?.name || 'Admin'}!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {pendingApprovals.map((item, index) => (
                <div key={index} className="p-4 border-b">
                  <div className="flex justify-between mb-2">
                    <p className="font-bold">{item.name}</p>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{item.role}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{item.email}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-green-500 text-white rounded flex items-center justify-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" /> Approve
                    </button>
                    <button className="flex-1 py-2 bg-red-500 text-white rounded flex items-center justify-center text-sm">
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Crop</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Buyer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3 text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.crop}</td>
                      <td className="px-4 py-3 text-sm">{order.buyer}</td>
                      <td className="px-4 py-3 text-sm font-medium">{order.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
