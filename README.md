# Vansh Secure Avenue LLP - Premium Wealth Management Website

[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-blue)](https://lovable.dev)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1.5-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A premium, modern, and elegant website for **Vansh Secure Avenue LLP**, an AMFI Registered Mutual Fund Distributor. This website represents a trusted private wealth advisory firm, designed to communicate trust, expertise, stability, and professionalism.

## 🏢 About the Company

**Vansh Secure Avenue LLP** is an AMFI Registered Mutual Fund Distributor (ARN-287084) offering comprehensive wealth management services.

**Tagline:** *Save Karo, Secure Karo*

We help clients build, protect, and grow their wealth through personalized financial solutions tailored for HNI, UHNI, Business Owners, Professionals, and NRI families.

## 🚀 Tech Stack

### Frontend Framework
- **React 19.2.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 8.1.5** - Next-generation frontend build tool

### Routing & State Management
- **TanStack Router 1.170.18** - Type-safe routing solution
- **TanStack Query 5.101.1** - Powerful data synchronization
- **React Hook Form 7.71.2** - Performant form management

### UI & Styling
- **Tailwind CSS 4.2.1** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Shadcn/ui** - Beautiful, customizable components
- **Lucide React** - Beautiful & consistent icons
- **Class Variance Authority** - CSS-in-JS variant management

### Design System Components
- Accordion, Alert Dialog, Avatar, Badge
- Button, Calendar, Card, Carousel
- Checkbox, Dialog, Dropdown Menu
- Form, Input, Label, Select
- Sheet, Tabs, Toast (Sonner)
- Tooltip, Navigation Menu
- And more...

### Animation & Effects
- **Embla Carousel** - Smooth carousel experiences
- **Vaul** - Drawer component
- **tw-animate-css** - CSS animation utilities

### Form Validation
- **Zod 3.24.2** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### Development Tools
- **ESLint 9.32.0** - Code linting
- **Prettier 3.7.3** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
VanshSecure/
├── src/
│   ├── assets/              # Images, logos, and static files
│   │   ├── hero-office.jpg
│   │   ├── founder-anuj.jpg
│   │   ├── founder-stuti.jpg
│   │   ├── office-*.jpg
│   │   └── vansh-logo.svg
│   ├── components/          # Reusable React components
│   │   ├── ui/             # Shadcn UI components
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   └── site/           # Website-specific components
│   │       ├── site-header.tsx
│   │       ├── site-footer.tsx
│   │       ├── page-hero.tsx
│   │       ├── service-card.tsx
│   │       ├── consultation-section.tsx
│   │       ├── faq-section.tsx
│   │       ├── testimonials-section.tsx
│   │       ├── marquee-banner.tsx
│   │       └── whatsapp-button.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── use-mobile.tsx
│   ├── lib/                # Utility functions and data
│   │   └── site-data.ts   # Company data, services, FAQs
│   ├── routes/             # TanStack Router pages
│   │   ├── index.tsx      # Homepage
│   │   ├── about.tsx      # About page
│   │   ├── services.tsx   # Services overview
│   │   ├── contact.tsx    # Contact page
│   │   ├── why-choose-us.tsx
│   │   ├── mutual-funds.tsx
│   │   ├── insurance.tsx
│   │   ├── loan-against-securities.tsx
│   │   ├── gift-city.tsx
│   │   ├── sif.tsx
│   │   ├── corporate-fixed-deposits.tsx
│   │   ├── tax-saving-bonds.tsx
│   │   └── unlisted-shares.tsx
│   ├── main.tsx           # Application entry point
│   ├── router.tsx         # Router configuration
│   └── index.css          # Global styles & Tailwind
├── public/                # Public static assets
│   ├── favicon.jpg
│   └── securelogo.jpg
├── .git/                  # Git version control
├── .gitignore            # Git ignore rules
├── .prettierrc           # Prettier configuration
├── .prettierignore       # Prettier ignore rules
├── components.json       # Shadcn UI configuration
├── eslint.config.js      # ESLint configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary Navy**: `#20224A` - Main brand color (60%)
- **Luxury Ivory**: `#F8F7F3` - Background & light surfaces (30%)
- **Luxury Gold**: `#D9C37B` - CTAs, accents, highlights (10%)
- **Teal Accent**: `#5FC7D4` - Subtle highlights
- **Green Accent**: `#A8D36E` - Success states

### Typography
- **Headings**: Cormorant Garamond (Elegant serif)
- **Body**: Plus Jakarta Sans (Modern sans-serif)

### Design Principles
- Clean, luxurious, and timeless
- Generous whitespace
- Premium spacing and shadows
- Smooth, subtle animations
- Consistent design language
- Mobile-first responsive design

## 🌟 Key Features

### Pages
- **Home** - Hero, services, goals, testimonials
- **About** - Company story, founders, values
- **Services** - 8 premium financial solutions
- **Individual Service Pages** - Detailed service information
- **Why Choose Us** - Trust factors and differentiators
- **Contact** - Multi-channel contact form

### Services Offered
1. **Mutual Funds** - Goal-based portfolio construction
2. **Insurance Solutions** - Life, health, and protection planning
3. **Loan Against Securities** - Portfolio liquidity solutions
4. **GIFT City Investments** - Global diversification
5. **Specialized Investment Fund (SIF)** - Advanced strategies
6. **Corporate Fixed Deposits** - Stable income solutions
7. **Tax Saving Bonds** - Tax-efficient investments
8. **Unlisted Shares** - Pre-IPO opportunities

### UI Components
- Premium hero sections with overlays
- Animated service cards with hover effects
- Goal-based investment cards
- Founder message section
- Trust indicators and statistics
- FAQ accordion sections
- Consultation booking CTAs
- Testimonials carousel
- WhatsApp floating button
- Marquee banner with services
- Social media integration

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn package manager
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/AyushMaurya790/VanshSecure.git
cd VanshSecure
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 🔧 Configuration Files

### `vite.config.ts`
Vite configuration with React plugin, path aliases, and TanStack Router plugin

### `tailwind.config.js`
Custom Tailwind configuration with design system tokens

### `tsconfig.json`
TypeScript compiler options with path mapping

### `components.json`
Shadcn UI component configuration

### `eslint.config.js`
ESLint rules for code quality

## 🚢 Deployment

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

### Recommended Platforms
- **Vercel** - Optimized for Vite applications
- **Netlify** - Continuous deployment from Git
- **AWS Amplify** - Full-stack hosting
- **Cloudflare Pages** - Edge deployment

## 🔗 Integration with Lovable

This project is integrated with [Lovable](https://lovable.dev) for AI-powered development:

- **Project ID**: `76b36da8-5dfd-4fa6-8403-9b4fe1e0547c`
- Changes in Lovable sync to GitHub automatically
- Push to `main` branch syncs back to Lovable
- Full bidirectional synchronization

### Continue Development in Lovable
[Open in Lovable Editor](https://lovable.dev/projects/76b36da8-5dfd-4fa6-8403-9b4fe1e0547c)

## 📄 License

This project is proprietary and confidential. All rights reserved by Vansh Secure Avenue LLP.

## 📞 Contact

**Vansh Secure Avenue LLP**
- **ARN**: ARN-287084
- **Phone**: +91 81782 24594
- **WhatsApp**: +91 81782 24594
- **Email**: support@vanshsecure.com
- **Address**: 84, Basement, Pocket 1, Jasola Vihar, New Delhi, Delhi 110025
- **Hours**: Mon – Sat · 10:00 AM to 7:00 PM IST

### Social Media
- **Instagram**: [@vanshsecureavenue](https://www.instagram.com/vanshsecureavenue/)
- **Facebook**: [Vansh Secure Avenue](https://www.facebook.com/vanshsecureavenue/)
- **LinkedIn**: [Vansh Secure Avenue LLP](https://www.linkedin.com/company/vansh-secure-avenue-llp/)
- **Twitter**: [@vanshsecure](https://twitter.com/vanshsecure)

---

**Built with ❤️ using React, TypeScript, Vite, and TanStack Router**
