import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Page not found</h2>
        <p className="mt-2 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go back home
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm font-medium text-gray-500">Or return to one of these pages:</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link 
            to="/vehicles" 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Vehicles
          </Link>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <Link 
            to="/showroom" 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Showroom
          </Link>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <Link 
            to="/dashboard" 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
