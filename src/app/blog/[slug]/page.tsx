'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, TagIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { getBlogPost, getRelatedPosts } from '@/data/blog';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import SocialShare from '@/components/SocialShare';
import RelatedTools from '@/components/RelatedTools';
import { AD_SLOTS } from '@/lib/ads';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Convert markdown-style content to HTML
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">$1</h3>')
      .replace(/^\* (.*$)/gim, '<li class="text-gray-600 dark:text-gray-300 mb-2">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
      .replace(/\n\n/g, '</p><p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 lg:p-12">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center mr-6 mb-2">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center mr-6 mb-2">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {post.readingTime} min read
                  </div>
                  <div className="flex items-center mb-2">
                    <TagIcon className="h-4 w-4 mr-2" />
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Social Share */}
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    By {post.author}
                  </div>
                  <SocialShare 
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>

                {/* Top Banner Ad */}
                <AdBanner slot={AD_SLOTS.TOOL_TOP_BANNER} size="large" className="mb-8" />

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ 
                    __html: `<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">${formatContent(post.content)}</p>` 
                  }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Info */}
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      BU
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{post.author}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Creating helpful online tools and sharing productivity tips to make your digital life easier.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {relatedPost.readingTime} min read
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Banner Ad */}
            <AdBanner slot={AD_SLOTS.TOOL_BOTTOM_BANNER} size="large" className="mt-12" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Sidebar Ad */}
              <AdSidebar slot={AD_SLOTS.TOOL_SIDEBAR} />

              {/* Newsletter Signup */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Weekly Tool Tips
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Get the latest productivity tips and tool updates delivered to your inbox every Tuesday.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Popular Tools */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Popular Tools
                </h3>
                <div className="space-y-3">
                  <Link href="/png-to-jpeg" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    PNG to JPEG Converter
                  </Link>
                  <Link href="/word-counter" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    Word Counter
                  </Link>
                  <Link href="/json-formatter" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    JSON Formatter
                  </Link>
                  <Link href="/qr-generator" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    QR Code Generator
                  </Link>
                  <Link href="/image-to-webp" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    Image to WebP Converter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <RelatedTools className="mt-16" />
      </div>
    </div>
  );
}