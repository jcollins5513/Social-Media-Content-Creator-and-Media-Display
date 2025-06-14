import React from 'react';

/**
 * Skeleton loader component for vehicle detail page during data fetching
 */
const VehicleDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-4"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Image skeleton */}
        <div className="lg:col-span-2">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-300"></div>
          
          {/* Vehicle details skeleton */}
          <div className="mt-6">
            <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                  <div className="h-5 bg-gray-300 rounded w-24"></div>
                </div>
              ))}
            </div>
            
            {/* Features skeleton */}
            <div className="mt-6">
              <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-6 bg-gray-300 rounded w-20"></div>
                ))}
              </div>
            </div>
            
            {/* Description skeleton */}
            <div className="mt-6">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right sidebar skeleton */}
        <div className="mt-6 lg:mt-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            
            {/* Content platforms skeleton */}
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-32 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Email content skeleton */}
            <div className="mt-6">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailSkeleton;
