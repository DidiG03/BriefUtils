import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - BriefUtils',
  description: 'BriefUtils privacy policy. Learn how we protect your data and what information we collect when you use our free online tools.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              BriefUtils is designed with privacy in mind. We collect minimal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6">
              <li><strong>Usage Analytics:</strong> We use Google Analytics to understand how visitors use our site</li>
              <li><strong>Advertising Data:</strong> We use Google AdSense to display relevant advertisements</li>
              <li><strong>Device Information:</strong> Basic browser and device information for optimization</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. How We Protect Your Data
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6">
              <li><strong>Local Processing:</strong> All tool operations happen locally in your browser</li>
              <li><strong>No File Storage:</strong> We never store or upload your files to our servers</li>
              <li><strong>No Personal Data Collection:</strong> We don't collect names, emails, or personal information</li>
              <li><strong>HTTPS Security:</strong> All communications are encrypted with SSL</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6">
              <li><strong>Analytics:</strong> Google Analytics cookies to understand site usage</li>
              <li><strong>Advertising:</strong> Google AdSense cookies for personalized ads</li>
              <li><strong>Preferences:</strong> Local storage for theme preferences (dark/light mode)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
              <li><strong>Vercel:</strong> For hosting and content delivery</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6">
              <li>Opt out of analytics tracking using browser settings</li>
              <li>Disable cookies in your browser preferences</li>
              <li>Use ad blockers to prevent advertising cookies</li>
              <li>Request information about data collection practices</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our services are not directed at children under 13 years of age. We do not knowingly collect 
              personal information from children under 13.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We may update this privacy policy from time to time. We will notify users of any changes 
              by posting the new privacy policy on this page with an updated revision date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6">
              <li>Email: privacy@briefutils.com</li>
              <li>Website: <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Page</a></li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Privacy-First Design
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                BriefUtils is built with privacy as a core principle. All tools process data locally in your browser, 
                ensuring your files and information never leave your device. We collect only the minimum data 
                necessary to provide and improve our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}