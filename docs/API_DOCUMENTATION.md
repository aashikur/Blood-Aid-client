# 🩸 Blood-Aid Server - Complete API Documentation

**Server Base URL:** `domain.com/`  
**Last Updated:** December 2, 2025  
**Backend Framework:** Express.js  
**Database:** MongoDB  
**Authentication:** Firebase  
**Payment Gateway:** Stripe

---

## 📑 Table of Contents

1. [Overview](#overview)
2. [Authentication Guide](#authentication-guide)
3. [API Endpoints](#api-endpoints)
   - [Contact Us](#contact-us)
   - [Donor Search](#donor-search)
   - [User Management](#user-management)
   - [Donation Requests](#donation-requests)
   - [Blog Management](#blog-management)
   - [Payment Processing](#payment-processing)
   - [Funding Management](#funding-management)
   - [Admin Dashboard](#admin-dashboard)
4. [Response Formats](#response-formats)
5. [Error Handling](#error-handling)
6. [Frontend Integration Guide](#frontend-integration-guide)
7. [Common Workflows](#common-workflows)

---

## Overview

The Blood-Aid Server is a comprehensive donation management system that enables:
- **Donors** to register and donate blood
- **Patients** to request blood donations
- **Users** to make monetary contributions via Stripe
- **Admins** to manage users, blogs, and view statistics
- **Communities** to share blood donation stories through blogs

### Key Features
✅ Real-time donor search by blood group and location  
✅ Emergency blood donation requests  
✅ User role-based access control  
✅ Stripe payment integration  
✅ Blog publishing system  
✅ Admin dashboard with statistics  
✅ Firebase authentication  

---

## Authentication Guide

### Firebase Token Authentication

**When Required:** Certain endpoints require a Firebase ID token to verify user identity and permissions.

### How to Obtain Token

1. **User Signs Up/Logs In** via Firebase on frontend
2. **Frontend Gets ID Token:**
   ```javascript
   const user = await firebase.auth().signInWithEmailAndPassword(email, password);
   const idToken = await user.getIdToken();
   ```

3. **Send Token in Header:**
   ```
   Authorization: Bearer <firebase_id_token>
   ```

### How Token is Verified

Backend checks:
```
1. Token format: "Bearer <token>"
2. Token validity using Firebase Admin SDK
3. User role and status for admin operations
```

### Admin Role Verification

**Admin Middleware** checks:
- User exists in database
- User's `role` field equals `"admin"`
- Returns 403 if not authorized

---

## API Endpoints

### 1. CONTACT US

Allow visitors to submit contact form messages.

#### `POST /contacts`

**Purpose:** Submit contact form

**Authentication:** ❌ No

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I want to help",
  "phone": "01712345678"
}
```

**Server Processing:**
- Auto-adds `createdAt` with current timestamp
- Stores in MongoDB `contacts` collection

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "insertedId": "507f1f77bcf86cd799439011"
}
```

**Response (Error 500):**
```json
{
  "error": "Database error"
}
```

---

#### `GET /contacts`

**Purpose:** Retrieve all contact submissions

**Authentication:** ❌ No

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I want to help",
    "phone": "01712345678",
    "createdAt": "2025-12-02T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Need blood urgently",
    "phone": "01987654321",
    "createdAt": "2025-12-02T09:15:00.000Z"
  }
]
```

**Note:** Sorted by `createdAt` in descending order (newest first)

---

### 2. DONOR SEARCH

Find active blood donors by location and blood group.

#### `GET /search-donors`

**Purpose:** Search donors by blood group, district, and upazila

**Authentication:** ❌ No

**Query Parameters:**
```
?bloodGroup=O%2B&district=Dhaka&upazila=Mirpur
```

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `bloodGroup` | string | ✅ Yes | Blood type | `O+`, `O-`, `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-` |
| `district` | string | ✅ Yes | Administrative district | `Dhaka`, `Chittagong`, `Sylhet` |
| `upazila` | string | ✅ Yes | Sub-district/township | `Mirpur`, `Gulshan`, `Dhanmondi` |

**Special Processing:**
- Backend converts blood group format (e.g., `Op` → `O+`, `Om` → `O-`)
- Auto-filters: `status: "active"` and `role: "donor"`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439001",
    "name": "Karim Ahmed",
    "email": "karim@example.com",
    "bloodGroup": "O+",
    "district": "Dhaka",
    "upazila": "Mirpur",
    "phone": "01712345678",
    "status": "active",
    "role": "donor",
    "loginCount": 5
  },
  {
    "_id": "507f1f77bcf86cd799439002",
    "name": "Fatima Khan",
    "email": "fatima@example.com",
    "bloodGroup": "O+",
    "district": "Dhaka",
    "upazila": "Mirpur",
    "phone": "01987654321",
    "status": "active",
    "role": "donor",
    "loginCount": 3
  }
]
```

**Empty Response (200 OK):**
```json
[]
```

---

#### `GET /search-donors-dynamic`

**Purpose:** Free-text search across multiple donor fields

**Authentication:** ❌ No

**Query Parameters:**
```
?query=Dhaka
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ Yes | Search term (case-insensitive regex) |

**Search Fields:**
- `name` (e.g., "Karim")
- `bloodGroup` (e.g., "O+")
- `district` (e.g., "Dhaka")
- `upazila` (e.g., "Mirpur")

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439001",
    "name": "Karim Ahmed",
    "email": "karim@example.com",
    "bloodGroup": "O+",
    "district": "Dhaka",
    "upazila": "Mirpur",
    "status": "active",
    "role": "donor"
  }
]
```

---

### 3. USER MANAGEMENT

Handle user registration, profile updates, and role management.

#### `POST /add-user`

**Purpose:** Register new user or update existing on login

**Authentication:** ❌ No

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Karim Ahmed",
  "email": "karim@example.com",
  "bloodGroup": "O+",
  "district": "Dhaka",
  "upazila": "Mirpur",
  "role": "donor",
  "phone": "01712345678"
}
```

**Server Processing:**
- **If user exists:** Increment `loginCount` by 1
- **If new user:** Create record with:
  - `status: "active"`
  - `loginCount: 1`

**Response (200 OK) - New User:**
```json
{
  "acknowledged": true,
  "insertedId": "507f1f77bcf86cd799439011"
}
```

**Response (200 OK) - Existing User:**
```json
{
  "msg": "user already exist"
}
```

---

#### `GET /get-user-role`

**Purpose:** Get logged-in user's role, status, and full profile

**Authentication:** ✅ **REQUIRED** - Firebase Token

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "msg": "OOKK",
  "role": "admin",
  "status": "active",
  "UserCollection_Data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Karim Ahmed",
    "email": "karim@example.com",
    "bloodGroup": "O+",
    "district": "Dhaka",
    "upazila": "Mirpur",
    "phone": "01712345678",
    "role": "admin",
    "status": "active",
    "loginCount": 5
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized: No token provided"
}
```

or

```json
{
  "message": "Unauthorized: Invalid token"
}
```

---

#### `GET /get-user-by-email`

**Purpose:** Fetch user profile by email

**Authentication:** ❌ No

**Query Parameters:**
```
?email=karim@example.com
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Karim Ahmed",
  "email": "karim@example.com",
  "bloodGroup": "O+",
  "district": "Dhaka",
  "upazila": "Mirpur",
  "phone": "01712345678",
  "role": "donor",
  "status": "active",
  "loginCount": 5
}
```

**Response (200 OK) - User Not Found:**
```json
null
```

---

#### `GET /get-user/:id`

**Purpose:** Fetch user by MongoDB ID

**Authentication:** ❌ No

**URL Parameters:**
```
/get-user/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Karim Ahmed",
  "email": "karim@example.com",
  "bloodGroup": "O+",
  "district": "Dhaka",
  "upazila": "Mirpur",
  "role": "donor",
  "status": "active"
}
```

---

#### `GET /get-users`

**Purpose:** Retrieve all users (admin only)

**Authentication:** ✅ **REQUIRED** - Firebase Token + Admin Role

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439001",
    "name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "role": "donor",
    "status": "active",
    "bloodGroup": "O+",
    "district": "Dhaka"
  },
  {
    "_id": "507f1f77bcf86cd799439002",
    "name": "Fatima Begum",
    "email": "fatima@example.com",
    "role": "patient",
    "status": "active",
    "district": "Chittagong"
  }
]
```

**Note:** Excludes the logged-in admin user

**Response (403 Forbidden):**
```json
{
  "msg": "unauthorized"
}
```

---

#### `PATCH /update-user`

**Purpose:** Update own profile (authenticated user)

**Authentication:** ✅ **REQUIRED** - Firebase Token

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**Request Body (Update Any Fields):**
```json
{
  "name": "Karim Ahmed Updated",
  "phone": "01712345999",
  "district": "Chittagong",
  "upazila": "Hathazari"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "updatedUser": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Karim Ahmed Updated",
    "email": "karim@example.com",
    "phone": "01712345999",
    "district": "Chittagong",
    "upazila": "Hathazari",
    "bloodGroup": "O+",
    "role": "donor",
    "status": "active"
  },
  "modifiedCount": 1
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Failed to update user"
}
```

---

#### `PATCH /user/:email`

**Purpose:** Update any user (admin only)

**Authentication:** ✅ **REQUIRED** - Firebase Token + Admin Role

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**URL Parameters:**
```
/user/karim@example.com
```

**Request Body:**
```json
{
  "status": "blocked",
  "role": "admin"
}
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null
}
```

---

#### `PATCH /update-role`

**Purpose:** Change user's role (admin only)

**Authentication:** ✅ **REQUIRED** - Firebase Token + Admin Role

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "karim@example.com",
  "role": "admin"
}
```

**Valid Roles:**
- `donor`
- `patient`
- `admin`

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "modifiedCount": 1
}
```

---

#### `PATCH /update-status`

**Purpose:** Block/unblock user

**Authentication:** ❌ No

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "karim@example.com",
  "status": "blocked"
}
```

**Valid Statuses:**
- `active`
- `blocked`

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "modifiedCount": 1
}
```

---

#### `DELETE /user/:email`

**Purpose:** Delete user (admin only)

**Authentication:** ✅ **REQUIRED** - Firebase Token + Admin Role

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

**URL Parameters:**
```
/user/karim@example.com
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

---

### 4. DONATION REQUESTS

Manage blood donation requests and donor responses.

#### `POST /donation-request`

**Purpose:** Create new blood donation request

**Authentication:** ✅ **REQUIRED** - Firebase Token

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "requesterName": "Ahmed Khan",
  "requesterEmail": "ahmed@example.com",
  "bloodGroup": "O+",
  "hospitalName": "Square Hospital",
  "district": "Dhaka",
  "upazila": "Mirpur",
  "emergencyLevel": "high",
  "bagQuantity": 2,
  "description": "Need urgent blood for surgery",
  "contactNumber": "01712345678"
}
```

**Field Details:**
| Field | Type | Required | Values |
|-------|------|----------|--------|
| `requesterName` | string | ✅ | User's full name |
| `requesterEmail` | string | ✅ | Email address |
| `bloodGroup` | string | ✅ | `O+`, `O-`, `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-` |
| `hospitalName` | string | ✅ | Hospital/clinic name |
| `district` | string | ✅ | Location district |
| `upazila` | string | ✅ | Location upazila |
| `emergencyLevel` | string | ✅ | `high`, `medium`, `low` |
| `bagQuantity` | number | ✅ | Number of blood bags needed |
| `description` | string | ✅ | Additional details |
| `contactNumber` | string | ✅ | Phone number |

**Server Auto-Adds:**
```
donationStatus: "pending"
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "insertedId": "507f1f77bcf86cd799439050"
}
```

---

#### `GET /public-donation-requests`

**Purpose:** Get all donation requests (for browsing)

**Authentication:** ❌ No

**Query Parameters (Optional):**
```
?email=ahmed@example.com
```

| Parameter | Type | Purpose |
|-----------|------|---------|
| `email` | string | Exclude requests from this user (don't show own requests) |

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439050",
    "requesterName": "Ahmed Khan",
    "requesterEmail": "ahmed@example.com",
    "bloodGroup": "O+",
    "hospitalName": "Square Hospital",
    "district": "Dhaka",
    "upazila": "Mirpur",
    "emergencyLevel": "high",
    "bagQuantity": 2,
    "description": "Need urgent blood for surgery",
    "contactNumber": "01712345678",
    "donationStatus": "pending",
    "donorInfo": null
  },
  {
    "_id": "507f1f77bcf86cd799439051",
    "requesterName": "Fatima Begum",
    "requesterEmail": "fatima@example.com",
    "bloodGroup": "A-",
    "hospitalName": "Apollo Hospital",
    "district": "Chittagong",
    "upazila": "Hathazari",
    "emergencyLevel": "medium",
    "bagQuantity": 1,
    "description": "Required for emergency",
    "contactNumber": "01987654321",
    "donationStatus": "inprogress",
    "donorInfo": {
      "name": "Karim Ahmed",
      "email": "karim@example.com"
    }
  }
]
```

**Statuses:**
- `pending` - No donor responded yet
- `inprogress` - Donor has responded and is donating
- `completed` - Donation completed

---

#### `GET /my-donation-requests`

**Purpose:** Get all requests created by a user

**Authentication:** ❌ No

**Query Parameters:**
```
?email=ahmed@example.com&limit=5
```

| Parameter | Type | Required | Purpose |
|-----------|------|----------|---------|
| `email` | string | ✅ | User's email |
| `limit` | number | ❌ | Max results (default: all) |

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439050",
    "requesterName": "Ahmed Khan",
    "requesterEmail": "ahmed@example.com",
    "bloodGroup": "O+",
    "hospitalName": "Square Hospital",
    "district": "Dhaka",
    "upazila": "Mirpur",
    "emergencyLevel": "high",
    "bagQuantity": 2,
    "donationStatus": "pending"
  }
]
```

---

#### `GET /all-donation-requests`

**Purpose:** Get all requests (admin dashboard)

**Authentication:** ❌ No (should be admin-only)

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439050",
    "requesterName": "Ahmed Khan",
    "requesterEmail": "ahmed@example.com",
    "bloodGroup": "O+",
    "donationStatus": "pending"
  },
  {
    "_id": "507f1f77bcf86cd799439051",
    "requesterName": "Fatima Begum",
    "requesterEmail": "fatima@example.com",
    "bloodGroup": "A-",
    "donationStatus": "inprogress"
  }
]
```

---

#### `GET /donation-request/:id`

**Purpose:** Get single donation request details

**Authentication:** ❌ No

**URL Parameters:**
```
/donation-request/507f1f77bcf86cd799439050
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439050",
  "requesterName": "Ahmed Khan",
  "requesterEmail": "ahmed@example.com",
  "bloodGroup": "O+",
  "hospitalName": "Square Hospital",
  "district": "Dhaka",
  "upazila": "Mirpur",
  "emergencyLevel": "high",
  "bagQuantity": 2,
  "description": "Need urgent blood for surgery",
  "contactNumber": "01712345678",
  "donationStatus": "pending",
  "donorInfo": null
}
```

---

#### `PATCH /donation-request/:id/respond`

**Purpose:** Donor responds to blood request (mark as in-progress)

**Authentication:** ✅ **REQUIRED** - Firebase Token

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**URL Parameters:**
```
/donation-request/507f1f77bcf86cd799439050/respond
```

**Request Body:**
```json
{}
```

(Empty body - uses Firebase token for donor info)

**Server Processing:**
- Updates `donationStatus` from `pending` to `inprogress`
- Stores donor name and email

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "modifiedCount": 1
}
```

**Updated Record:**
```json
{
  "donationStatus": "inprogress",
  "donorInfo": {
    "name": "Karim Ahmed",
    "email": "karim@example.com"
  }
}
```

---

#### `PATCH /donation-request/:id`

**Purpose:** Edit/update donation request

**Authentication:** ❌ No

**Headers:**
```
Content-Type: application/json
```

**URL Parameters:**
```
/donation-request/507f1f77bcf86cd799439050
```

**Request Body (Any Fields to Update):**
```json
{
  "emergencyLevel": "high",
  "bagQuantity": 3,
  "description": "Updated description",
  "hospitalName": "New Hospital"
}
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "modifiedCount": 1
}
```

---

#### `DELETE /donation-request/:id`

**Purpose:** Delete donation request

**Authentication:** ❌ No

**URL Parameters:**
```
/donation-request/507f1f77bcf86cd799439050
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

---

### 5. BLOG MANAGEMENT

Publish and manage blood donation awareness blogs.

#### `POST /blogs`

**Purpose:** Create new blog post

**Authentication:** ❌ No

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "How to Prepare for Blood Donation",
  "content": "Here are some tips to prepare yourself for blood donation...",
  "author": "Dr. Ahmed Khan",
  "image": "https://example.com/image.jpg"
}
```

**Server Auto-Adds:**
```
status: "draft"
createdAt: current timestamp
updatedAt: current timestamp
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "insertedId": "507f1f77bcf86cd799439060"
}
```

---

#### `GET /blogs`

**Purpose:** Get all blogs (sorted by newest)

**Authentication:** ❌ No

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439060",
    "title": "How to Prepare for Blood Donation",
    "content": "Here are some tips...",
    "author": "Dr. Ahmed Khan",
    "image": "https://example.com/image.jpg",
    "status": "published",
    "createdAt": "2025-12-02T10:00:00.000Z",
    "updatedAt": "2025-12-02T11:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439061",
    "title": "Benefits of Blood Donation",
    "content": "Blood donation has many health benefits...",
    "author": "Dr. Fatima Khan",
    "status": "draft",
    "createdAt": "2025-12-01T09:00:00.000Z",
    "updatedAt": "2025-12-01T09:00:00.000Z"
  }
]
```

---

#### `PATCH /blogs/:id/publish`

**Purpose:** Publish or unpublish blog (admin only)

**Authentication:** ✅ **REQUIRED** - Firebase Token + Admin Role

**Headers:**
```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

**URL Parameters:**
```
/blogs/507f1f77bcf86cd799439060/publish
```

**Request Body:**
```json
{
  "status": "published"
}
```

**Valid Statuses:**
- `published` - Visible to public
- `draft` - Only visible to admins

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null
}
```

**Server Updates:**
- `status` field
- `updatedAt` timestamp

---

#### `DELETE /blogs/:id`

**Purpose:** Delete blog post (admin only)

**Authentication:** ✅ **REQUIRED** - Firebase Token + Admin Role

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

**URL Parameters:**
```
/blogs/507f1f77bcf86cd799439060
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

---

### 6. PAYMENT PROCESSING

Stripe payment integration for donations.

#### `POST /create-payment-intent`

**Purpose:** Create Stripe payment intent for donation

**Authentication:** ❌ No

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 100
}
```

**Parameters:**
| Field | Type | Unit | Description |
|-------|------|------|-------------|
| `amount` | number | USD dollars | Donation amount (server converts to cents) |

**Server Processing:**
- Multiplies amount by 100 (converts $100 → 10000 cents)
- Creates Stripe `paymentIntent`
- Returns `clientSecret` for frontend

**Response (200 OK):**
```json
{
  "clientSecret": "pi_1234567890_secret_0987654321"
}
```

**Frontend Usage:**
```javascript
// 1. Get clientSecret from this endpoint
const response = await fetch('domain.com/create-payment-intent', {
  method: 'POST',
  body: JSON.stringify({ amount: 100 })
});
const { clientSecret } = await response.json();

// 2. Pass to Stripe Elements
const result = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
    billing_details: { name: 'John Doe' }
  }
});

// 3. If success, save to funding
if (result.paymentIntent.status === 'succeeded') {
  await fetch('domain.com/fundings', {
    method: 'POST',
    body: JSON.stringify({
      donorName: 'John Doe',
      donorEmail: 'john@example.com',
      amount: 100,
      transactionId: result.paymentIntent.id,
      paymentMethod: 'card'
    })
  });
}
```

**Response (500 Error):**
```json
{
  "error": "Your card was declined"
}
```

---

### 7. FUNDING MANAGEMENT

Track monetary donations after successful payment.

#### `POST /fundings`

**Purpose:** Save funding record (call after Stripe payment succeeds)

**Authentication:** ❌ No

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "amount": 100,
  "transactionId": "pi_1234567890_secret_0987654321",
  "paymentMethod": "card"
}
```

**Server Auto-Adds:**
```
fundingDate: current timestamp
```

**Response (200 OK):**
```json
{
  "acknowledged": true,
  "insertedId": "507f1f77bcf86cd799439070"
}
```

---

#### `GET /fundings`

**Purpose:** Get all fundings with pagination

**Authentication:** ❌ No

**Query Parameters:**
```
?page=1&limit=10
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Records per page |

**Response (200 OK):**
```json
{
  "fundings": [
    {
      "_id": "507f1f77bcf86cd799439070",
      "donorName": "John Doe",
      "donorEmail": "john@example.com",
      "amount": 100,
      "transactionId": "pi_1234567890",
      "paymentMethod": "card",
      "fundingDate": "2025-12-02T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439071",
      "donorName": "Jane Smith",
      "donorEmail": "jane@example.com",
      "amount": 50,
      "transactionId": "pi_0987654321",
      "paymentMethod": "card",
      "fundingDate": "2025-12-01T15:30:00.000Z"
    }
  ],
  "total": 125
}
```

**Pagination Example:**
- Page 1: Records 1-10
- Page 2: Records 11-20
- Page 3: Records 21-30

---

#### `GET /fundings/total`

**Purpose:** Get total funding amount across all donations

**Authentication:** ❌ No

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "totalFunding": 5000
}
```

(Total sum of all `amount` fields)

---

### 8. ADMIN DASHBOARD

#### `GET /admin-dashboard-stats`

**Purpose:** Get dashboard statistics (admin panel)

**Authentication:** ❌ No (should be admin-only)

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "totalUsers": 250,
  "totalRequest": 45,
  "totalBlogs": 12,
  "totalBlogsDraft": 3,
  "totalBlogsPublished": 9,
  "totalContacts": 28,
  "totalFundings": 52,
  "totalFundingAmount": 10500
}
```

**Field Descriptions:**
| Field | Description |
|-------|-------------|
| `totalUsers` | Total registered users |
| `totalRequest` | Total blood donation requests |
| `totalBlogs` | All blogs (published + draft) |
| `totalBlogsDraft` | Unpublished blogs |
| `totalBlogsPublished` | Published blogs |
| `totalContacts` | Contact form submissions |
| `totalFundings` | Number of donations |
| `totalFundingAmount` | Sum of all donations (USD) |

---

### 9. ROOT ROUTE

#### `GET /`

**Purpose:** Server health check

**Authentication:** ❌ No

**Response (200 OK):**
```json
{
  "msg": "Blood is doing Well"
}
```

---

## Response Formats

### Standard Success Response

All successful operations follow MongoDB response format:

```json
{
  "acknowledged": true,
  "insertedId": "507f1f77bcf86cd799439011"
}
```

or for updates:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null
}
```

or for deletes:

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

### Standard Error Response

```json
{
  "error": "Error message describing what went wrong"
}
```

or

```json
{
  "message": "Error message"
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | ✅ Success | Request processed successfully |
| `400` | ❌ Bad Request | Invalid ObjectId format |
| `401` | ❌ Unauthorized | No/invalid Firebase token |
| `403` | ❌ Forbidden | User is not admin |
| `500` | ❌ Server Error | Database error |

### Common Errors

**1. Missing Firebase Token**
```
Status: 401
{
  "message": "Unauthorized: No token provided"
}
```

**2. Invalid Token**
```
Status: 401
{
  "message": "Unauthorized: Invalid token"
}
```

**3. Not Admin**
```
Status: 403
{
  "msg": "unauthorized"
}
```

**4. Invalid ObjectId**
```
Status: 400
{
  "error": "Invalid ObjectId format"
}
```

**5. Database Error**
```
Status: 500
{
  "error": "Failed to update donation request."
}
```

---

## Frontend Integration Guide

### Step 1: Setup Firebase Authentication

```javascript
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config
};

firebase.initializeApp(firebaseConfig);
```

### Step 2: User Registration & Login

```javascript
// Sign up
const signUp = async (email, password, userData) => {
  const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
  const token = await user.user.getIdToken();
  
  // Save to backend
  await fetch('domain.com/add-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      bloodGroup: userData.bloodGroup,
      district: userData.district,
      upazila: userData.upazila,
      role: userData.role,
      phone: userData.phone
    })
  });
};

// Login
const login = async (email, password) => {
  const user = await firebase.auth().signInWithEmailAndPassword(email, password);
  const token = await user.user.getIdToken();
  
  // Get user role
  const response = await fetch('domain.com/get-user-role', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const { role, status } = await response.json();
  
  return { role, status, token };
};
```

### Step 3: Making Authenticated Requests

```javascript
// Helper function
const makeAuthRequest = async (endpoint, method = 'GET', body = null) => {
  const token = await firebase.auth().currentUser.getIdToken();
  
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  if (body) options.body = JSON.stringify(body);
  
  return fetch(`domain.com${endpoint}`, options).then(r => r.json());
};

// Usage
const createRequest = async (requestData) => {
  return makeAuthRequest('/donation-request', 'POST', requestData);
};
```

### Step 4: Search Donors

```javascript
const searchDonors = async (bloodGroup, district, upazila) => {
  const response = await fetch(
    `domain.com/search-donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
  );
  return response.json();
};
```

### Step 5: Handle Stripe Payment

```javascript
// 1. Get payment intent
const createPayment = async (amount) => {
  const response = await fetch('domain.com/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });
  return response.json();
};

// 2. Confirm payment with Stripe
const confirmPayment = async (stripe, clientSecret) => {
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: { name: 'John Doe' }
    }
  });
  return result;
};

// 3. Save funding record
const saveFunding = async (paymentIntent, donorInfo) => {
  await fetch('domain.com/fundings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      amount: paymentIntent.amount / 100, // Convert cents to dollars
      transactionId: paymentIntent.id,
      paymentMethod: 'card'
    })
  });
};
```

---

## Common Workflows

### Workflow 1: Blood Donation Request

```
1. Patient creates account
   → POST /add-user

2. Patient creates blood request
   → POST /donation-request (with Firebase token)

3. Donors search and find request
   → GET /public-donation-requests

4. Donor responds to request
   → PATCH /donation-request/:id/respond (with Firebase token)

5. Patient checks request status
   → GET /my-donation-requests
```

### Workflow 2: Monetary Donation

```
1. Donor views total fundings
   → GET /fundings/total

2. Donor enters amount and clicks "Donate"
   → POST /create-payment-intent (get clientSecret)

3. Frontend confirms payment with Stripe
   → stripe.confirmCardPayment(clientSecret)

4. After payment success, save record
   → POST /fundings

5. Admin views all donations
   → GET /fundings?page=1&limit=10
```

### Workflow 3: Admin Management

```
1. Admin logs in
   → GET /get-user-role (verify admin role)

2. View dashboard stats
   → GET /admin-dashboard-stats

3. Manage users
   → GET /get-users
   → PATCH /update-role (change role)
   → PATCH /update-status (block user)
   → DELETE /user/:email (delete user)

4. Manage blogs
   → POST /blogs (create)
   → GET /blogs (view all)
   → PATCH /blogs/:id/publish (publish)
   → DELETE /blogs/:id (delete)

5. View contacts
   → GET /contacts
```

### Workflow 4: User Profile Update

```
1. User navigates to profile page
   → GET /get-user-role (get current data)

2. User updates profile
   → PATCH /update-user (with Firebase token)

3. Frontend shows success message
   → Display updatedUser data
```

---

## Important Notes for Frontend Developers

### 1. Blood Group Handling
- Backend expects: `O+`, `O-`, `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`
- Store and send in this format

### 2. Firebase Token
- Get token: `await firebase.auth().currentUser.getIdToken()`
- Token expires every 1 hour
- Refresh automatically when expired
- Always include in `Authorization: Bearer` header

### 3. Email-based Queries
- Many endpoints use email as identifier
- Treat email as unique identifier for users
- Always encode email in URL: `user%40example.com`

### 4. Pagination
- Fundings endpoint supports pagination
- Default limit: 10 records per page
- Calculate total pages: `Math.ceil(total / limit)`

### 5. Status Fields
- User status: `active` or `blocked`
- Donation status: `pending`, `inprogress`, or `completed`
- Blog status: `draft` or `published`

### 6. Admin Verification
- Admin role is stored in `role` field in MongoDB
- Backend checks `role === "admin"` for admin operations
- Create admin users carefully (only via admin role change)

### 7. Error Handling
- Always check response status code
- Some errors return `{ error: "..." }`
- Some return `{ msg: "..." }` or `{ message: "..." }`
- Handle 401 errors by redirecting to login

---

## Database Collections

| Collection | Purpose | Key Fields |
|-----------|---------|-----------|
| `users` | User profiles | `email`, `role`, `status`, `bloodGroup` |
| `donationRequests` | Blood requests | `requesterEmail`, `donationStatus`, `bloodGroup` |
| `blogs` | Blog posts | `title`, `status`, `createdAt` |
| `fundings` | Donations | `donorEmail`, `amount`, `fundingDate` |
| `contacts` | Contact forms | `email`, `name`, `createdAt` |

---

## Environment Variables Required

```bash
PORT=5000
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_live_...
FIREBASE_API_KEY=...
```

---

## API Rate Limits

⚠️ **Not implemented** - Add rate limiting for production

Recommended:
- 100 requests per minute per IP
- 1000 requests per day per user

---

## Security Considerations

✅ **Implemented:**
- Firebase token verification
- Admin role checking
- Input validation via MongoDB

⚠️ **To Add:**
- Request rate limiting
- SQL injection prevention (already safe with MongoDB driver)
- CORS origin restrictions
- Input sanitization
- HTTPS enforcement

---

## Support & Contact

For API issues or questions:
- Contact: admin@bloodaid.com
- Documentation: [Link to this file]
- Bug Reports: [GitHub Issues]

---

**Last Updated:** December 2, 2025  
**Version:** 1.0  
**Status:** ✅ Live
