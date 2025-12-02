# Blood-Aid Frontend-Backend Integration Analysis Report
**Date:** December 2, 2025  
**Project:** Blood-Aid Client (React + Vite)  
**Analysis Type:** Complete Frontend Backend Call Flow & Data Fetching Integration

---

## 📋 EXECUTIVE SUMMARY

Your Blood-Aid frontend is experiencing **data loading failures** due to multiple critical issues:

1. **Hardcoded localhost API URL** (not using .env variables)
2. **Mismatch between local dev server and production backend URL**
3. **Missing CORS configuration** (likely on backend)
4. **Inconsistent fetch methods** (mix of axios and native fetch)
5. **Backend URL exists in .env but not being used** in axios instances

---

## 🏗️ WEBSITE STRUCTURE OVERVIEW

### Root Layout Architecture
```
Blood-Aid Client
├── Authentication Layer (Firebase + JWT)
├── Frontend Routes (_fronted/)
│   ├── Home & Landing
│   ├── Blog, Drives, Hospitals, Funding
│   └── Search, Urgent, About
├── Dashboard Routes (_dashboard/)
│   ├── Admin (manage users, donations, blogs, funding)
│   ├── Donor (view/create requests, profile)
│   └── Volunteer (manage requests, blogs)
└── Shared Components & Services
```

### Key Data Flows
- **Public Pages**: Use `axiosPublic` (no authentication)
- **Dashboard Pages**: Use `useAxiosSecure` (with JWT token)
- **Statistics**: Use native `fetch()` (inconsistent pattern)
- **File Uploads**: Direct fetch to ImgBB API

---

## 🔌 DATA FETCH METHOD BREAKDOWN

### 1. **Axios-Based Fetching (Primary Method)**

#### `axiosPublic.js` - Public API Client
```javascript
// File: src/hooks/axiosPublic.js
const instance = axios.create({
  baseURL: "http://localhost:5000/",  // ⚠️ HARDCODED - NOT USING .env
});
```

**Usage Locations:**
- Donation requests fetching
- Blog data fetching
- User registration/login
- Contact form submissions
- Funding operations

#### `useAxiosSecure.js` - Authenticated API Client
```javascript
// File: src/hooks/useAxiosSecure.js
const instance = axios.create({
  baseURL: "http://localhost:5000/",  // ⚠️ HARDCODED
  headers: {
    Authorization: `Bearer ${user.accessToken}`,
  },
});
```

**Usage Locations:**
- Dashboard statistics
- Admin operations
- User profile management

### 2. **Native Fetch API (Secondary Method)**

**Locations:**
- `LiveImpact.jsx`: Fetching `/admin-dashboard-stats` and `/hospitals?verified=true`
- `ShortageTicker.jsx`: Fetching `/stats/shortage`
- Image uploads to ImgBB API

**Issues:**
- Not using base URL configuration
- Relative paths might fail in different environments

### 3. **React Query Integration**

**Usage Pattern:**
```javascript
const { data: requests = [], isLoading, isError } = useQuery({
  queryKey: ["public-donation-requests"],
  queryFn: async () => {
    const { data } = await axiosPublic.get("/public-donation-requests");
    return data;
  },
});
```

**Components Using React Query:**
- `DonationRequestsPublic.jsx`
- `ManageDonationsAdmin.jsx`
- `Blog.jsx`
- `FundingTable.jsx`

---

## 🔐 Environment Configuration

### Current `.env` File
```
VITE_apiKey=AIzaSyDeiS4kiFlW2AUwPyXrhvN16hWoOY5OJjs
VITE_authDomain=blood-aid-now.firebaseapp.com
VITE_projectId=blood-aid-now
VITE_storageBucket=blood-aid-now.firebasestorage.app
VITE_messagingSenderId=675520499222
VITE_appId=1:675520499222:web:65f01658bcb98343496f37

VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Roo1q7wNgNp86iSdFGsMCnTvRoLdzV2g9bEAuNDD30bFVUsKgrG090CbbP661dQL1rYAqZCW3B5743YEA7HeDtd00W79GoBOJ

VITE_BACKEND_URL=https://blood-lagbe-server.vercel.app/
```

### ⚠️ CRITICAL ISSUES:

1. **`VITE_BACKEND_URL` is defined but NEVER USED** in axios instances
2. Axios instances hardcoded to `http://localhost:5000/`
3. Development vs Production URL mismatch

---

## 📡 API ENDPOINTS BEING CALLED

### Public Endpoints (axiosPublic)
```
POST   /add-user                          - Register/track user login
POST   /contacts                          - Contact form submission
POST   /create-payment-intent             - Stripe payment setup
POST   /fundings                          - Create funding record
POST   /blogs?status=published            - Fetch published blogs
GET    /blogs                             - Get all blogs
GET    /public-donation-requests          - Fetch all donation requests
GET    /hospitals?verified=true           - Get verified hospitals
GET    /fundings?page=x&limit=y           - Paginated funding list
PATCH  /donation-request/{id}/respond     - Respond to donation request
DELETE /donation-request/{id}             - Delete donation request
```

### Authenticated Endpoints (useAxiosSecure)
```
GET    /admin-dashboard-stats             - Dashboard statistics
GET    /partners-endpoint                 - Partner testimonials
```

### Native Fetch Endpoints
```
GET    /stats/shortage                    - Blood shortage data
GET    /admin-dashboard-stats             - Dashboard stats (duplicate call)
GET    /hospitals?verified=true           - Hospital list
```

---

## 🔴 ROOT CAUSES OF DATA NOT LOADING

### Problem 1: Hardcoded Localhost URLs
**File:** `src/hooks/axiosPublic.js` & `src/hooks/useAxiosSecure.js`

```javascript
// ❌ CURRENT (BROKEN):
const instance = axios.create({
  baseURL: "http://localhost:5000/",  // Hard-coded for local dev only
});
```

**Impact:**
- Production builds fail because they still point to `localhost:5000`
- Requires manual URL changes for each environment
- CORS issues between frontend (3000) and backend (5000)

### Problem 2: Backend URL Not Being Used
**File:** `.env`

```
VITE_BACKEND_URL=https://blood-lagbe-server.vercel.app/
```

This variable exists but is **never imported or used** anywhere in the codebase.

### Problem 3: Inconsistent Fetch Methods
- Some endpoints use `axios`
- Others use native `fetch()`
- No centralized error handling
- Inconsistent timeout/retry logic

### Problem 4: Missing Authentication in Native Fetch Calls
`LiveImpact.jsx` and `ShortageTicker.jsx` use `fetch()` without:
- Bearer tokens
- Error handling
- Loading states
- Retry logic

---

## 🔧 HOW TO TRANSFER LOCALHOST TO SERVER URI

### Step 1: Update Environment Variables

Create/update `.env` with:
```
# Development
VITE_API_URL=http://localhost:5000

# Or for production
VITE_API_URL=https://blood-lagbe-server.vercel.app
```

### Step 2: Modify Axios Instances

**File: `src/hooks/axiosPublic.js`**
```javascript
import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/",
  });
  return instance;
};

export default useAxiosPublic;
```

**File: `src/hooks/useAxiosSecure.js`**
```javascript
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return instance;
};

export default useAxiosSecure;
```

### Step 3: Update Native Fetch Calls

**File: `src/pages/_fronted/home/homeSections/LiveImpact.jsx`**

```javascript
// ❌ CURRENT:
const statsEndpoint = "/admin-dashboard-stats";

// ✅ FIXED:
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const statsEndpoint = `${baseURL}/admin-dashboard-stats`;
```

---

## 🎯 CENTERWISE CONTROL & FLOW ANALYSIS

### Control Flow by Route

#### 1. **Public Pages** (Home, Blog, Search)
```
User Access → axiosPublic Interceptor → Backend
     ↓
   No Auth Header
     ↓
   Public Endpoints (/public-donation-requests, /blogs)
```

#### 2. **Authentication Flow**
```
Login/Register → Firebase Auth → JWT Token Generated
     ↓
Token stored in context (user.accessToken)
     ↓
useAxiosSecure adds: Authorization: Bearer {token}
     ↓
Dashboard Access Granted
```

#### 3. **Dashboard Access** (Admin/Donor/Volunteer)
```
PrivateRoute Check → useRole() → axiosSecure Interceptor
     ↓
Authenticated Endpoints (/admin-dashboard-stats)
     ↓
Role-based rendering (AdminDashboard/DonorDashboard/VolunteerDashboard)
```

#### 4. **Data Flow Issues**

**❌ Current Broken Flow:**
```
Component Render
    ↓
axiosPublic.get("/endpoint")
    ↓
Request to http://localhost:5000/endpoint (hardcoded)
    ↓
Backend Not Running Locally / Wrong URL in Production
    ↓
CORS Error OR Connection Refused
    ↓
Data Not Loading
```

---

## 🚨 SERVER ERROR ROOT CAUSES

### Error 1: CORS Failures
**Symptom:** `Access to XMLHttpRequest blocked by CORS policy`

**Cause:** Frontend (http://localhost:3000) requesting Backend (http://localhost:5000)

**Fix:** Backend must have CORS enabled:
```javascript
// Backend Express setup
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://blood-aid-client.vercel.app'],
  credentials: true
}));
```

### Error 2: 404 Not Found
**Symptom:** `404 /public-donation-requests`

**Cause:** Endpoint doesn't exist on backend OR wrong base URL

**Diagnostic:**
- Check if backend is running on port 5000
- Verify endpoint exists: `GET http://localhost:5000/public-donation-requests`

### Error 3: 401 Unauthorized
**Symptom:** `401 Unauthorized` in dashboard pages

**Cause:** Token missing or invalid in `useAxiosSecure` requests

**Check:**
```javascript
// In browser console:
localStorage.getItem('authToken');  // Should have value
// Or check Firebase auth state
```

### Error 4: Network Timeout
**Symptom:** Requests hang indefinitely

**Cause:** Backend not running locally OR production URL unreachable

**Fix:**
```javascript
// Add timeout to axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // 5 seconds
});
```

---

## 📊 DETAILED CALL MAPPING TABLE

| Component | Endpoint | Method | Auth | Issue |
|-----------|----------|--------|------|-------|
| DonationRequestsPublic | /public-donation-requests | GET | No | Hardcoded localhost |
| ManageDonationsAdmin | /public-donation-requests | GET | Yes | Using axiosPublic instead of axiosSecure |
| Blog | /blogs | GET | No | Hardcoded localhost |
| LiveImpact | /admin-dashboard-stats | GET | No | Using fetch(), not axios |
| ShortageTicker | /stats/shortage | GET | No | Relative path, uses fetch() |
| ContactUs | /contacts | POST | No | Hardcoded localhost |
| FundingForm | /create-payment-intent | POST | No | Hardcoded localhost |
| AuthProvider | /add-user | POST | No | Hardcoded localhost |
| Dashboard | (useRole hook) | GET | Yes | May fail if token not in header |

---

## 💾 CONFIGURATION BEST PRACTICES

### Vite Configuration
```javascript
// vite.config.js - Already configured correctly
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

### Environment Variables Strategy
```
.env                   (Development - localhost)
.env.production        (Production - server URL)
.env.local            (Local overrides, not committed)
```

### Vite Environment Access Pattern
```javascript
// Always prefix with VITE_
import.meta.env.VITE_API_URL
import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
import.meta.env.VITE_apiKey  // Firebase
```

---

## ⚡ QUICK DIAGNOSIS STEPS

### 1. Check Backend Connectivity
```bash
# Terminal
curl http://localhost:5000/public-donation-requests
# Should return JSON data, not Connection Refused
```

### 2. Check Browser Network Tab
- Open DevTools → Network tab
- Trigger data fetch action
- Check request URL (should match environment)
- Check response status (200 = ok, 404/500 = backend error)

### 3. Check Console for Errors
```javascript
// In browser console:
console.log(import.meta.env.VITE_API_URL);  // Should show backend URL
```

### 4. Verify Firebase Auth
```javascript
// In browser console:
firebase.auth().currentUser;  // Should show logged-in user or null
```

---

## 🎯 SUMMARY OF ISSUES FOUND

| Issue | Severity | Location | Impact |
|-------|----------|----------|--------|
| Hardcoded localhost URLs | 🔴 CRITICAL | axiosPublic.js, useAxiosSecure.js | All data fetching broken in production |
| Unused VITE_BACKEND_URL | 🟠 HIGH | .env file | Environment configuration not utilized |
| Mixed fetch methods | 🟠 HIGH | LiveImpact.jsx, ShortageTicker.jsx | Inconsistent error handling |
| Missing error boundaries | 🟡 MEDIUM | All data-fetching components | Poor UX on API failures |
| No request timeout | 🟡 MEDIUM | axios instances | Requests hang indefinitely |
| CORS not configured | 🔴 CRITICAL | Backend (out of scope) | Frontend blocked by browser |
| Token not added to some requests | 🟡 MEDIUM | Some components | Authorization failures |
| No retry logic | 🟡 MEDIUM | axios instances | Transient failures not handled |

---

## ✅ RECOMMENDATIONS (In Priority Order)

### Priority 1: Fix Base URL Configuration
1. Update `axiosPublic.js` to use `import.meta.env.VITE_API_URL`
2. Update `useAxiosSecure.js` to use `import.meta.env.VITE_API_URL`
3. Add fallback to localhost for development

### Priority 2: Centralize Fetch Calls
1. Replace all native `fetch()` with axios instances
2. Create centralized API service file
3. Add error handling wrapper

### Priority 3: Add Error Handling
1. Add axios interceptors for error logging
2. Add loading states to all data-fetching components
3. Add error boundaries for graceful failures

### Priority 4: Environment Setup
1. Create `.env.local` for local development
2. Create `.env.production` for production build
3. Document environment setup for team

### Priority 5: Security Enhancements
1. Add request timeout
2. Add retry logic for transient failures
3. Validate tokens before requests
4. Add CORS configuration to backend

---

## 📝 FILES REQUIRING UPDATES

### Must Update (High Priority)
```
src/hooks/axiosPublic.js
src/hooks/useAxiosSecure.js
.env (add API_URL if missing)
```

### Should Update (Medium Priority)
```
src/pages/_fronted/home/homeSections/LiveImpact.jsx
src/pages/_fronted/home/homeSections/ShortageTicker.jsx
src/pages/_fronted/home/homeSections/BlogHighlights.jsx
```

### Consider Creating (New Files)
```
src/services/apiClient.js      (Centralized API configuration)
src/services/donationAPI.js    (Donation endpoints)
src/services/blogAPI.js        (Blog endpoints)
src/hooks/useApi.jsx           (Generic API hook)
```

---

## 🔍 VERIFICATION CHECKLIST

After implementing fixes:
- [ ] Backend URL loads from environment variable
- [ ] All axios instances use same base URL
- [ ] Native fetch calls converted to axios
- [ ] Console logs show correct API URL
- [ ] Network tab shows requests to correct server
- [ ] Data loads successfully in development
- [ ] Data loads successfully in production build
- [ ] Error messages display on API failures
- [ ] Loading states show while fetching
- [ ] CORS errors resolved

---

## 📞 NEXT STEPS

1. **Immediate:** Fix axios base URL in both hooks
2. **Short-term:** Add error handling and loading states
3. **Medium-term:** Centralize API calls
4. **Long-term:** Add monitoring and logging

---

**Report Generated:** 2025-12-02  
**Analysis Scope:** Frontend Data Integration Only  
**Backend Setup:** Requires separate backend analysis
