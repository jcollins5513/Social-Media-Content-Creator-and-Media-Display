import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Vehicle } from '../types/Vehicle';
import { is360Image } from '../utils/media.utils';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${color} rounded-md p-3`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-2xl font-semibold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const VehicleInventoryTable = ({ vehicles }: { vehicles: Vehicle[] }) => (
  <div className="-mx-4 mt-8 sm:-mx-0">
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Vehicle</th>
          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">VIN</th>
          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Price</th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Posted</th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {vehicles.map((vehicle) => {
          const has360 = vehicle.images.some(is360Image);
          return (
            <tr key={vehicle.id}>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-md object-cover" src={vehicle.images[0] || 'https://via.placeholder.com/150'} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                    <div className="mt-1 text-gray-500 flex items-center">
                      {has360 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 002-2v-1a2 2 0 012-2h1.945a8.003 8.003 0 00-10.89 0zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12A6 6 0 0110 4zm0 2a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                      )}
                      {vehicle.color || 'Color N/A'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{vehicle.vin || 'N/A'}</td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{vehicle.price ? `$${vehicle.price.toLocaleString()}` : 'N/A'}</td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  vehicle.status === 'available' ? 'bg-green-100 text-green-800' : 
                  vehicle.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {vehicle.lastFacebookPostDate ? new Date(vehicle.lastFacebookPostDate).toLocaleDateString() : 'Never'}
              </td>
              <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <Link to={`/vehicles/${vehicle.id}`} className="text-blue-600 hover:text-blue-900">
                  View<span className="sr-only">, {vehicle.make} {vehicle.model}</span>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const DashboardOverview = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.status === 'available').length;
  const soldVehicles = vehicles.filter((v) => v.status === 'sold').length;
  const pendingVehicles = vehicles.filter((v) => v.status === 'pending').length;

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Vehicles" value={totalVehicles} color="bg-blue-500" icon={<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
        <StatCard title="Available" value={availableVehicles} color="bg-green-500" icon={<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Pending Sale" value={pendingVehicles} color="bg-yellow-500" icon={<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Sold" value={soldVehicles} color="bg-red-500" icon={<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6.364-8.364l-1.414 1.414M20.364 6.636l-1.414 1.414M21 12h-2M4 12H2M15.636 17.364l-1.414-1.414M8.364 8.364L6.95 6.95M12 5V3" /></svg>} />
      </div>
      {/* Add more overview components here if needed, like charts or recent activity */}
    </div>
  );
};

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const { data, isLoading, error, refetch } = useQuery<Vehicle[], Error>({
    queryKey: ['vehicles'],
    queryFn: () => api.getVehicles().then(res => res.data),
  });

  const vehicles = data || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <p className="text-red-700">Error loading dashboard data: {error.message}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong in the dashboard.</div>}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Data
          </button>
        </div>

        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setActiveTab(e.target.value)}
              value={activeTab}
            >
              <option value="overview">Overview</option>
              <option value="inventory">Inventory</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`${activeTab === 'inventory' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Inventory
                </button>
              </nav>
            </div>
          </div>
        </div>

        {activeTab === 'overview' && <DashboardOverview vehicles={vehicles} />}
        {activeTab === 'inventory' && <VehicleInventoryTable vehicles={vehicles} />}

      </div>
    </ErrorBoundary>
  );
};

export default DashboardPage;
