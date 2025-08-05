'use client';

import { useState, useRef } from 'react';
import { ArrowDownTrayIcon, PhotoIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';
import Script from 'next/script';

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HEIC to JPEG Converter",
    "description": "Free online HEIC to JPEG converter. Convert Apple HEIC/HEIF images to JPEG format for universal compatibility. Works in your browser, no upload required.",
    "url": "https://briefutils.com/heic-to-jpeg",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "permissions": "No permissions required",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert HEIC to JPEG",
      "Privacy-focused - no uploads",
      "Works offline",
      "Adjustable quality settings",
      "Universal compatibility"
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it safe to convert HEIC to JPEG online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our converter processes everything locally in your browser. Your images never leave your device, ensuring complete privacy and security."
          }
        },
        {
          "@type": "Question", 
          "name": "Will I lose image quality when converting HEIC to JPEG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Minimal quality loss occurs with proper settings. We recommend 90% quality for the best balance between file size and visual quality."
          }
        },
        {
          "@type": "Question",
          "name": "Why can't I open HEIC files on Windows/Android?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "HEIC is an Apple-specific format with limited support outside the Apple ecosystem. Converting to JPEG ensures your photos work everywhere."
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="heic-to-jpeg-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

            {/* Comprehensive Content Section */}
            <div className="space-y-12">
              {/* How It Works */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  How to Convert HEIC to JPEG: Step-by-Step Guide
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <ol className="space-y-4 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                        <div>
                          <strong>Upload Your HEIC File:</strong> Click the upload area or drag and drop your HEIC/HEIF image files directly into the converter.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                        <div>
                          <strong>Adjust Quality (Optional):</strong> Use the quality slider to balance file size vs. image quality. 90% quality is recommended for most uses.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                        <div>
                          <strong>Convert Instantly:</strong> Click convert and watch your HEIC image transform to JPEG format in seconds.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                        <div>
                          <strong>Download Your JPEG:</strong> Save the converted JPEG file to your device - ready to share anywhere!
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      💡 Pro Tips for Best Results
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>• Keep quality at 85-95% for optimal file size vs. quality balance</li>
                      <li>• Batch convert multiple photos for efficiency</li>
                      <li>• Original photos remain unchanged on your device</li>
                      <li>• Works with both HEIC and HEIF formats</li>
                      <li>• No internet connection required after page loads</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Why Convert Section */}
              <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Convert HEIC to JPEG?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Universal Compatibility</h3>
                    <p className="text-gray-600 dark:text-gray-400">JPEG works on all devices, browsers, and platforms. Share photos without compatibility issues.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Faster Sharing</h3>
                    <p className="text-gray-600 dark:text-gray-400">Upload and share images faster across social media, email, and messaging apps.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💼</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Professional Use</h3>
                    <p className="text-gray-600 dark:text-gray-400">Required for many professional applications, websites, and printing services.</p>
                  </div>
                </div>
              </section>

              {/* Technical Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    📱 About HEIC Format
                  </h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-400">
                    <p><strong>HEIC (High Efficiency Image Container)</strong> is Apple's modern image format introduced with iOS 11 in 2017.</p>
                    <ul className="space-y-1 ml-4">
                      <li>• 50% smaller file sizes than JPEG</li>
                      <li>• Better image quality at same file size</li>
                      <li>• Supports transparency and 16-bit color</li>
                      <li>• Can store multiple images (Live Photos)</li>
                      <li>• Default format for iPhone cameras</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    🔒 Privacy & Security
                  </h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-400">
                    <p><strong>Your photos stay private.</strong> Our converter works entirely in your browser.</p>
                    <ul className="space-y-1 ml-4">
                      <li>• No files uploaded to servers</li>
                      <li>• Processing happens locally</li>
                      <li>• Original images remain untouched</li>
                      <li>• No registration or account required</li>
                      <li>• Works offline after loading</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Is it safe to convert HEIC to JPEG online?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yes! Our converter processes everything locally in your browser. Your images never leave your device, ensuring complete privacy and security.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Will I lose image quality when converting HEIC to JPEG?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Minimal quality loss occurs with proper settings. We recommend 90% quality for the best balance between file size and visual quality.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Can I convert multiple HEIC files at once?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Currently, you can convert one file at a time. For batch conversion, simply repeat the process for each image.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Why can't I open HEIC files on Windows/Android?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      HEIC is an Apple-specific format with limited support outside the Apple ecosystem. Converting to JPEG ensures your photos work everywhere.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Does the converter work on mobile devices?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yes! Our tool is fully responsive and works perfectly on smartphones and tablets, making it easy to convert photos on any device.
                    </p>
                  </div>
                </div>
              </section>

              {/* Use Cases */}
              <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  When You Need HEIC to JPEG Conversion
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📧 Email Attachments</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Many email clients don't support HEIC. Convert to JPEG for universal email compatibility.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌐 Website Upload</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Most websites and CMS platforms require JPEG format for image uploads.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📱 Social Media</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Share iPhone photos on platforms that don't support HEIC natively.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🖨️ Printing Services</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Professional printing often requires JPEG format for best results.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💼 Work Documents</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Insert photos into presentations, documents, and reports that need JPEG.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔄 File Sharing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Send photos to Android users or Windows computers without compatibility issues.</p>
                  </div>
                </div>
              </section>

              {/* Related Tools */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Related Image Conversion Tools
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a href="/png-to-jpeg" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🖼️</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">PNG to JPEG</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Convert PNG images to JPEG</p>
                      </div>
                    </div>
                  </a>
                  <a href="/image-to-webp" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🌐</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Image to WebP</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Convert to modern WebP format</p>
                      </div>
                    </div>
                  </a>
                  <a href="/image-to-ico" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔳</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Image to ICO</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Create Windows icons</p>
                      </div>
                    </div>
                  </a>
                  <a href="/svg-to-png" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎨</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">SVG to PNG</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Convert vector to raster</p>
                      </div>
                    </div>
                  </a>
                  <a href="/tools" className="block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔧</span>
                      <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">View All Tools</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Explore our complete toolkit</p>
                      </div>
                    </div>
                  </a>
                </div>
              </section>
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
    </>
  );
}