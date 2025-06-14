import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

const ShowroomPage = () => {
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [show360, setShow360] = useState(false);
  const [slideInterval, setSlideInterval] = useState<NodeJS.Timeout | null>(null);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  
  const { data: vehicles = [], isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => api.getVehicles().then(res => res.data),
  });

  const currentVehicle = vehicles[currentVehicleIndex];
  const has360Images = currentVehicle?.images?.some((img: string) => 
    img.toLowerCase().includes('360') || 
    img.toLowerCase().includes('pano')
  );

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [slideInterval]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleSlideshow = () => {
    if (isSlideshowActive) {
      if (slideInterval) {
        clearInterval(slideInterval);
        setSlideInterval(null);
      }
    } else {
      const interval = setInterval(() => {
        setCurrentVehicleIndex(prev => (prev + 1) % vehicles.length);
      }, 5000); // Change vehicle every 5 seconds
      setSlideInterval(interval);
    }
    setIsSlideshowActive(!isSlideshowActive);
  };

  const nextVehicle = () => {
    setCurrentVehicleIndex(prev => (prev + 1) % vehicles.length);
  };

  const prevVehicle = () => {
    setCurrentVehicleIndex(prev => (prev - 1 + vehicles.length) % vehicles.length);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || vehicles.length === 0) {
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
              {vehicles.length === 0 ? 'No vehicles found.' : 'Error loading vehicles. Please try again later.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen">
      {/* Vehicle Display */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {currentVehicle?.images?.[0] ? (
          <img
            src={currentVehicle.images[0]}
            alt={`${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}`}
            className={`w-full h-full object-contain ${isFullscreen ? 'object-cover' : 'object-contain'}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900">
            <span className="text-8xl">🚗</span>
          </div>
        )}
        
        {/* Vehicle Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold">
              {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
            </h2>
            <div className="flex items-center mt-2">
              <span className="text-xl font-semibold">
                ${currentVehicle.price?.toLocaleString()}
              </span>
              <span className="mx-2">•</span>
              <span>{currentVehicle.mileage?.toLocaleString()} miles</span>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevVehicle}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous vehicle"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextVehicle}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next vehicle"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {has360Images && (
            <button
              onClick={() => setShow360(!show360)}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
              title={show360 ? 'Exit 360° view' : 'View in 360°'}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          )}
          <button
            onClick={toggleSlideshow}
            className={`bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white ${isSlideshowActive ? 'text-red-400' : ''}`}
            title={isSlideshowActive ? 'Pause slideshow' : 'Start slideshow'}
          >
            {isSlideshowActive ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Vehicle Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {vehicles.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentVehicleIndex(index)}
              className={`h-2 w-2 rounded-full ${index === currentVehicleIndex ? 'bg-white' : 'bg-white bg-opacity-30'}`}
              aria-label={`Go to vehicle ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* 360° Viewer Modal */}
      {show360 && has360Images && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => setShow360(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close 360° viewer"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h3 className="mt-4 text-xl font-medium">360° Viewer</h3>
                <p className="mt-2 text-gray-300">
                  Interactive 360° view would be displayed here.
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  (Integration with a 360° viewer library would go here)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowroomPage;
