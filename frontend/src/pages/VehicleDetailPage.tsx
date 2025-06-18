import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useState } from 'react';
import { exportToTextFile, exportToMarkdown, exportToHTML } from '../utils/exportUtils';
import Panorama360Viewer from '../components/Panorama360Viewer';
import VehicleDetailSkeleton from '../components/VehicleDetailSkeleton';
import type { Vehicle, VehicleContent } from '../types/Vehicle';

const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('details');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<VehicleContent>({});
  const [selectedTemplate, setSelectedTemplate] = useState('manager-special');

  const { data: vehicle, isLoading, error } = useQuery<Vehicle>({
    queryKey: ['vehicle', id],
    queryFn: () => api.getVehicleById(id!).then(res => res.data),
    enabled: !!id,
  });

  const handleGenerateContent = async (type: string) => {
    if (!id) return;
    
    try {
      setIsGenerating(true);
      let content = '';
      
      if (type === 'email') {
        const response = await api.generateEmailContent(id, selectedTemplate);
        content = response.data.content;
      } else {
        const response = await api.generateContent(id);
        content = response.data[type] || 'No content generated';
      }
      
      setGeneratedContent(prev => ({
        ...prev,
        [type]: content
      }));
      
      // Switch to the content tab
      setActiveTab('content');
    } catch (err) {
      console.error('Error generating content:', err);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAllContent = async () => {
    if (!id) return;

    try {
      setIsGenerating(true);
      const response = await api.generateAllContent(id, selectedTemplate);
      const content = response.data.data.generatedContent || {};
      setGeneratedContent({
        facebook: content.facebook || '',
        instagram: content.instagram || '',
        twitter: content.x || '',
        youtube: content.youtubeScript || '',
        email: JSON.stringify(content.email, null, 2) || '',
      });
      setActiveTab('content');
    } catch (err) {
      console.error('Error generating all content:', err);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return <VehicleDetailSkeleton />;
  }

  if (error || !vehicle) {
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
              Error loading vehicle details. Please try again.
            </p>
            <button
              onClick={() => navigate('/vehicles')}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Back to vehicles
            </button>
          </div>
        </div>
      </div>
    );
  }

  const has360Images = vehicle.images?.some((img: string) => 
    img.toLowerCase().includes('360') || 
    img.toLowerCase().includes('pano')
  );

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-0">
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <Link 
            to="/vehicles" 
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <svg
              className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </Link>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link to="/vehicles" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  Vehicles
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">
        <div className="lg:col-span-2">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            {vehicle.images?.[0] ? (
              <img
                src={vehicle.images[0]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-4xl">🚗</span>
              </div>
            )}
          </div>
          
          {has360Images && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">360° View</h3>
              <Panorama360Viewer 
                images={vehicle.images || []} 
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
              />
            </div>
          )}
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Make</h3>
                <p className="mt-1 text-sm text-gray-900">{vehicle.make}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Model</h3>
                <p className="mt-1 text-sm text-gray-900">{vehicle.model}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Year</h3>
                <p className="mt-1 text-sm text-gray-900">{vehicle.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Trim</h3>
                <p className="mt-1 text-sm text-gray-900">{vehicle.trim || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {vehicle.price ? `$${vehicle.price.toLocaleString()}` : 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Mileage</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} miles` : 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vehicle.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vehicle.status || 'N/A'}
                </span>
              </div>
            </div>
            
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Features</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {vehicle.features.map((feature: string, index: number) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {vehicle.description && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 lg:mt-0 md:mt-4 sm:mt-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Content Generation
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Generate platform-specific content for this vehicle.
              </p>
            </div>
            
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'content'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Generated Content
                </button>
              </nav>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
                {activeTab === 'details' ? (
                <div className="space-y-4">
                  <div>
                    <button
                      onClick={handleGenerateAllContent}
                      disabled={isGenerating}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? 'Generating...' : 'Generate All Content'}
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Social Media Content</h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <button
                        onClick={() => handleGenerateContent('facebook')}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? 'Generating...' : 'Facebook'}
                      </button>
                      <button
                        onClick={() => handleGenerateContent('instagram')}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? 'Generating...' : 'Instagram'}
                      </button>
                      <button
                        onClick={() => handleGenerateContent('twitter')}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? 'Generating...' : 'Twitter'}
                      </button>
                      <button
                        onClick={() => handleGenerateContent('youtube')}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? 'Generating...' : 'YouTube'}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Email Content</h4>
                    <div className="flex space-x-2">
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        title="Email template selection"
                        aria-label="Select email template"
                      >
                        <option value="manager-special">Manager's Special</option>
                        <option value="holiday-sale">Holiday Sale</option>
                        <option value="new-arrival">New Arrival</option>
                      </select>
                      <button
                        onClick={() => handleGenerateContent('email')}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? 'Generating...' : 'Generate Email'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.keys(generatedContent).length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No content generated yet. Select a platform and click "Generate" to create content.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(generatedContent).map(([platform, content]) => (
                        <div key={platform} className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-gray-700 capitalize">
                              {platform === 'youtube' ? 'YouTube' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(content);
                                  // Show feedback (could use a toast library in real app)
                                  alert('Copied to clipboard!');
                                }}
                                className="text-gray-400 hover:text-gray-500"
                                title="Copy to clipboard"
                              >
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                              </button>
                              <div className="relative inline-block text-left">
                                <div>
                                  <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500 flex items-center"
                                    id={`export-menu-${platform}`}
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    title="Export options"
                                    onClick={() => {
                                      // Toggle dropdown menu for export options
                                      const exportMenu = document.getElementById(`export-dropdown-${platform}`);
                                      if (exportMenu) {
                                        exportMenu.classList.toggle('hidden');
                                      }
                                    }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                                <div 
                                  id={`export-dropdown-${platform}`} 
                                  className="hidden absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                                  role="menu" 
                                  aria-orientation="vertical" 
                                  aria-labelledby={`export-menu-${platform}`} 
                                  tabIndex={-1}
                                >
                                  <div className="py-1" role="none">
                                    <button
                                      onClick={() => {
                                        exportToTextFile(content, `${vehicle.make}-${vehicle.model}-${platform}.txt`);
                                        document.getElementById(`export-dropdown-${platform}`)?.classList.toggle('hidden');
                                      }}
                                      className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                      role="menuitem"
                                      tabIndex={-1}
                                    >
                                      Export as .txt
                                    </button>
                                    <button
                                      onClick={() => {
                                        exportToMarkdown(content, `${vehicle.make}-${vehicle.model}-${platform}.md`);
                                        document.getElementById(`export-dropdown-${platform}`)?.classList.toggle('hidden');
                                      }}
                                      className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                      role="menuitem"
                                      tabIndex={-1}
                                    >
                                      Export as .md
                                    </button>
                                    <button
                                      onClick={() => {
                                        const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${platform.charAt(0).toUpperCase() + platform.slice(1)} Content`;
                                        exportToHTML(content, title, `${vehicle.make}-${vehicle.model}-${platform}`);
                                        document.getElementById(`export-dropdown-${platform}`)?.classList.toggle('hidden');
                                      }}
                                      className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                      role="menuitem"
                                      tabIndex={-1}
                                    >
                                      Export as .html
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-700 whitespace-pre-line bg-white p-3 rounded border border-gray-200">
                            {content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
