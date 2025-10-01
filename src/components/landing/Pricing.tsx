'use client'

import React from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'

export interface PricingProps {
  className?: string
}

const Pricing: React.FC<PricingProps> = ({ className }) => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        { text: 'Basic music player', included: true },
        { text: 'Up to 10 tracks', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Fan messaging', included: true },
        { text: 'Beat store', included: false },
        { text: 'Merch store', included: false },
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'ghost' as const,
      popular: false,
      border: 'border-white/10',
    },
    {
      name: 'Pro',
      price: '$29',
      priceUnit: '/month',
      description: 'For serious artists',
      features: [
        { text: 'Advanced music player', included: true },
        { text: 'Unlimited tracks', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Beat store', included: true },
        { text: 'Merch store', included: true },
        { text: 'Tour management', included: true },
      ],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'primary' as const,
      popular: true,
      border: 'border-2 border-neon-pink/50',
      aura: 'fuchsia' as const,
    },
    {
      name: 'Enterprise',
      price: '$99',
      priceUnit: '/month',
      description: 'For labels & agencies',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'White-label solution', included: true },
        { text: 'Multi-artist management', included: true },
        { text: 'API access', included: true },
        { text: 'Priority support', included: true },
        { text: 'Custom integrations', included: true },
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'ghost' as const,
      popular: false,
      border: 'border-white/10',
    },
  ]

  return (
    <section
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 relative ${
        className || ''
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-4 sm:mb-6 px-2">
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative w-full max-w-sm mx-auto lg:max-w-none"
            >
              {/* Card and Badge Group - scales together */}
              <div
                className={`hover:scale-105 transition-all duration-500 ease-out cursor-pointer group ${
                  plan.popular ? 'relative' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <span className="bg-gradient-to-r from-neon-pink to-neon-blue px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <GlassCard
                  aura={plan.aura}
                  className={`p-6 sm:p-8 ${
                    plan.border
                  } group-hover:border-neon-pink/30 transition-all duration-500 ease-out ${
                    plan.popular
                      ? 'group-hover:shadow-2xl group-hover:shadow-neon-pink/20'
                      : 'group-hover:shadow-xl group-hover:shadow-neon-blue/10'
                  }`}
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-neon-pink transition-colors duration-300">
                      {plan.name}
                    </h3>
                    <div className="text-3xl sm:text-4xl font-bold mb-2">
                      <span
                        className={`${
                          plan.name === 'Pro'
                            ? 'bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent'
                            : plan.name === 'Enterprise'
                            ? 'bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent'
                            : 'bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent'
                        }`}
                      >
                        {plan.price}
                      </span>
                      {plan.priceUnit && (
                        <span className="text-base sm:text-lg text-gray-400">
                          {plan.priceUnit}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-400">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={`flex items-center text-sm sm:text-base ${
                          feature.included ? 'text-gray-300' : 'text-gray-400'
                        }`}
                      >
                        <i
                          className={`${
                            feature.included
                              ? 'fa-solid fa-check text-neon-pink'
                              : 'fa-solid fa-times text-gray-500'
                          } mr-3 flex-shrink-0`}
                        ></i>
                        <span className="flex-1">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full text-sm sm:text-base py-2 sm:py-3 transition-all duration-300 ${
                      plan.popular
                        ? ''
                        : 'hover:bg-neon-pink/10 hover:border-neon-pink/50 hover:text-neon-pink'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing FAQ */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <p className="text-sm sm:text-base text-gray-400 mb-4">
            Questions about pricing?
          </p>
          <button className="text-sm sm:text-base text-neon-pink hover:text-neon-blue transition-colors">
            View FAQ <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  )
}

export { Pricing }
