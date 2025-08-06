# 🍽️ PantryShare - Community Food Rescue Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.17-4FC08D.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF.svg)](https://vitejs.dev/)

> **Turning food waste into community nourishment** 🌱  
> A web-based platform that empowers schools, students, and community volunteers to rescue surplus food and connect it with those in need.

## 🌟 Overview

PantryShare is a revolutionary platform designed to tackle two critical issues: food waste and hunger. By creating a seamless connection between food donors (schools, households) and recipients (shelters, families in need), we're building a more sustainable and caring community.

**Our Mission**: Transform potential food waste into community nourishment through technology and volunteer coordination.

## ✨ Key Features

### 📱 Surplus Listing

- **Quick & Easy**: Snap a photo, enter quantity/type, and set expiry date
- **Mobile-First**: Optimized for on-the-go food donations
- **Smart Categorization**: Automatic food type detection and allergen warnings

### 🗺️ Live Map & Availability

- **Interactive Map**: Real-time pins showing "ready for pick-up" locations
- **Visual Dashboard**: Intuitive interface for volunteers to find nearby donations
- **Distance-Based Sorting**: Efficient route planning for volunteers

### 🤝 Volunteer Matching

- **Smart Algorithm**: Auto-matches volunteers by distance and availability
- **Flexible Scheduling**: Choose your volunteer time windows
- **Skill-Based Matching**: Connect specialized volunteers with specific needs

### 💬 In-App Communication

- **Real-Time Chat**: Coordinate logistics without external apps
- **Push Notifications**: Stay updated on new opportunities and confirmations
- **Status Updates**: Track donation progress from listing to delivery

### 📊 Impact Tracking

- **Donation Dashboard**: Track total meals rescued and environmental impact
- **Carbon Footprint**: Calculate CO₂ saved through food rescue
- **Community Stats**: See collective impact across your community

### 👨‍💼 Admin Mode *(Coming Soon)*

- **Shelter Management**: Food banks can update needs calendars
- **Inventory Tracking**: Real-time updates on received donations
- **Volunteer Coordination**: Manage volunteer schedules and assignments

## 🛠️ Tech Stack

### Frontend

- **Framework**: Vue.js 3.5.17 with Composition API
- **Build Tool**: Vite (Latest)
- **Styling**: CSS3 with responsive design
- **PWA**: Progressive Web App capabilities for mobile access

### Development Tools

- **Linting**: ESLint + OXLint for code quality
- **Package Manager**: npm with run-all2 for script coordination
- **Hot Reload**: Vite dev server with instant updates

### Planned Backend Integration

- **Backend**: Node.js + Express
- **Database**: Firebase Firestore
- **Real-time**: Socket.IO for chat functionality
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Maps**: Google Maps JavaScript API
- **Hosting**: Vercel/Netlify (Frontend), Heroku/Render (Backend)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

#### Frontend

1. **Clone the repository**

   ```bash
   git clone https://github.com/dhrumilp12/PantryShare.git
   cd PantryShare/PantryShare
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to see the application

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run all linters (ESLint + OXLint)
npm run lint:eslint # Run ESLint specifically
npm run lint:oxlint # Run OXLint specifically
```

#### Backend

## ⚙️ Installation

1. **Clone the repository**
   ```bash
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


## 🎯 Target Audience

- **High School Volunteers**: Students looking to make a community impact
- **School Cafeterias**: Reduce daily food waste efficiently
- **Food Banks & Shelters**: Access fresh donations with better coordination
- **Community Organizations**: Streamline food rescue operations

## 📱 Demo Workflow

### 1. **List a Meal** ("Surplus Listing")

- Quick mobile form with photo upload
- Set pickup time window and location
- Automatic expiry date validation

### 2. **Map & Match**

- Volunteers see available donations on interactive map
- Click pin to view details and claim pickup
- Smart routing for efficient collection

### 3. **Coordinate & Communicate**

- In-app chat for logistics coordination
- Real-time status updates
- Confirmation system for completed deliveries

### 4. **Track Impact**

- Dashboard showing meals rescued
- Environmental impact metrics
- Community leaderboards and achievements

## 🌍 Social Impact

### Environmental Benefits

- **Food Waste Reduction**: Divert surplus food from landfills
- **Carbon Footprint**: Reduce methane emissions from food decomposition
- **Resource Conservation**: Maximize use of already-produced food

### Community Benefits

- **Hunger Relief**: Direct food access for families in need
- **Youth Engagement**: Meaningful volunteer opportunities for students
- **Community Building**: Strengthen local networks and relationships

### Measurable Outcomes

- Meals rescued and distributed
- Pounds of food waste prevented
- CO₂ emissions avoided
- Volunteer hours contributed
- Families served

## 🏆 Why PantryShare Stands Out

- **✅ Technical Complexity**: Combines CRUD operations, real-time updates, mapping, and notifications
- **🎨 User Experience**: Mobile-first, intuitive design for seamless interaction
- **🌱 Social Purpose**: Addresses critical issues of hunger and sustainability
- **📈 Scalability**: Designed for expansion across school networks and communities
- **💡 Innovation**: Fresh approach to food rescue at the hyper-local level

## 🤝 Contributing

We welcome contributions from developers, designers, and community advocates! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow Vue.js 3 best practices
- Use ESLint configuration for code style
- Write meaningful commit messages
- Test thoroughly before submitting PRs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

### PantryShare Development Team

- Building technology for social good
- Passionate about sustainability and community impact
- Dedicated to creating meaningful solutions

## 📞 Contact

- **GitHub Issues**: For bug reports and feature requests
- **Email**: dhrumil1612@icloud.com
- **Project Link**: [https://github.com/dhrumilp12/PantryShare](https://github.com/dhrumilp12/PantryShare)

## 🙏 Acknowledgments

- Built for LionHacks Summer 2025
- Inspired by the global food waste crisis
- Supported by the open-source community
- Dedicated to all volunteers working to feed their communities

---

**Together, we can turn food waste into community nourishment.** 🌟

PantryShare - Where technology meets compassion