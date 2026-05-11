# ALMERSAL Mobile Shop

A modern, feature-rich React-based e-commerce platform for selling mobile phones and devices globally. Built with cutting-edge web technologies, this project showcases a professional mobile shop with advanced product filtering, dynamic variant management, and responsive design.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Project Configuration](#project-configuration)
- [Pages & Routes](#pages--routes)
- [Components Architecture](#components-architecture)
- [Product System](#product-system)
- [Styling & Theme](#styling--theme)
- [API Integration](#api-integration)
- [Key Features Explained](#key-features-explained)
- [Scripts](#scripts)
- [Linting & Code Quality](#linting--code-quality)
- [Contact](#contact)

## 🌟 Overview

ALMERSAL Mobile Shop is a comprehensive e-commerce platform specializing in mobile devices and accessories. The application features:

- **Global Market Presence**: Products from Apple, Samsung, Redmi, Nokia, Huawei, and more
- **Advanced Product Management**: Dynamic variant system with color and storage options
- **Professional UI/UX**: Modern design with smooth animations and glassmorphism effects
- **Multi-Region Support**: Support for different regions (Global, US, JP, IN, EU, CN)
- **Responsive Design**: Fully responsive across all devices
- **Contact & CMS Integration**: Email-based contact system with EmailJS
- **Market Information**: Dedicated pages for market insights and logistics

## ✨ Key Features

### 🎨 Product Management System
- **Dynamic Variants**: Products with multiple storage options and colors
- **Smart Color Selection**: Colors update automatically based on selected storage
- **Image Management**: Smooth transitions between product variant images
- **Status Tracking**: Track product availability (Available, Active, Non Active)

### 🌍 Multi-Region Support
- Global product availability with region-specific variants
- Flag indicators for different regions (US, JP, IN, EU, CN)
- Region-based filtering and search

### 🔍 Advanced Search & Filtering
- Full-text product search
- Filter by status, region, and storage capacity
- Real-time filter updates
- Smooth animations for filter transitions

### 📱 Responsive UI Components
- Built with Radix UI and Shadcn/ui components
- Smooth animations using Framer Motion
- Toast notifications via Sonner
- Custom glassmorphism cards

### 📧 Contact Management
- EmailJS integration for contact form submissions
- Automated email notifications
- Form validation with React Hook Form
- User-friendly feedback system

### 🚀 Performance Features
- React Query for efficient data fetching and caching
- Optimized code splitting with Vite
- Smooth page transitions
- Auto-scroll to top on route changes

## 🛠 Tech Stack

### Frontend Framework
- **React 18.2.0** - UI library with hooks
- **React Router DOM 6.26** - Client-side routing
- **Vite 6.1.0** - Lightning-fast build tool

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Framer Motion 11.16** - Animation library
- **Lucide React 0.475** - Modern icon library
- **Class Variance Authority** - CSS class composition
- **Tailwind Merge** - Merge Tailwind classes intelligently

### Forms & Validation
- **React Hook Form 7.54** - Efficient form handling
- **Zod 3.24** - TypeScript-first schema validation
- **EmailJS 4.4.1** - Email service integration

### Data & State Management
- **TanStack React Query 5.84** - Data fetching and caching
- **React Leaflet 4.2** - Map visualization (optional)

### Additional Libraries
- **Three.js 0.171** - 3D graphics (for Hero3D component)
- **Recharts 2.15** - Data visualization
- **Canvas Confetti 1.9** - Celebration animations
- **Date-fns 3.6** - Date manipulation
- **Lodash 4.17** - Utility functions
- **Moment 2.30** - Date/time handling
- **React Markdown 9.0** - Markdown rendering
- **React Quill 2.0** - Rich text editor
- **Stripe Integration** - Payment processing ready
- **HTML2Canvas & jsPDF** - Document generation

### Development Tools
- **ESLint 9.19** - Code linting
- **TypeScript 5.8** - Type safety (with JSDoc)
- **Autoprefixer 10.4** - CSS vendor prefixes
- **PostCSS 8.5** - CSS processing

## 📁 Project Structure

```
ALMERSAL_mobileshop/
├── src/
│   ├── api/                          # API clients & configuration
│   │   └── base44Client.js          # Base44 API client setup
│   ├── assets/                       # Static assets
│   │   ├── image/                   # General images
│   │   ├── logos/                   # Brand logos
│   │   └── Phones/                  # Phone product images (AVIF format)
│   ├── components/                   # React components
│   │   ├── home/                    # Home page components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutPreview.jsx
│   │   │   ├── BrandShowcase.jsx
│   │   │   ├── ExportPreview.jsx
│   │   │   ├── LogisticsGallery.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   └── Hero3D.jsx
│   │   ├── products/                # Product-related components
│   │   │   └── ProductCard.jsx      # Product card with variants
│   │   ├── layout/                  # Layout components
│   │   │   ├── MainLayout.jsx       # Main wrapper
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Footer.jsx           # Footer
│   │   │   └── WhatsAppButton.jsx   # WhatsApp integration
│   │   ├── shared/                  # Shared components
│   │   │   ├── AnimatedCounter.jsx
│   │   │   ├── AnimatedSection.jsx
│   │   │   ├── Flag.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   └── SectionTitle.jsx
│   │   ├── ui/                      # Shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── accordion.jsx
│   │   │   └── ... (40+ UI components)
│   │   ├── ProtectedRoute.jsx       # Route protection wrapper
│   │   └── UserNotRegisteredError.jsx
│   ├── hooks/                        # Custom React hooks
│   │   └── use-mobile.jsx           # Mobile detection hook
│   ├── lib/                          # Utilities & libraries
│   │   ├── AuthContext.jsx          # Authentication context
│   │   ├── app-params.js            # Application parameters
│   │   ├── query-client.js          # React Query setup
│   │   ├── utils.js                 # Utility functions
│   │   └── PageNotFound.jsx         # 404 error page
│   ├── pages/                        # Page components
│   │   ├── Home.jsx                 # Home page
│   │   ├── About.jsx                # About page
│   │   ├── Products.jsx             # Products catalog
│   │   ├── Markets.jsx              # Markets information
│   │   ├── Contact.jsx              # Contact form
│   │   └── Flag.jsx                 # Flag utility page
│   ├── utils/                        # Utility functions
│   │   └── index.ts
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles
│   ├── global.d.ts                  # Global type definitions
│   ├── assets.d.ts                  # Asset type definitions
│   └── tailwind.config.js           # Tailwind configuration
├── public/
├── node_modules/
├── package.json                     # Project dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS theme
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
├── jsconfig.json                   # JavaScript configuration
├── components.json                 # Shadcn/ui configuration
├── vercel.json                     # Vercel deployment config
├── VARIANT_LOGIC_GUIDE.md         # Product variant documentation
└── README.md                       # This file
```

## 🚀 Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd ALMERSAL_mobileshop
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables** (if needed)
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_url
VITE_APP_ID=your_app_id
VITE_EMAIL_SERVICE_ID=your_emailjs_service_id
VITE_EMAIL_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAIL_PUBLIC_KEY=your_emailjs_public_key
```

4. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 💻 Development

### Running the Dev Server
```bash
npm run dev
```

The Vite dev server provides:
- Fast Hot Module Replacement (HMR)
- Instant feedback on code changes
- Development sourcemaps

### File Structure Best Practices

- **Components**: Use `.jsx` extension for React components
- **Utilities**: Place reusable functions in `src/utils/`
- **Styles**: Use Tailwind CSS classes, keep custom CSS minimal
- **Assets**: Store images and static files in `src/assets/`

## 🏗 Building

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Build
```bash
npm run preview
```

Preview the production build locally.

## ⚙️ Project Configuration

### Vite Configuration (`vite.config.js`)
```javascript
- React plugin for JSX support
- Path alias @ → src/
- Default dev port: 5173
```

### Tailwind CSS (`tailwind.config.js`)
**Custom Theme Colors:**
- `gold`: #D4AF37 (primary accent)
- `navy-deep`: #040B1A (dark background)
- `navy`: #0B1B3A (secondary background)
- `navy-light`: #142850 (lighter navy)

**Key Features:**
- Dark mode support
- Extended animations
- Custom spacing and typography
- Responsive design tokens

### Components Configuration (`components.json`)
- Shadcn/ui preset
- Tailwind CSS setup
- Custom component paths

## 📄 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with hero section, brand showcase, and features |
| `/about` | About | Company information and mission statement |
| `/products` | Products | Product catalog with search and filtering |
| `/markets` | Markets | Global markets and regional information |
| `/contact` | Contact | Contact form with email integration |
| `*` | NotFound | 404 error page for undefined routes |

## 🧩 Components Architecture

### Layout Components
- **MainLayout**: Wraps all pages with header, footer, and sidebar
- **Navbar**: Navigation with mobile-responsive menu
- **Footer**: Global footer with links and info
- **WhatsAppButton**: Floating WhatsApp contact button

### Page Components
- **HeroSection**: 3D hero with animations
- **BrandShowcase**: Display of phone brands
- **ProductCard**: Individual product display with variant selection
- **AnimatedSection**: Scroll-triggered animations
- **GlassCard**: Glassmorphism effect cards

### UI Components (40+)
Built with Radix UI and Shadcn/ui:
- **Form Elements**: Input, Button, Checkbox, Radio, Select, etc.
- **Layout**: Card, Dialog, Drawer, Sidebar, etc.
- **Data Display**: Table, Accordion, Carousel, etc.
- **Feedback**: Alert, Toast (via Sonner), Progress, etc.

### Hooks
- `use-mobile`: Detect mobile viewport

## 📦 Product System

### Product Structure
```javascript
{
  brand: 'Apple',
  name: 'iPhone 17 Pro Max',
  models: [
    {
      name: 'iPhone 17 Pro Max',
      storage: '256GB',
      colors: ['Orange', 'Silver', 'Blue'],
      status: 'Available', // Available | Active | Non Active
      region: 'Global',
      variantImages: {
        'Orange': 'iphone-17pro-orange.png',
        'Silver': 'iphone17pro_silver.png'
      }
    }
  ],
  image: 'base44_url',
  glow: 'color_gradient'
}
```

### Supported Brands
- **Apple**: iPhone series, AirPods, iPad
- **Samsung**: Galaxy S, A, and Z series
- **Redmi**: Phones and tablets
- **Nokia**: C series phones
- **Huawei**: Pura and other flagship devices
- **Honor**: Magic series
- **Realme**: 5G and performance devices
- **Sony Xperia**: Premium phones
- **Itel**: Budget-friendly options

### Color Support
All devices support multiple colors:
- Black, White, Silver, Gold
- Blue, Purple, Green
- Pink, Red, Orange
- Lavender, Sage, Grey

### Image Setup
Place variant images in `/src/assets/Phones/`:
```
{productname}_{color}.avif
```

Examples:
- `iphone17_black.avif`
- `galaxys25ultra_silver.avif`
- `redmi15c_blue.avif`

## 🎨 Styling & Theme

### Tailwind CSS Setup
- Utility-first CSS framework
- Custom color palette with gold and navy theme
- Dark mode support
- Extended animations for Framer Motion

### Key Theme Colors
```
- Primary Gold: #D4AF37
- Dark Navy: #040B1A
- Light Navy: #142850
- Secondary Gold: #F4EBD0
```

### Custom Components
- Glassmorphism cards with backdrop blur
- Gradient effects and glows
- Smooth fade and slide animations
- Responsive grid layouts

## 🔗 API Integration

### Base44 Client
Located in `src/api/base44Client.js`

The application integrates with the Base44 SDK for:
- Authentication and authorization
- User management
- App settings and public settings
- Custom API endpoints

### AuthContext
Located in `src/lib/AuthContext.jsx`

Provides:
- User authentication state
- Token management
- App public settings
- Error handling
- Loading states

### EmailJS Integration
Contact form uses EmailJS for:
- Service ID: `service_4bod105`
- Template ID: `template_hqr53f5`
- Public Key: `a-4YHqGJK564klK0N`

## 🎯 Key Features Explained

### Dynamic Product Variants
1. User selects storage option
2. Available colors automatically update
3. First color is pre-selected
4. Product image updates smoothly (200ms fade)
5. No image flickering or loading delays

### Smart Filtering System
- Filter products by status, region, storage
- Search bar for keyword matching
- Real-time filter updates
- Animated transitions

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly UI elements
- Hamburger menu on mobile

### Animation Framework
Built with Framer Motion:
- Page transitions
- Component entrance animations
- Scroll-triggered animations
- Smooth state changes

## 📝 Scripts

### Development
```bash
npm run dev          # Start development server
npm run preview      # Preview production build
```

### Building
```bash
npm run build        # Build for production
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run typecheck    # Run TypeScript checks
```

## 🔍 Linting & Code Quality

### ESLint Configuration
- React plugin for React-specific rules
- React Hooks plugin for hooks rules
- React Refresh plugin for Vite HMR
- Unused imports detection

### Running Checks
```bash
# Check for issues
npm run lint

# Fix automatically
npm run lint:fix

# Type checking (JSDoc)
npm run typecheck
```

## 📞 Contact

**ALMERSAL Al Saree**
- **Address**: Property Investment Office 4, Dubai Investment Park First, Office S-200, Dubai — UAE
- **Phone**: +971 52 322 2928
- **Email**: Info@almersalalsareeuae.com
- **Working Hours**: Monday – Saturday: 11:00 AM – 11:00 PM (GST)
- **WhatsApp**: Available via floating button on website


## 🔒 Security Notes

- EmailJS credentials are embedded for client-side email delivery
- Authentication uses Base44 SDK with token management
- Environment variables should be configured for sensitive data
- Never commit credentials to version control

## 🚀 Deployment

### Vercel Deployment
Configuration is pre-configured in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "framework": "vite",
  "outputDirectory": "dist"
}
```

Deploy with:
```bash
vercel
```

### Other Platforms
The project is compatible with any Node.js hosting platform:
- Netlify
- GitHub Pages
- AWS Amplify
- Custom servers

## 📦 Dependencies Summary

**Total Dependencies**: 60+

**Major Libraries**:
- React ecosystem: React, React Router, React Query
- UI: Radix UI, Shadcn/ui, Tailwind CSS, Framer Motion
- Forms: React Hook Form, Zod
- Email: EmailJS
- 3D: Three.js
- Charts: Recharts
- Maps: React Leaflet
- Payments: Stripe (optional)
- Utilities: Lodash, Date-fns, Moment

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint:fix`
4. Submit a pull request

## 📄 License

[Add your license information here]

## 🎉 Getting Started Tips

1. Familiarize yourself with the `VARIANT_LOGIC_GUIDE.md` for product management
2. Check `src/pages/Products.jsx` for the product database structure
3. Review component props in JSDoc comments
4. Use Tailwind CSS for all styling
5. Leverage Framer Motion for animations
6. Test on mobile devices before deploying

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Status**: Active Development
