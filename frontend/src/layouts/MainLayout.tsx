import { Outlet, Link } from 'react-router-dom';
import ReadOnlyBanner from '../components/ReadOnlyBanner';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ReadOnlyBanner />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link to="/">Auto Content Creator</Link>
            </h1>
            <nav className="flex space-x-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Vehicles
              </Link>
              <Link 
                to="/showroom" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Showroom
              </Link>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Auto Content Creator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
