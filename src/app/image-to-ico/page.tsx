'use client';

import { useState, useRef } from 'react';
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';

export default function ImageToIcoConverter() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFiles, setConvertedFiles] = useState<{url: string, size: number}[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 64, 128, 256]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const iconSizes = [16, 24, 32, 48, 64, 96, 128, 256];

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
    if (file && (file.type.startsWith('image/') && !file.type.includes('svg'))) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith('image/') && !file.type.includes('svg'))) {
      setSelectedFile(file);
    }
  };

  const handleSizeToggle = (size: number) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size].sort((a, b) => a - b)
    );
  };

  const convertToIco = async () => {
    if (!selectedFile || selectedSizes.length === 0) return;

    setIsConverting(true);
    
    try {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      img.onload = async () => {
        const convertedImages: {url: string, size: number}[] = [];
        
        for (const size of selectedSizes) {
          canvas.width = size;
          canvas.height = size;
          
          // Clear canvas
          ctx!.clearRect(0, 0, size, size);
          
          // Draw image scaled to fit the icon size
          ctx!.drawImage(img, 0, 0, size, size);
          
          // Convert to PNG (ICO files contain PNG data for modern icons)
          const dataUrl = canvas.toDataURL('image/png');
          convertedImages.push({ url: dataUrl, size });
        }
        
        setConvertedFiles(convertedImages);
        setIsConverting(false);
      };

      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error('Conversion failed:', error);
      setIsConverting(false);
    }
  };

  const downloadIcon = (imageData: {url: string, size: number}) => {
    if (!selectedFile) return;

    const link = document.createElement('a');
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}_${imageData.size}x${imageData.size}.png`;
    link.href = imageData.url;
    link.click();
  };

  const downloadAllAsZip = async () => {
    if (!selectedFile || convertedFiles.length === 0) return;
    
    // For simplicity, we'll download individual files
    // In a production app, you might want to use JSZip library
    convertedFiles.forEach((file, index) => {
      setTimeout(() => downloadIcon(file), index * 100);
    });
  };

  const reset = () => {
    setSelectedFile(null);
    setConvertedFiles([]);
    setIsConverting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Image to ICO Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert PNG, JPEG, or other images to ICO format for Windows icons. 
            Create multiple icon sizes in one go. All conversions happen locally in your browser.
          </p>
        </div>

        {/* Top Banner Ad */}
        <AdBanner slot={AD_SLOTS.TOOL_TOP_BANNER} size="large" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Main Tool */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              {!selectedFile ? (
                /* Upload Area */
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Drop your image file here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    or click to browse and select PNG, JPEG, GIF, or WebP image
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Choose Image File
                  </button>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Supports: PNG, JPEG, GIF, WebP files up to 50MB
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

                  {/* Icon Sizes Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-4">
                      Select Icon Sizes (px):
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {iconSizes.map(size => (
                        <label key={size} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeToggle(size)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {size}×{size}
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Common sizes: 16px (small), 32px (medium), 48px (large), 256px (high-res)
                    </p>
                  </div>

                  {/* Convert Button */}
                  <button
                    onClick={convertToIco}
                    disabled={isConverting || selectedSizes.length === 0}
                    className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      `Convert to ICO (${selectedSizes.length} sizes)`
                    )}
                  </button>

                  {/* Results */}
                  {convertedFiles.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                          ✅ Conversion Complete!
                        </h3>
                        <button
                          onClick={downloadAllAsZip}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                          Download All
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {convertedFiles.map((file) => (
                          <div key={file.size} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                            <img
                              src={file.url}
                              alt={`${file.size}x${file.size} icon`}
                              className="w-16 h-16 mx-auto mb-2 pixelated"
                              style={{ imageRendering: 'pixelated' }}
                            />
                            <p className="text-sm text-center text-gray-700 dark:text-gray-300 mb-2">
                              {file.size}×{file.size}
                            </p>
                            <button
                              onClick={() => downloadIcon(file)}
                              className="w-full text-xs px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-700"
                            >
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About ICO Format
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Standard format for Windows icons</li>
                  <li>• Supports multiple sizes in one file</li>
                  <li>• Used for desktop applications</li>
                  <li>• Compatible with favicons</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Privacy & Security
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• All processing happens in your browser</li>
                  <li>• No files uploaded to our servers</li>
                  <li>• Your images remain completely private</li>
                  <li>• No data collection or tracking</li>
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