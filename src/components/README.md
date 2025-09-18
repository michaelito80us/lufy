# Components Organization

This directory contains all React components organized by functionality and purpose.

## Structure

```txt
src/components/
├── index.ts                 # Main exports for all components
├── landing/                 # Landing page specific components
│   ├── index.ts            # Landing page exports
│   ├── Header.tsx          # Main navigation header
│   ├── Hero.tsx            # Hero section with main CTA
│   ├── StatsAndFeatures.tsx # Stats row and quick features
│   ├── ProductPreview.tsx  # Product preview panel
│   ├── Features.tsx        # Features showcase section
│   ├── Pricing.tsx         # Pricing plans section
│   └── CTA.tsx             # Call-to-action section
├── admin/                   # Admin dashboard components
│   ├── index.ts            # Admin components exports
│   ├── AdminSidebar.tsx    # Desktop sidebar navigation
│   ├── AdminHeader.tsx     # Admin page headers
│   ├── MobileNav.tsx       # Mobile bottom navigation
│   └── PageBuilder.tsx     # Page builder interface
└── ui/                      # Reusable UI components
    ├── index.ts            # UI components exports
    ├── Button.tsx          # Button component with variants
    ├── GlassCard.tsx       # Glass morphism card component
    └── IconBox.tsx         # Icon container component
```

## Usage

### Clean Imports

Components can be imported cleanly using the index files:

```typescript
// Landing page components
import { Header, Hero, Features } from '@/components/landing'

// Admin components
import { AdminSidebar, PageBuilder } from '@/components/admin'

// UI components
import { Button, GlassCard } from '@/components/ui'

// All components (if needed)
import { Header, Button, AdminSidebar } from '@/components'
```

### Component Categories

#### Landing Components

Components specifically designed for the public-facing landing page that showcases the SaaS platform features and pricing.

#### Admin Components

Components for the multi-tenant admin dashboard where artists manage their individual websites and content.

#### UI Components

Reusable, generic components that follow the design system and can be used across both landing and admin interfaces.

## Design System Consistency

All components follow the established design system:

- **Glass morphism effects** via GlassCard component
- **Neon gradient themes** using custom CSS properties
- **Circuit background patterns** for futuristic aesthetic
- **Fuchsia and teal aura animations** for enhanced visual appeal
- **TypeScript interfaces** for type safety
- **Responsive design** supporting mobile and desktop
