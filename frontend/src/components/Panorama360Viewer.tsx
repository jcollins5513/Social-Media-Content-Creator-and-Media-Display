import { useState, useEffect, useRef } from 'react';

interface Panorama360ViewerProps {
  images: string[];
  alt: string;
}

/**
 * A component that allows users to view 360° panoramic images of vehicles
 */
const Panorama360Viewer: React.FC<Panorama360ViewerProps> = ({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  
  // Filter images to only include those with 360 or pano in the name
  const panoramaImages = images.filter(
    (img) => img.toLowerCase().includes('360') || img.toLowerCase().includes('pano')
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const sensitivity = 5; // Adjust sensitivity as needed
    
    if (Math.abs(deltaX) > sensitivity) {
      // Determine direction
      if (deltaX > 0) {
        // Move right (previous image)
        setCurrentImageIndex((prevIndex) => 
          prevIndex === 0 ? panoramaImages.length - 1 : prevIndex - 1
        );
      } else {
        // Move left (next image)
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % panoramaImages.length
        );
      }
      
      // Reset start position
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 5; // Adjust sensitivity as needed
    
    if (Math.abs(deltaX) > sensitivity) {
      // Determine direction
      if (deltaX > 0) {
        // Move right (previous image)
        setCurrentImageIndex((prevIndex) => 
          prevIndex === 0 ? panoramaImages.length - 1 : prevIndex - 1
        );
      } else {
        // Move left (next image)
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % panoramaImages.length
        );
      }
      
      // Reset start position
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Left and right arrow buttons for navigation
  const navigatePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? panoramaImages.length - 1 : prevIndex - 1
    );
  };

  const navigateNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % panoramaImages.length
    );
  };



  // Cleanup event listeners on unmount
  useEffect(() => {
    const viewer = viewerRef.current;
    
    if (viewer) {
      const handleMouseLeave = () => {
        setIsDragging(false);
      };
      
      viewer.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        viewer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // If no panorama images are found, return null
  if (panoramaImages.length === 0) return null;
  
  return (
    <div className="relative">
      <div 
        ref={viewerRef}
        className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-100 relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={panoramaImages[currentImageIndex]}
          alt={`${alt} - 360° view ${currentImageIndex + 1}/${panoramaImages.length}`}
          className="h-full w-full object-cover object-center"
        />
        
        {/* Overlay instructions */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-white text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Drag to rotate
            </div>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          type="button"
          className="bg-gray-800 bg-opacity-50 rounded-r-md p-2 text-white hover:bg-opacity-75 focus:outline-none"
          onClick={navigatePrevious}
          aria-label="Previous view"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          className="bg-gray-800 bg-opacity-50 rounded-l-md p-2 text-white hover:bg-opacity-75 focus:outline-none"
          onClick={navigateNext}
          aria-label="Next view"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center">
        <div className="bg-black bg-opacity-50 px-2 py-1 rounded text-white text-xs">
          {currentImageIndex + 1} / {panoramaImages.length}
        </div>
      </div>
    </div>
  );
};

export default Panorama360Viewer;
