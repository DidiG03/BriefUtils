import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: Aug 5, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 lg:p-12">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to BriefUtils ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website located at briefutils.com (the "Service") operated by BriefUtils.
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              BriefUtils provides free online tools and utilities including but not limited to:
            </p>
            <ul>
              <li>Image format converters (PNG to JPEG, Image to WebP, SVG to PNG, etc.)</li>
              <li>Text analysis tools (Word Counter, Character Counter)</li>
              <li>Data formatting tools (JSON Formatter)</li>
              <li>Utility tools (QR Code Generator, Age Calculator)</li>
              <li>Educational content and productivity tips through our blog</li>
            </ul>
            <p>
              All tools are provided free of charge and operate entirely within your web browser. We do not store, collect, or retain any files or data you process through our tools.
            </p>

            <h2>3. User Responsibilities and Acceptable Use</h2>
            <h3>3.1 Permitted Use</h3>
            <p>You may use our Service for:</p>
            <ul>
              <li>Personal, non-commercial purposes</li>
              <li>Commercial purposes in compliance with applicable laws</li>
              <li>Educational and research purposes</li>
            </ul>

            <h3>3.2 Prohibited Use</h3>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Upload, process, or distribute illegal, harmful, threatening, abusive, defamatory, vulgar, obscene, or otherwise objectionable content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights of others</li>
              <li>Attempt to gain unauthorized access to our systems or other users' data</li>
              <li>Use automated tools, bots, or scripts to abuse or overload our Service</li>
              <li>Distribute malware, viruses, or other harmful code</li>
              <li>Process copyrighted material without proper authorization</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>

            <h2>4. Privacy and Data Processing</h2>
            <h3>4.1 Data Processing</h3>
            <p>
              Our tools process your data locally in your browser. We do not upload, store, or retain any files, images, text, or other content you process through our tools. All processing happens client-side for your privacy and security.
            </p>

            <h3>4.2 Analytics and Advertising</h3>
            <p>
              We use Google Analytics to understand how our Service is used and Google AdSense to display advertisements. These services may collect certain information about your visit as described in our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>

            <h3>4.3 Cookies</h3>
            <p>
              We use cookies and similar technologies to enhance your experience, remember your preferences, and serve relevant advertisements. You can control cookie settings through your browser.
            </p>

            <h2>5. Intellectual Property Rights</h2>
            <h3>5.1 Our Content</h3>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of BriefUtils and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h3>5.2 User Content</h3>
            <p>
              You retain all rights to any content you process through our tools. By using our Service, you represent and warrant that you have all necessary rights to process such content and that such use does not violate these Terms or any applicable laws.
            </p>

            <h3>5.3 Trademarks</h3>
            <p>
              BriefUtils, our logos, and any related marks are trademarks of BriefUtils. You may not use our trademarks without our prior written consent.
            </p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. BRIEFUTILS EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of any content</li>
            </ul>
            <p>
              WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR THAT ANY DEFECTS WILL BE CORRECTED.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BRIEFUTILS, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
            </p>
            <ul>
              <li>Loss of profits, data, or other intangible losses</li>
              <li>Damages resulting from your use or inability to use the Service</li>
              <li>Damages resulting from any content obtained through the Service</li>
              <li>Damages resulting from unauthorized access to or alteration of your data</li>
            </ul>
            <p>
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATING TO THE SERVICE SHALL NOT EXCEED $100 USD.
            </p>

            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless BriefUtils and its affiliates, officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including attorney's fees) arising from:
            </p>
            <ul>
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights, including intellectual property rights</li>
              <li>Any content you process through our Service</li>
            </ul>

            <h2>9. Service Availability and Modifications</h2>
            <h3>9.1 Service Availability</h3>
            <p>
              We strive to maintain high availability of our Service but do not guarantee uninterrupted access. We may experience downtime due to maintenance, updates, or circumstances beyond our control.
            </p>

            <h3>9.2 Service Modifications</h3>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We may also impose limits on certain features or restrict access to parts of the Service.
            </p>

            <h3>9.3 Terms Modifications</h3>
            <p>
              We reserve the right to update these Terms at any time. We will notify users of significant changes by posting the updated Terms on this page with a new "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>

            <h2>11. Third-Party Services</h2>
            <p>
              Our Service may contain links to third-party websites, services, or advertisements that are not owned or controlled by BriefUtils. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party services.
            </p>

            <h2>12. Age Restrictions</h2>
            <p>
              The Service is intended for users who are at least 13 years old. If you are under 13, you may not use the Service. If you are between 13 and 18, you represent that you have your parent's or guardian's permission to use the Service.
            </p>

            <h2>13. International Use</h2>
            <p>
              The Service is operated from the United States. If you are accessing the Service from outside the United States, you are responsible for compliance with local laws and regulations.
            </p>

            <h2>14. Governing Law and Dispute Resolution</h2>
            <h3>14.1 Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
            </p>

            <h3>14.2 Dispute Resolution</h3>
            <p>
              Any disputes arising from or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association. The arbitration shall be conducted in Delaware, and judgment on the arbitral award may be entered in any court having jurisdiction.
            </p>

            <h3>14.3 Class Action Waiver</h3>
            <p>
              You agree that any arbitration or legal proceeding shall be limited to the dispute between us and you individually. You waive any right to participate in any class action or representative proceeding.
            </p>

            <h2>15. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect. The invalid or unenforceable provision will be replaced with a valid and enforceable provision that most closely reflects our intent.
            </p>

            <h2>16. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and BriefUtils regarding the Service and supersede all prior agreements and understandings.
            </p>

            <h2>17. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:legal@briefutils.com" className="text-blue-600 hover:underline">legal@briefutils.com</a></li>
              <li>Website: <Link href="/contact" className="text-blue-600 hover:underline">briefutils.com/contact</Link></li>
            </ul>

            <h2>18. Additional Terms for Specific Tools</h2>
            <h3>18.1 Image Processing Tools</h3>
            <p>
              When using our image conversion tools (PNG to JPEG, Image to WebP, etc.), you represent that you have the right to process the images and that the images do not contain illegal content or violate third-party rights.
            </p>

            <h3>18.2 Text Analysis Tools</h3>
            <p>
              Our word counter and text analysis tools process content locally in your browser. You are responsible for ensuring that any text you analyze does not contain confidential, proprietary, or sensitive information that you are not authorized to process.
            </p>

            <h3>18.3 QR Code Generator</h3>
            <p>
              QR codes generated through our service are for your use. We are not responsible for how you use or distribute these QR codes or for any content they may link to.
            </p>

            <hr className="my-8" />

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📋 Quick Summary
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>TL;DR:</strong> Use our free tools responsibly and legally. We don't store your data. 
                We show ads to keep the service free. Don't upload illegal content. 
                We're not liable for issues, but we'll do our best to provide a great service. 
                Questions? <Link href="/contact" className="underline">Contact us</Link>.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                By using BriefUtils, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <div className="mt-4 space-x-4">
                <Link 
                  href="/privacy" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/contact" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  Back to Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}