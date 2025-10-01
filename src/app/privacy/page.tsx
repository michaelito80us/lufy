import React from 'react'
import { Footer } from '@/components/landing'

export default function PrivacyPolicy() {
  return (
    <div className="circuit-bg text-white antialiased min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              Privacy Policy
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
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to Lufy ("we," "our," or "us"). This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our music platform service, including
                our website, mobile applications, and related services
                (collectively, the "Service").
              </p>
              <p className="text-gray-300 leading-relaxed">
                Lufy is a multi-tenant SaaS platform that enables musicians to
                create their own artist dashboards and mini-sites, manage their
                music catalogs, engage with fans, and monetize their content
                through subscriptions, beat sales, and merchandise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                2.1 Information You Provide
              </h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • Account information (name, email address, profile
                  information)
                </li>
                <li>
                  • Authentication data from third-party providers (Google,
                  Spotify)
                </li>
                <li>
                  • Music content and metadata (tracks, cover art, descriptions,
                  genres)
                </li>
                <li>
                  • Payment information (processed securely through Stripe)
                </li>
                <li>• Communications with us (support requests, feedback)</li>
                <li>
                  • Artist profile information (bio, social links, branding)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                2.2 Information We Collect Automatically
              </h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • Usage data (plays, downloads, interactions with content)
                </li>
                <li>
                  • Device information (IP address, browser type, operating
                  system)
                </li>
                <li>
                  • Analytics data (page views, session duration, user behavior)
                </li>
                <li>• Cookies and similar tracking technologies</li>
                <li>
                  • Location data (general geographic location based on IP
                  address)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Provide, maintain, and improve our Service</li>
                <li>• Process payments and manage subscriptions</li>
                <li>• Enable music streaming and content delivery</li>
                <li>• Provide analytics and insights to artists</li>
                <li>
                  • Communicate with you about your account and our services
                </li>
                <li>
                  • Personalize your experience and content recommendations
                </li>
                <li>
                  • Detect, prevent, and address fraud and security issues
                </li>
                <li>• Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.1 With Your Consent
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We share information when you explicitly consent to such
                sharing.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.2 Service Providers
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We work with third-party service providers including:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Stripe for payment processing</li>
                <li>• Cloud storage providers for content hosting</li>
                <li>• Analytics providers for usage insights</li>
                <li>• Email service providers for communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.3 Legal Requirements
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We may disclose information if required by law, court order, or
                government request, or to protect our rights and safety.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.4 Business Transfers
              </h3>
              <p className="text-gray-300 leading-relaxed">
                In connection with any merger, sale, or transfer of our
                business, your information may be transferred to the acquiring
                entity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your information against unauthorized
                access, alteration, disclosure, or destruction. This includes
                encryption of data in transit and at rest, secure authentication
                systems, and regular security audits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your information for as long as necessary to provide
                our services, comply with legal obligations, resolve disputes,
                and enforce our agreements. When you delete your account, we
                will delete or anonymize your personal information, though some
                information may be retained for legal or business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Access to your personal information</li>
                <li>• Correction of inaccurate information</li>
                <li>• Deletion of your information</li>
                <li>• Portability of your data</li>
                <li>• Restriction of processing</li>
                <li>• Objection to processing</li>
                <li>• Withdrawal of consent</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@lufy.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Cookies and Tracking
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience, analyze usage, and provide personalized content. You
                can control cookie preferences through your browser settings,
                though some features may not function properly if cookies are
                disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your information in accordance with
                applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our Service is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you become aware that a child has provided us with
                personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page and updating the "Last updated" date. Your
                continued use of the Service after such changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us at:
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
