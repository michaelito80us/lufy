import React from 'react'
import { Footer } from '@/components/landing'

export default function TermsOfService() {
  return (
    <div className="circuit-bg text-white antialiased min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to Lufy ("we," "our," or "us"). These Terms of Service
                ("Terms") govern your use of our music platform service,
                including our website, mobile applications, and related services
                (collectively, the "Service"). By accessing or using our
                Service, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-300 leading-relaxed">
                If you do not agree to these Terms, please do not use our
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Lufy is a multi-tenant SaaS platform that enables musicians
                ("Artists") to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Create and manage artist dashboards and mini-sites</li>
                <li>• Upload, organize, and stream music content</li>
                <li>• Sell beats, merchandise, and event tickets</li>
                <li>• Manage fan subscriptions and memberships</li>
                <li>• Generate advanced sharing links for content</li>
                <li>• Access analytics and insights</li>
                <li>• Engage with fans through exclusive content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. User Accounts and Registration
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                3.1 Account Creation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To use our Service, you must create an account using Google,
                Spotify, or Magic Link authentication. You must provide accurate
                and complete information and keep your account information
                updated.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                3.2 Account Security
              </h3>
              <p className="text-gray-300 leading-relaxed">
                You are responsible for maintaining the security of your account
                and all activities that occur under your account. You must
                immediately notify us of any unauthorized use of your account.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                3.3 Single User Accounts
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Each account is intended for use by a single musician or artist.
                Multi-user organizations are not supported in the current
                version.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Membership Plans and Payments
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.1 Membership Tiers
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We offer various membership plans with different features and
                pricing. You can view current plans and pricing on our website.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.2 Payment Processing
              </h3>
              <p className="text-gray-300 leading-relaxed">
                All payments are processed securely through Stripe. By making a
                payment, you agree to Stripe's terms of service and privacy
                policy.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.3 Subscriptions and Auto-Renewal
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Subscription plans automatically renew at the end of each
                billing period unless cancelled. You can cancel your
                subscription at any time through your account settings or the
                Stripe Customer Portal.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                4.4 Platform Fees
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We charge a platform fee of 2% on all transactions processed
                through our Service, including fan subscriptions, beat sales,
                and merchandise sales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Content and Intellectual Property
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                5.1 Your Content
              </h3>
              <p className="text-gray-300 leading-relaxed">
                You retain ownership of all content you upload to our Service,
                including music, images, and other materials ("Your Content").
                By uploading content, you grant us a non-exclusive, worldwide,
                royalty-free license to use, store, display, and distribute Your
                Content as necessary to provide our Service.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                5.2 Content Requirements
              </h3>
              <p className="text-gray-300 leading-relaxed">
                You represent and warrant that Your Content:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • Is original or you have the necessary rights to use it
                </li>
                <li>• Does not infringe on any third-party rights</li>
                <li>• Complies with all applicable laws and regulations</li>
                <li>
                  • Does not contain harmful, offensive, or illegal material
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                5.3 File Formats and Limits
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Music uploads must be in supported formats (MP3, WAV, FLAC, AAC,
                M4A) and not exceed 100MB per file. We reserve the right to set
                additional limits on storage and bandwidth usage.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                5.4 Content Removal
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to remove any content that violates these
                Terms or our community guidelines, or in response to valid legal
                requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Fan Subscriptions and Monetization
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                6.1 Subscription Management
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Artists can set subscription prices for various terms (1 week, 1
                month, 3 months, 6 months, 12 months). All subscriptions
                automatically renew unless cancelled by the subscriber.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                6.2 Content Access
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Subscribers gain access to exclusive content as determined by
                the artist. Access is granted immediately upon successful
                payment and continues until subscription cancellation or
                expiration.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                6.3 Revenue Sharing
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Artists receive revenue from subscriptions minus our platform
                fee and payment processing fees. Payouts are managed by Stripe
                according to their standard schedule.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Prohibited Uses
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You agree not to use our Service to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • Upload or distribute copyrighted material without permission
                </li>
                <li>• Engage in fraudulent or deceptive practices</li>
                <li>• Harass, abuse, or harm other users</li>
                <li>• Distribute malware, viruses, or harmful code</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Use automated tools to scrape or download content</li>
                <li>• Violate any applicable laws or regulations</li>
                <li>• Impersonate others or create fake accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Privacy and Data Protection
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Your privacy is important to us. Please review our Privacy
                Policy, which explains how we collect, use, and protect your
                information. By using our Service, you consent to the collection
                and use of your information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Termination
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                9.1 Termination by You
              </h3>
              <p className="text-gray-300 leading-relaxed">
                You may terminate your account at any time by contacting us or
                using the account deletion feature in your dashboard.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                9.2 Termination by Us
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We may suspend or terminate your account if you violate these
                Terms, engage in fraudulent activity, or for any other reason at
                our sole discretion.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                9.3 Effect of Termination
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Upon termination, your access to the Service will cease, and we
                may delete your content and account information, subject to our
                data retention policies and legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Disclaimers and Limitation of Liability
              </h2>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                10.1 Service Availability
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We strive for 99.9% uptime but cannot guarantee uninterrupted
                service. We may perform maintenance, updates, or experience
                technical issues that temporarily affect service availability.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                10.2 Disclaimer of Warranties
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our Service is provided "as is" without warranties of any kind,
                either express or implied, including but not limited to
                merchantability, fitness for a particular purpose, or
                non-infringement.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                10.3 Limitation of Liability
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Indemnification
              </h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to indemnify and hold us harmless from any claims,
                damages, or expenses arising from your use of our Service, your
                content, or your violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Governing Law and Disputes
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms are governed by the laws of the State of California,
                United States. Any disputes will be resolved through binding
                arbitration in Los Angeles, California, except for claims that
                may be brought in small claims court.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                13. Changes to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update these Terms from time to time. We will notify you
                of material changes by posting the updated Terms on our website
                and updating the "Last updated" date. Your continued use of the
                Service after such changes constitutes acceptance of the updated
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                14. Contact Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                <p className="text-white font-semibold">Lufy, Inc.</p>
                <p className="text-gray-300">123 Music Street, Suite 456</p>
                <p className="text-gray-300">Los Angeles, CA 90210</p>
                <p className="text-gray-300">United States</p>
                <p className="text-gray-300 mt-2">Email: legal@lufy.com</p>
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
