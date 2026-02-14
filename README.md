# Pet E-Commerce Platform

A modern, full-featured e-commerce platform built specifically for pet products and services. Built with Next.js, TypeScript, and a microservices architecture featuring gRPC communication, REST APIs, and Stripe payment integration.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [API & Backend Services](#api--backend-services)
- [Development Guide](#development-guide)
- [Deployment](#deployment)

## Project Overview

Pet E-Commerce is a comprehensive online marketplace for pet products and services. The platform provides a seamless shopping experience with:

- **Product Discovery**: Browse pet products across multiple categories
- **Secure Authentication**: OpenID Connect (OIDC) based authentication with enterprise identity services
- **Smart Shopping Cart**: Real-time cart management with gRPC backend synchronization
- **Secure Checkout**: Multi-step checkout with Stripe payment processing
- **User Accounts**: Comprehensive account management with order history and saved addresses
- **Responsive Design**: Mobile-first approach with Bootstrap and Tailwind CSS

## Technology Stack

### Frontend

- **Next.js 16** - React framework with App Router for server-side rendering and static generation
- **React 19** - UI library with latest hooks and concurrent rendering
- **TypeScript** - Type-safe development with strict mode enabled
- **Tailwind CSS 4** - Utility-first CSS framework
- **Bootstrap 5** - Additional UI components and grid system
- **Zustand** - Lightweight client-side state management

### Backend Services & APIs

- **gRPC (@grpc/grpc-js)** - High-performance RPC for basket/cart service
- **NextAuth 5** - Authentication with OpenID Connect support
- **Stripe API** - Payment processing integration

### UI Components & Libraries

- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Yet Another React Lightbox** - Product image gallery
- **Class Variance Authority** - Component styling patterns

### Development & Build Tools

- **ESLint 9** - Code quality and linting
- **PostCSS** - CSS processing
- **Node.js** - Runtime environment

## Project Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                # Root layout
│   ├── robots.ts                 # SEO robots configuration
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── (main)/                   # Main public routes group
│   │   ├── page.tsx              # Homepage
│   │   ├── login/                # Authentication pages
│   │   ├── products/             # Product detail pages
│   │   ├── collections/          # Product category/collection browsing
│   │   ├── cart/                 # Shopping cart page
│   │   └── account/              # Protected account routes
│   │       ├── profile/          # User profile management
│   │       ├── addresses/        # Address management
│   │       └── orders/           # Order history
│   ├── (checkout)/               # Checkout flow routes
│   │   └── checkout/             # Multi-step checkout
│   └── api/                       # API routes
│       └── auth/                 # NextAuth configuration
│
├── components/                    # Reusable React components
│   ├── account/                  # Account/profile components
│   ├── basket/                   # Shopping cart components
│   ├── catalog/                  # Product browsing components
│   ├── common/                   # Shared UI components
│   ├── icon/                     # Custom icons
│   ├── layout/                   # Layout components (navbar, footer)
│   ├── order/                    # Order/checkout components
│   └── ui/                       # Primitive UI components
│
├── lib/                          # Business logic & utilities
│   ├── actions/                  # Server actions (mutations)
│   │   ├── auth.ts              # Authentication operations
│   │   ├── cart.ts              # Cart operations
│   │   ├── catalog.ts           # Product search operations
│   │   └── order.ts             # Order operations
│   │
│   ├── data/                     # Data fetching & queries
│   │   ├── catalog.ts           # Product/category queries
│   │   ├── customer.ts          # User/account queries
│   │   ├── order.ts             # Order queries
│   │   └── cookies.ts           # Cookie management
│   │
│   ├── grpc/                     # gRPC client
│   │   ├── basket-client.ts     # Basket service client
│   │   └── basket.proto.ts      # Proto definitions (generated)
│   │
│   ├── stores/                   # Zustand state stores
│   │   └── cart-store.ts        # Client-side cart state
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── api.ts               # API request/response types
│   │   ├── cart.ts              # Cart types
│   │   ├── catalog.ts           # Product types
│   │   ├── customer.ts          # User types
│   │   ├── order.ts             # Order types
│   │   └── next-auth.d.ts       # NextAuth types
│   │
│   ├── api-client.ts            # Shared API client with auth
│   ├── constants.ts             # Application constants
│   ├── endpoints.ts             # API endpoints configuration
│   └── utils.ts                 # Utility functions
│
└── styles/                       # Global styles & fonts
    ├── globals.css              # Global styles
    ├── main.css                 # Main stylesheet
    ├── animation.css            # Animation utilities
    ├── fontawesome-all.min.css  # FontAwesome icons
    └── fonts/                   # Custom font definitions

proto/
└── basket.proto                 # gRPC service definitions
```

## Features

### 🛍️ Product Catalog

- Browse products across multiple categories and collections
- Advanced search and filtering capabilities
- Detailed product pages with images, descriptions, and variants
- Related products recommendations
- Responsive product gallery with lightbox

### 🛒 Shopping Cart

- Real-time cart management with Zustand state store
- gRPC backend synchronization for persistent cart state
- Quantity adjustment and item removal
- Cart persistence across browser sessions (cookies)
- Cart preview modal

### 💳 Checkout & Orders

- Multi-step checkout process (review → shipping → payment)
- Address management and validation
- Stripe payment integration for secure transactions
- Order creation and confirmation
- Order history and tracking

### 🔐 Authentication & Accounts

- OpenID Connect (OIDC) authentication
- Secure session management with JWT tokens
- Protected routes and account pages
- User profile management
- Address book management
- Order history viewing

### 📦 SEO & Performance

- Dynamic sitemap generation
- Robots.txt configuration
- Image optimization via AWS S3
- Responsive image sizing
- Font optimization

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommend 20+)
- **npm** or **yarn** package manager
- Environment variables configured (see [Environment Variables](#environment-variables))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pet-ecommerce
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (see Environment Variables section below).

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Workflow

- **Hot Reload**: Pages auto-update as you edit files
- **TypeScript Checking**: Run `npm run type-check` for type safety
- **Linting**: Run `npm run lint` to check code quality
- **Building**: Run `npm run build` to create optimized production bundle

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# OpenID Connect (Identity Service)
OIDC_ISSUER_URL=https://identity-service.example.com
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret

# API Endpoints
NEXT_PUBLIC_CATALOG_API_URL=https://api.example.com/catalog
NEXT_PUBLIC_ORDER_API_URL=https://api.example.com/orders

# gRPC Basket Service
BASKET_SERVICE_URL=basket-service.example.com:50051

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Application Configuration
NEXT_PUBLIC_APP_TITLE=Pet E-Commerce
NEXT_PUBLIC_PRODUCTION_URL=https://shop.example.com

# AWS S3 (for image optimization)
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=pet-shop-bucket
```

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Next.js Frontend (SPA)                 │
│  ┌─────────────────────────────────────────────────────┤
│  │ Pages: Products, Cart, Checkout, Account            │
│  │ State: Zustand (client-side cart state)             │
│  │ Components: React with TypeScript                    │
│  └─────────────────────────────────────────────────────┤
└──────────────────────────┬──────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  NextAuth API    │ │  gRPC Basket     │ │  Stripe          │
│  Routes          │ │  Service         │ │  Payment API     │
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ • /auth/signin   │ │ • getBasket()    │ │ • Create Intent  │
│ • /auth/callback │ │ • updateBasket() │ │ • Process Payment│
│ • /auth/signout  │ │ • clearBasket()  │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
        │
        └────────────────────┬─────────────────────┐
                             │                     │
                    ┌────────▼────────┐   ┌────────▼────────┐
                    │  Catalog API    │   │  Order API      │
                    ├─────────────────┤   ├─────────────────┤
                    │ • Products      │   │ • Create Order  │
                    │ • Categories    │   │ • Get Orders    │
                    │ • Search        │   │ • Order Details │
                    └─────────────────┘   └─────────────────┘
```

### Authentication Flow

1. User clicks "Login" → Redirected to OIDC provider
2. OIDC provider authenticates user and redirects back
3. NextAuth exchanges code for tokens
4. Session stored in JWT (secure, HttpOnly cookie)
5. Subsequent API calls include Bearer token in Authorization header
6. Protected routes checked via middleware

### Cart Management

1. **Client-side**: Zustand store manages UI state
2. **Server-side**: gRPC client synchronizes with basket service
3. **Persistence**: Cart data stored via cookies
4. **Sync**: On page load, fetch latest basket from gRPC service

## API & Backend Services

### Catalog API

Used for product browsing and search operations.

**Endpoints:**

- `GET /products` - List products with pagination
- `GET /products/:id` - Get product details
- `GET /categories` - List product categories
- `POST /search` - Search products

**Response Format:**

```json
{
  "success": true,
  "data": [...],
  "message": "Operation successful"
}
```

### Order API

Used for order management and checkout.

**Endpoints:**

- `POST /orders` - Create new order
- `GET /orders` - Get user's order history
- `GET /orders/:id` - Get order details

### gRPC Basket Service

High-performance service for real-time cart operations.

**Services:**

- `getBasket(userId)` - Retrieve current basket
- `updateBasket(userId, items)` - Update basket items
- `clearBasket(userId)` - Clear entire basket

### Stripe Payment

Handles payment processing with PCI compliance.

**Flow:**

1. Create payment intent
2. Client-side confirmation with Stripe.js
3. Webhook processing for payment completion

## Development Guide

### Running Tests

```bash
npm run test
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
# Fix linting issues
npm run lint:fix
```

### Building for Production

```bash
npm run build
npm start
```

### Adding New Pages

1. Create new file in `src/app/(main)/your-route/page.tsx`
2. Export default React component
3. Add TypeScript types for props
4. Use `useRouter` for navigation

### Adding New Components

1. Create component file in `src/components/category/component-name.tsx`
2. Export named component
3. Add prop types via TypeScript interface
4. Use Tailwind CSS for styling

### Working with Server Actions

Server actions are used for mutations (create, update, delete):

```typescript
// src/lib/actions/example.ts
"use server";

export async function myAction(data: InputType): Promise<OutputType> {
  // Server-side logic
  // API calls
  // Database operations
}
```

### gRPC Operations

All gRPC operations are server-only in [lib/grpc/basket-client.ts](lib/grpc/basket-client.ts).

## Deployment

### Build

```bash
npm run build
```

Creates optimized production bundle in `.next/` directory.

### Environment Setup (Production)

1. Set all environment variables in production environment
2. Ensure OIDC provider is configured for production domain
3. Update Stripe to production keys
4. Configure AWS S3 for production bucket

### Deployment Platforms

#### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy with `vercel deploy`

#### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next ./
EXPOSE 3000
CMD ["npm", "start"]
```

#### Traditional Server

1. Build locally: `npm run build`
2. Upload `.next/`, `node_modules/`, `public/` to server
3. Run `npm start`
4. Configure reverse proxy (nginx/Apache)
5. Set up SSL certificates

### Production Checklist

- [ ] All environment variables configured
- [ ] OIDC provider configured for production domain
- [ ] Stripe production keys set
- [ ] AWS S3 production bucket configured
- [ ] NextAuth secret updated
- [ ] CORS settings reviewed
- [ ] Security headers configured
- [ ] Monitoring and logging set up
- [ ] Database backups configured
- [ ] Performance monitoring enabled

---

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)
