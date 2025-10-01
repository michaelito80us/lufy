import React from 'react'
import { Footer } from '@/components/landing'

export default function CookiePolicy() {
  return (
    <div className="circuit-bg text-white antialiased min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              Cookie Policy
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. What Are Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Cookies are small text files that are placed on your device when
                you visit our website. They are widely used to make websites
                work more efficiently and provide information to website owners.
                Lufy uses cookies to enhance your experience, analyze usage
                patterns, and provide personalized content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Types of Cookies We Use
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                2.1 Essential Cookies
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly
                and cannot be disabled. They include:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Authentication cookies to keep you logged in</li>
                <li>• Session cookies to maintain your preferences</li>
                <li>• Security cookies to protect against fraud</li>
                <li>• Load balancing cookies for optimal performance</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                2.2 Analytics Cookies
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                These cookies help us understand how visitors interact with our
                website by collecting and reporting information anonymously:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Google Analytics for website traffic analysis</li>
                <li>• Performance monitoring for page load times</li>
                <li>• User behavior tracking for UX improvements</li>
                <li>• Error tracking for technical issue resolution</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                2.3 Functional Cookies
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Language and region preferences</li>
                <li>• Theme and display preferences</li>
                <li>• Music player settings and volume levels</li>
                <li>• Dashboard layout customizations</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                2.4 Marketing Cookies
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                These cookies track your browsing habits to show you relevant
                advertisements:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Social media integration cookies</li>
                <li>• Advertising network cookies</li>
                <li>• Conversion tracking cookies</li>
                <li>• Retargeting cookies for personalized ads</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Third-Party Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We work with trusted third-party services that may set cookies
                on your device:
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Google Services
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Google Analytics for website analytics</li>
                  <li>• Google OAuth for authentication</li>
                  <li>• Google Fonts for typography</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Spotify Integration
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Spotify OAuth for authentication</li>
                  <li>• Spotify Web API for music data</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Payment Processing
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Stripe for secure payment processing</li>
                  <li>• Fraud detection and prevention cookies</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Content Delivery
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• CDN cookies for faster content delivery</li>
                  <li>• Media streaming optimization cookies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. How Long Cookies Last
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies have different lifespans depending on their purpose:
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                Session Cookies
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                These are temporary cookies that are deleted when you close your
                browser. They're used for essential functions like maintaining
                your login session.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                Persistent Cookies
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                These cookies remain on your device for a set period or until
                you delete them:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Authentication cookies: 30 days</li>
                <li>• Preference cookies: 1 year</li>
                <li>• Analytics cookies: 2 years</li>
                <li>• Marketing cookies: 90 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Managing Your Cookie Preferences
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                5.1 Browser Settings
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                You can control cookies through your browser settings. Most
                browsers allow you to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• View and delete existing cookies</li>
                <li>• Block cookies from specific websites</li>
                <li>• Block third-party cookies</li>
                <li>• Block all cookies (not recommended)</li>
                <li>• Delete cookies when you close your browser</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                5.2 Browser-Specific Instructions
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Chrome</h4>
                  <p className="text-gray-300 text-sm">
                    Settings → Privacy and security → Cookies and other site
                    data
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Firefox</h4>
                  <p className="text-gray-300 text-sm">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Safari</h4>
                  <p className="text-gray-300 text-sm">
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Edge</h4>
                  <p className="text-gray-300 text-sm">
                    Settings → Cookies and site permissions → Cookies and site
                    data
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                5.3 Opt-Out Links
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                You can opt out of specific tracking services:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • Google Analytics:{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-neon-pink hover:text-neon-blue transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out
                  </a>
                </li>
                <li>
                  • Network Advertising Initiative:{' '}
                  <a
                    href="http://www.networkadvertising.org/choices/"
                    className="text-neon-pink hover:text-neon-blue transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NAI Opt-out
                  </a>
                </li>
                <li>
                  • Digital Advertising Alliance:{' '}
                  <a
                    href="http://www.aboutads.info/choices/"
                    className="text-neon-pink hover:text-neon-blue transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DAA Opt-out
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Impact of Disabling Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Disabling cookies may affect your experience on our platform:
              </p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
                <h4 className="text-red-400 font-semibold mb-3">
                  Essential Functions That May Not Work:
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Logging in and staying logged in</li>
                  <li>• Remembering your preferences</li>
                  <li>• Shopping cart functionality</li>
                  <li>• Payment processing</li>
                  <li>• Music player settings</li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                <h4 className="text-yellow-400 font-semibold mb-3">
                  Features That May Be Limited:
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Personalized content recommendations</li>
                  <li>• Analytics and performance improvements</li>
                  <li>• Social media integration</li>
                  <li>• Targeted advertising</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Mobile App Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our mobile applications may use similar technologies to cookies,
                including local storage, device identifiers, and analytics SDKs.
                You can manage these through your device settings or by
                uninstalling the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Updates to This Cookie Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any material changes
                by posting the updated policy on this page and updating the
                "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about our use of cookies or this
                Cookie Policy, please contact us at:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                <p className="text-white font-semibold">Lufy, Inc.</p>
                <p className="text-gray-300">123 Music Street, Suite 456</p>
                <p className="text-gray-300">Los Angeles, CA 90210</p>
                <p className="text-gray-300">United States</p>
                <p className="text-gray-300 mt-2">Email: privacy@lufy.com</p>
                <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
