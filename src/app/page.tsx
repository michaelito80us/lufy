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
      {/* Main Landing Container */}
      <div className="min-h-screen flex flex-col">
        {/* Header Navigation */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
          {/* Left Side - Hero Content */}
          <div className="flex-1">
            <Hero />

            {/* Stats Row */}
            <div className="px-6 lg:px-12">
              <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-3xl">
                <StatsRow />

                {/* Quick Features */}
                <QuickFeatures className="mb-12 lg:mb-20" />
              </div>
            </div>
          </div>

          {/* Right Side - Product Preview */}
          <ProductPreview />
        </div>

        {/* Bottom CTA Section */}
        <CTA />
      </div>

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <Pricing />
    </div>
  )
}
