import { Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import VehicleListPage from './pages/VehicleListPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import ShowroomPage from './pages/ShowroomPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Application Error</h2>
            <p className="text-gray-700 mb-4">
              We're sorry, but something went wrong. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <VehicleListPage />
                    </Suspense>
                  </ErrorBoundary>
                } />
                <Route path="vehicles">
                  <Route index element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <VehicleListPage />
                      </Suspense>
                    </ErrorBoundary>
                  } />
                  <Route path=":id" element={
                    <ErrorBoundary>
                      <Suspense fallback={<LoadingSpinner />}>
                        <VehicleDetailPage />
                      </Suspense>
                    </ErrorBoundary>
                  } />
                </Route>
                <Route path="showroom" element={
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <ShowroomPage />
                    </Suspense>
                  </ErrorBoundary>
                } />
                <Route path="dashboard" element={
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardPage />
                    </Suspense>
                  </ErrorBoundary>
                } />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
