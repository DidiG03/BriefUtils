import { Metadata } from 'next'
import Link from 'next/link'
import { seoOptimizedBlogPosts } from '@/data/high-impact-blog-posts'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'AI & Technology Articles - Expert Guides and Tools | BriefUtils',
  description: 'Comprehensive AI and technology guides including ChatGPT prompts, AI tools, automation strategies, and emerging tech trends. Expert insights for 2025.',
  keywords: 'ai articles, artificial intelligence, chatgpt prompts, ai tools, automation, machine learning, technology guides',
  openGraph: {
    title: 'AI & Technology Articles - Expert Guides and Tools',
    description: 'Comprehensive AI and technology guides including ChatGPT prompts, AI tools, automation strategies, and emerging tech trends.',
    type: 'website',
    url: 'https://briefutils.com/blog/ai-technology',
  },
  alternates: {
    canonical: 'https://briefutils.com/blog/ai-technology',
  },
}

export default function AITechnologyPage() {
  const aiPosts = seoOptimizedBlogPosts.filter(post => post.category === 'AI & Technology')
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI & Technology Articles",
    "description": "Expert guides on artificial intelligence, automation, and emerging technology trends",
    "url": "https://briefutils.com/blog/ai-technology",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": aiPosts.map((post, index) => ({
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
        id="ai-technology-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              AI & Technology
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master artificial intelligence, automation, and emerging technologies with our comprehensive guides and expert insights.
            </p>
          </div>

          {/* Featured Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Tools & Platforms</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover the best AI tools for productivity, content creation, and business automation.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Automation Strategies</h3>
              <p className="text-gray-600 dark:text-gray-400">Learn to automate workflows and save 20+ hours weekly with AI-powered solutions.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Prompt Engineering</h3>
              <p className="text-gray-600 dark:text-gray-400">Master ChatGPT and AI prompts with proven techniques and real-world examples.</p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest AI & Technology Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiPosts.map((post) => (
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
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
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

          {/* Related Topics */}
          <section className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Explore More Topics
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link href="/blog" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  📚
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">All Articles</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browse all blog posts</p>
              </Link>

              <Link href="/tools" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  🛠️
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Free Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Productivity tools</p>
              </Link>

              <Link href="/json-formatter" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  💻
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">JSON Formatter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Developer tools</p>
              </Link>

              <Link href="/word-counter" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  📝
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Word Counter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Text analysis tools</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}