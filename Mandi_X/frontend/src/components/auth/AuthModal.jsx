import { useState, useEffect } from 'react'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode)

    // Login state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [loginLoading, setLoginLoading] = useState(false)

    // Register state - Full fields like original RegisterModal
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'farmer',
        district: '',
        state: ''
    })
    const [registerError, setRegisterError] = useState('')
    const [registerLoading, setRegisterLoading] = useState(false)

    const { login, register } = useAuthStore()

    // Reset form when modal closes/reopens
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode)
            // Clear all form fields when modal opens
            setEmail('')
            setPassword('')
            setRegisterData({
                name: '',
                email: '',
                password: '',
                phone: '',
                role: 'farmer',
                district: '',
                state: ''
            })
            setLoginError('')
            setRegisterError('')
        }
    }, [isOpen, initialMode])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginError('')
        setLoginLoading(true)

        try {
            const result = await login({ email, password })
            if (result.success) {
                onClose()
                window.location.href = `/dashboard/${result.user.role}`
            } else {
                setLoginError(result.message || 'Login failed')
            }
        } catch (err) {
            setLoginError(err.response?.data?.message || 'An error occurred')
        } finally {
            setLoginLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setRegisterError('')
        setRegisterLoading(true)

        try {
            const result = await register(registerData)
            if (result.success) {
                onClose()
                window.location.href = `/dashboard/${registerData.role}`
            } else {
                setRegisterError(result.message || 'Registration failed')
            }
        } catch (err) {
            setRegisterError(err.response?.data?.message || 'An error occurred')
        } finally {
            setRegisterLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Main Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[900px] min-h-[550px] overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-30 bg-white/80 p-2 rounded-full hover:bg-white transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Sliding Overlay Panel */}
                <div
                    className="absolute top-0 left-0 w-1/2 h-full z-20 bg-gradient-to-br from-agri-primary via-agri-primary to-green-600 flex flex-col items-center justify-center p-8 text-center text-white transition-transform duration-500 ease-in-out"
                    style={{
                        transform: mode === 'login' ? 'translateX(0%)' : 'translateX(100%)',
                    }}
                >
                    <div className="animate-fade-in" key={mode}>
                        {mode === 'login' ? (
                            <>
                                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                                <p className="text-lg mb-8 opacity-90 max-w-[280px]">To keep connected with us please login with your personal info</p>
                                <button
                                    onClick={() => setMode('register')}
                                    className="px-10 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-agri-primary transition-all duration-300"
                                >
                                    SIGN UP
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                                <p className="text-lg mb-8 opacity-90 max-w-[280px]">Enter your personal details and start journey with us</p>
                                <button
                                    onClick={() => setMode('login')}
                                    className="px-10 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-agri-primary transition-all duration-300"
                                >
                                    SIGN IN
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Form Panels */}
                <div
                    className="absolute top-0 right-0 w-1/2 h-full z-10 bg-white flex flex-col items-center justify-center transition-transform duration-500 ease-in-out"
                    style={{
                        transform: mode === 'login' ? 'translateX(0%)' : 'translateX(-100%)',
                    }}
                >
                    {/* Login Form */}
                    <div className={`w-full max-w-[320px] px-6 transition-opacity duration-300 ${mode === 'login' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                        <p className="text-gray-500 mb-6">Enter your details below</p>

                        {loginError && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                {loginError}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                placeholder="Enter your email"
                                required
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary pr-12"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full py-3 bg-agri-primary text-white font-semibold rounded-lg hover:bg-agri-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loginLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-gray-600 text-center">
                                Don't have an account?{' '}
                                <button
                                    onClick={() => setMode('register')}
                                    className="text-agri-primary font-semibold hover:underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Register Form */}
                    <div className={`w-full max-w-[320px] px-6 absolute transition-opacity duration-300 ${mode === 'register' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                        <p className="text-gray-500 mb-6">Join AgriLink today</p>

                        {registerError && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                {registerError}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-3">
                            <input
                                type="text"
                                autoComplete="off"
                                value={registerData.name}
                                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                placeholder="Full Name"
                                required
                            />
                            <input
                                type="email"
                                autoComplete="off"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                placeholder="Enter your email"
                                required
                            />
                            <input
                                type="password"
                                autoComplete="off"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                placeholder="Create a password"
                                required
                                minLength={6}
                            />
                            <input
                                type="tel"
                                autoComplete="off"
                                value={registerData.phone}
                                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                placeholder="Phone Number"
                                required
                            />
                            <select
                                value={registerData.role}
                                onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                            >
                                <option value="farmer">Farmer</option>
                                <option value="buyer">Buyer</option>
                                <option value="agent">Agent</option>
                                <option value="transporter">Transporter</option>
                            </select>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    value={registerData.district}
                                    onChange={(e) => setRegisterData({ ...registerData, district: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                    placeholder="District"
                                    required
                                />
                                <input
                                    type="text"
                                    autoComplete="off"
                                    value={registerData.state}
                                    onChange={(e) => setRegisterData({ ...registerData, state: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary"
                                    placeholder="State"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={registerLoading}
                                className="w-full py-3 bg-agri-primary text-white font-semibold rounded-lg hover:bg-agri-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                            >
                                {registerLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="mt-5 pt-4 border-t border-gray-100">
                            <p className="text-gray-600 text-center">
                                Already have an account?{' '}
                                <button
                                    onClick={() => setMode('login')}
                                    className="text-agri-primary font-semibold hover:underline"
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    )
}

export default AuthModal
