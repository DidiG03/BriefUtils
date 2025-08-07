import { Metadata } from 'next'
import Link from 'next/link'
import { seoOptimizedBlogPosts } from '@/data/high-impact-blog-posts'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Productivity Articles - Time Management & Efficiency Tips | BriefUtils',
  description: 'Comprehensive productivity guides including remote work setups, time management hacks, and efficiency strategies. Save 10+ hours weekly.',
  keywords: 'productivity tips, time management, remote work, efficiency hacks, workflow optimization, work from home',
  openGraph: {
    title: 'Productivity Articles - Time Management & Efficiency Tips',
    description: 'Comprehensive productivity guides including remote work setups, time management hacks, and efficiency strategies.',
    type: 'website',
    url: 'https://briefutils.com/blog/productivity',
  },
  alternates: {
    canonical: 'https://briefutils.com/blog/productivity',
  },
}

export default function ProductivityPage() {
  const productivityPosts = seoOptimizedBlogPosts.filter(post => post.category === 'Productivity')
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Productivity Articles",
    "description": "Expert guides on productivity, time management, and remote work optimization",
    "url": "https://briefutils.com/blog/productivity",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": productivityPosts.map((post, index) => ({
        "@type": "Article",
        "position": index + 1,
        "name": post.title,
        "description": post.description,
        "url": `https://briefutils.com/blog/${post.slug}`,
        "author": {
          "@type": "Organization",
          "name": post.author
        },
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt
      }))
    }
  }

  return (
    <>
      <Script
        id="productivity-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Productivity & Efficiency
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master productivity with proven strategies, remote work setups, and time management techniques that save 10+ hours weekly.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Save 10+ Hours Weekly</h3>
              <p className="text-gray-600 dark:text-gray-400">Learn proven techniques that eliminate inefficiencies and reclaim your time.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Remote Work Mastery</h3>
              <p className="text-gray-600 dark:text-gray-400">Complete setups and strategies for maximum remote work productivity.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Automation & Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover tools and automation that eliminate repetitive tasks.</p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Productivity Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productivityPosts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
                    >
                      Read More
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Productivity Tips */}
          <section className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Quick Productivity Wins
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  ⚡
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2-Minute Rule</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">If it takes less than 2 minutes, do it now</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  🎯
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Time Blocking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dedicate specific hours to specific tasks</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  📧
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Batching</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check email 3 times daily maximum</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  🔄
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pomodoro</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">25-minute focused work sessions</p>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Boost Your Productivity
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link href="/word-counter" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  📝
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Word Counter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track writing productivity</p>
              </Link>

              <Link href="/json-formatter" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  💻
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">JSON Formatter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Developer productivity</p>
              </Link>

              <Link href="/blog/ai-technology" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  🤖
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Articles</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI productivity tools</p>
              </Link>

              <Link href="/blog" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  📚
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">All Articles</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browse everything</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}