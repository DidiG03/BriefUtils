'use client';

import { useState, useRef } from 'react';
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';

export default function SvgToPngConverter() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [transparent, setTransparent] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
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
    if (file && file.type === 'image/svg+xml') {
      setSelectedFile(file);
      loadSvgContent(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      setSelectedFile(file);
      loadSvgContent(file);
    }
  };

  const loadSvgContent = async (file: File) => {
    try {
      const text = await file.text();
      setSvgContent(text);
      
      // Try to extract dimensions from SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(text, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;
      
      const svgWidth = svgElement.getAttribute('width');
      const svgHeight = svgElement.getAttribute('height');
      const viewBox = svgElement.getAttribute('viewBox');
      
      if (svgWidth && svgHeight) {
        const w = parseInt(svgWidth.replace(/\D/g, '')) || 512;
        const h = parseInt(svgHeight.replace(/\D/g, '')) || 512;
        setWidth(w);
        setHeight(h);
      } else if (viewBox) {
        const parts = viewBox.split(' ');
        if (parts.length === 4) {
          setWidth(parseInt(parts[2]) || 512);
          setHeight(parseInt(parts[3]) || 512);
        }
      }
    } catch (error) {
      console.error('Failed to read SVG content:', error);
    }
  };

  const convertSvgToPng = async () => {
    if (!selectedFile || !svgContent) return;

    setIsConverting(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = width;
      canvas.height = height;
      
      // Set background
      if (!transparent) {
        ctx!.fillStyle = backgroundColor;
        ctx!.fillRect(0, 0, width, height);
      }
      
      // Create SVG blob URL
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.onload = () => {
        // Calculate dimensions to maintain aspect ratio if needed
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (maintainAspectRatio) {
          const imgAspect = img.width / img.height;
          const canvasAspect = width / height;
          
          if (imgAspect > canvasAspect) {
            drawWidth = width;
            drawHeight = width / imgAspect;
            offsetY = (height - drawHeight) / 2;
          } else {
            drawHeight = height;
            drawWidth = height * imgAspect;
            offsetX = (width - drawWidth) / 2;
          }
        }
        
        // Draw the SVG
        ctx!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        
        // Convert to PNG
        const pngDataUrl = canvas.toDataURL('image/png');
        setConvertedImageUrl(pngDataUrl);
        
        // Clean up
        URL.revokeObjectURL(svgUrl);
        setIsConverting(false);
      };
      
      img.onerror = () => {
        console.error('Failed to load SVG image');
        URL.revokeObjectURL(svgUrl);
        setIsConverting(false);
      };
      
      img.src = svgUrl;
      
    } catch (error) {
      console.error('Conversion failed:', error);
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.download = selectedFile.name.replace('.svg', '.png');
    link.href = convertedImageUrl;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setConvertedImageUrl(null);
    setIsConverting(false);
    setSvgContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && selectedFile) {
      // Try to maintain aspect ratio based on original SVG dimensions
      const aspectRatio = width / height;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && selectedFile) {
      // Try to maintain aspect ratio based on original SVG dimensions
      const aspectRatio = width / height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SVG to PNG Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert SVG vector graphics to PNG raster images with custom dimensions and background.
            Perfect for creating icons, logos, and graphics for web and print.
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
                      ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Drop your SVG file here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    or click to browse and select an SVG vector graphic
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg,image/svg+xml"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Choose SVG File
                  </button>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Supports: SVG files up to 10MB
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
                          Size: {(selectedFile.size / 1024).toFixed(2)} KB
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

                  {/* Conversion Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dimensions */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Dimensions</h4>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Width (px)
                          </label>
                          <input
                            type="number"
                            value={width}
                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 512)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            min="1"
                            max="4096"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Height (px)
                          </label>
                          <input
                            type="number"
                            value={height}
                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 512)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            min="1"
                            max="4096"
                          />
                        </div>
                      </div>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={maintainAspectRatio}
                          onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Maintain aspect ratio
                        </span>
                      </label>
                    </div>

                    {/* Background */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Background</h4>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={transparent}
                          onChange={(e) => setTransparent(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Transparent background
                        </span>
                      </label>
                      
                      {!transparent && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Background Color
                          </label>
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Convert Button */}
                  <button
                    onClick={convertSvgToPng}
                    disabled={isConverting}
                    className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      `Convert to PNG (${width}×${height})`
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
                            {selectedFile.name.replace('.svg', '.png')}
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {width}×{height} pixels • Ready for download
                          </p>
                        </div>
                        
                        <button
                          onClick={downloadImage}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                          Download PNG
                        </button>
                      </div>
                      
                      <img
                        src={convertedImageUrl}
                        alt="Converted PNG"
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
                  Why Convert SVG to PNG?
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Fixed resolution for specific use cases</li>
                  <li>• Better compatibility with older systems</li>
                  <li>• Suitable for email and social media</li>
                  <li>• Consistent appearance across platforms</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Privacy & Security
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• All processing happens in your browser</li>
                  <li>• No files uploaded to our servers</li>
                  <li>• Your graphics remain completely private</li>
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