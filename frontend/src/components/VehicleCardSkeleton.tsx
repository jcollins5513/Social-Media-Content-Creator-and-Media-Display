import React from 'react';

/**
 * Skeleton loader component for vehicle cards during data fetching
 */
const VehicleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="bg-gray-300 h-48 w-full"></div>
      
      {/* Content placeholder */}
      <div className="p-4">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        
        {/* Price placeholder */}
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
        
        {/* Details placeholders */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
        
        {/* Status badge placeholder */}
        <div className="h-6 bg-gray-300 rounded w-1/3 mt-2"></div>
      </div>
    </div>
  );
};

/**
 * Grid of skeleton loaders for vehicle listing page
 */
export const VehicleCardSkeletonGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <VehicleCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default VehicleCardSkeleton;
