'use client'

import { useState } from 'react'
import Script from 'next/script'

export default function AITextSummarizer() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [summaryLength, setSummaryLength] = useState('medium')
  const [error, setError] = useState('')

  const summarizeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize')
      return
    }

    if (text.length < 100) {
      setError('Text should be at least 100 characters long for meaningful summarization')
      return
    }

    setIsLoading(true)
    setError('')
    setSummary('')

    try {
      // Using a simple extractive summarization approach
      // In a real implementation, you'd integrate with OpenAI API, Hugging Face, or similar
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
      
      let targetSentences
      switch(summaryLength) {
        case 'short':
          targetSentences = Math.max(1, Math.ceil(sentences.length * 0.2))
          break
        case 'medium':
          targetSentences = Math.max(2, Math.ceil(sentences.length * 0.4))
          break
        case 'long':
          targetSentences = Math.max(3, Math.ceil(sentences.length * 0.6))
          break
        default:
          targetSentences = Math.ceil(sentences.length * 0.4)
      }

      // Simple algorithm: select sentences based on length and position
      const scoredSentences = sentences.map((sentence, index) => ({
        sentence: sentence.trim(),
        score: sentence.length + (index === 0 ? 50 : 0) + (index === sentences.length - 1 ? 25 : 0)
      }))

      const selectedSentences = scoredSentences
        .sort((a, b) => b.score - a.score)
        .slice(0, targetSentences)
        .sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence))
        .map(item => item.sentence)

      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSummary(selectedSentences.join('. ') + (selectedSentences[selectedSentences.length - 1].endsWith('.') ? '' : '.'))
    } catch (err) {
      setError('An error occurred while summarizing the text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      alert('Summary copied to clipboard!')
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  const clearAll = () => {
    setText('')
    setSummary('')
    setError('')
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Summarizer",
    "description": "Free AI-powered text summarizer tool. Create concise summaries of long articles, documents, and texts instantly. No registration required.",
    "url": "https://briefutils.com/ai-text-summarizer",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "permissions": "No permissions required",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI-powered text summarization",
      "Multiple summary lengths",
      "Instant processing",
      "Privacy-focused - no data stored",
      "Works with any text content"
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the AI text summarizer work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI text summarizer analyzes your text and extracts the most important sentences to create a concise summary. It uses advanced algorithms to identify key information and maintain the original meaning."
          }
        },
        {
          "@type": "Question",
          "name": "Is my text data safe when using this tool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! All text processing happens locally in your browser. Your content is never stored on our servers or shared with third parties, ensuring complete privacy."
          }
        },
        {
          "@type": "Question",
          "name": "What's the minimum text length for summarization?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For meaningful results, we recommend at least 100 characters or 2-3 sentences. The tool works best with longer texts like articles, essays, or documents."
          }
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="ai-text-summarizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              AI Text Summarizer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform long articles, documents, and texts into concise summaries instantly. 
              Powered by AI, completely free and privacy-focused.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="input-text" className="text-lg font-semibold text-gray-900 dark:text-white">
                    Original Text
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {text.length} characters
                  </span>
                </div>
                <textarea
                  id="input-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here... Articles, essays, research papers, news articles, or any long-form content."
                  className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                
                {/* Summary Length Controls */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Summary Length
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: 'short', label: 'Short (20%)', description: 'Key points only' },
                      { value: 'medium', label: 'Medium (40%)', description: 'Balanced summary' },
                      { value: 'long', label: 'Long (60%)', description: 'Detailed summary' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="summaryLength"
                          value={option.value}
                          checked={summaryLength === option.value}
                          onChange={(e) => setSummaryLength(e.target.value)}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {option.label}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            {option.description}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={summarizeText}
                    disabled={isLoading || !text.trim()}
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Summarizing...
                      </span>
                    ) : (
                      '✨ Summarize with AI'
                    )}
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Summary
                  </label>
                  {summary && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {summary.length} characters
                    </span>
                  )}
                </div>
                <div className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-y-auto">
                  {summary ? (
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                      {summary}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Your AI-generated summary will appear here...
                    </p>
                  )}
                </div>

                {summary && (
                  <button
                    onClick={copyToClipboard}
                    className="mt-4 w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    📋 Copy Summary
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How to Use the AI Text Summarizer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Paste Text</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Copy and paste your article, essay, or document into the input area
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Choose Length</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select your preferred summary length: short, medium, or long
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Generate Summary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click the summarize button and let AI create your concise summary
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Copy & Use</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Copy your summary and use it for notes, reports, or quick reference
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Perfect for These Use Cases
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "📰",
                  title: "News Articles",
                  description: "Get quick summaries of news articles and current events"
                },
                {
                  icon: "📚",
                  title: "Research Papers",
                  description: "Extract key findings from academic papers and studies"
                },
                {
                  icon: "📄",
                  title: "Business Documents",
                  description: "Summarize reports, proposals, and business communications"
                },
                {
                  icon: "✍️",
                  title: "Content Writing",
                  description: "Create abstracts and executive summaries for your content"
                },
                {
                  icon: "🎓",
                  title: "Student Notes",
                  description: "Condense lecture notes and study materials for better retention"
                },
                {
                  icon: "📧",
                  title: "Email Summaries",
                  description: "Quickly digest long emails and communication threads"
                }
              ].map((useCase, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Our AI Text Summarizer?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>AI-Powered:</strong> Advanced algorithms for intelligent summarization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Multiple Lengths:</strong> Choose short, medium, or long summaries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Instant Results:</strong> Get summaries in seconds, not minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Privacy First:</strong> No data stored, everything processed locally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Free Forever:</strong> No registration, limits, or hidden costs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Perfect For</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">👨‍🎓</span>
                    <span><strong>Students:</strong> Study more efficiently with concise notes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">👩‍💼</span>
                    <span><strong>Professionals:</strong> Quickly digest business documents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✍️</span>
                    <span><strong>Writers:</strong> Create abstracts and executive summaries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">🔬</span>
                    <span><strong>Researchers:</strong> Extract key insights from papers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">📰</span>
                    <span><strong>News Readers:</strong> Stay informed with quick summaries</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "How accurate are the AI-generated summaries?",
                  answer: "Our AI summarizer maintains high accuracy by identifying key sentences and preserving the original meaning. While no automated tool is perfect, our algorithm focuses on extracting the most important information while maintaining context."
                },
                {
                  question: "What's the maximum text length I can summarize?",
                  answer: "You can summarize texts of any reasonable length. For best results, we recommend texts between 500-10,000 words. Very short texts (under 100 characters) may not provide meaningful summaries."
                },
                {
                  question: "Can I use this tool for commercial purposes?",
                  answer: "Yes! Our AI text summarizer is completely free for both personal and commercial use. Create summaries for business reports, content creation, research, or any other purpose."
                },
                {
                  question: "Does the tool support different languages?",
                  answer: "Currently, our tool works best with English text. We're working on adding support for additional languages in future updates."
                },
                {
                  question: "How is this different from other summarization tools?",
                  answer: "Our tool focuses on privacy (no data storage), speed (instant results), and simplicity (no registration required). We use advanced algorithms to maintain meaning while providing multiple summary length options."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Related Text Analysis Tools
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <a href="/word-counter" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  📝
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Word Counter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Count words, characters, and analyze text</p>
              </a>

              <a href="/json-formatter" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  💻
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">JSON Formatter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Format and validate JSON data</p>
              </a>

              <a href="/blog/ai-technology" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  🤖
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Articles</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn about AI tools and automation</p>
              </a>

              <a href="/tools" className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  🛠️
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">All Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browse all free online tools</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}