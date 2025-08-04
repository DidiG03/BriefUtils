'use client';

import { useState, useRef } from 'react';
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';

export default function PngToJpegConverter() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState(0.9);
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
    if (file && file.type === 'image/png') {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/png') {
      setSelectedFile(file);
    }
  };

  const convertPngToJpeg = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Fill with white background for JPEG
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image
        ctx!.drawImage(img, 0, 0);
        
        // Convert to JPEG with specified quality
        const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
        setConvertedImageUrl(jpegDataUrl);
        setIsConverting(false);
      };

      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error('Conversion failed:', error);
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.download = selectedFile.name.replace('.png', '.jpg');
    link.href = convertedImageUrl;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setConvertedImageUrl(null);
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
            PNG to JPEG Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert PNG images to JPEG format quickly and easily. Reduce file size while maintaining quality.
            All conversions happen locally in your browser - your images never leave your device.
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
                Drop your PNG file here
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                or click to browse and select a PNG image
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,image/png"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Choose PNG File
              </button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Supports: PNG files up to 50MB
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
                onClick={convertPngToJpeg}
                disabled={isConverting}
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
                  'Convert to JPEG'
                )}
              </button>

              {/* Result */}
              {convertedImageUrl && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                    ✅ Conversion Complete!
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">
                        {selectedFile.name.replace('.png', '.jpg')}
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
              Why Convert PNG to JPEG?
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Smaller file sizes for faster loading</li>
              <li>• Better compression for photos</li>
              <li>• Wider compatibility across platforms</li>
              <li>• Ideal for web use and email attachments</li>
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