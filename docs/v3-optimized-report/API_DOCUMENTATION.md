# API Documentation

Complete reference for Blood-Aid Backend API.

## Base URLs

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5000` |
| Staging | `https://staging-api.blood-aid.com` |
| Production | `https://api.blood-aid.com` |

---

## Authentication

### JWT Token
All protected endpoints require JWT token in header:

```bash
Authorization: Bearer <JWT_TOKEN>
```

### Obtaining Token
1. Sign up/login via Firebase frontend
2. Get token: `const token = await user.getIdToken()`
3. Include in all API requests

### Token Refresh
- Tokens expire after 1 hour
- Refresh automatically on use
- Frontend handles re-authentication

---

## Response Format

### Success Response (2xx)
```json
{
  "status": 200,
  "data": { /* response data */ },
  "message": "Success"
}
```

### Error Response (4xx, 5xx)
```json
{
  "status": 400,
  "error": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

---

## Donation Requests

### List All Requests
```http
GET /donation-requests
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `bloodGroup` - Filter by blood group (A+, A-, B+, etc.)
- `status` - Filter by status (pending, inprogress, done, canceled)
- `district` - Filter by district

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "requesterName": "Ahmed Khan",
      "requesterEmail": "ahmed@example.com",
      "recipientName": "Fatima Khan",
      "bloodGroup": "O+",
      "recipientDistrict": "Dhaka",
      "recipientUpazila": "Dhanmondi",
      "hospitalName": "Square Hospital",
      "donationDate": "2025-12-05",
      "donationTime": "14:30",
      "donationStatus": "pending",
      "requestMessage": "Emergency surgery needed",
      "createdAt": "2025-12-03T10:30:00Z",
      "updatedAt": "2025-12-03T10:30:00Z"
    }
  ],
  "total": 150
}
```

---

### Get My Requests
```http
GET /my-donation-requests?email=user@example.com
```

**Auth:** ✅ Required

**Query Parameters:**
- `email` - User's email address
- `status` - Filter by status

**Response:** Same as list all requests

---

### Get Single Request
```http
GET /donation-request/:id
```

**Response:**
```json
{
  "status": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "requesterName": "Ahmed Khan",
    "recipientName": "Fatima Khan",
    "bloodGroup": "O+",
    "donationStatus": "pending",
    // ... other fields
  }
}
```

---

### Create Request
```http
POST /donation-request
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Auth:** ✅ Required

**Request Body:**
```json
{
  "requesterName": "Ahmed Khan",
  "requesterEmail": "ahmed@example.com",
  "recipientName": "Fatima Khan",
  "bloodGroup": "O+",
  "recipientDistrict": "Dhaka",
  "recipientUpazila": "Dhanmondi",
  "hospitalName": "Square Hospital",
  "addressLine": "Ward 5, Room 302",
  "donationDate": "2025-12-05",
  "donationTime": "14:30",
  "requestMessage": "Emergency surgery needed",
  "donationStatus": "pending"
}
```

**Validation:**
- All fields required except `requestMessage`
- `donationDate` must be today or future
- `bloodGroup` must be valid (A+, A-, B+, B-, AB+, AB-, O+, O-)
- `donationStatus` must be one of: pending, inprogress, done, canceled

**Response:**
```json
{
  "status": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "requesterName": "Ahmed Khan",
    // ... all request fields
  },
  "message": "Donation request created successfully"
}
```

---

### Update Request
```http
PATCH /donation-request/:id
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Auth:** ✅ Required (must be requester or admin)

**Request Body:** Any field from creation

**Response:**
```json
{
  "status": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    // ... updated request
  },
  "message": "Donation request updated"
}
```

---

### Update Status
```http
PATCH /donation-request-status/:id
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "status": "inprogress"
}
```

**Allowed Statuses:**
- `pending` - Initial state
- `inprogress` - Donor found and donation scheduled
- `done` - Donation completed
- `canceled` - Request canceled

**Response:**
```json
{
  "status": 200,
  "data": { /* updated request */ },
  "message": "Status updated to inprogress"
}
```

---

### Delete Request
```http
DELETE /donation-request/:id
Authorization: Bearer <TOKEN>
```

**Auth:** ✅ Required (must be requester or admin)

**Response:**
```json
{
  "status": 200,
  "message": "Donation request deleted",
  "deletedCount": 1
}
```

---

## Blogs

### List All Blogs
```http
GET /blogs
```

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `search` - Search in title/content
- `status` - Filter by status (draft, published)
- `author` - Filter by author email

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Blood Donation Myths Debunked",
      "thumbnail": "https://i.ibb.co/...",
      "content": "Lorem ipsum dolor sit amet...",
      "author": "Dr. Ahmed Khan",
      "authorEmail": "doctor@example.com",
      "authorPhoto": "https://...",
      "status": "published",
      "views": 1250,
      "createdAt": "2025-12-01T08:00:00Z"
    }
  ],
  "total": 45
}
```

---

### Create Blog
```http
POST /blogs
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "title": "Blood Donation Myths Debunked",
  "thumbnail": "https://i.ibb.co/image-url",
  "content": "Comprehensive content here...",
  "author": "Dr. Ahmed Khan",
  "authorEmail": "doctor@example.com",
  "authorPhoto": "https://...",
  "status": "draft"
}
```

**Response:**
```json
{
  "status": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    // ... blog data
  }
}
```

---

### Update Blog
```http
PATCH /blogs/:id
Authorization: Bearer <TOKEN>
```

**Auth:** ✅ Required (must be author or admin)

---

### Delete Blog
```http
DELETE /blogs/:id
Authorization: Bearer <TOKEN>
```

---

## Users

### List All Users
```http
GET /users
Authorization: Bearer <TOKEN>
```

**Auth:** ✅ Required (admin only)

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "email": "user@example.com",
      "displayName": "Ahmed Khan",
      "role": "donor",
      "status": "active",
      "bloodGroup": "O+",
      "district": "Dhaka",
      "upazila": "Dhanmondi",
      "createdAt": "2025-11-20T10:00:00Z"
    }
  ]
}
```

---

### Get User by Email
```http
GET /user/:email
Authorization: Bearer <TOKEN>
```

**Response:**
```json
{
  "status": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "email": "user@example.com",
    "displayName": "Ahmed Khan",
    "role": "donor",
    "status": "active"
  }
}
```

---

### Update User Role
```http
PATCH /users/:id/role
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Auth:** ✅ Required (admin only)

**Request Body:**
```json
{
  "role": "volunteer"
}
```

**Allowed Roles:**
- `user` - Regular user
- `donor` - Blood donor
- `volunteer` - Community volunteer
- `admin` - System administrator

---

### Block/Unblock User
```http
PATCH /users/:id/status
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "status": "blocked"
}
```

---

### Delete User
```http
DELETE /users/:id
Authorization: Bearer <TOKEN>
```

---

## Funding (Donations)

### List Fundings
```http
GET /fundings
```

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "donorName": "Md. Karim",
      "donorEmail": "karim@example.com",
      "amount": 5000,
      "currency": "BDT",
      "transactionId": "ch_1Iv5p...",
      "purpose": "Blood bank operations",
      "status": "succeeded",
      "createdAt": "2025-12-02T15:30:00Z"
    }
  ],
  "total": 234,
  "totalRaised": 1250000
}
```

---

### Create Funding (Payment)
```http
POST /fundings
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "amount": 5000,
  "currency": "BDT",
  "purpose": "Blood bank operations",
  "paymentMethodId": "pm_1234567"
}
```

**Response:**
```json
{
  "status": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439041",
    "amount": 5000,
    "status": "succeeded",
    "transactionId": "ch_1234567"
  }
}
```

---

### Get Funding Stats
```http
GET /funding-stats
```

**Response:**
```json
{
  "status": 200,
  "data": {
    "totalDonations": 2350,
    "totalAmount": 15750000,
    "thisMonth": 450000,
    "lastMonth": 520000,
    "averageDonation": 6702,
    "topDonor": {
      "name": "Md. Karim",
      "total": 250000,
      "count": 45
    }
  }
}
```

---

## Contacts

### List Contact Messages
```http
GET /contacts
Authorization: Bearer <TOKEN>
```

**Auth:** ✅ Required (admin only)

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "name": "Fatima Khan",
      "email": "fatima@example.com",
      "subject": "Request feature",
      "message": "Please add SMS notifications...",
      "createdAt": "2025-12-03T09:15:00Z"
    }
  ]
}
```

---

### Send Contact Message
```http
POST /contacts
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Fatima Khan",
  "email": "fatima@example.com",
  "subject": "Request feature",
  "message": "Please add SMS notifications..."
}
```

**Response:**
```json
{
  "status": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439051",
    "message": "Contact message received. We'll get back to you soon."
  }
}
```

---

### Delete Contact Message
```http
DELETE /contacts/:id
Authorization: Bearer <TOKEN>
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limited |
| 500 | Server Error - Unexpected error |

---

## Rate Limiting

- **Limit:** 100 requests per minute
- **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- **Error:** 429 Too Many Requests

---

## Pagination

Default pagination: **10 items per page**

```http
GET /donation-requests?page=2&limit=20
```

**Response includes:**
```json
{
  "data": [ /* items */ ],
  "page": 2,
  "limit": 20,
  "total": 150,
  "pages": 8
}
```

---

## Testing

### cURL Examples

**Get all requests:**
```bash
curl -X GET "http://localhost:5000/donation-requests" \
  -H "Accept: application/json"
```

**Create request with auth:**
```bash
curl -X POST "http://localhost:5000/donation-request" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "requesterName": "Ahmed Khan",
    "requesterEmail": "ahmed@example.com",
    "recipientName": "Fatima Khan",
    "bloodGroup": "O+",
    "recipientDistrict": "Dhaka",
    "recipientUpazila": "Dhanmondi",
    "hospitalName": "Square Hospital",
    "addressLine": "Ward 5",
    "donationDate": "2025-12-05",
    "donationTime": "14:30",
    "requestMessage": "Emergency"
  }'
```

---

## Postman Collection

Download the Postman collection: [Blood-Aid API.postman_collection.json](#)

---

**API Documentation v1.0 | Last Updated: Dec 3, 2025**
