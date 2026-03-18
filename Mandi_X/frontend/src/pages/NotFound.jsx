import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
          <p className="text-gray-500 mt-2 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-agri-primary text-white font-semibold rounded-lg hover:bg-agri-dark transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Take Me Home
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-agri-primary text-agri-primary font-semibold rounded-lg hover:bg-agri-primary hover:text-white transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
