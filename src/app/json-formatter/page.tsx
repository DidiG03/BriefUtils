'use client';

import { useState } from 'react';
import { CodeBracketIcon, ClipboardDocumentIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';
import Script from 'next/script';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setIsValid(true);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setIsValid(false);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setIsValid(false);
      setOutput('');
    }
  };

  const validateOnly = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError('');
      setOutput('✅ Valid JSON!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setIsValid(false);
      setOutput('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setIsValid(null);
    setError('');
  };

  const loadSampleJson = () => {
    const sampleJson = `{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "country": "USA"
  },
  "hobbies": ["reading", "swimming", "coding"],
  "isActive": true,
  "projects": [
    {
      "name": "Website Redesign",
      "status": "completed",
      "deadline": "2024-01-15"
    },
    {
      "name": "Mobile App",
      "status": "in-progress",
      "deadline": "2024-03-30"
    }
  ]
}`;
    setInput(sampleJson);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Formatter",
    "description": "Free online JSON formatter and validator. Format, validate, and beautify JSON data instantly. Perfect for developers and API testing.",
    "url": "https://briefutils.com/json-formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "permissions": "No permissions required",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Format JSON with proper indentation",
      "Validate JSON syntax",
      "Minify JSON for production",
      "Copy formatted results",
      "Privacy-focused - no data sent to servers"
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What's the difference between formatting and minifying JSON?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Formatting adds proper indentation and line breaks for readability. Minifying removes all unnecessary whitespace to reduce file size for production use."
          }
        },
        {
          "@type": "Question",
          "name": "Is my JSON data secure when using this tool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! All JSON processing happens locally in your browser. Your data never leaves your device or gets sent to any servers."
          }
        },
        {
          "@type": "Question",
          "name": "How do I fix common JSON errors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common errors include: missing quotes around strings, trailing commas, single quotes instead of double quotes, and unescaped special characters. Our validator helps identify these issues."
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="json-formatter-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON Formatter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Format, validate, and beautify JSON data. Perfect for developers working with APIs, 
            configuration files, and data structures. Minify for production or beautify for readability.
          </p>
        </div>

        {/* Top Banner Ad */}
        <AdBanner slot={AD_SLOTS.TOOL_TOP_BANNER} size="large" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={formatJson}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CodeBracketIcon className="h-4 w-4 mr-2" />
                Format
              </button>
              
              <button
                onClick={minifyJson}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Minify
              </button>
              
              <button
                onClick={validateOnly}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Validate Only
              </button>
              
              <button
                onClick={loadSampleJson}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Load Sample
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Indent:
                </label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                  <option value={8}>8 spaces</option>
                </select>
              </div>
              
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Status Indicator */}
          {isValid !== null && (
            <div className={`mt-4 p-3 rounded-lg flex items-center ${
              isValid 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              {isValid ? (
                <CheckCircleIcon className="h-5 w-5 mr-2" />
              ) : (
                <XCircleIcon className="h-5 w-5 mr-2" />
              )}
              <span className="font-medium">
                {isValid ? 'Valid JSON' : 'Invalid JSON'}
              </span>
              {error && (
                <span className="ml-2 text-sm">: {error}</span>
              )}
            </div>
          )}
        </div>

            {/* Input/Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Input JSON
                </h2>
                <button
                  onClick={() => copyToClipboard(input)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Copy input"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Output
                </h2>
                <button
                  onClick={() => copyToClipboard(output)}
                  disabled={!output}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Copy output"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-auto">
                {output ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 text-center flex items-center justify-center h-full">
                    Formatted JSON will appear here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Content Section */}
        <div className="mt-16 space-y-12">
          {/* How to Use JSON Formatter */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How to Format and Validate JSON
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ol className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                    <div>
                      <strong>Paste Your JSON:</strong> Copy and paste your JSON data into the input textarea. Can be from APIs, config files, or any JSON source.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                    <div>
                      <strong>Choose Your Action:</strong> Format for readability, minify for size, or validate for correctness.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                    <div>
                      <strong>Adjust Indentation:</strong> Set your preferred indentation size (2 or 4 spaces) for formatted output.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                    <div>
                      <strong>Copy Results:</strong> Use the copy button to instantly copy the formatted JSON to your clipboard.
                    </div>
                  </li>
                </ol>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  💡 JSON Best Practices
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Use double quotes for strings, not single quotes</li>
                  <li>• Numbers don't need quotes unless they're strings</li>
                  <li>• Boolean values: true/false (lowercase, no quotes)</li>
                  <li>• Arrays use square brackets: [1, 2, 3]</li>
                  <li>• Objects use curly braces: {`{"key": "value"}`}</li>
                  <li>• No trailing commas allowed in JSON</li>
                </ul>
              </div>
            </div>
          </section>

          {/* JSON vs Other Formats */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              JSON vs Other Data Formats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">JSON</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Advantages:</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm ml-4">
                      <li>• Human-readable</li>
                      <li>• Lightweight</li>
                      <li>• Wide language support</li>
                      <li>• Native JavaScript support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Best For:</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm ml-4">
                      <li>• APIs and web services</li>
                      <li>• Configuration files</li>
                      <li>• Data exchange</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">XML</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Advantages:</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm ml-4">
                      <li>• Self-documenting</li>
                      <li>• Schema validation</li>
                      <li>• Namespace support</li>
                      <li>• Attributes and elements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Best For:</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm ml-4">
                      <li>• Document markup</li>
                      <li>• Enterprise systems</li>
                      <li>• Complex data structures</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">YAML</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Advantages:</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm ml-4">
                      <li>• Very human-readable</li>
                      <li>• Comments supported</li>
                      <li>• Indentation-based</li>
                      <li>• Multi-line strings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Best For:</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm ml-4">
                      <li>• Configuration files</li>
                      <li>• DevOps and CI/CD</li>
                      <li>• Documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              When You Need JSON Formatting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌐 API Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Format API responses and requests for debugging and documentation.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚙️ Configuration Files</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Organize and validate application configuration settings.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🐛 Debugging</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pretty-print JSON to identify errors and understand data structure.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Data Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Format data exports for analysis and reporting tools.</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Documentation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create readable examples for API documentation and tutorials.</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔄 Data Migration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Validate and transform data during system migrations.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What's the difference between formatting and minifying JSON?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Formatting adds proper indentation and line breaks for readability. Minifying removes all unnecessary whitespace to reduce file size for production use.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do I fix common JSON errors?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Common errors include: missing quotes around strings, trailing commas, single quotes instead of double quotes, and unescaped special characters. Our validator helps identify these issues.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is my JSON data secure when using this tool?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! All JSON processing happens locally in your browser. Your data never leaves your device or gets sent to any servers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What's the maximum size JSON I can format?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The tool can handle very large JSON files (several MBs), limited only by your browser's memory. For extremely large files, consider breaking them into smaller chunks.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I validate JSON schema with this tool?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This tool validates JSON syntax (structure and formatting). For schema validation (checking data types and required fields), you'll need specialized schema validation tools.
                </p>
              </div>
            </div>
          </section>

          {/* JSON Reference */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              JSON Syntax Reference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Valid JSON Structure</h3>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`{
  "string": "Hello World",
  "number": 42,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {
    "nested": "value"
  }
}`}
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Types</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">String:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">"text in double quotes"</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600 dark:text-green-400">Number:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">42, 3.14, -10</span>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">Boolean:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">true, false</span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600 dark:text-red-400">Null:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">null</span>
                  </div>
                  <div>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">Array:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">[value1, value2]</span>
                  </div>
                  <div>
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">Object:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{`{"key": "value"}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Developer Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/word-counter" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Word Counter</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Count words and characters</p>
                  </div>
                </div>
              </a>
              <a href="/qr-generator" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">QR Code Generator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Generate QR codes</p>
                  </div>
                </div>
              </a>
              <a href="/png-to-jpeg" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">PNG to JPEG</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Convert image formats</p>
                  </div>
                </div>
              </a>
              <a href="/age-calculator" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎂</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Age Calculator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calculate precise age</p>
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