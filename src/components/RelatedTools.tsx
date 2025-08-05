'use client';

import Link from 'next/link';
import { tools } from '@/data/tools';
import ToolCard from './ToolCard';

interface RelatedToolsProps {
  currentToolId?: string;
  currentCategory?: string;
  className?: string;
}

export default function RelatedTools({ 
  currentToolId, 
  currentCategory, 
  className = '' 
}: RelatedToolsProps) {
  // Get related tools based on category, excluding current tool
  const getRelatedTools = () => {
    let relatedTools = tools.filter(tool => 
      tool.id !== currentToolId && 
      (currentCategory ? tool.category.toLowerCase() === currentCategory.toLowerCase() : true)
    );

    // If we have fewer than 3 tools in the same category, include tools from other categories
    if (relatedTools.length < 3) {
      const additionalTools = tools
        .filter(tool => 
          tool.id !== currentToolId && 
          !relatedTools.some(rt => rt.id === tool.id)
        )
        .slice(0, 3 - relatedTools.length);
      
      relatedTools = [...relatedTools, ...additionalTools];
    }

    // Return max 3 tools
    return relatedTools.slice(0, 3);
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Try These Related Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTools.map(tool => (
            <div key={tool.id} className="transform hover:scale-105 transition-transform">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Link 
            href="/tools"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            View All Tools
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}