import {
  Header,
  Hero,
  StatsRow,
  QuickFeatures,
  ProductPreview,
  Features,
  Pricing,
  CTA,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className="circuit-bg text-white antialiased overflow-x-hidden min-h-screen font-sans animate-fade-in">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          {/* Mobile: Hero first, Desktop: Side by side */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start lg:min-h-screen">
            {/* Hero Content - Always first on mobile */}
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
              <Hero />

              {/* Dashboard Preview - After title on mobile, right side on desktop */}
              <div className="flex justify-center lg:hidden mb-8">
                <div className="w-full max-w-lg">
                  <ProductPreview />
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <StatsRow />
                <QuickFeatures />
              </div>
            </div>

            {/* Dashboard Preview - Desktop only (right side) */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <div className="w-full max-w-2xl">
                <ProductPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup CTA */}
      <CTA />

      {/* Features Section */}
      <section id="features">
        <Features />
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
