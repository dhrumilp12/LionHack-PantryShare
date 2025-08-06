# PantryShare Backend API

A robust Node.js backend for PantryShare - Community Food Rescue Platform. Built with Express.js, Firebase, and Socket.IO to provide real-time food rescue coordination.

## 🚀 Features

### Core Functionality
- **User Authentication** - JWT-based auth with Firebase integration
- **Listing Management** - CRUD operations for food surplus listings
- **Real-time Chat** - Socket.IO powered messaging between users
- **Volunteer Matching** - Smart algorithm to match volunteers with nearby opportunities
- **File Uploads** - Image processing and cloud storage integration
- **Impact Tracking** - Calculate meals rescued, CO2 saved, and environmental impact

### Technical Features
- **RESTful API** - Clean, documented endpoints
- **Real-time Updates** - Socket.IO for live notifications and chat
- **Database** - Firebase Firestore for scalable NoSQL storage
- **Authentication** - Secure JWT tokens with role-based access
- **File Storage** - Firebase Cloud Storage with image optimization
- **Logging** - Comprehensive logging with Winston
- **Validation** - Input validation with express-validator
- **Error Handling** - Centralized error handling and logging

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Authentication**: JWT + Firebase Auth
- **File Storage**: Firebase Cloud Storage
- **Real-time**: Socket.IO
- **Image Processing**: Sharp
- **Logging**: Winston
- **Validation**: express-validator
- **Testing**: Jest (setup ready)

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Firebase project with Firestore and Storage enabled
- Firebase service account key

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PantryShare/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Firebase credentials and other configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your-client-email
   # ... other Firebase config
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # Google Maps API
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

4. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Enable Storage
   - Generate a service account key
   - Download the key and extract the values for your .env file

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on http://localhost:5000

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication Endpoints
```http
POST /api/auth/register          # Register new user
POST /api/auth/login             # Login user
POST /api/auth/firebase-login    # Login with Firebase token
POST /api/auth/refresh-token     # Refresh JWT token
POST /api/auth/logout            # Logout user
```

### User Endpoints
```http
GET    /api/users/profile        # Get current user profile
PUT    /api/users/profile        # Update user profile
PUT    /api/users/location       # Update user location
GET    /api/users/dashboard      # Get user dashboard data
GET    /api/users/:id            # Get public user profile
```

### Listing Endpoints
```http
GET    /api/listings             # Get listings with filters
GET    /api/listings/search      # Search listings by text
GET    /api/listings/:id         # Get specific listing
POST   /api/listings             # Create new listing
PUT    /api/listings/:id         # Update listing
DELETE /api/listings/:id         # Delete listing
POST   /api/listings/:id/claim   # Claim listing as volunteer
PUT    /api/listings/:id/status  # Update listing status
```

### Volunteer Endpoints
```http
GET    /api/volunteers/nearby           # Get nearby volunteers
POST   /api/volunteers/match            # Match volunteers to listing
GET    /api/volunteers/opportunities    # Get volunteer opportunities
PUT    /api/volunteers/availability     # Update availability
```

### Chat Endpoints
```http
GET    /api/chat/:listingId      # Get chat messages for listing
POST   /api/chat/send            # Send message
GET    /api/chat/conversations   # Get user's conversations
PUT    /api/chat/messages/:id/read # Mark message as read
```

### Dashboard Endpoints
```http
GET    /api/dashboard/stats         # Get global platform stats
GET    /api/dashboard/user-stats    # Get user's statistics
GET    /api/dashboard/impact-chart  # Get impact chart data
GET    /api/dashboard/leaderboard   # Get community leaderboard
```

### Upload Endpoints
```http
POST   /api/upload/image         # Upload single image
POST   /api/upload/multiple      # Upload multiple images
DELETE /api/upload/:fileName     # Delete uploaded file
GET    /api/upload/signed-url    # Get signed URL for direct upload
```

### Admin Endpoints (Admin only)
```http
GET    /api/admin/stats          # Get admin dashboard stats
GET    /api/admin/users          # Get all users
PUT    /api/admin/users/:id/status # Update user status
GET    /api/admin/listings       # Get all listings
PUT    /api/admin/listings/:id/status # Update listing status
```

## 🔌 Socket.IO Events

### Client to Server Events
```javascript
// Connection and rooms
'join_room' { roomId, roomType }
'leave_room' { roomId }

// Messaging
'new_message' { chatId, content, type }
'typing_start' { chatId }
'typing_stop' { chatId }

// Location and availability
'location_update' { latitude, longitude, address }
'availability_update' { availability, maxDistance }
```

### Server to Client Events
```javascript
// Connection status
'connected' { message, userId, timestamp }
'user_online' { userId, name, timestamp }
'user_offline' { userId, name, timestamp }

// Listings
'new_listing' { listing, location }
'listing_claimed' { listingId, volunteerId, ownerId }
'listing_updated' { listingId, listing }

// Messaging
'new_message' { message, listingId }
'message_sent' { tempId, status, timestamp }
'user_typing' { userId, name, chatId }

// Notifications
'notification' { type, message, data }
'volunteer_matched' { listing, message }
```

## 🗂 Project Structure

```
src/
├── config/           # Configuration files
│   ├── firebase.js   # Firebase initialization
│   ├── logger.js     # Winston logger setup
│   └── constants.js  # Application constants
├── middleware/       # Express middleware
│   ├── auth.js       # Authentication middleware
│   ├── validation.js # Input validation rules
│   └── errorHandler.js # Error handling
├── routes/           # API route handlers
│   ├── auth.js       # Authentication routes
│   ├── users.js      # User management routes
│   ├── listings.js   # Listing CRUD routes
│   ├── chat.js       # Chat/messaging routes
│   ├── volunteers.js # Volunteer matching routes
│   ├── dashboard.js  # Analytics/dashboard routes
│   ├── admin.js      # Admin panel routes
│   └── upload.js     # File upload routes
├── services/         # Business logic layer
│   ├── userService.js    # User operations
│   └── listingService.js # Listing operations
├── sockets/          # Socket.IO handling
│   └── socketHandler.js  # Real-time event handling
├── utils/            # Utility functions
│   └── helpers.js    # Common helper functions
├── scripts/          # Database and utility scripts
│   └── seedData.js   # Database seeding script
└── server.js         # Main application entry point
```

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server with nodemon
npm start           # Start production server

# Database
npm run seed        # Seed database with sample data

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors automatically

# Testing
npm test           # Run tests
npm run test:watch # Run tests in watch mode

# Build
npm run build      # Run linting (production build prep)
```

## 🔒 Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "user-firestore-id",
  "email": "user@example.com", 
  "role": "student|volunteer|shelter_admin|school_admin|super_admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Role-based Access Control
- **Student**: Create listings, view opportunities
- **Volunteer**: Claim listings, view opportunities
- **Shelter Admin**: Manage shelter needs, confirm deliveries
- **School Admin**: Bulk listing management
- **Super Admin**: Full platform access

## 📊 Database Schema

### Users Collection
```javascript
{
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: String,
  phone: String,
  bio: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  preferences: {
    notifications: { email: Boolean, push: Boolean, sms: Boolean },
    maxDistance: Number,
    availabilityWindow: [String],
    preferredCategories: [String]
  },
  stats: {
    totalListings: Number,
    totalPickups: Number,
    totalDeliveries: Number,
    impactScore: Number,
    rating: Number
  },
  createdAt: Timestamp,
  updatedAt: Timestamp,
  isActive: Boolean
}
```

### Listings Collection
```javascript
{
  ownerId: String,
  volunteerId: String,
  title: String,
  description: String,
  category: String,
  quantity: Number,
  unit: String,
  expiryDate: Timestamp,
  pickupWindow: {
    start: Timestamp,
    end: Timestamp
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  allergens: [String],
  specialInstructions: String,
  status: String,
  imageUrl: String,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  claimedAt: Timestamp,
  deliveredAt: Timestamp,
  viewCount: Number,
  claimCount: Number,
  isActive: Boolean
}
```

## 🌍 Environment Variables

See `.env.example` for a complete list of required environment variables:

### Required Variables
- `FIREBASE_PROJECT_ID` - Your Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase service account private key
- `FIREBASE_CLIENT_EMAIL` - Firebase service account email
- `JWT_SECRET` - Secret key for JWT tokens
- `GOOGLE_MAPS_API_KEY` - Google Maps API key for geolocation

### Optional Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window
- `MAX_FILE_SIZE` - Maximum file upload size

## 📝 API Response Format

All API endpoints return responses in this standardized format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📈 Performance & Monitoring

### Logging
- All requests logged with Morgan
- Error tracking with Winston
- Structured logging for production monitoring

### Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable via environment variables

### Caching
- In-memory caching for frequently accessed data
- Firebase automatic caching for repeated queries

## 🚀 Deployment

### Production Checklist
1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure proper CORS origins
4. Set up SSL/HTTPS
5. Configure Firebase security rules
6. Set up monitoring and logging
7. Configure rate limiting for production load

### Environment Setup
```bash
# Build and prepare for production
npm run build

# Start production server
npm start
```

### Docker Support
```dockerfile
# Dockerfile included for containerized deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation for API changes
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: For bug reports and feature requests
- **Email**: dhrumil1612@icloud.com
- **Documentation**: Check the `/docs` folder for detailed API documentation

## 🙏 Acknowledgments

- Built for LionHacks Summer 2025
- Firebase for backend infrastructure
- Express.js community for excellent middleware
- Socket.IO for real-time capabilities

---

**PantryShare Backend** - Powering community food rescue through technology 🌟
