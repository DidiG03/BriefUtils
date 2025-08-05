'use client';

import Link from 'next/link';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getFeaturedPosts } from '@/data/blog';

interface BlogPreviewProps {
  className?: string;
  maxPosts?: number;
}

export default function BlogPreview({ className = '', maxPosts = 2 }: BlogPreviewProps) {
  const featuredPosts = getFeaturedPosts().slice(0, maxPosts);

  if (featuredPosts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Tool Tips
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Weekly insights to boost your productivity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredPosts.map(post => (
          <Link 
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {formatDate(post.publishedAt)}
                <ClockIcon className="h-4 w-4 ml-4 mr-2" />
                {post.readingTime} min read
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
                
                <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          View All Articles
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}