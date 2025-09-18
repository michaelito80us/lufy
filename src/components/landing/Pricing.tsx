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
    <section className={`py-20 px-6 lg:px-12 relative ${className || ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-neon-pink to-neon-blue px-4 py-1 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <GlassCard
                aura={plan.aura}
                className={`p-8 ${plan.border} ${
                  plan.popular ? 'hover:scale-105' : ''
                } transition-all duration-300`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold mb-2">
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
                      <span className="text-lg text-gray-400">
                        {plan.priceUnit}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-center ${
                        feature.included ? 'text-gray-300' : 'text-gray-400'
                      }`}
                    >
                      <i
                        className={`${
                          feature.included
                            ? 'fa-solid fa-check text-neon-pink'
                            : 'fa-solid fa-times text-gray-500'
                        } mr-3`}
                      ></i>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText}
                </Button>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Pricing FAQ */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Questions about pricing?</p>
          <button className="text-neon-pink hover:text-neon-blue transition-colors">
            View FAQ <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  )
}

export { Pricing }
