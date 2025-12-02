# 🩸 Blood-Aid: Blood Donation Management System

<div align="center">

![Blood-Aid Banner](https://img.shields.io/badge/Status-Active%20Development-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web-red?style=for-the-badge)

**A comprehensive full-stack web application connecting blood donors with patients in critical need.**

[Live Demo](#-live-site) • [Backend API](#-api-integration) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Quick Navigation

- [Overview](#-overview)
- [Problems Solved](#-problems-solved)
- [Technology Stack](#-technology-stack)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Installation & Development](#-installation--development)
- [API Integration](#-api-integration)
- [Project Improvements](#-project-improvements)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 Overview

**Blood-Aid** is a mission-driven platform that addresses the critical shortage of blood donations and streamlines the process of finding compatible blood donors. The system connects:

- **🩸 Donors** - Register and manage their blood donation profile
- **🏥 Patients** - Request blood donations in emergencies
- **💰 Contributors** - Make monetary donations via Stripe integration
- **👨‍💼 Administrators** - Manage users, blogs, and monitor system statistics

### Problem Statement

In many regions, blood banks struggle to maintain adequate inventory, and patients face delays in finding compatible donors. Blood-Aid eliminates these barriers through:

- **Real-time donor search** by blood group and location
- **Emergency notification system** for urgent requests
- **Centralized blog platform** for blood donation awareness
- **Transparent funding tracking** for community support
- **Role-based management system** for hospitals and admins

---

## 🔧 Problems Solved

### Before Implementation (Frontend Issues)

| Issue | Impact | Solution |
|-------|--------|----------|
| **Hardcoded Localhost URLs** | Frontend breaks in production; requires manual reconfiguration | ✅ Environment-based URL routing with centralized API service |
| **Inconsistent Data Fetching** | Mixed native fetch & axios; poor error handling; no auth consistency | ✅ Unified axios-based API layer with standardized error handling |
| **No Centralized API Client** | Difficult to maintain; duplicated logic; scattered error handling | ✅ Created modular API services (userAPI, donationAPI, blogAPI, fundingAPI) |
| **Missing Environment Config** | `.env` variables defined but never used | ✅ Full integration with VITE_API_URL |
| **Auth Token Issues** | Some endpoints missing JWT headers; inconsistent authentication | ✅ Centralized token management in useAxiosSecure hook |
| **Backend Integration Mismatch** | Frontend endpoints didn't match backend API documentation | ✅ Aligned all 30+ endpoints with official specs |
| **No Error Handling** | No user feedback on API failures; console errors only | ✅ Response interceptors for 401, 403, 500 errors |

### After Implementation ✅

✅ **All API calls use centralized configuration**  
✅ **Consistent error handling with user feedback**  
✅ **Environment-aware URL routing (dev/prod)**  
✅ **Modular, maintainable API layer**  
✅ **Full compliance with backend API specification**  
✅ **Professional error interceptors**  
✅ **Request timeout handling (8s)**  
✅ **Type-consistent response format**  

---

## 🛠️ Technology Stack

### Frontend Framework
- **React** `19.1.0` - UI library with modern hooks
- **Vite** `7.0.6` - Lightning-fast build tool
- **Tailwind CSS** `4.1.11` - Utility-first CSS framework
- **DaisyUI** `5.0.47` - Pre-built Tailwind components

### State Management & Data Fetching
- **TanStack React Query** `5.83.0` - Server state management & caching
- **Axios** `1.11.0` - HTTP client (centralized API layer)
- **Framer Motion** `12.23.9` - Smooth, performant animations

### Authentication & Backend Integration
- **Firebase** `11.10.0` - User authentication & real-time features
- **Express.js Backend** - REST API (separate repository)
- **MongoDB** - NoSQL database (backend)

### Payment & Integration
- **Stripe** `7.6.1` - Payment gateway integration
- **Stripe React Components** `3.8.0` - Pre-built payment UI

### UI & User Experience
- **React Router** `7.7.0` - Client-side routing
- **React Icons** `5.5.0` - Comprehensive icon library
- **Lottie React** `2.4.1` - High-quality animations (JSON format)
- **SweetAlert2** `11.22.2` - Beautiful, responsive alerts

### Development & Quality
- **ESLint** `9.31.0` - Code quality & linting
- **npm** - Package management

---

## ✨ Key Features

### 🔐 Authentication & User Management
- Email/password authentication via Firebase
- Google OAuth single sign-on
- Role-based access control (Donor, Patient, Volunteer, Admin)
- User profile management with blood group tracking
- Location-based user identification (Bangladesh district/upazila)
- User status management (active/blocked)

### 🔍 Donor Discovery System
- **Smart Donor Search** - Filter by blood group + location
- **Dynamic Search** - Free-text query across all fields
- **Verified Hospitals Listing** - Hospital network management
- **Real-time Availability** - Active donor tracking
- **Contact Information** - Direct donor contact details

### 🩸 Blood Donation Request Management
- Create urgent blood requests with hospital details
- Track request status (pending → in-progress → completed)
- Donor response system with automatic matching
- Request history and analytics for patients
- Emergency level indication (high, medium, low)

### 💰 Funding & Donation System
- **Stripe Payment Integration** - Secure payment processing
- Monetary donation tracking
- Transaction history and receipts
- Tax-compliant donation records
- Real-time funding statistics

### 📝 Blog & Awareness Platform
- Publish blood donation awareness content
- Draft/publish workflow for administrators
- Featured blog post highlighting
- Educational resources library
- Community storytelling

### 📊 Comprehensive Admin Dashboard
- System statistics (users, requests, blogs, donations)
- User management (create, edit, delete, block/unblock)
- Blog moderation and publishing
- Donation request oversight
- Contact form submissions management
- Role-based admin controls

### 📱 Responsive & Accessible Design
- Mobile-first responsive design
- Desktop, tablet, and mobile optimization
- Dark mode support
- Accessibility compliance (WCAG 2.1)
- Progressive enhancement

---

## 🏗️ System Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│          FRONTEND (React 19 + Vite)                     │
│                                                           │
│  Components Layer                                        │
│  ├── Public Pages (Home, Blog, Search, Urgent)          │
│  ├── Dashboard (Admin, Donor, Volunteer)                │
│  └── Auth Pages (Login, Register)                       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Centralized API Service Layer (Services)               │
│  ├── userAPI.js ── POST /add-user, GET /get-user-role   │
│  ├── donationAPI.js ─ POST /donation-request, GET /...  │
│  ├── blogAPI.js ──── POST /blogs, PATCH /blogs/:id      │
│  ├── fundingAPI.js ─ POST /create-payment-intent        │
│  └── publicAPI.js ── GET /search-donors, /stats         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Axios Configuration (apiClient.js)                     │
│  ├── Base URL: VITE_API_URL from .env                   │
│  ├── Timeout: 8 seconds                                 │
│  ├── Headers: Content-Type, Authorization (Bearer)      │
│  └── Interceptors: 401, 403, 500 error handling         │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/HTTP
        ┌────────────▼──────────────┐
        │  BACKEND (Express.js)     │
        │                           │
        │  30+ REST Endpoints       │
        │  Firebase Token Auth      │
        │  MongoDB Integration      │
        │  Stripe Payment Gateway   │
        │                           │
        └────────────┬──────────────┘
                     │
        ┌────────────▼──────────────┐
        │  MongoDB Database         │
        │                           │
        │  Collections:             │
        │  ├── users                │
        │  ├── donationRequests     │
        │  ├── blogs                │
        │  ├── fundings             │
        │  └── contacts             │
        └───────────────────────────┘
```

---

## 🚀 Live Site

- **Frontend:** [https://blood-aid-now.web.app/](https://blood-aid-now.web.app/)
- **API:** [https://blood-lagbe-server.vercel.app](https://blood-lagbe-server.vercel.app)

---

## 📁 Project Structure

```
blood-aid-client/
├── src/
│   ├── services/                      # ✨ NEW: Centralized API Services
│   │   ├── apiClient.js               # Base axios config with VITE_API_URL
│   │   ├── userAPI.js                 # User management endpoints
│   │   ├── donationAPI.js             # Blood donation requests
│   │   ├── blogAPI.js                 # Blog management
│   │   ├── fundingAPI.js              # Stripe & donations
│   │   └── publicAPI.js               # Public search & stats
│   │
│   ├── hooks/
│   │   ├── axiosPublic.js             # ✅ FIXED: Uses VITE_API_URL
│   │   ├── useAxiosSecure.js          # ✅ FIXED: With error interceptors
│   │   ├── useRole.jsx
│   │   ├── useCountUp.jsx
│   │   └── useDistrictUpazila.js
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── loading/
│   │   ├── ui/
│   │   ├── funding/
│   │   ├── home/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── _fronted/          # Public pages
│   │   │   ├── home/
│   │   │   ├── auth/
│   │   │   ├── blog/
│   │   │   ├── search/
│   │   │   └── ...
│   │   └── _dashboard/        # Admin/User dashboard
│   │       ├── admin/
│   │       ├── donor/
│   │       ├── volunteer/
│   │       └── shared/
│   │
│   ├── providers/
│   │   └── AuthProvider.jsx   # Firebase context
│   │
│   ├── layouts/
│   ├── Routers/
│   ├── firebase/
│   ├── data/
│   └── main.jsx
│
├── public/
├── .env                       # ✅ FIXED: Now uses VITE_API_URL
├── .env.example              # ✨ NEW: Environment template
├── .gitignore
├── vite.config.js
├── tailwind.config.js
├── jsconfig.json
├── eslint.config.js
├── package.json
├── API_DOCUMENTATION.md      # Backend API specs
├── BACKEND_INTEGRATION_ANALYSIS.md  # Detailed analysis
└── README.md                 # This file
```

---

## ⚙️ Environment Setup

### Prerequisites
- **Node.js** `14.0+` ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git**
- **Backend Server** running on port 5000 (for local development)

### 1. Clone Repository

```bash
git clone https://github.com/aashikur/blood-aid-client.git
cd blood-aid-client
```

### 2. Create Environment File

```bash
cp .env.example .env
```

### 3. Configure Environment Variables

Edit `.env` with your credentials:

```dotenv
# ========================================
# BACKEND API
# ========================================
# For LOCAL DEVELOPMENT:
VITE_API_URL=http://localhost:5000

# For PRODUCTION:
# VITE_API_URL=https://blood-lagbe-server.vercel.app

# ========================================
# FIREBASE AUTHENTICATION
# ========================================
# Get from: https://console.firebase.google.com
VITE_apiKey=YOUR_API_KEY
VITE_authDomain=YOUR_AUTH_DOMAIN
VITE_projectId=YOUR_PROJECT_ID
VITE_storageBucket=YOUR_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_SENDER_ID
VITE_appId=YOUR_APP_ID

# ========================================
# STRIPE PAYMENT
# ========================================
# Get from: https://dashboard.stripe.com
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_KEY
```

### 4. Obtain Credentials

**Firebase:**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project or select existing
3. Enable Authentication (Email/Password + Google)
4. Copy credentials to `.env`

**Stripe:**
1. Create account at [stripe.com](https://stripe.com)
2. Get Publishable Key from Dashboard
3. Add to `.env`

---

## 📦 Installation & Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
# Start Vite dev server (http://localhost:5173)
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint -- --fix
```

---

## 🔌 API Integration

### Centralized API Service Layer

All API calls use modular services. Instead of direct axios calls, import from services:

#### Example: Fetch Donation Requests

```javascript
// ❌ OLD (Direct axios):
const { data } = await axiosPublic.get("/public-donation-requests");

// ✅ NEW (Service-based):
import { getAllDonationRequests } from '@/services/donationAPI';
const result = await getAllDonationRequests();
if (result.success) {
  console.log(result.data);
}
```

### Available API Services

| Service | Functions | Purpose |
|---------|-----------|---------|
| **userAPI.js** | registerUser, getUserRole, updateUserProfile, deleteUser | User management |
| **donationAPI.js** | createDonationRequest, getAllDonationRequests, respondToDonationRequest | Blood requests |
| **blogAPI.js** | createBlog, getAllBlogs, publishBlog, deleteBlog | Blog management |
| **fundingAPI.js** | createPaymentIntent, saveFunding, getAllFundings | Donations |
| **publicAPI.js** | searchDonors, getDashboardStats, submitContactForm | Public endpoints |

### Standard Response Format

All API services return:

```javascript
{
  success: true,      // Operation succeeded
  data: {...}         // Response data
}

// On error:
{
  success: false,
  error: "Error message"
}
```

### Error Handling

Errors are automatically caught and formatted:

```javascript
import { getAllDonationRequests } from '@/services/donationAPI';

async function loadRequests() {
  const result = await getAllDonationRequests();
  
  if (result.success) {
    // Handle success
    console.log(result.data);
  } else {
    // Handle error
    console.error(result.error);
    // Show user feedback via toast/alert
  }
}
```

### Authentication

For protected endpoints, pass Firebase token:

```javascript
import { getUserRole } from '@/services/userAPI';

// Get current user token
const user = firebase.auth().currentUser;
const token = await user.getIdToken();

// Call protected endpoint
const result = await getUserRole(token);
```

---

## ✅ Project Improvements Made

### Priority 1: Critical Fixes ✅

- ✅ **Fixed hardcoded API URLs**
  - Now uses `VITE_API_URL` from environment
  - Falls back to `localhost:5000` for development

- ✅ **Created centralized API layer**
  - 5 modular service files
  - Consistent error handling
  - Type-safe responses

- ✅ **Fixed fetch() to axios**
  - LiveImpact.jsx updated
  - ShortageTicker.jsx updated
  - Consistent with rest of codebase

- ✅ **Added environment config**
  - `.env` properly configured
  - `.env.example` for documentation
  - Clear comments and structure

### Priority 2: Structure & Maintenance ✅

- ✅ **Error interceptors** - 401, 403, 500 handling
- ✅ **Request timeout** - 8 seconds per request
- ✅ **JSDoc documentation** - All services documented
- ✅ **Backend alignment** - All endpoints match documentation

### Priority 3: Developer Experience ✅

- ✅ **Professional README** - Clear setup instructions
- ✅ **API examples** - How to use each service
- ✅ **Architecture diagram** - Visual system overview
- ✅ **Troubleshooting guide** - Common issues & solutions

---

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Fixed API integration and optimized structure"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - New Project → Select repository
   - Set environment variables

3. **Set Environment Variables in Vercel:**
   - `VITE_API_URL` = Production backend URL
   - `VITE_apiKey` = Firebase API key
   - `VITE_authDomain` = Firebase auth domain
   - ... (all other env vars)

4. **Deploy:** Click Deploy button

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

### 1. Fork & Clone
```bash
git clone https://github.com/yourusername/blood-aid-client.git
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Use API services (not direct axios)
- Add error handling
- Follow existing code style
- Test thoroughly

### 4. Commit & Push
```bash
git add .
git commit -m "Add feature: description"
git push origin feature/your-feature-name
```

### 5. Create Pull Request

---

## 📚 Documentation

- **API Specs:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Backend Analysis:** [BACKEND_INTEGRATION_ANALYSIS.md](./BACKEND_INTEGRATION_ANALYSIS.md)
- **Backend Repo:** [blood-lagbe-server](https://github.com/aashikur/blood-lagbe-server)

---

## 🐛 Troubleshooting

### Backend Connection Issues
- Verify `VITE_API_URL` in `.env` matches running backend
- Check backend is running: `http://localhost:5000`
- See console for detailed error messages

### Firebase Authentication Error
- Verify `.env` Firebase credentials
- Check Authentication is enabled in Firebase Console
- Ensure email/password provider is configured

### Stripe Payment Issues
- Use test keys from Stripe Dashboard
- Use test card: `4242 4242 4242 4242`
- Verify publishable key in `.env`

### Development Server Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📞 Support & Contact

- **GitHub Issues:** [Report Bugs](https://github.com/aashikur/blood-aid-client/issues)
- **Email:** admin@bloodaid.com
- **Backend:** [blood-lagbe-server](https://github.com/aashikur/blood-lagbe-server)

---

## 📊 Statistics

- **Total API Endpoints:** 30+
- **React Components:** 50+
- **Service Functions:** 40+
- **Supported Blood Groups:** 8
- **Bangladesh Districts:** 64

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 🙏 Credits & Acknowledgments

- **Firebase** - Authentication infrastructure
- **Stripe** - Payment processing
- **React & Vite** - Modern development tools
- **TailwindCSS** - Utility-first styling
- **All contributors** - Making this possible

---

<div align="center">

### ❤️ Made with love to save lives 🩸

**Together, we can ensure no one waits for blood when they need it most.**

[⬆ Back to Top](#-bloodaid-blood-donation-management-system)

</div>
│   │   │   ├── StatsCards.jsx
│   │   │   └── TopNotice.jsx
│   │   ├── loading
│   │   │   ├── DashboardLoading.jsx
│   │   │   └── SidebarLoading.jsx
│   │   └── ui
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── PhotoGallery.jsx
│   │       ├── ScrollToTop.jsx
│   │       ├── ShinyButton.jsx
│   │       └── ToggleLightDark.jsx
│
│   ├── data
│   │   ├── bd-districts.json
│   │   └── bd-upazilas.json
│
│   ├── firebase
│   │   └── firebase.config.js
│
│   ├── hooks
│   │   ├── axiosPublic.js
│   │   ├── useAxiosSecure.js
│   │   ├── useCountUp.jsx
│   │   ├── useDashboardStars.jsx
│   │   ├── useDistrictUpazila.js
│   │   └── useRole.jsx
│
│   ├── layouts
│   │   ├── DashboardLayout.jsx
│   │   └── RootLayout.jsx
│
│   ├── pages
│   │   ├── _dashboard
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   ├── DonationRequestsPublic.jsx
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── ProfileDashboard.jsx
│   │   │   ├── UserDetailsDashboard.jsx
│   │   │   ├── VolunteerDashboard.jsx
│   │   │   ├── admin
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── DashboardSidebarAdmin.jsx
│   │   │   │   ├── blogs
│   │   │   │   │   ├── AddBlogAdmin.jsx
│   │   │   │   │   ├── EditBlogAdmin.jsx
│   │   │   │   │   ├── ManageBlogs.jsx
│   │   │   │   │   └── ViewBlogAdmin.jsx
│   │   │   │   ├── funding
│   │   │   │   │   ├── AllFundingAdmin.jsx
│   │   │   │   │   └── ViewFundingAdmin.jsx
│   │   │   │   ├── requests
│   │   │   │   │   ├── AllRequestsAdmin.jsx
│   │   │   │   │   ├── EditRequestAdmin.jsx
│   │   │   │   │   ├── ManageDonationsAdmin.jsx
│   │   │   │   │   └── ViewRequestAdmin.jsx
│   │   │   │   └── users
│   │   │   │       └── ManageUserAdmin.jsx
│   │   │   ├── donor
│   │   │   │   ├── DashboardSidebarDonor.jsx
│   │   │   │   ├── HomeDonor.jsx
│   │   │   │   └── requests
│   │   │   │       ├── CreateDonationRequestDonor.jsx
│   │   │   │       ├── EditRequestDonor.jsx
│   │   │   │       └── ViewRequestDonor.jsx
│   │   │   ├── shared
│   │   │   │   ├── AddBlogs.jsx
│   │   │   │   ├── contacts
│   │   │   │   │   └── ViewContactsDashboard.jsx
│   │   │   │   ├── funding
│   │   │   │   │   ├── FundingForm.jsx
│   │   │   │   │   ├── FundingStatCard.jsx
│   │   │   │   │   ├── FundingTable.jsx
│   │   │   │   │   └── MyFundingTable.jsx
│   │   │   │   ├── requests
│   │   │   │   │   ├── CreateDonationRequestDashboard.jsx
│   │   │   │   │   ├── MyDonationRequestsDashboard.jsx
│   │   │   │   │   ├── MyDonationRequestsDetails.jsx
│   │   │   │   │   └── MyDonationRequestsDetailsEdit.jsx
│   │   │   │   └── users
│   │   │   │       ├── ManageUsers.jsx
│   │   │   │       └── UserModal.jsx
│   │   │   └── volunteer
│   │   │       ├── DashboardSidebarVolunteer.jsx
│   │   │       ├── HomeVolunteer.jsx
│   │   │       ├── blogs
│   │   │       │   ├── AddBlogVolunteer.jsx
│   │   │       │   ├── EditBlogVolunteer.jsx
│   │   │       │   └── ManageBlogsVolunteer.jsx
│   │   │       ├── funding
│   │   │       │   ├── AllFundingVolunteer.jsx
│   │   │       │   └── ViewFundingVolunteer.jsx
│   │   │       └── requests
│   │   │           ├── AllRequestsVolunteer.jsx
│   │   │           ├── EditRequestVolunteer.jsx
│   │   │           └── ViewRequestVolunteer.jsx
│   │   └── _fronted
│   │       ├── about
│   │       │   └── About.jsx
│   │       ├── auth
│   │       │   ├── Error.jsx
│   │       │   ├── Login.jsx
│   │       │   └── Register.jsx
│   │       ├── blog
│   │       │   ├── Blog.jsx
│   │       │   ├── BlogCard.jsx
│   │       │   ├── BlogCategoryFilter.jsx
│   │       │   ├── BlogDetails.jsx
│   │       │   └── BlogList.jsx
│   │       ├── contact
│   │       │   └── Contact.jsx
│   │       ├── funding
│   │       │   └── FundingPage.jsx
│   │       ├── home
│   │       │   ├── CTASection.jsx
│   │       │   ├── ContactSection.jsx
│   │       │   ├── DetailsPage.jsx
│   │       │   ├── Error.jsx
│   │       │   ├── FeaturesSection.jsx
│   │       │   ├── HeroSection.jsx
│   │       │   ├── Home.jsx
│   │       │   ├── Loading.jsx
│   │       │   ├── TestimonialsSection.jsx
│   │       ├── search
│   │       │   ├── Search.jsx
│   │       │   └── Search4.jsx
│   │       └── shared
│   │           ├── Banner.jsx
│   │           ├── Footer.jsx
│   │           ├── Navbar.jsx
│   │           └── Social.jsx
│
│   ├── providers
│   │   └── AuthProvider.jsx
│
│   ├── utils
│   │   └── bdLocationData.json
│
│   ├── index.css
│   └── main.jsx
```</pre> 
---

## 🔑 How to Use

- **Home, Blog, Funding, Contact:**  
  - Publicly accessible, no login required
- **Dashboard:**  
  - Login required (role-based access)
  - Admin/volunteer/donor see different features
- **Funding:**  
  - Anyone can donate from the public funding page
  - Dashboard shows personal funding history (My Funding)
- **Contact:**  
  - Only logged-in users can send messages (Swal alert if not logged in)

---

## 📝 Main Pages & Components

- `/` - Home (Banner, Features, FAQ, Contact, Blog preview)
- `/blog` - Public blog list and details
- `/funding` - Public funding page (Stripe payment + funding table)
- `/contact` - Contact form (subject, message, login check)
- `/search` - Donor search (option-based & dynamic)
- `/dashboard` - Role-based dashboard (admin, volunteer, donor)
- `/dashboard/contacts` - Admin/volunteer contact message view (grid)
- `/dashboard/funding` - All funding (admin/volunteer), My funding (donor)
- `/dashboard/my-donation-requests` - My blood requests (donor)
- `/dashboard/all-blood-donation-request` - All requests (admin/volunteer)
- `/dashboard/profile` - Profile view/edit

---

## 🔐 Authentication

- Firebase Auth (email/password, Google)
- JWT token for private API calls
- Role-based access (admin, volunteer, donor)
- Block/unblock user, role change (admin only)

---

## 💡 Technologies Used

- React, Vite, Tailwind CSS, DaisyUI, Framer Motion, Lottie
- Firebase Auth
- Stripe (payment)
- Axios, React Query
- Node.js, Express, MongoDB (backend)

---

## 🛠️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/blood-aid-client.git

# Navigate to project directory
cd blood-aid-client

# Install dependencies
npm install

# Create .env file and add your Firebase/Stripe config

# Start the development server
npm run dev
📢 Need Help?
For any feature, bug, or extension,
just ask your AI assistant with this README as context!
Example:
"How to add a new blog post page?"
"How to show only active donors in search?"
"How to add a new stat card to the dashboard?"
This README contains all the context, structure, and feature details needed for any AI model or developer to continue, extend, or debug the project without further explanation.

Live Site: https://blood-aid-now.web.app/
API: http://localhost:5000//


