# 🩸 Blood-Aid: Emergency Blood Donation Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.10.0-FFCA28?logo=firebase&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payment-5469d4?logo=stripe&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

**Connect donors with patients in emergencies. Save lives, one drop at a time.**

[Live Demo](#-live-site) • [Features](#-key-features) • [Setup](#-quick-start) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Problem Statement](#-problem-statement)
4. [Technology Stack](#-technology-stack)
5. [System Architecture](#-system-architecture)
6. [Project Structure](#-project-structure)
7. [Quick Start](#-quick-start)
8. [Environment Setup](#-environment-setup)
9. [API Routes](#-api-routes)
10. [Screenshots](#-screenshots)
11. [What I Learned](#-what-i-learned)
12. [Future Improvements](#-future-improvements)
13. [Contributing](#-contributing)
14. [License](#-license)

---

## 🎯 Overview

**Blood-Aid** is a full-stack web platform connecting blood donors with patients in critical need of blood transfusions. Built with modern React and designed for the healthcare sector in Bangladesh, Blood-Aid eliminates barriers between donors and recipients through real-time matching and emergency notifications.

### Core Mission
> **Making blood donation accessible, transparent, and life-saving for everyone.**

### Who Uses Blood-Aid?

| User Type | Role | Key Features |
|-----------|------|--------------|
| **🩸 Donors** | Register & donate | View requests, manage profile, receive notifications |
| **🏥 Patients** | Request blood | Post emergency requests, track status, connect with donors |
| **💰 Supporters** | Financial contribution | Donate funds via Stripe, support blood bank operations |
| **👨‍💼 Admins** | System management | Manage users, monitor requests, view analytics |
| **🤝 Volunteers** | Community engagement | Organize blood drives, create content, manage events |

---

## ✨ Key Features

### 🔴 Real-Time Donor Matching
- Search donors by **blood group** and **geographic location**
- Instant notification system alerts nearby donors
- One-click request acceptance
- Emergency priority flags

### 🏪 Multi-Channel Requests
- **Urgent requests** - Emergency blood needs (highest priority)
- **Standard requests** - Planned transfusions
- **Drive requests** - Organization-wide blood drives
- Request status tracking (pending → in-progress → done)

### 💳 Integrated Payment System
- Stripe-powered donations
- Support blood bank operations
- Transparent funding dashboard
- Donation history & receipts

### 📱 Role-Based Dashboard
- **Admin Dashboard** - User management, analytics, moderation
- **Donor Dashboard** - My donations, requests received, profile
- **Volunteer Dashboard** - Blood drives, content creation
- **Patient Dashboard** - My requests, request history

### 📰 Community Blog Platform
- Educational content about blood donation
- User-generated stories & testimonials
- Image uploads (ImgBB integration)
- Public + private blog modes

### 🗺️ Location-Based Services
- Support for **all 64 Bangladesh districts**
- District → Upazila (sub-district) filtering
- Address-based hospital matching
- Location analytics

### 🔐 Security & Authentication
- Firebase Email/Password authentication
- JWT token-based API access
- Role-based access control (RBAC)
- Blocked user system (anti-spam)

### 📊 Analytics Dashboard
- Blood donation statistics
- Request fulfillment rates
- District-wise demand tracking
- Donor demographics

### ♿ Accessibility Features
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast dark theme

---

## 🚨 Problem Statement

### Current Challenges in Blood Donation
| Challenge | Impact | Blood-Aid Solution |
|-----------|--------|-------------------|
| **Blood Shortage Crisis** | Preventable deaths during emergencies | Real-time donor registry + instant matching |
| **Geographic Fragmentation** | No centralized donor database | Unified platform for 64 districts |
| **Emergency Response Delays** | Hours wasted searching for donors | 30-second emergency broadcast to nearby donors |
| **Lack of Donor Awareness** | People don't know how/when to donate | Educational blog + community engagement |
| **Trust & Transparency** | No visibility into blood bank operations | Verified donor profiles + transparent funding |
| **Funding Limitations** | Blood banks struggle operationally | Integrated Stripe donations |

### Before vs After

**Before Blood-Aid:**
- ❌ Manual phone calls to find donors (hours)
- ❌ Fragmented systems across hospitals
- ❌ No awareness campaigns
- ❌ Unclear blood bank operations
- ❌ Difficult donor verification

**After Blood-Aid:**
- ✅ Instant donor matching (<30 seconds)
- ✅ Centralized national platform
- ✅ Educational content & impact tracking
- ✅ Transparent funding & analytics
- ✅ Verified donor profiles with ratings

---

## 🛠️ Technology Stack

### Frontend Framework
```
React 19.1.0 - Modern UI with hooks
Vite 7.0.6 - Lightning-fast build tool
TypeScript-ready (future upgrade path)
```

### Styling & UI
```
Tailwind CSS 4.1.11 - Utility-first CSS
DaisyUI 5.0.47 - Headless UI components
Framer Motion 12.23.9 - Smooth animations
Lucide React - Icon library
React Icons - Additional icon set
```

### State Management & Data
```
TanStack React Query 5.83.0 - Server state management
Axios 1.11.0 - HTTP client
React Hook Form 7.67.0 - Form handling
```

### Authentication & Backend
```
Firebase 11.10.0 - Authentication & real-time
Express.js - REST API (separate repo)
MongoDB - NoSQL database
JWT - Token-based auth
```

### Payment & Storage
```
Stripe - Payment processing
ImgBB API - Image hosting
```

### Development Tools
```
ESLint 9.31.0 - Code quality
Vite + React Plugin - Fast HMR
Node.js 18+ - Runtime
```

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Android Chrome)

---

## 🏗️ System Architecture

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Presentation Layer (Components)            │   │
│  │  ┌──────────────┬──────────────┬──────────────┐      │   │
│  │  │   Dashboard  │    Public    │  Auth Pages  │      │   │
│  │  │   (20+ pages)│   Pages (5)  │   (2 pages)  │      │   │
│  │  └──────────────┴──────────────┴──────────────┘      │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Business Logic Layer (Custom Hooks)               │   │
│  │  ┌──────────┬──────────────┬──────────────┐          │   │
│  │  │ useAxios │ useDistrictUp│ useDashboard │          │   │
│  │  │ Secure   │ azila        │ Stars        │          │   │
│  │  └──────────┴──────────────┴──────────────┘          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    State Management (TanStack Query + Context)       │   │
│  │  ┌──────────┬──────────────┬──────────────┐          │   │
│  │  │  React   │ TanStack     │   Firebase   │          │   │
│  │  │ Context  │ React Query  │  Auth State  │          │   │
│  │  └──────────┴──────────────┴──────────────┘          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          API Integration Layer (Axios)               │   │
│  │  ┌────────────┬────────────┬──────────────┐          │   │
│  │  │  Public    │  Secure    │   Stripe     │          │   │
│  │  │   Client   │  Client    │   Client     │          │   │
│  │  └────────────┴────────────┴──────────────┘          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
┌──────────────────────┐  ┌──────────────────────┐
│   Backend API        │  │  Firebase Auth       │
│   (Express.js)       │  │  & Real-time DB      │
└──────────────────────┘  └──────────────────────┘
         │
         ▼
    ┌─────────────┐
    │  MongoDB    │
    └─────────────┘
```

### Data Flow: Emergency Blood Request
```
User Posts Request
    ↓
API: POST /donation-request
    ↓
Backend: Validates & Stores in MongoDB
    ↓
Frontend: Query Invalidation (React Query)
    ↓
TanStack Query: Auto-refetch nearby donors
    ↓
Firebase: Broadcast notification to donors
    ↓
Donor: Receives alert on dashboard
    ↓
Donor: Clicks "Accept Request"
    ↓
Status Updated: pending → inprogress → done
```

---

## 📁 Project Structure

```
blood-aid-client/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx              (Navigation bar)
│   │   │   ├── Footer.jsx              (Footer)
│   │   │   └── Social.jsx              (Social links)
│   │   ├── dashboard/
│   │   │   ├── shared/
│   │   │   │   ├── FilterBar.jsx       (Reusable filter)
│   │   │   │   ├── Pagination.jsx      (Page navigation)
│   │   │   │   ├── DonationRequestForm.jsx  (Form component)
│   │   │   │   └── StatCard.jsx        (Stats display)
│   │   │   ├── admin/
│   │   │   ├── donor/
│   │   │   └── volunteer/
│   │   ├── loading/
│   │   │   └── DashboardLoading.jsx    (Skeleton loader)
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Modal.jsx
│   │   └── Home2.jsx                   (Alt landing page)
│   ├── pages/
│   │   ├── _dashboard/
│   │   │   ├── admin/                  (Admin pages)
│   │   │   ├── donor/                  (Donor pages)
│   │   │   ├── volunteer/              (Volunteer pages)
│   │   │   └── shared/                 (Shared pages)
│   │   ├── _frontend/
│   │   │   ├── home/                   (Public home)
│   │   │   ├── blog/                   (Blog listing)
│   │   │   ├── funding/                (Funding page)
│   │   │   └── auth/                   (Login/Register)
│   │   └── 404.jsx                     (Error page)
│   ├── layouts/
│   │   ├── DashboardLayout.jsx         (Dashboard wrapper)
│   │   └── RootLayout.jsx              (App wrapper)
│   ├── hooks/
│   │   ├── useAxiosSecure.js           (Protected API)
│   │   ├── axiosPublic.js              (Public API)
│   │   ├── useRole.jsx                 (User role)
│   │   ├── useDistrictUpazila.js       (Location data)
│   │   ├── useDashboardStars.jsx       (Dashboard stats)
│   │   ├── useCountUp.jsx              (Number animation)
│   │   └── index.js                    (Hook exports)
│   ├── providers/
│   │   └── AuthProvider.jsx            (Auth context)
│   ├── Routers/
│   │   ├── mainRoutes.jsx              (Route config)
│   │   └── PrivateRoute.jsx            (Protected routes)
│   ├── utils/
│   │   ├── bdLocationData.json         (District/Upazila data)
│   │   └── bd-districts.json           (Alternative format)
│   ├── data/
│   │   ├── bd-districts.json
│   │   └── bd-upazilas.json
│   ├── firebase/
│   │   └── firebase.config.js          (Firebase setup)
│   ├── assets/
│   │   ├── lottie/                     (Animation files)
│   │   └── *.json                      (Animation configs)
│   ├── App.jsx                         (Root component)
│   ├── main.jsx                        (Entry point)
│   └── index.css                       (Global styles)
├── public/
│   ├── design-blood/                   (Brand assets)
│   └── logo/                           (Logo files)
├── .env.example                        (Environment template)
├── .env.local                          (Local secrets - gitignored)
├── package.json                        (Dependencies)
├── vite.config.js                      (Build config)
├── eslint.config.js                    (Linting rules)
├── firebase.json                       (Firebase deploy config)
├── tailwind.config.js                  (Tailwind setup)
├── jsconfig.json                       (JS config & aliases)
├── README.md                           (This file)
├── CONTRIBUTING.md                     (Contribution guide)
├── LICENSE                             (MIT license)
├── CHANGELOG.md                        (Version history)
└── API_DOCUMENTATION.md                (API reference)
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18 or higher
- **npm** 9 or higher (or yarn/pnpm)
- **Git** for version control

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/aashikur/Blood-Aid-client.git
cd Blood-Aid-client
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Setup Environment Variables**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. **Start Development Server**
```bash
npm run dev
# Server runs at http://localhost:5173
```

5. **Build for Production**
```bash
npm run build
# Output in dist/ directory
```

### Verification
```bash
# Lint code
npm run lint

# Preview production build
npm run preview
```

---

## ⚙️ Environment Setup

### Create `.env.local`

```bash
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=8000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Payment Keys
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# Image Hosting (ImgBB)
VITE_IMGBB_API_KEY=your_imgbb_key_here
```

### Getting Credentials

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project or use existing
3. Go to Project Settings → Service Accounts
4. Copy configuration object
5. Paste keys into `.env.local`

#### Stripe Setup
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to Developers → API Keys
3. Copy Publishable Key (pk_test_...)
4. Paste into `VITE_STRIPE_PUBLIC_KEY`

#### ImgBB Setup
1. Visit [ImgBB API](https://api.imgbb.com/)
2. Sign up for free account
3. Copy API Key
4. Paste into `VITE_IMGBB_API_KEY`

---

## 🔌 API Routes

### Base URL
```
Development: http://localhost:5000
Production: https://api.blood-aid.com
```

### Authentication
All protected routes require JWT token:
```
Authorization: Bearer <JWT_TOKEN>
```

### Donation Requests

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/donation-requests` | ❌ | List all requests |
| GET | `/my-donation-requests?email=x@x.com` | ✅ | User's requests |
| POST | `/donation-request` | ✅ | Create request |
| GET | `/donation-request/:id` | ❌ | Get single request |
| PATCH | `/donation-request/:id` | ✅ | Update request |
| DELETE | `/donation-request/:id` | ✅ | Delete request |
| PATCH | `/donation-request-status/:id` | ✅ | Update status |

### Blogs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/blogs` | ❌ | List all blogs |
| POST | `/blogs` | ✅ | Create blog |
| GET | `/blogs/:id` | ❌ | Get single blog |
| PATCH | `/blogs/:id` | ✅ | Update blog |
| DELETE | `/blogs/:id` | ✅ | Delete blog |

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users` | ✅ | List all users (admin) |
| GET | `/user/:email` | ✅ | Get user by email |
| PATCH | `/users/:id/role` | ✅ | Update user role |
| PATCH | `/users/:id/status` | ✅ | Block/unblock user |
| DELETE | `/users/:id` | ✅ | Delete user |

### Funding

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/fundings` | ❌ | List all donations |
| POST | `/fundings` | ✅ | Create donation |
| GET | `/funding-stats` | ❌ | Funding statistics |

### Contacts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/contacts` | ✅ | List messages (admin) |
| POST | `/contacts` | ❌ | Send message |
| DELETE | `/contacts/:id` | ✅ | Delete message |

---

## 📸 Screenshots

### Public Pages
```
[Placeholder: Hero Section with CTA]
[Placeholder: Blood Request Feed]
[Placeholder: Blog Listing]
[Placeholder: Funding Campaign]
```

### Dashboard Pages
```
[Placeholder: Admin Dashboard Overview]
[Placeholder: Manage Donations Table]
[Placeholder: Donation Request Details]
[Placeholder: Blog Management Interface]
```

### Mobile Views
```
[Placeholder: Mobile Navigation]
[Placeholder: Mobile Dashboard]
[Placeholder: Mobile Request Creation]
```

---

## 📚 What I Learned

### Frontend Development
- ✅ Building scalable React applications with custom hooks
- ✅ TanStack Query for efficient server state management
- ✅ Implementing query invalidation patterns for data synchronization
- ✅ Creating reusable component libraries with consistent design
- ✅ Tailwind CSS design system implementation
- ✅ Form handling with validation and error states
- ✅ Real-time search, filtering, and pagination patterns
- ✅ Responsive design across mobile, tablet, desktop

### State Management
- ✅ Context API for authentication state
- ✅ TanStack Query for server state and caching
- ✅ Custom hooks for API integration
- ✅ Loading states and error handling
- ✅ Query key patterns and cache invalidation

### Component Design
- ✅ Component composition and single responsibility
- ✅ Props drilling optimization
- ✅ Reusable component patterns (FilterBar, Pagination, StatCard)
- ✅ Compound components for complex UIs
- ✅ Dynamic component rendering

### Performance Optimization
- ✅ Lazy loading components and routes
- ✅ Memoization with React.memo and useMemo
- ✅ Code splitting strategies
- ✅ Build optimization with Vite
- ✅ Query caching strategies

### API Integration
- ✅ REST API consumption with Axios
- ✅ Request/response interceptors
- ✅ Error handling and retry logic
- ✅ Authentication with JWT tokens
- ✅ Secure API client implementation

### UX/Design
- ✅ Dark theme implementation with glassmorphism
- ✅ Loading states and skeleton screens
- ✅ Empty states and error messages
- ✅ Responsive grid layouts
- ✅ Animation and transitions with Framer Motion
- ✅ Accessibility considerations (WCAG)

### DevOps & Deployment
- ✅ Environment-based configuration
- ✅ Vite build optimization
- ✅ ESLint code quality
- ✅ Git workflow and version control
- ✅ Production build validation

### Domain Knowledge
- ✅ Blood donation process and requirements
- ✅ Healthcare system workflows
- ✅ Emergency response procedures
- ✅ NGO/non-profit operations
- ✅ Payment processing (Stripe)
- ✅ Firebase authentication & real-time features

---

## 🔮 Future Improvements

### Phase 1: Core Features (3 months)
- [ ] **Real-time WebSocket Notifications** - Live donor updates via Socket.io
- [ ] **Mobile App** - React Native/Flutter cross-platform app
- [ ] **SMS Notifications** - Twilio integration for urgent alerts
- [ ] **Donor Rating System** - Community ratings & reviews
- [ ] **Advanced Analytics** - District-wise heat maps, demand forecasting

### Phase 2: Scaling Features (6 months)
- [ ] **Batch Import** - Excel bulk upload for donors
- [ ] **API Rate Limiting** - Prevent abuse
- [ ] **Redis Caching** - Improve response times
- [ ] **GraphQL API** - Alternative to REST
- [ ] **Admin Audit Logs** - Track all system changes

### Phase 3: Monetization (9 months)
- [ ] **Subscription Plans** - Premium features for blood banks
- [ ] **SMS Alerts** - Paid premium notifications
- [ ] **API for Hospitals** - B2B API access
- [ ] **Marketplace** - Blood bank partnerships

### Phase 4: Global Expansion (12 months)
- [ ] **Multi-country Support** - Localization & translation
- [ ] **Multi-language** - Bengali, English, Arabic, etc.
- [ ] **International Standards** - WHO compliance
- [ ] **Enterprise Features** - Custom deployments

### Technical Debt
- [ ] Upgrade to TypeScript for type safety
- [ ] Add comprehensive test suite (Jest, React Testing Library)
- [ ] Implement E2E tests (Cypress/Playwright)
- [ ] Performance monitoring (Sentry)
- [ ] SEO optimization (next-meta, structured data)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

```bash
# Fork repository
git clone https://github.com/YOUR_USERNAME/Blood-Aid-client.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes & commit
git commit -m "Add feature: description"

# Push to fork
git push origin feature/amazing-feature

# Open Pull Request
# (GitHub will guide you through it)
```

### Code Standards
- Follow ESLint rules: `npm run lint`
- Format code: `npm run format`
- Write meaningful commit messages
- Add comments for complex logic
- Test changes before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Aashikur Rahman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support & Contact

### Questions?
- 📧 Email: [mdaashikur@example.com]
- 💬 GitHub Issues: [Report Bug](https://github.com/aashikur/Blood-Aid-client/issues)
- 🐦 Twitter: [@yourhandle]
- 🔗 LinkedIn: [www.linkend.com]

### Resources
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TanStack Query Docs](https://tanstack.com/query)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)

### Acknowledgments
- 🙏 Thanks to all contributors
- 💖 Special thanks to the blood donation community
- 🏥 Built in partnership with healthcare organizations

---

<div align="center">

**Made with ❤️ to save lives**

⭐ If this project helped you, please give it a star!

[Back to Top](#-bloodaid-emergency-blood-donation-platform)

</div>
