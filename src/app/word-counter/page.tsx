'use client';

import { useState, useEffect } from 'react';
import { DocumentTextIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';
import Script from 'next/script';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  const calculateStats = (inputText: string): TextStats => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Words (split by whitespace and filter empty strings)
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
    
    // Sentences (split by sentence endings)
    const sentences = inputText.trim() === '' ? 0 : 
      inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Paragraphs (split by double line breaks)
    const paragraphs = inputText.trim() === '' ? 0 : 
      inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    };
  };

  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  const clearText = () => {
    setText('');
  };

  const copyStats = () => {
    const statsText = `Text Statistics:
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingTime} minute${stats.readingTime !== 1 ? 's' : ''}`;
    
    navigator.clipboard.writeText(statsText);
  };

  const loadSampleText = () => {
    const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
    setText(sampleText);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter",
    "description": "Free online word counter tool. Count words, characters, sentences, and paragraphs. Perfect for writers, students, and content creators.",
    "url": "https://briefutils.com/word-counter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "permissions": "No permissions required",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Count words and characters",
      "Real-time text analysis",
      "Reading time estimation",
      "Text density metrics",
      "Privacy-focused - no data stored"
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How accurate is the word count?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our word counter is extremely accurate and follows industry-standard counting methods. It splits text by whitespace and filters empty strings, which matches how most word processors count words."
          }
        },
        {
          "@type": "Question",
          "name": "How is reading time calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Reading time is based on an average reading speed of 200 words per minute, which is the standard for adult readers. This gives you a realistic estimate for presentations, articles, and speeches."
          }
        },
        {
          "@type": "Question",
          "name": "Is my text stored or saved anywhere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, your text is never stored or transmitted. All counting happens locally in your browser, ensuring complete privacy and security of your content."
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="word-counter-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Word Counter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, 
            and content creators who need to track their writing progress.
          </p>
        </div>

        {/* Top Banner Ad */}
        <AdBanner slot={AD_SLOTS.TOOL_TOP_BANNER} size="large" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Text Input */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <DocumentTextIcon className="h-6 w-6 mr-2" />
                      Enter Your Text
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={loadSampleText}
                        className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        Load Sample
                      </button>
                      <button
                        onClick={clearText}
                        className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base leading-relaxed"
                  />
                  
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Start typing to see real-time statistics. You can also paste text from other sources.
                  </div>
                </div>
              </div>

              {/* Statistics Panel */}
              <div className="space-y-6">
                {/* Main Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Statistics
                    </h2>
                    <button
                      onClick={copyStats}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Copy statistics"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Characters</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.characters.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Characters (no spaces)</span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stats.charactersNoSpaces.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Words</span>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {stats.words.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Sentences</span>
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {stats.sentences.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Paragraphs</span>
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {stats.paragraphs.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reading Time */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Reading Time
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stats.readingTime}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      minute{stats.readingTime !== 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      Based on 200 words/min
                    </div>
                  </div>
                </div>

                {/* Word Density */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Text Density
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg. words per sentence</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg. sentences per paragraph</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {stats.paragraphs > 0 ? Math.round(stats.sentences / stats.paragraphs) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg. characters per word</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Counting
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  See statistics update instantly as you type or edit your text.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Detailed Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get comprehensive statistics including reading time and text density.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardDocumentIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Export Results
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Copy statistics to clipboard for use in your documents or reports.
                </p>
              </div>
            </div>

            {/* Comprehensive Content Section */}
            <div className="mt-16 space-y-12">
              {/* How to Use */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  How to Use the Word Counter Tool
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <ol className="space-y-4 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                        <div>
                          <strong>Paste or Type Your Text:</strong> Enter your content in the large text area. You can paste from any document or type directly.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                        <div>
                          <strong>View Real-time Statistics:</strong> Watch as the word count, character count, and other metrics update instantly as you type.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                        <div>
                          <strong>Analyze Your Text:</strong> Review detailed statistics including reading time, text density, and paragraph structure.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                        <div>
                          <strong>Export Statistics:</strong> Copy the results to your clipboard for use in reports, assignments, or documentation.
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      💡 Pro Tips for Writers
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>• Use 200-250 words per minute for reading time estimates</li>
                      <li>• Average sentence length should be 15-20 words for readability</li>
                      <li>• Academic papers typically require specific word counts</li>
                      <li>• Social media posts have character limits (Twitter: 280 chars)</li>
                      <li>• Blog posts perform well at 1,500-2,500 words</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Use Cases */}
              <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Who Uses Word Counter Tools?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Students</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Essay word count requirements</li>
                      <li>• Research paper length tracking</li>
                      <li>• Assignment submission guidelines</li>
                      <li>• Academic writing analysis</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✍️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Writers & Authors</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Novel and book chapter tracking</li>
                      <li>• Article length optimization</li>
                      <li>• Publishing word count requirements</li>
                      <li>• Writing progress monitoring</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📈</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Content Marketers</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Blog post optimization</li>
                      <li>• SEO content planning</li>
                      <li>• Social media character limits</li>
                      <li>• Email campaign copy length</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💼</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Professionals</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Business proposal writing</li>
                      <li>• Report length specifications</li>
                      <li>• Documentation standards</li>
                      <li>• Presentation script timing</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Educators</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Creating assignment guidelines</li>
                      <li>• Lesson plan development</li>
                      <li>• Educational content creation</li>
                      <li>• Student work evaluation</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🗞️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">Journalists</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Article length requirements</li>
                      <li>• News story optimization</li>
                      <li>• Editorial guidelines</li>
                      <li>• Publication deadlines</li>
                    </ul>
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
                      How accurate is the word count?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our word counter is extremely accurate and follows industry-standard counting methods. It splits text by whitespace and filters empty strings, which matches how most word processors count words.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      What's the difference between characters and characters without spaces?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      "Characters" includes all letters, numbers, punctuation, and spaces. "Characters without spaces" excludes spaces but counts everything else. This is useful for platforms with different character limits.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      How is reading time calculated?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Reading time is based on an average reading speed of 200 words per minute, which is the standard for adult readers. This gives you a realistic estimate for presentations, articles, and speeches.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Can I use this for academic papers?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Absolutely! Our word counter is perfect for academic writing, including essays, research papers, and dissertations. It provides the same counting method used by most word processors.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Is my text stored or saved anywhere?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No, your text is never stored or transmitted. All counting happens locally in your browser, ensuring complete privacy and security of your content.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      What file formats can I paste from?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      You can paste text from any application - Microsoft Word, Google Docs, plain text files, web pages, and more. The tool will automatically handle the text formatting.
                    </p>
                  </div>
                </div>
              </section>

              {/* Text Analysis Guide */}
              <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Understanding Text Analysis Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📊 Word Count</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        The total number of words in your text. Essential for meeting writing requirements and optimizing content length for different platforms.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🔤 Character Count</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Includes all letters, numbers, punctuation, and spaces. Important for social media posts, meta descriptions, and character-limited platforms.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📝 Sentence Count</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Number of sentences in your text. Helps analyze readability and writing complexity. Ideal sentence length is 15-20 words.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📄 Paragraph Count</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Number of paragraphs in your text. Important for document structure and readability. Online content benefits from shorter paragraphs.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">⏱️ Reading Time</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Estimated time to read your text at 200 words per minute. Useful for blog posts, speeches, and presentations.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📊 Text Density</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Average words per sentence and sentences per paragraph. Helps optimize readability and engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Writing Guidelines */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Word Count Guidelines by Content Type
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Content Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Ideal Word Count</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Character Limit</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Twitter Post</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">15-50 words</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">280 characters</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Social engagement</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Blog Post</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">1,500-2,500 words</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">No limit</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">SEO & education</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Academic Essay</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">500-1,500 words</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Varies</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Academic assessment</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Meta Description</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">20-30 words</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">155 characters</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">SEO optimization</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Email Subject</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">6-10 words</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">50 characters</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Email marketing</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">Press Release</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">400-800 words</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">No limit</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Media coverage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Related Tools */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Related Text Analysis Tools
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a href="/json-formatter" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">JSON Formatter</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Format and validate JSON data</p>
                      </div>
                    </div>
                  </a>
                  <a href="/qr-generator" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">QR Code Generator</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Generate QR codes for text</p>
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