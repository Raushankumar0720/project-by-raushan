import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import axiosInstance from '../lib/axiosInstance'
import {
    ArrowRight,
    TrendingUp,
    Shield,
    Truck,
    Users,
    Leaf,
    Store,
    Warehouse,
    Phone,
    Mail,
    MapPin,
    Star,
    Quote,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

const Landing = () => {
    const { user, token } = useAuthStore()
    const [prices, setPrices] = useState([])
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [stats, setStats] = useState([
        { label: 'Farmers', value: '12,000+', icon: Users },
        { label: 'Transactions', value: '₹2.4Cr', icon: TrendingUp },
        { label: 'Clusters', value: '340+', icon: Warehouse },
    ])

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        try {
            const response = await axiosInstance.get('/mandi/prices?crop=tomato&district=Rajkot')
            if (response.data.success) {
                setPrices(response.data.data.prices.slice(0, 10))
            }
        } catch (error) {
            console.error('Error fetching prices:', error)
        }
    }

    const testimonials = [
        {
            name: 'Rameshbhai Patel',
            role: 'Farmer from Rajkot',
            quote: 'MandiX helped me get 30% better prices for my wheat. The cluster system connected me directly with buyers without any middleman.',
            rating: 5
        },
        {
            name: 'Suresh Kumar',
            role: 'Wholesaler from Ahmedabad',
            quote: 'Fresh produce directly from farmers. The quality is excellent and prices are competitive. Highly recommended!',
            rating: 5
        },
        {
            name: 'Vijay Transport',
            role: 'Transporter Partner',
            quote: 'Good business opportunities. The app makes it easy to find nearby transport jobs and manage deliveries.',
            rating: 4
        }
    ]

    const howItWorks = [
        {
            step: 1,
            title: 'Farmer Lists Crop',
            description: 'Farmers list their produce with quantity, price, and location details.',
            icon: Leaf,
            color: 'bg-green-500'
        },
        {
            step: 2,
            title: 'System Clusters',
            description: 'Nearby farmers with similar crops are grouped into clusters for bulk orders.',
            icon: Warehouse,
            color: 'bg-emerald-500'
        },
        {
            step: 3,
            title: 'Buyer Purchases',
            description: 'Buyers browse clusters and place orders for fresh produce.',
            icon: Store,
            color: 'bg-teal-500'
        },
        {
            step: 4,
            title: 'Transport Delivers',
            description: 'Transporters pick up and deliver fresh produce to buyers.',
            icon: Truck,
            color: 'bg-cyan-500'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white space-y-8">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                <span className="text-sm font-medium">Trusted by 12,000+ Farmers</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Connecting Farmers
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                                    Directly With Buyers
                                </span>
                            </h1>

                            <p className="text-xl text-green-100 max-w-xl">
                                Eliminate middlemen. Get better prices. Sell your produce directly to restaurants, wholesalers, and supermarkets across Gujarat.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {!token && (
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        Start Selling
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                )}
                                <Link
                                    to="/marketplace"
                                    className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 transition-all duration-300 border-2 border-green-400"
                                >
                                    Explore Marketplace
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-green-200">4.9/5 from 2,000+ reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Illustration */}
                        <div className="hidden lg:block relative">
                            <div className="relative w-full aspect-square">
                                <div className="absolute inset-10 bg-white/10 rounded-full backdrop-blur-sm"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl">
                                        <Leaf className="w-20 h-20 text-white" />
                                    </div>
                                </div>
                                <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-green-200">Price Increase</p>
                                            <p className="font-bold text-white">+30%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-20 left-0 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-green-200">Active Farmers</p>
                                            <p className="font-bold text-white">12,000+</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 right-10 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-green-200">Secure</p>
                                            <p className="font-bold text-white">Payments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</p>
                                <p className="text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mandi Price Ticker */}
            <section className="py-8 bg-gradient-to-r from-green-600 to-emerald-700 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-white font-semibold">Todays Prices:</span>
                    </div>
                    <div className="flex animate-marquee gap-8">
                        {prices.map((price, index) => (
                            <div key={index} className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                                <span className="text-white font-medium">{price.cropName}</span>
                                <span className="text-green-200 ml-2">₹{price.modalPrice}/quintal</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">How It Works</span>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple Steps to Trade</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our platform connects farmers directly with buyers through an intelligent clustering system
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {howItWorks.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <ArrowRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Better Prices</h3>
                            <p className="text-gray-600">Get 20-40% better prices by eliminating middlemen and selling directly to buyers</p>
                        </div>
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Payments</h3>
                            <p className="text-gray-600">Escrow-based payment system ensures secure transactions for both parties</p>
                        </div>
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Truck className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Delivery</h3>
                            <p className="text-gray-600">Real-time tracking and reliable transporters ensure timely delivery</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">Testimonials</span>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <Quote className="w-12 h-12 text-green-500 mb-6" />
                            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                                "{testimonials[currentTestimonial].quote}"
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {testimonials[currentTestimonial].name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{testimonials[currentTestimonial].name}</p>
                                        <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Grow Smarter?</h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join thousands of farmers, buyers, and transporters already using MandiX
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
                        >
                            Get Started Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            to="/marketplace"
                            className="inline-flex items-center px-8 py-4 bg-green-700 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300 border-2 border-green-400"
                        >
                            Browse Marketplace
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">Mandi<span className="text-green-500">X</span></span>
                            </div>
                            <p className="text-gray-400">Connecting farmers directly with buyers. Better prices, secure payments, faster delivery.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link to="/marketplace" className="hover:text-green-400 transition-colors">Marketplace</Link></li>
                                <li><Link to="/register" className="hover:text-green-400 transition-colors">Register as Farmer</Link></li>
                                <li><Link to="/register" className="hover:text-green-400 transition-colors">Register as Buyer</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>support@mandix.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Rajkot, Gujarat</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p>© 2024 MandiX. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing
