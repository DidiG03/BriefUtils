import { Metadata } from 'next'
import Link from 'next/link'
import { seoOptimizedBlogPosts } from '@/data/high-impact-blog-posts'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Business Tools Articles - Digital Solutions for Small Business | BriefUtils',
  description: 'Essential business tool guides for small businesses. Learn about digital tools, software solutions, and strategies to grow your business efficiently.',
  keywords: 'business tools, small business software, digital tools, business automation, entrepreneur tools, business efficiency',
  openGraph: {
    title: 'Business Tools Articles - Digital Solutions for Small Business',
    description: 'Essential business tool guides for small businesses. Learn about digital tools, software solutions, and strategies to grow your business.',
    type: 'website',
    url: 'https://briefutils.com/blog/business-tools',
  },
  alternates: {
    canonical: 'https://briefutils.com/blog/business-tools',
  },
}

export default function BusinessToolsPage() {
  const businessPosts = seoOptimizedBlogPosts.filter(post => post.category === 'Business Tools')
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Business Tools Articles",
    "description": "Expert guides on business tools, software solutions, and digital strategies for small businesses",
    "url": "https://briefutils.com/blog/business-tools",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": businessPosts.map((post, index) => ({
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
        id="business-tools-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Business Tools & Solutions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover essential digital tools and software solutions that help small businesses compete with larger companies and scale efficiently.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scale Your Business</h3>
              <p className="text-gray-600 dark:text-gray-400">Tools and strategies to handle growth without proportional cost increases.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cost-Effective Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400">Most tools featured are free or have generous free tiers for small businesses.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Proven Results</h3>
              <p className="text-gray-600 dark:text-gray-400">Real-world case studies and ROI examples from successful implementations.</p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Business Tool Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessPosts.map((post) => (
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
                      <Link href={`/blog/${post.slug}`} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium"
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

          {/* Business Categories */}
          <section className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Essential Business Tool Categories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-700">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  👥
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">CRM & Sales</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customer relationship management and sales automation</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-700">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  📊
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Data analysis and business intelligence tools</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-700">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  💰
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Finance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accounting, invoicing, and payment processing</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-700">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  📢
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Marketing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Social media, email marketing, and content creation</p>
              </div>
            </div>
          </section>

          {/* Quick Business Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Quick Access Business Tools
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link href="/qr-generator" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  📱
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">QR Generator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Marketing campaigns</p>
              </Link>

              <Link href="/word-counter" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  📝
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Word Counter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Content creation</p>
              </Link>

              <Link href="/blog/ai-technology" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  🤖
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automation guides</p>
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