'use client';

import { useState, useEffect } from 'react';
import { DocumentTextIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';

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

  return (
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
  );
}