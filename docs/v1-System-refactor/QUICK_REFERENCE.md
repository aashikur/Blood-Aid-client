# ⚡ Blood-Aid Quick Reference Guide

**For:** Blood-Aid Frontend Developers  
**Date:** December 2, 2025  
**Updated:** All API integration & structure fixed

---

## 🚀 Quick Start (60 seconds)

```bash
# 1. Clone & Install
git clone https://github.com/aashikur/blood-aid-client.git
cd blood-aid-client
npm install

# 2. Setup Environment
cp .env.example .env
# Edit .env with your credentials

# 3. Start Development
npm run dev
# Visit http://localhost:5173
```

---

## 📋 What Changed?

### ✨ NEW - 5 API Service Files
```
src/services/
├── apiClient.js      # Base axios config
├── userAPI.js        # User management
├── donationAPI.js    # Blood requests
├── blogAPI.js        # Blog system
├── fundingAPI.js     # Stripe & donations
└── publicAPI.js      # Public endpoints
```

### 🔧 FIXED - 2 Hooks Updated
```
axiosPublic.js       # Now uses VITE_API_URL
useAxiosSecure.js    # With error interceptors
```

### 📝 FIXED - 2 Components Updated
```
LiveImpact.jsx       # Uses services instead of fetch
ShortageTicker.jsx   # Uses services instead of fetch
```

### ⚙️ FIXED - Environment Config
```
.env                 # Uses VITE_API_URL (not VITE_BACKEND_URL)
.env.example         # Template for setup
```

---

## 💡 How to Use API Services

### Get Data (Example)
```javascript
import { getAllDonationRequests } from '@/services/donationAPI';

// Fetch
const result = await getAllDonationRequests();

// Handle
if (result.success) {
  setRequests(result.data);
} else {
  showError(result.error);
}
```

### Create Data (Example)
```javascript
import { createDonationRequest } from '@/services/donationAPI';

// Create
const result = await createDonationRequest(token, {
  requesterName: "John",
  bloodGroup: "O+",
  hospitalName: "Square Hospital",
  // ... other fields
});

// Handle
if (result.success) {
  showSuccess("Request created");
} else {
  showError(result.error);
}
```

### Protected Endpoint (Example)
```javascript
import { getUserRole } from '@/services/userAPI';

// Get token from Firebase
const token = await user.getIdToken();

// Call protected endpoint
const result = await getUserRole(token);

if (result.success) {
  console.log(result.data.role); // 'admin', 'donor', etc
}
```

---

## 🔌 Available Services

### userAPI.js
```javascript
registerUser(userData)
getUserRole(token)
getUserByEmail(email)
getUserById(userId)
getAllUsers(token)
updateUserProfile(token, userData)
updateUserByEmail(token, email, updateData)
updateUserRole(token, email, newRole)
updateUserStatus(email, status)
deleteUser(token, email)
```

### donationAPI.js
```javascript
createDonationRequest(token, requestData)
getAllDonationRequests(email)
getMyDonationRequests(email, limit)
getAllDonationRequestsAdmin()
getDonationRequest(requestId)
respondToDonationRequest(token, requestId)
updateDonationRequest(requestId, updateData)
deleteDonationRequest(requestId)
```

### blogAPI.js
```javascript
createBlog(blogData)
getAllBlogs()
getPublishedBlogs()
publishBlog(token, blogId, status)
deleteBlog(token, blogId)
```

### fundingAPI.js
```javascript
createPaymentIntent(amount)
saveFunding(fundingData)
getAllFundings(page, limit)
getTotalFunding()
```

### publicAPI.js
```javascript
searchDonors(bloodGroup, district, upazila)
searchDonorsDynamic(query)
submitContactForm(contactData)
getAllContacts()
getDashboardStats()
getBloodShortageStats()
getVerifiedHospitals()
```

---

## ⚙️ Environment Variables

```dotenv
# Backend API (REQUIRED)
VITE_API_URL=http://localhost:5000

# Firebase (REQUIRED)
VITE_apiKey=...
VITE_authDomain=...
VITE_projectId=...
VITE_storageBucket=...
VITE_messagingSenderId=...
VITE_appId=...

# Stripe (REQUIRED)
VITE_STRIPE_PUBLISHABLE_KEY=...
```

---

## 🐛 Troubleshooting

### Backend Connection Error
```
Error: Cannot connect to http://localhost:5000
```
**Fix:** 
- Ensure backend is running: `npm start` in backend folder
- Check VITE_API_URL in .env matches backend URL

### Firebase Auth Error
```
Error: Firebase credentials invalid
```
**Fix:**
- Verify .env Firebase variables
- Check Firebase Console has Authentication enabled
- Email/Password provider must be enabled

### Stripe Payment Error
```
Error: Invalid Stripe key
```
**Fix:**
- Use TEST keys from Stripe Dashboard
- Verify publishable key (starts with `pk_test_`)
- Check key is pasted exactly into .env

### Component Not Loading Data
```
Nothing displays on page
```
**Fix:**
- Check browser console for errors
- Verify API service is imported correctly
- Check backend is running and responding
- Use network tab to see API requests

---

## 📊 Response Format

All API services return consistent format:

### Success Response
```javascript
{
  success: true,
  data: {
    // Response data from backend
  }
}
```

### Error Response
```javascript
{
  success: false,
  error: "Error message from backend"
}
```

---

## 🔐 Authentication Flow

### User Logs In
```
Login.jsx → Firebase Auth → accessToken generated
```

### useAxiosSecure Uses Token
```
useAxiosSecure → Adds: Authorization: Bearer {token}
```

### Protected Endpoints Get Token
```
const token = await user.getIdToken();
const result = await getUserRole(token);
```

### Token Expires?
```
New token auto-generated on next Firebase call
No manual refresh needed
```

---

## 📁 Component Usage Example

### Before (OLD - DON'T USE)
```javascript
// ❌ Direct axios (hardcoded URL)
const { data } = await axiosPublic.get("/donations");
```

### After (NEW - USE THIS)
```javascript
// ✅ Service-based (uses VITE_API_URL)
import { getAllDonationRequests } from '@/services/donationAPI';
const result = await getAllDonationRequests();
if (result.success) setData(result.data);
```

---

## 🎯 Best Practices

### ✅ DO
- Import from services, not direct axios
- Check `result.success` before using data
- Pass token to protected endpoints
- Handle errors gracefully
- Use React Query for caching (optional)

### ❌ DON'T
- Use direct axios calls
- Hardcode API URLs
- Forget error handling
- Mix fetch() and axios
- Store sensitive data in .env locally

---

## 📚 Documentation Links

- **Full README:** See README.md
- **API Docs:** See API_DOCUMENTATION.md
- **Analysis:** See BACKEND_INTEGRATION_ANALYSIS.md
- **This Guide:** See QUICK_REFERENCE.md

---

## 🚀 Deploy to Production

```bash
# 1. Update .env for production
VITE_API_URL=https://blood-lagbe-server.vercel.app

# 2. Build
npm run build

# 3. Test build locally
npm run preview

# 4. Deploy to Vercel
# (with all env vars set)
```

---

## ✅ Checklist Before Deployment

- [ ] Backend URL updated in .env
- [ ] All env variables set
- [ ] npm run build succeeds
- [ ] npm run preview works
- [ ] Tested login flow
- [ ] Tested API calls in network tab
- [ ] No console errors
- [ ] Dark mode works
- [ ] Mobile responsive

---

## 📞 Need Help?

1. **Check README.md** - Setup guide
2. **Check API_DOCUMENTATION.md** - Backend specs
3. **Check browser console** - Error details
4. **Check network tab** - API requests
5. **Ask in GitHub Issues** - Community help

---

**Version:** 1.0  
**Last Updated:** December 2, 2025  
**Status:** ✅ Production Ready
