'use client';

import { useState, useRef } from 'react';
import { ArrowDownTrayIcon, PhotoIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';

export default function HeicToJpegConverter() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState(0.9);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif'))) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif'))) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const convertHeicToJpeg = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setError(null);
    
    try {
      // Note: HEIC is not natively supported by browsers
      // In a real implementation, you would need to use a library like heic2any
      // For now, we'll show an informative message
      
      setError("HEIC conversion requires additional libraries that aren't loaded in this demo. In a production app, you would use libraries like 'heic2any' to handle HEIC files.");
      setIsConverting(false);
      
      // Example of how it would work with heic2any:
      /*
      const heic2any = (await import('heic2any')).default;
      const jpegBlob = await heic2any({
        blob: selectedFile,
        toType: "image/jpeg",
        quality: quality
      });
      
      const jpegUrl = URL.createObjectURL(jpegBlob as Blob);
      setConvertedImageUrl(jpegUrl);
      */
      
    } catch (error) {
      console.error('Conversion failed:', error);
      setError('Conversion failed. Please try again.');
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.download = selectedFile.name.replace(/\.(heic|heif)$/i, '.jpg');
    link.href = convertedImageUrl;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setConvertedImageUrl(null);
    setIsConverting(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            HEIC to JPEG Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert Apple HEIC/HEIF images to JPEG format for universal compatibility.
            Perfect for sharing iOS photos on any device or platform.
          </p>
        </div>

        {/* Top Banner Ad */}
        <AdBanner slot={AD_SLOTS.TOOL_TOP_BANNER} size="large" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Browser Compatibility Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-8">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Browser Limitation Notice
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    HEIC files require additional libraries for browser-based conversion. This demo shows the interface design. 
                    For a working version, integrate libraries like <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">heic2any</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Tool */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              {!selectedFile ? (
                /* Upload Area */
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    dragActive
                      ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Drop your HEIC file here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    or click to browse and select a HEIC/HEIF image from your device
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".heic,.heif,image/heic,image/heif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Choose HEIC File
                  </button>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Supports: HEIC and HEIF files up to 50MB
                  </p>
                </div>
              ) : (
                /* Conversion Interface */
                <div className="space-y-8">
                  {/* File Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Selected File</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={reset}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quality Slider */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      JPEG Quality: {Math.round(quality * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </div>
                  </div>

                  {/* Convert Button */}
                  <button
                    onClick={convertHeicToJpeg}
                    disabled={isConverting}
                    className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConverting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Converting...
                      </>
                    ) : (
                      'Convert to JPEG'
                    )}
                  </button>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                        ⚠️ Conversion Note
                      </h3>
                      <p className="text-red-700 dark:text-red-300">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Result (for when it works) */}
                  {convertedImageUrl && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                        ✅ Conversion Complete!
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium text-green-900 dark:text-green-100">
                            {selectedFile.name.replace(/\.(heic|heif)$/i, '.jpg')}
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            Ready for download
                          </p>
                        </div>
                        
                        <button
                          onClick={downloadImage}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                          Download JPEG
                        </button>
                      </div>
                      
                      <img
                        src={convertedImageUrl}
                        alt="Converted JPEG"
                        className="max-w-full h-auto rounded-lg border border-green-200 dark:border-green-700"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About HEIC Format
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Apple's default photo format since iOS 11</li>
                  <li>• Better compression than JPEG</li>
                  <li>• Limited compatibility outside Apple devices</li>
                  <li>• Converting to JPEG ensures universal support</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Implementation Notes
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Requires heic2any or similar library</li>
                  <li>• Processing happens in your browser</li>
                  <li>• No server upload required</li>
                  <li>• Maintains image quality and metadata</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdSidebar slot={AD_SLOTS.TOOL_SIDEBAR} className="mb-8" />
          </div>
        </div>

        {/* Bottom Banner Ad */}
        <AdBanner slot={AD_SLOTS.TOOL_BOTTOM_BANNER} size="large" className="mt-12" />
      </div>
    </div>
  );
}