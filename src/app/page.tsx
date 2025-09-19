import {
  Header,
  Hero,
  StatsRow,
  QuickFeatures,
  ProductPreview,
  Features,
  Pricing,
  CTA,
} from '@/components/landing'

export default function Home() {
  return (
    <div className="circuit-bg text-white antialiased overflow-x-hidden min-h-screen font-sans">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section with Dashboard Preview */}
      <section className="relative min-h-screen flex items-center py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Hero Content */}
            <div className="flex flex-col justify-center space-y-8">
              <Hero />
              <div className="space-y-6 relative">
                <StatsRow />
                {/* QuickFeatures positioned absolutely to break out of grid */}
                <div className="relative">
                  <QuickFeatures />
                </div>
              </div>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="flex justify-center lg:justify-end">
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
    </div>
  )
}
