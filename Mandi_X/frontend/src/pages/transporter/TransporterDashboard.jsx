import { Truck, Package, MapPin, DollarSign, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const TransporterDashboard = () => {
  const { user } = useAuthStore()

  const stats = [
    { icon: Package, label: 'Available Jobs', value: '5', color: 'bg-green-100 text-green-600', trend: 'View all' },
    { icon: Truck, label: 'Active Jobs', value: '2', color: 'bg-blue-100 text-blue-600', trend: 'In transit' },
    { icon: CheckCircle, label: 'Completed', value: '28', color: 'bg-purple-100 text-purple-600', trend: '+5 this week' },
    { icon: DollarSign, label: 'Total Earned', value: '₹1,45,000', color: 'bg-orange-100 text-orange-600', trend: '+18%' },
  ]

  const availableJobs = [
    { id: 1, from: 'Rajkot', to: 'Ahmedabad', crop: 'Tomato', weight: '500kg', distance: '220km', pay: '₹3,500', stops: 3 },
    { id: 2, from: 'Surat', to: 'Mumbai', crop: 'Onion', weight: '2000kg', distance: '280km', pay: '₹8,000', stops: 5 },
  ]

  const shipments = [
    { id: 'SHP001', status: 'In Transit', from: 'Rajkot', to: 'Ahmedabad' },
    { id: 'SHP002', status: 'Picked Up', from: 'Surat', to: 'Vapi' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold">{user?.name?.charAt(0) || 'T'}</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Transporter Dashboard</h1>
              <p className="text-orange-100">Welcome, {user?.name || 'Transporter'}!</p>
            </div>
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
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Jobs</h2>
            <div className="space-y-4">
              {availableJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold">{job.crop} - {job.from} to {job.to}</p>
                        <p className="text-sm text-gray-500">{job.weight} - {job.distance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">{job.pay}</p>
                      <button className="mt-2 px-4 py-1.5 bg-green-500 text-white rounded-lg text-sm">Accept</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Active Shipments</h2>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100">
              {shipments.map((shipment, index) => (
                <div key={index} className="p-4 border-b last:border-0">
                  <p className="font-bold">{shipment.id}</p>
                  <p className="text-sm text-gray-500">{shipment.from} → {shipment.to}</p>
                  <span className={`mt-2 inline-block px-2 py-1 rounded text-xs ${shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {shipment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransporterDashboard
