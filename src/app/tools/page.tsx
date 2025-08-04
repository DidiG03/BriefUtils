'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ToolCard from '@/components/ToolCard';
import { tools, categories, getToolsByCategory, searchTools } from '@/data/tools';
import AdBanner from '@/components/ads/AdBanner';
import AdInline from '@/components/ads/AdInline';
import { AD_SLOTS } from '@/lib/ads';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredTools, setFilteredTools] = useState(tools);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterTools(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterTools(searchQuery, category);
  };

  const filterTools = (query: string, category: string) => {
    let result = getToolsByCategory(category);
    
    if (query.trim() !== '') {
      result = searchTools(query).filter(tool => 
        category === 'all' || tool.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    setFilteredTools(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our complete collection of free online tools. Find the perfect tool for your needs.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
              />
            </div>
          </div>

          {/* Top Banner Ad */}
          <AdBanner slot={AD_SLOTS.TOOLS_LIST_TOP} size="large" className="mb-8" />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Results Info */}
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? (
                <>
                  Showing {filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''} for "{searchQuery}"
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                </>
              ) : (
                <>
                  Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search query or category filter.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleSearch('')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Clear Search
              </button>
              <button
                onClick={() => handleCategoryChange('all')}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Show All Tools
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <div key={tool.id}>
                <ToolCard tool={tool} />
                {/* Insert inline ad after every 6th tool */}
                {(index + 1) % 6 === 0 && index !== filteredTools.length - 1 && (
                  <div className="md:col-span-2 lg:col-span-3 my-8">
                    <AdInline slot={AD_SLOTS.TOOLS_LIST_GRID} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need a specific tool?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're constantly adding new tools. If you have a suggestion for a tool that would be helpful, 
              let us know and we'll consider adding it to our collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Suggest a Tool
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}