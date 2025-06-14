import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainLayout from './layouts/MainLayout';

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<VehicleListPage />} />
              <Route path="vehicles">
                <Route index element={<VehicleListPage />} />
                <Route path=":id" element={<VehicleDetailPage />} />
              </Route>
              <Route path="showroom" element={<ShowroomPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
