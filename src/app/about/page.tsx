import { Metadata } from 'next';
import { CalendarDaysIcon, CpuChipIcon, LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import { AD_SLOTS } from '@/lib/ads';

export const metadata: Metadata = {
  title: 'About BriefUtils - Our Mission & Values | BriefUtils',
  description: 'Learn about BriefUtils mission to provide simple, fast, and reliable online tools. Built with privacy-first principles and modern technology.',
  keywords: 'about briefutils, mission, privacy first, open source, online tools, free tools',
  openGraph: {
    title: 'About BriefUtils - Our Mission & Values',
    description: 'Learn about BriefUtils mission to provide simple, fast, and reliable online tools.',
    type: 'website',
    url: 'https://briefutils.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About BriefUtils
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We believe that powerful tools should be simple, fast, and accessible to everyone. 
            That's why we created BriefUtils - a collection of free online utilities that work entirely in your browser.
          </p>
        </div>

        {/* Top Banner Ad */}
        <AdBanner slot={AD_SLOTS.ABOUT_TOP} size="large" className="mb-12" />

        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center leading-relaxed">
            To provide simple, fast, and reliable online tools that help people be more productive 
            in their daily tasks. We focus on creating tools that are intuitive to use, 
            respect your privacy, and deliver instant results.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <LockClosedIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Privacy First
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All tools run locally in your browser. Your data never leaves your device, 
              ensuring complete privacy and security for your information.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <CpuChipIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No uploads, no waiting, no server processing delays. Get instant results 
              with tools optimized for speed and efficiency.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
              <SparklesIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Simple & Intuitive
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Clean, modern interfaces that anyone can use. No complex settings, 
              no learning curve - just straightforward tools that work.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
              <CalendarDaysIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Always Improving
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We regularly add new tools and improve existing ones based on user feedback 
              and emerging needs in the digital workspace.
            </p>
          </div>
        </div>

        {/* Technology */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Frontend Technologies
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Next.js 14 with App Router</li>
                <li>• React 18 with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Progressive Web App capabilities</li>
                <li>• Responsive design for all devices</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Core Features
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Client-side processing only</li>
                <li>• Dark/light mode support</li>
                <li>• SEO optimized for discoverability</li>
                <li>• Fast loading and instant results</li>
                <li>• Accessibility focused design</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Open Source */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Open Source & Community Driven
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            BriefUtils is built with transparency in mind. We believe in open source software 
            and community collaboration to create better tools for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/DidiG03/BriefUtils"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Team */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Built by Developers, for Everyone
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            BriefUtils is crafted by a team of passionate developers who understand the need for 
            simple, reliable tools in our daily digital workflows. We use these tools ourselves 
            and are committed to making them better every day.
          </p>

          {/* Bottom Banner Ad */}
          <AdBanner slot={AD_SLOTS.ABOUT_BOTTOM} size="large" className="mt-12" />
        </div>
      </div>
    </div>
  );
}