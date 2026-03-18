import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'farmer'
    })
    const { register, isLoading } = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await register(formData)
        if (result.success) {
            toast.success('Registration successful!')
            navigate('/dashboard')
        } else {
            toast.error(result.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary mb-4"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary mb-4"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary mb-4"
                        required
                    />
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-primary mb-6"
                    >
                        <option value="farmer">Farmer</option>
                        <option value="buyer">Buyer</option>
                        <option value="transporter">Transporter</option>
                        <option value="agent">Agent</option>
                    </select>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-agri-primary text-white font-semibold rounded-lg hover:bg-agri-dark transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account? <Link to="/login" className="text-agri-primary font-medium">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
