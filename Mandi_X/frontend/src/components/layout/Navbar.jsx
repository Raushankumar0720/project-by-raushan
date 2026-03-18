import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Menu, X, Leaf, TrendingUp, Users, Truck, ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { user, token, logout } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
        setShowUserMenu(false)
    }

    const getDashboardLink = () => {
        if (!user) return '/login'
        switch (user.role) {
            case 'farmer': return '/farmer/dashboard'
            case 'agent': return '/agent/dashboard'
            case 'buyer': return '/buyer/dashboard'
            case 'transporter': return '/transporter/dashboard'
            case 'admin': return '/admin/dashboard'
            default: return '/'
        }
    }

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'About', href: '#about' },
    ]

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <Leaf className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-2.5 h-2.5 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-green-800' : 'text-white'
                                }`}>
                                Mandi<span className="text-green-500">X</span>
                            </span>
                            <span className={`text-xs tracking-wider ${isScrolled ? 'text-gray-500' : 'text-green-100'
                                }`}>
                                FARM TO MARKET
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-sm font-medium hover:text-green-500 transition-colors relative group ${isScrolled ? 'text-gray-700' : 'text-white'
                                    }`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons / User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {token ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                        </div>
                                        <Link
                                            to={getDashboardLink()}
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link
                                            to="/marketplace"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            <span>Marketplace</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${isScrolled
                                            ? 'text-gray-700 hover:bg-gray-100'
                                            : 'text-white hover:bg-white/10'
                                        }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-slide-in-down">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 rounded-lg"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-100 space-y-3">
                            {token ? (
                                <>
                                    <Link
                                        to={getDashboardLink()}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 text-center text-gray-700 font-medium border border-gray-200 rounded-lg"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 text-center bg-green-600 text-white font-medium rounded-lg"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
