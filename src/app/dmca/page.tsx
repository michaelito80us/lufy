import React from 'react'
import { Footer } from '@/components/landing'

export default function DMCAPolicy() {
  return (
    <div className="circuit-bg text-white antialiased min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              DMCA Copyright Policy
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
                1. Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Lufy respects the intellectual property rights of others and
                expects our users to do the same. In accordance with the Digital
                Millennium Copyright Act of 1998 ("DMCA"), we have implemented
                procedures for receiving written notification of claimed
                copyright infringement and for processing such claims in
                accordance with the DMCA.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This policy applies to all content uploaded, shared, or
                distributed through our music platform, including but not
                limited to music tracks, cover art, promotional materials, and
                user-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Reporting Copyright Infringement
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you believe that your copyrighted work has been copied and is
                accessible on our platform in a way that constitutes copyright
                infringement, please provide our Designated Copyright Agent with
                the following information:
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-neon-pink mb-4">
                  Required Information for DMCA Takedown Notice:
                </h3>
                <ol className="text-gray-300 space-y-3 list-decimal ml-6">
                  <li>
                    <strong className="text-white">
                      Identification of the copyrighted work:
                    </strong>{' '}
                    A description of the copyrighted work that you claim has
                    been infringed, including the title, artist, album, and any
                    registration numbers if applicable.
                  </li>
                  <li>
                    <strong className="text-white">
                      Identification of the infringing material:
                    </strong>{' '}
                    A description of where the infringing material is located on
                    our platform, including specific URLs, track names, or user
                    profiles.
                  </li>
                  <li>
                    <strong className="text-white">Contact information:</strong>{' '}
                    Your name, address, telephone number, and email address.
                  </li>
                  <li>
                    <strong className="text-white">
                      Good faith statement:
                    </strong>{' '}
                    A statement that you have a good faith belief that the use
                    of the material is not authorized by the copyright owner,
                    its agent, or the law.
                  </li>
                  <li>
                    <strong className="text-white">Accuracy statement:</strong>{' '}
                    A statement that the information in your notice is accurate
                    and that you are the copyright owner or authorized to act on
                    behalf of the copyright owner.
                  </li>
                  <li>
                    <strong className="text-white">Physical signature:</strong>{' '}
                    A physical or electronic signature of the copyright owner or
                    person authorized to act on behalf of the copyright owner.
                  </li>
                </ol>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h4 className="text-red-400 font-semibold mb-3">
                  Important Notice:
                </h4>
                <p className="text-gray-300 text-sm">
                  Under Section 512(f) of the DMCA, any person who knowingly
                  materially misrepresents that material is infringing may be
                  subject to liability for damages. Please ensure your claim is
                  accurate and made in good faith.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How to Submit a DMCA Notice
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                DMCA notices should be sent to our Designated Copyright Agent:
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                <h4 className="text-white font-semibold mb-3">
                  Designated Copyright Agent:
                </h4>
                <p className="text-gray-300">DMCA Agent</p>
                <p className="text-gray-300">Lufy, Inc.</p>
                <p className="text-gray-300">123 Music Street, Suite 456</p>
                <p className="text-gray-300">Los Angeles, CA 90210</p>
                <p className="text-gray-300">United States</p>
                <p className="text-gray-300 mt-2">Email: dmca@lufy.com</p>
                <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
              </div>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                Preferred Methods of Contact:
              </h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • <strong className="text-white">Email:</strong> dmca@lufy.com
                  (fastest response)
                </li>
                <li>
                  • <strong className="text-white">Mail:</strong> Send to the
                  address above
                </li>
                <li>
                  • <strong className="text-white">Online Form:</strong> Use our
                  DMCA reporting form (coming soon)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Our Response Process
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Upon receiving a valid DMCA notice, we will:
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-neon-pink font-semibold mb-2">
                    Step 1: Review (24-48 hours)
                  </h4>
                  <p className="text-gray-300 text-sm">
                    We will review your notice to ensure it meets DMCA
                    requirements and contains all necessary information.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-neon-pink font-semibold mb-2">
                    Step 2: Content Removal (Upon validation)
                  </h4>
                  <p className="text-gray-300 text-sm">
                    If the notice is valid, we will promptly remove or disable
                    access to the allegedly infringing material.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-neon-pink font-semibold mb-2">
                    Step 3: User Notification
                  </h4>
                  <p className="text-gray-300 text-sm">
                    We will notify the user who uploaded the content about the
                    removal and provide information about the counter-notice
                    process.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="text-neon-pink font-semibold mb-2">
                    Step 4: Documentation
                  </h4>
                  <p className="text-gray-300 text-sm">
                    We will maintain records of all DMCA notices and actions
                    taken in accordance with legal requirements.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Counter-Notice Procedure
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you believe your content was removed in error or as a result
                of misidentification, you may submit a counter-notice containing
                the following information:
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-neon-pink mb-4">
                  Required Information for Counter-Notice:
                </h3>
                <ol className="text-gray-300 space-y-3 list-decimal ml-6">
                  <li>
                    <strong className="text-white">
                      Your contact information:
                    </strong>{' '}
                    Name, address, telephone number, and email address.
                  </li>
                  <li>
                    <strong className="text-white">
                      Identification of removed content:
                    </strong>{' '}
                    Description of the material that was removed and its
                    location before removal.
                  </li>
                  <li>
                    <strong className="text-white">
                      Good faith statement:
                    </strong>{' '}
                    A statement under penalty of perjury that you have a good
                    faith belief that the material was removed as a result of
                    mistake or misidentification.
                  </li>
                  <li>
                    <strong className="text-white">
                      Consent to jurisdiction:
                    </strong>{' '}
                    A statement consenting to the jurisdiction of the Federal
                    District Court for your address (or Los Angeles, California
                    if outside the US).
                  </li>
                  <li>
                    <strong className="text-white">Physical signature:</strong>{' '}
                    A physical or electronic signature.
                  </li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                Counter-Notice Process:
              </h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • Submit your counter-notice to our Designated Copyright Agent
                </li>
                <li>
                  • We will forward your counter-notice to the original
                  complainant
                </li>
                <li>
                  • If no legal action is filed within 10-14 business days, we
                  may restore the content
                </li>
                <li>
                  • You will be notified of the outcome of the counter-notice
                  process
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Repeat Infringer Policy
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Lufy has adopted a policy of terminating accounts of users who
                are repeat infringers. We consider the following factors when
                determining repeat infringer status:
              </p>

              <ul className="text-gray-300 space-y-2 ml-6 mb-6">
                <li>• Number of valid DMCA notices received</li>
                <li>• Frequency of infringement claims</li>
                <li>• User's response to previous notices</li>
                <li>• Evidence of willful infringement</li>
              </ul>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                <h4 className="text-yellow-400 font-semibold mb-3">
                  Account Actions for Repeat Infringers:
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• First offense: Warning and content removal</li>
                  <li>• Second offense: Temporary account suspension</li>
                  <li>• Third offense: Permanent account termination</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Safe Harbor Provisions
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Lufy qualifies for safe harbor protection under the DMCA as a
                service provider. We do not monitor user-uploaded content for
                copyright infringement but respond promptly to valid DMCA
                notices. We reserve the right to remove content that we believe
                in good faith infringes copyright, even without a formal DMCA
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. International Copyright Issues
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                While the DMCA is US law, we respect copyright laws worldwide.
                If you are a copyright owner outside the United States, you may
                still submit a notice using the DMCA format, or contact us
                directly to report copyright infringement.
              </p>

              <h3 className="text-xl font-semibold text-neon-pink mb-3">
                International Considerations:
              </h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • We comply with applicable international copyright treaties
                </li>
                <li>
                  • Local copyright laws may provide additional protections
                </li>
                <li>• We may work with international legal representatives</li>
                <li>
                  • Translation services may be available for non-English
                  notices
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Content ID and Automated Detection
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We are developing automated content identification systems to
                help detect potential copyright infringement:
              </p>

              <ul className="text-gray-300 space-y-2 ml-6 mb-6">
                <li>• Audio fingerprinting technology</li>
                <li>• Database matching against known copyrighted works</li>
                <li>• Automated flagging and review processes</li>
                <li>• Integration with industry databases</li>
              </ul>

              <p className="text-gray-300 leading-relaxed">
                These systems supplement, but do not replace, our DMCA
                compliance procedures. Users may still submit formal DMCA
                notices for content not caught by automated systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Educational Resources
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We encourage users to understand copyright law and fair use:
              </p>

              <ul className="text-gray-300 space-y-2 ml-6">
                <li>
                  • US Copyright Office:{' '}
                  <a
                    href="https://www.copyright.gov"
                    className="text-neon-pink hover:text-neon-blue transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.copyright.gov
                  </a>
                </li>
                <li>
                  • Fair Use Guidelines:{' '}
                  <a
                    href="https://www.copyright.gov/fair-use/"
                    className="text-neon-pink hover:text-neon-blue transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Copyright.gov Fair Use
                  </a>
                </li>
                <li>
                  • Creative Commons:{' '}
                  <a
                    href="https://creativecommons.org"
                    className="text-neon-pink hover:text-neon-blue transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    creativecommons.org
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this DMCA policy from time to time to reflect
                changes in law or our procedures. We will notify users of
                material changes by posting the updated policy on this page and
                updating the "Last updated" date. Continued use of our service
                after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about this DMCA policy or to submit copyright
                notices, please contact our Designated Copyright Agent:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                <p className="text-white font-semibold">
                  DMCA Agent - Lufy, Inc.
                </p>
                <p className="text-gray-300">123 Music Street, Suite 456</p>
                <p className="text-gray-300">Los Angeles, CA 90210</p>
                <p className="text-gray-300">United States</p>
                <p className="text-gray-300 mt-2">Email: dmca@lufy.com</p>
                <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-300 mt-2 text-sm">
                  For general inquiries: legal@lufy.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
