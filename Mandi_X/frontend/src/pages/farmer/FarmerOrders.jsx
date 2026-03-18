import { useState } from 'react'
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'

const FarmerOrders = () => {
    const [orders] = useState([
        {
            _id: 'ORD001',
            cropName: 'Tomato',
            quantityKg: 500,
            pricePerKg: 25,
            totalAmount: 12500,
            status: 'confirmed',
            buyerName: 'Bharat Supermart',
            date: '2024-03-10',
            shipment: {
                status: 'picked_up',
                transporter: 'Ravi Transport',
                vehicleNumber: 'GJ-15-AB-1234',
            }
        },
        {
            _id: 'ORD002',
            cropName: 'Onion',
            quantityKg: 300,
            pricePerKg: 18,
            totalAmount: 5400,
            status: 'pending',
            buyerName: 'Fresh Veggies Co.',
            date: '2024-03-12',
            shipment: null
        },
        {
            _id: 'ORD003',
            cropName: 'Potato',
            quantityKg: 1000,
            pricePerKg: 15,
            totalAmount: 15000,
            status: 'delivered',
            buyerName: 'Gujarat Hotels Ltd.',
            date: '2024-03-05',
            shipment: {
                status: 'delivered',
                transporter: 'Fast Delivery',
                vehicleNumber: 'GJ-18-XY-5678',
            }
        },
    ])

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'confirmed': return <Package className="w-5 h-5 text-blue-500" />
            case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />
            default: return <Truck className="w-5 h-5 text-gray-500" />
        }
    }

    const getStatusSteps = (status) => {
        const steps = ['pending', 'confirmed', 'shipped', 'delivered']
        const currentIndex = steps.indexOf(status)
        return steps.map((step, index) => ({
            name: step,
            completed: index <= currentIndex,
            current: index === currentIndex,
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-8">
                <Link
                    to="/dashboard/farmer"
                    className="inline-flex items-center text-gray-600 hover:text-agri-primary mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <h1 className="text-2xl font-bold mb-6">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => {
                        const statusSteps = getStatusSteps(order.status)

                        return (
                            <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                {/* Header */}
                                <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">{order.cropName}</h3>
                                        <p className="text-sm text-gray-500">Order #{order._id} • {new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-agri-primary">₹{order.totalAmount}</p>
                                        <p className="text-sm text-gray-500">{order.quantityKg} kg × ₹{order.pricePerKg}/kg</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Order Details */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Buyer</p>
                                            <p className="font-medium">{order.buyerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Status</p>
                                            <div className="flex items-center gap-2 capitalize">
                                                {getStatusIcon(order.status)}
                                                <span className="font-medium">{order.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipment Tracker */}
                                    {order.shipment && (
                                        <div className="border-t pt-6">
                                            <h4 className="font-medium mb-4">Shipment Tracking</h4>

                                            {/* Progress Steps */}
                                            <div className="flex items-center justify-between mb-6">
                                                {statusSteps.map((step, index) => (
                                                    <div key={step.name} className="flex items-center">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-agri-primary text-white' : 'bg-gray-200 text-gray-500'
                                                            }`}>
                                                            {step.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
                                                        </div>
                                                        <span className={`ml-2 text-sm capitalize ${step.current ? 'font-medium' : 'text-gray-500'}`}>
                                                            {step.name}
                                                        </span>
                                                        {index < statusSteps.length - 1 && (
                                                            <div className={`w-16 md:w-24 h-0.5 mx-2 ${step.completed ? 'bg-agri-primary' : 'bg-gray-200'
                                                                }`} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Transporter Info */}
                                            {order.shipment.transporter && (
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex items-center gap-4">
                                                        <Truck className="w-8 h-8 text-gray-400" />
                                                        <div>
                                                            <p className="font-medium">{order.shipment.transporter}</p>
                                                            <p className="text-sm text-gray-500">{order.shipment.vehicleNumber}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FarmerOrders
