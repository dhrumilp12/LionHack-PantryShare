# PantryShare API Documentation

## Table of Contents
- [Authentication](#authentication)
- [Users](#users)
- [Listings](#listings)
- [Chat](#chat)
- [Volunteers](#volunteers)
- [Dashboard](#dashboard)
- [Admin](#admin)
- [File Upload](#file-upload)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [WebSocket Events](#websocket-events)

## Base Information

**Base URL:** `http://localhost:5000/api` (Development)
**Content-Type:** `application/json`
**Authentication:** Bearer Token (JWT)

## Authentication

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student",
  "phone": "+1234567890",
  "bio": "Computer Science student passionate about reducing food waste"
}
```

**Validation Rules:**
- Email: Valid email format, unique
- Password: Minimum 6 characters
- Role: One of `student`, `volunteer`, `shelter_admin`, `school_admin`
- Phone: Valid phone number format

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student"
    }
  }
}
```

### Login User
**POST** `/auth/login`

Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student"
    }
  }
}
```

### Firebase Login
**POST** `/auth/firebase-login`

Login using Firebase ID token.

**Request Body:**
```json
{
  "idToken": "firebase-id-token-here"
}
```

### Refresh Token
**POST** `/auth/refresh-token`

Get new access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "refresh-token-here"
}
```

### Logout
**POST** `/auth/logout`

Logout user and invalidate tokens.

**Headers:** `Authorization: Bearer <token>`

## Users

### Get Current User Profile
**GET** `/users/profile`

Get the current authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student",
    "phone": "+1234567890",
    "bio": "Computer Science student...",
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060,
      "address": "New York, NY"
    },
    "preferences": {
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      },
      "maxDistance": 10,
      "availabilityWindow": ["09:00", "18:00"],
      "preferredCategories": ["fruits", "vegetables"]
    },
    "stats": {
      "totalListings": 15,
      "totalPickups": 8,
      "totalDeliveries": 3,
      "impactScore": 120,
      "rating": 4.8
    }
  }
}
```

### Update User Profile
**PUT** `/users/profile`

Update current user's profile information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "bio": "Updated bio",
  "phone": "+1234567890",
  "preferences": {
    "notifications": {
      "email": true,
      "push": false,
      "sms": true
    },
    "maxDistance": 15,
    "availabilityWindow": ["10:00", "20:00"],
    "preferredCategories": ["dairy", "bread"]
  }
}
```

### Update User Location
**PUT** `/users/location`

Update user's current location.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "latitude": 40.7589,
  "longitude": -73.9851,
  "address": "Times Square, New York, NY"
}
```

### Get User Dashboard
**GET** `/users/dashboard`

Get dashboard data for current user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "recentListings": [...],
    "activePickups": [...],
    "upcomingDeliveries": [...],
    "weeklyStats": {
      "mealsRescued": 12,
      "co2Saved": 8.4,
      "wasteReduced": 3.2
    },
    "notifications": [...]
  }
}
```

### Get Public User Profile
**GET** `/users/:id`

Get public profile of any user.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "firstName": "John",
    "lastName": "D.",
    "bio": "Computer Science student...",
    "stats": {
      "totalListings": 15,
      "totalPickups": 8,
      "rating": 4.8
    },
    "joinedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Listings

### Get Listings
**GET** `/listings`

Get listings with optional filtering.

**Query Parameters:**
- `category` - Filter by food category
- `distance` - Maximum distance in km
- `lat` - User latitude for distance calculation
- `lng` - User longitude for distance calculation
- `status` - Filter by status (`available`, `claimed`, `completed`)
- `search` - Text search in title/description
- `sortBy` - Sort field (`createdAt`, `distance`, `expiryDate`)
- `sortOrder` - Sort direction (`asc`, `desc`)
- `limit` - Number of results (default: 20, max: 100)
- `offset` - Pagination offset

**Example:** `/listings?category=vegetables&distance=10&lat=40.7128&lng=-74.0060&limit=10`

**Response:**
```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "id": "listing123",
        "title": "Fresh Vegetables from School Cafeteria",
        "description": "Leftover vegetables from today's lunch...",
        "category": "vegetables",
        "quantity": 5,
        "unit": "portions",
        "expiryDate": "2024-01-16T18:00:00.000Z",
        "pickupWindow": {
          "start": "2024-01-16T14:00:00.000Z",
          "end": "2024-01-16T18:00:00.000Z"
        },
        "location": {
          "latitude": 40.7128,
          "longitude": -74.0060,
          "address": "123 School St, New York, NY"
        },
        "owner": {
          "id": "owner123",
          "firstName": "Jane",
          "lastName": "D.",
          "rating": 4.9
        },
        "imageUrl": "https://storage.firebase.com/...",
        "status": "available",
        "distance": 2.3,
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "total": 45,
    "hasMore": true
  }
}
```

### Search Listings
**GET** `/listings/search`

Full-text search across listings.

**Query Parameters:**
- `q` - Search query
- `lat`, `lng` - User location for distance
- `distance` - Maximum distance
- `category` - Filter by category
- `limit`, `offset` - Pagination

### Get Listing Details
**GET** `/listings/:id`

Get detailed information about a specific listing.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "listing123",
    "title": "Fresh Vegetables from School Cafeteria",
    "description": "Detailed description...",
    "category": "vegetables",
    "quantity": 5,
    "unit": "portions",
    "expiryDate": "2024-01-16T18:00:00.000Z",
    "pickupWindow": {
      "start": "2024-01-16T14:00:00.000Z",
      "end": "2024-01-16T18:00:00.000Z"
    },
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060,
      "address": "123 School St, New York, NY"
    },
    "allergens": ["nuts", "dairy"],
    "specialInstructions": "Please bring insulated bag",
    "owner": {
      "id": "owner123",
      "firstName": "Jane",
      "lastName": "Doe",
      "phone": "+1234567890",
      "rating": 4.9
    },
    "volunteer": null,
    "imageUrl": "https://storage.firebase.com/...",
    "status": "available",
    "viewCount": 23,
    "claimCount": 2,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

### Create Listing
**POST** `/listings`

Create a new food listing.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Fresh Vegetables from School Cafeteria",
  "description": "Leftover vegetables from today's lunch service. All items are fresh and properly stored.",
  "category": "vegetables",
  "quantity": 5,
  "unit": "portions",
  "expiryDate": "2024-01-16T18:00:00.000Z",
  "pickupWindow": {
    "start": "2024-01-16T14:00:00.000Z",
    "end": "2024-01-16T18:00:00.000Z"
  },
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "123 School St, New York, NY"
  },
  "allergens": ["nuts"],
  "specialInstructions": "Please bring insulated bag",
  "imageUrl": "https://storage.firebase.com/uploaded-image.jpg"
}
```

### Update Listing
**PUT** `/listings/:id`

Update an existing listing (owner only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (Same as create, all fields optional)

### Delete Listing
**DELETE** `/listings/:id`

Delete a listing (owner only).

**Headers:** `Authorization: Bearer <token>`

### Claim Listing
**POST** `/listings/:id/claim`

Claim a listing as a volunteer.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Listing claimed successfully",
  "data": {
    "listingId": "listing123",
    "volunteerId": "volunteer123",
    "claimedAt": "2024-01-15T15:30:00.000Z",
    "estimatedPickupTime": "2024-01-16T16:00:00.000Z"
  }
}
```

### Update Listing Status
**PUT** `/listings/:id/status`

Update listing status (owner or assigned volunteer).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "picked_up",
  "notes": "Successfully picked up at 4 PM"
}
```

**Valid Status Transitions:**
- `available` → `claimed` (when volunteer claims)
- `claimed` → `picked_up` (when volunteer picks up)
- `picked_up` → `delivered` (when delivered to shelter)
- Any status → `cancelled` (owner can cancel)

## Chat

### Get Chat Messages
**GET** `/chat/:listingId`

Get chat messages for a specific listing.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` - Number of messages (default: 50)
- `before` - Get messages before this timestamp

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg123",
        "senderId": "user123",
        "senderName": "John Doe",
        "content": "Is this still available?",
        "type": "text",
        "timestamp": "2024-01-15T15:30:00.000Z",
        "isRead": true
      },
      {
        "id": "msg124",
        "senderId": "user456",
        "senderName": "Jane Smith",
        "content": "Yes, pickup available until 6 PM",
        "type": "text",
        "timestamp": "2024-01-15T15:32:00.000Z",
        "isRead": false
      }
    ],
    "participants": [
      {
        "id": "user123",
        "name": "John Doe",
        "role": "volunteer"
      },
      {
        "id": "user456",
        "name": "Jane Smith",
        "role": "student"
      }
    ]
  }
}
```

### Send Message
**POST** `/chat/send`

Send a message in a listing chat.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "listingId": "listing123",
  "content": "I can pick this up at 4 PM",
  "type": "text"
}
```

**Message Types:**
- `text` - Regular text message
- `image` - Image message (content should be image URL)
- `location` - Location sharing
- `system` - System generated message

### Get User Conversations
**GET** `/chat/conversations`

Get all conversations for current user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "listingId": "listing123",
      "listingTitle": "Fresh Vegetables",
      "lastMessage": {
        "content": "Thanks for the pickup!",
        "timestamp": "2024-01-15T18:00:00.000Z",
        "senderName": "Jane Smith"
      },
      "unreadCount": 0,
      "participants": [...]
    }
  ]
}
```

### Mark Message as Read
**PUT** `/chat/messages/:id/read`

Mark a specific message as read.

**Headers:** `Authorization: Bearer <token>`

## Volunteers

### Get Nearby Volunteers
**GET** `/volunteers/nearby`

Get volunteers near a specific location.

**Query Parameters:**
- `lat` - Latitude
- `lng` - Longitude
- `distance` - Search radius in km (default: 10)
- `limit` - Number of results

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "volunteer123",
      "firstName": "John",
      "lastName": "D.",
      "distance": 2.3,
      "rating": 4.8,
      "completedDeliveries": 15,
      "availability": {
        "isAvailable": true,
        "until": "2024-01-15T20:00:00.000Z"
      }
    }
  ]
}
```

### Match Volunteers
**POST** `/volunteers/match`

Find best volunteer matches for a listing.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "listingId": "listing123",
  "maxDistance": 10,
  "requiredSkills": [],
  "preferredTime": "2024-01-16T16:00:00.000Z"
}
```

### Get Volunteer Opportunities
**GET** `/volunteers/opportunities`

Get available volunteer opportunities near user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `distance` - Search radius
- `category` - Filter by food category
- `timeSlot` - Filter by time availability

### Update Volunteer Availability
**PUT** `/volunteers/availability`

Update volunteer availability status.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "isAvailable": true,
  "availableUntil": "2024-01-15T20:00:00.000Z",
  "maxDistance": 15,
  "preferredCategories": ["vegetables", "fruits"],
  "notes": "Available for evening pickups"
}
```

## Dashboard

### Get Global Stats
**GET** `/dashboard/stats`

Get platform-wide statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalListings": 3420,
    "mealsRescued": 8750,
    "co2Saved": 6125.5,
    "wasteReduced": 2340.2,
    "activeVolunteers": 450,
    "thisWeek": {
      "newUsers": 25,
      "newListings": 120,
      "mealsRescued": 350
    }
  }
}
```

### Get User Stats
**GET** `/dashboard/user-stats`

Get statistics for current user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalListings": 15,
    "totalPickups": 8,
    "totalDeliveries": 3,
    "mealsRescued": 45,
    "co2Saved": 31.5,
    "wasteReduced": 12.3,
    "impactScore": 120,
    "rating": 4.8,
    "badges": ["first_listing", "eco_warrior", "reliable_volunteer"],
    "monthlyStats": [
      {
        "month": "2024-01",
        "listings": 5,
        "pickups": 3,
        "mealsRescued": 15
      }
    ]
  }
}
```

### Get Impact Chart Data
**GET** `/dashboard/impact-chart`

Get data for impact visualization charts.

**Query Parameters:**
- `period` - Time period (`week`, `month`, `year`)
- `type` - Metric type (`meals`, `co2`, `waste`)

### Get Community Leaderboard
**GET** `/dashboard/leaderboard`

Get community leaderboard data.

**Query Parameters:**
- `period` - Time period (`week`, `month`, `all`)
- `metric` - Ranking metric (`meals`, `impact`, `deliveries`)
- `limit` - Number of results

## Admin

*All admin endpoints require `super_admin` role.*

### Get Admin Dashboard Stats
**GET** `/admin/stats`

Get comprehensive admin dashboard statistics.

**Headers:** `Authorization: Bearer <token>`

### Get All Users
**GET** `/admin/users`

Get paginated list of all users.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `role` - Filter by user role
- `status` - Filter by account status
- `search` - Search by name or email
- `limit`, `offset` - Pagination

### Update User Status
**PUT** `/admin/users/:id/status`

Update user account status.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "suspended",
  "reason": "Terms of service violation",
  "duration": 30
}
```

### Get All Listings (Admin)
**GET** `/admin/listings`

Get all listings with admin privileges.

**Headers:** `Authorization: Bearer <token>`

### Update Listing Status (Admin)
**PUT** `/admin/listings/:id/status`

Update any listing status as admin.

**Headers:** `Authorization: Bearer <token>`

## File Upload

### Upload Single Image
**POST** `/upload/image`

Upload a single image file.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:**
```
FormData:
- image: File (max 5MB, jpg/png/webp)
- category: "listing" | "profile" | "chat"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.firebase.com/images/uuid-filename.jpg",
    "filename": "uuid-filename.jpg",
    "size": 245760,
    "mimeType": "image/jpeg"
  }
}
```

### Upload Multiple Images
**POST** `/upload/multiple`

Upload multiple images (max 5 files).

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:**
```
FormData:
- images: File[] (max 5 files, 5MB each)
- category: "listing" | "profile" | "chat"
```

### Delete Uploaded File
**DELETE** `/upload/:fileName`

Delete an uploaded file.

**Headers:** `Authorization: Bearer <token>`

### Get Signed Upload URL
**GET** `/upload/signed-url`

Get a signed URL for direct file upload to storage.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `fileName` - Desired file name
- `contentType` - File MIME type
- `category` - Upload category

## Error Handling

All API endpoints return errors in this standardized format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "details": {
    "field": "Additional error context"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Request validation failed
- `AUTHENTICATION_REQUIRED` - No valid token provided
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions
- `RESOURCE_NOT_FOUND` - Requested resource doesn't exist
- `DUPLICATE_RESOURCE` - Resource already exists
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `SERVER_ERROR` - Internal server error
- `EXTERNAL_SERVICE_ERROR` - Third-party service error

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Global limit**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **File upload endpoints**: 10 requests per hour per user
- **Chat endpoints**: 50 requests per minute per user

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
```

## WebSocket Events

The API provides real-time functionality through Socket.IO.

### Connection
```javascript
const socket = io('http://localhost:5000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

### Client Events (Send to Server)

#### Join Room
```javascript
socket.emit('join_room', {
  roomId: 'listing123',
  roomType: 'listing' // or 'user', 'admin'
});
```

#### Send Message
```javascript
socket.emit('new_message', {
  chatId: 'listing123',
  content: 'Hello!',
  type: 'text'
});
```

#### Update Location
```javascript
socket.emit('location_update', {
  latitude: 40.7128,
  longitude: -74.0060,
  address: 'New York, NY'
});
```

#### Typing Indicators
```javascript
socket.emit('typing_start', { chatId: 'listing123' });
socket.emit('typing_stop', { chatId: 'listing123' });
```

### Server Events (Receive from Server)

#### Connection Status
```javascript
socket.on('connected', (data) => {
  console.log('Connected:', data.message);
});

socket.on('user_online', (data) => {
  console.log(`${data.name} came online`);
});
```

#### Listings
```javascript
socket.on('new_listing', (data) => {
  console.log('New listing nearby:', data.listing);
});

socket.on('listing_claimed', (data) => {
  console.log('Listing claimed:', data.listingId);
});
```

#### Messaging
```javascript
socket.on('new_message', (data) => {
  console.log('New message:', data.message);
});

socket.on('user_typing', (data) => {
  console.log(`${data.name} is typing...`);
});
```

#### Notifications
```javascript
socket.on('notification', (data) => {
  console.log('Notification:', data.message);
});

socket.on('volunteer_matched', (data) => {
  console.log('Volunteer matched:', data.listing);
});
```

### Error Handling
```javascript
socket.on('error', (error) => {
  console.error('Socket error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});
```

---

## Examples

### Complete User Registration Flow
```javascript
// 1. Register user
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student'
  })
});

const { data } = await registerResponse.json();
const token = data.token;

// 2. Update location
await fetch('/api/users/location', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    latitude: 40.7128,
    longitude: -74.0060,
    address: 'New York, NY'
  })
});
```

### Create and Claim Listing Flow
```javascript
// 1. Create listing
const listingResponse = await fetch('/api/listings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ownerToken}`
  },
  body: JSON.stringify({
    title: 'Fresh Vegetables',
    description: 'Leftover vegetables from cafeteria',
    category: 'vegetables',
    quantity: 5,
    unit: 'portions',
    expiryDate: '2024-01-16T18:00:00.000Z',
    pickupWindow: {
      start: '2024-01-16T14:00:00.000Z',
      end: '2024-01-16T18:00:00.000Z'
    },
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 School St, New York, NY'
    }
  })
});

const { data: listing } = await listingResponse.json();

// 2. Volunteer claims listing
await fetch(`/api/listings/${listing.id}/claim`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${volunteerToken}`
  }
});

// 3. Update status when picked up
await fetch(`/api/listings/${listing.id}/status`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${volunteerToken}`
  },
  body: JSON.stringify({
    status: 'picked_up',
    notes: 'Successfully picked up'
  })
});
```

This comprehensive API documentation covers all endpoints and features of the PantryShare backend. For additional support or questions, please refer to the GitHub repository or contact the development team.
