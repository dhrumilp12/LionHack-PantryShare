// Load environment variables FIRST
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from the correct path (only in development)
if (process.env.NODE_ENV !== 'production') {
  const envPath = path.join(__dirname, '..', '.env');
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    console.error('Error loading .env file:', result.error);
    console.warn('⚠️ Continuing without .env file - assuming environment variables are set');
  } else {
    console.log('✅ Environment variables loaded from .env file');
  }
} else {
  console.log('✅ Production mode - using environment variables from platform');
}

console.log('🔍 Key env vars:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? 'LOADED' : 'MISSING'
});

// Validate critical environment variables before proceeding
const requiredEnvVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  process.exit(1);
}

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import custom modules
import { logger } from './config/logger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();
const httpServer = createServer(app);

// Initialize Firebase after environment validation
let firebaseInitialized = false;
try {
  const { initializeFirebase } = await import('./config/firebase.js');
  await initializeFirebase();
  firebaseInitialized = true;
  logger.info('✅ Firebase initialized successfully');
} catch (error) {
  logger.error('❌ Firebase initialization failed:', {
    message: error.message,
    stack: error.stack,
    name: error.name
  });
  // Don't exit here, let the server start but log the error
}

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Configure rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io available to routes
app.set('io', io);

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Initial check point
app.get('/', (req, res) => {
  res.status(200).json({
    status: firebaseInitialized ? 'OK' : 'DEGRADED',
    message: 'PantryShare Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: firebaseInitialized ? 'OK' : 'DEGRADED',
    firebase: firebaseInitialized ? 'Connected' : 'Failed',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Import and use routes only if Firebase is initialized
if (firebaseInitialized) {
  try {
    const authRoutes = await import('./routes/auth.js');
    const userRoutes = await import('./routes/users.js');
    const listingRoutes = await import('./routes/listings.js');
    const volunteerRoutes = await import('./routes/volunteers.js');
    const chatRoutes = await import('./routes/chat.js');
    const dashboardRoutes = await import('./routes/dashboard.js');
    const adminRoutes = await import('./routes/admin.js');
    const uploadRoutes = await import('./routes/upload.js');
    const { socketHandler } = await import('./sockets/socketHandler.js');

    // API Routes
    app.use('/api/auth', authRoutes.default);
    app.use('/api/users', userRoutes.default);
    app.use('/api/listings', listingRoutes.default);
    app.use('/api/volunteers', volunteerRoutes.default);
    app.use('/api/chat', chatRoutes.default);
    app.use('/api/dashboard', dashboardRoutes.default);
    app.use('/api/admin', adminRoutes.default);
    app.use('/api/upload', uploadRoutes.default);

    // Socket.IO connection handling
    socketHandler(io);
    
    logger.info('✅ All routes and services loaded successfully');
  } catch (error) {
    logger.error('❌ Failed to load routes:', error);
  }
} else {
  // Provide fallback routes when Firebase is not available
  app.use('/api/*', (req, res) => {
    res.status(503).json({
      error: 'Service temporarily unavailable',
      message: 'Firebase initialization failed. Please check server logs.'
    });
  });
}

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  logger.info(`🚀 PantryShare Backend Server running on port ${PORT}`);
  logger.info(`🌍 Listening on http://localhost:${PORT}`);
  logger.info(`📍 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🌐 CORS enabled for: ${corsOptions.origin}`);
  logger.info(`🔥 Firebase status: ${firebaseInitialized ? 'Connected' : 'Failed'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  httpServer.close(() => {
    process.exit(1);
  });
});

export default app;
