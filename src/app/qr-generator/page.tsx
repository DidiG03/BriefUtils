'use client';

import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { ArrowDownTrayIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';

interface QROptions {
  errorCorrectionLevel: 'low' | 'medium' | 'quartile' | 'high';
  type: 'image/png' | 'image/jpeg' | 'image/webp';
  quality: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  width: number;
}

export default function QrGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrOptions, setQrOptions] = useState<QROptions>({
    errorCorrectionLevel: 'medium',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    width: 256,
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(text, {
        errorCorrectionLevel: qrOptions.errorCorrectionLevel,
        type: 'image/png',
        margin: qrOptions.margin,
        color: qrOptions.color,
        width: qrOptions.width,
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('QR Code generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.${qrOptions.type.split('/')[1]}`;
    link.href = qrCodeUrl;
    link.click();
  };

  const clearAll = () => {
    setText('');
    setQrCodeUrl('');
  };

  const presetExamples = [
    { label: 'Website URL', value: 'https://www.example.com' },
    { label: 'Email', value: 'mailto:example@email.com' },
    { label: 'Phone', value: 'tel:+1234567890' },
    { label: 'SMS', value: 'sms:+1234567890' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:password;H:false;;' },
    { label: 'Location', value: 'geo:40.7128,-74.0060' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            QR Code Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate QR codes for URLs, text, phone numbers, emails, and more. 
            Customize colors, size, and error correction level for the perfect QR code.
          </p>
        </div>

        {/* Top Banner Ad */}
        <AdBanner slot={AD_SLOTS.TOOL_TOP_BANNER} size="large" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
            {/* Text Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Enter Content
              </h2>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, email, phone number, or any content you want to encode..."
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Quick examples:</span>
                {presetExamples.map((example) => (
                  <button
                    key={example.label}
                    onClick={() => setText(example.value)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Customization Options
              </h3>
              
              <div className="space-y-4">
                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size: {qrOptions.width}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={qrOptions.width}
                    onChange={(e) => setQrOptions(prev => ({ ...prev, width: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Error Correction */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Error Correction Level
                  </label>
                  <select
                    value={qrOptions.errorCorrectionLevel}
                    onChange={(e) => setQrOptions(prev => ({ ...prev, errorCorrectionLevel: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low (~7%)</option>
                    <option value="medium">Medium (~15%)</option>
                    <option value="quartile">Quartile (~25%)</option>
                    <option value="high">High (~30%)</option>
                  </select>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Foreground Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={qrOptions.color.dark}
                        onChange={(e) => setQrOptions(prev => ({
                          ...prev,
                          color: { ...prev.color, dark: e.target.value }
                        }))}
                        className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={qrOptions.color.dark}
                        onChange={(e) => setQrOptions(prev => ({
                          ...prev,
                          color: { ...prev.color, dark: e.target.value }
                        }))}
                        className="flex-1 p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Background Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={qrOptions.color.light}
                        onChange={(e) => setQrOptions(prev => ({
                          ...prev,
                          color: { ...prev.color, light: e.target.value }
                        }))}
                        className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={qrOptions.color.light}
                        onChange={(e) => setQrOptions(prev => ({
                          ...prev,
                          color: { ...prev.color, light: e.target.value }
                        }))}
                        className="flex-1 p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Margin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Margin: {qrOptions.margin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={qrOptions.margin}
                    onChange={(e) => setQrOptions(prev => ({ ...prev, margin: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select
                    value={qrOptions.type}
                    onChange={(e) => setQrOptions(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={generateQRCode}
                disabled={!text.trim() || isGenerating}
                className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCodeIcon className="h-5 w-5 mr-2" />
                    Generate QR Code
                  </>
                )}
              </button>
              
              <button
                onClick={clearAll}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear
              </button>
            </div>
          </div>

              {/* Output Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated QR Code
              </h2>
              {qrCodeUrl && (
                <button
                  onClick={downloadQRCode}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
              )}
            </div>

            <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              {qrCodeUrl ? (
                <div className="text-center">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="mx-auto mb-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {qrOptions.width}x{qrOptions.width}px • {qrOptions.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <QrCodeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter content and click "Generate QR Code" to create your QR code
                  </p>
                </div>
              )}
              </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <AdSidebar slot={AD_SLOTS.TOOL_SIDEBAR} className="mb-8" />
      </div>
    </div>

    {/* Info Section */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCodeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Multiple Formats
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Generate QR codes for URLs, text, emails, phone numbers, WiFi credentials, and more.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              High Quality
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Generate high-resolution QR codes suitable for print and digital use.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Fully Customizable
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Customize colors, size, error correction level, and output format.
            </p>
          </div>
        </div>

    {/* Bottom Banner Ad */}
    <AdBanner slot={AD_SLOTS.TOOL_BOTTOM_BANNER} size="large" className="mt-12" />
  </div>
</div>
);
}