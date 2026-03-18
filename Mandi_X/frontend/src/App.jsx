import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import ClusterDetail from './pages/ClusterDetail'
import NotFound from './pages/NotFound'
import FarmerDashboard from './pages/farmer/FarmerDashboard'
import AddCrop from './pages/farmer/AddCrop'
import MyCrops from './pages/farmer/MyCrops'
import MarketPrices from './pages/farmer/MarketPrices'
import FarmerOrders from './pages/farmer/FarmerOrders'
import AgentDashboard from './pages/agent/AgentDashboard'
import BuyerDashboard from './pages/buyer/BuyerDashboard'
import TransporterDashboard from './pages/transporter/TransporterDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function ProtectedRoute({ children, allowedRoles }) {
    const { user, token } = useAuthStore()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

function DashboardRouter() {
    const { user } = useAuthStore()

    switch (user?.role) {
        case 'farmer':
            return <FarmerDashboard />
        case 'agent':
            return <AgentDashboard />
        case 'buyer':
            return <BuyerDashboard />
        case 'transporter':
            return <TransporterDashboard />
        case 'admin':
            return <AdminDashboard />
        default:
            return <Navigate to="/" replace />
    }
}

function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/marketplace/:clusterId" element={<ClusterDetail />} />

                    {/* Farmer Routes */}
                    <Route path="/dashboard/farmer" element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                            <FarmerDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard/farmer/add-crop" element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                            <AddCrop />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard/farmer/my-crops" element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                            <MyCrops />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard/farmer/market-prices" element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                            <MarketPrices />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard/farmer/orders" element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                            <FarmerOrders />
                        </ProtectedRoute>
                    } />

                    {/* Agent Routes */}
                    <Route path="/dashboard/agent" element={
                        <ProtectedRoute allowedRoles={['agent']}>
                            <AgentDashboard />
                        </ProtectedRoute>
                    } />

                    {/* Buyer Routes */}
                    <Route path="/dashboard/buyer" element={
                        <ProtectedRoute allowedRoles={['buyer']}>
                            <BuyerDashboard />
                        </ProtectedRoute>
                    } />

                    {/* Transporter Routes */}
                    <Route path="/dashboard/transporter" element={
                        <ProtectedRoute allowedRoles={['transporter']}>
                            <TransporterDashboard />
                        </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/dashboard/admin" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />

                    {/* Legacy route for backward compatibility */}
                    <Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute>
                                <DashboardRouter />
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 Page */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
