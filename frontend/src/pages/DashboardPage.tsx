import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch vehicles data
  const { data: vehicles = [], isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => api.getVehicles().then(res => res.data),
  });

  // Calculate dashboard statistics
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v: any) => v.status === 'available').length;
  const featuredVehicles = vehicles.filter((v: any) => v.isFeatured).length;
  const recentVehicles = [...vehicles]
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading dashboard data. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Vehicles */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Vehicles</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{totalVehicles}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Available Vehicles */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Available</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{availableVehicles}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Vehicles */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Featured</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{featuredVehicles}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Content Generated */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Content Generated</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">24</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
        {/* Recent Vehicles */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Vehicles</h3>
              <p className="mt-1 text-sm text-gray-500">
                Recently added or updated vehicles in your inventory.
              </p>
            </div>
            <div className="bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentVehicles.map((vehicle: any) => (
                      <tr key={vehicle.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {vehicle.images?.[0] ? (
                                <img className="h-10 w-10 rounded-md" src={vehicle.images[0]} alt="" />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400">🚗</span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </div>
                              <div className="text-sm text-gray-500">{vehicle.trim || 'Standard'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${vehicle.price?.toLocaleString() || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle.mileage?.toLocaleString()} miles
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            vehicle.status === 'available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {vehicle.status || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href={`/vehicles/${vehicle.id}`} className="text-blue-600 hover:text-blue-900">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              <p className="mt-1 text-sm text-gray-500">
                Common tasks and actions.
              </p>
            </div>
            <div className="px-4 py-5 space-y-4">
              <div>
                <a
                  href="/vehicles/new"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add New Vehicle
                </a>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Generate Content Report
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  View Showroom
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              <p className="mt-1 text-sm text-gray-500">
                Latest changes and updates.
              </p>
            </div>
            <div className="px-4 py-5">
              <div className="flow-root">
                <ul className="-mb-8">
                  {[
                    {
                      id: 1,
                      type: 'create',
                      user: 'John Doe',
                      action: 'added a new vehicle',
                      target: '2023 Toyota Camry',
                      date: '2023-05-15T10:30:00Z',
                      datetime: '2023-05-15',
                      icon: 'plus',
                      iconBackground: 'bg-green-500',
                    },
                    {
                      id: 2,
                      type: 'update',
                      user: 'Jane Smith',
                      action: 'updated',
                      target: 'Honda Civic listing',
                      date: '2023-05-14T14:45:00Z',
                      datetime: '2023-05-14',
                      icon: 'pencil',
                      iconBackground: 'bg-blue-500',
                    },
                    {
                      id: 3,
                      type: 'content',
                      user: 'Alex Johnson',
                      action: 'generated content for',
                      target: 'Ford F-150',
                      date: '2023-05-13T09:20:00Z',
                      datetime: '2023-05-13',
                      icon: 'document-text',
                      iconBackground: 'bg-purple-500',
                    },
                  ].map((activityItem) => (
                    <li key={activityItem.id}>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                activityItem.iconBackground
                              }`}
                            >
                              <svg
                                className="h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                {activityItem.icon === 'plus' && (
                                  <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  />
                                )}
                                {activityItem.icon === 'pencil' && (
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.793.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                )}
                                {activityItem.icon === 'document-text' && (
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                    clipRule="evenodd"
                                  />
                                )}
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {activityItem.user}
                                </span>{' '}
                                {activityItem.action}{' '}
                                <span className="font-medium text-gray-900">
                                  {activityItem.target}
                                </span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={activityItem.datetime}>
                                {new Date(activityItem.date).toLocaleDateString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all activity
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
