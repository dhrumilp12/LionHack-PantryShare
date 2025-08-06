import admin from 'firebase-admin';
import { logger } from './logger.js';

let firebaseApp = null;
let firestoreDb = null;

/**
 * Initialize Firebase Admin SDK
 */
export const initializeFirebase = () => {
  try {
    if (firebaseApp) {
      return firebaseApp;
    }

    // Debug environment variables
    logger.info('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? 'SET' : 'MISSING',
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? 'SET' : 'MISSING',
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? 'SET' : 'MISSING'
    });

    // Validate required environment variables
    const requiredVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];
    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
      }
    }

    // Clean and format the private key
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      // Remove outer quotes if present
      privateKey = privateKey.replace(/^["']|["']$/g, '');
      // Replace escaped newlines with actual newlines
      privateKey = privateKey.replace(/\\n/g, '\n');
      // Ensure proper format
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('Invalid private key format - missing BEGIN marker');
      }
      if (!privateKey.includes('-----END PRIVATE KEY-----')) {
        throw new Error('Invalid private key format - missing END marker');
      }
    }

    const serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
      token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
    };

    // Log configuration (without sensitive data) for debugging
    logger.info('Firebase configuration:', {
      project_id: serviceAccount.project_id,
      client_email: serviceAccount.client_email,
      hasPrivateKey: !!serviceAccount.private_key,
      privateKeyStartsWith: serviceAccount.private_key?.substring(0, 30) + '...',
      privateKeyLength: serviceAccount.private_key?.length
    });

    // Validate service account object
    if (!serviceAccount.project_id || typeof serviceAccount.project_id !== 'string') {
      throw new Error(`Invalid project_id: ${typeof serviceAccount.project_id} - "${serviceAccount.project_id}"`);
    }

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    });

    // Initialize Firestore with settings immediately after Firebase initialization
    firestoreDb = admin.firestore();
    firestoreDb.settings({
      ignoreUndefinedProperties: true
    });

    logger.info('🔥 Firebase Admin SDK initialized successfully');
    return firebaseApp;
  } catch (error) {
    logger.error('Failed to initialize Firebase Admin SDK:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    throw error;
  }
};

/**
 * Get Firestore database instance
 */
export const getFirestore = () => {
  if (!firestoreDb) {
    if (!firebaseApp) {
      initializeFirebase();
    }
    // firestoreDb should already be initialized in initializeFirebase()
    if (!firestoreDb) {
      firestoreDb = admin.firestore();
    }
  }
  
  return firestoreDb;
};

/**
 * Get Firebase Auth instance
 */
export const getAuth = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return admin.auth();
};

/**
 * Get Firebase Storage instance
 */
export const getStorage = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return admin.storage();
};

/**
 * Firestore collections
 */
export const COLLECTIONS = {
  USERS: 'users',
  LISTINGS: 'listings',
  CHATS: 'chats',
  MESSAGES: 'messages',
  VOLUNTEERS: 'volunteers',
  MATCHES: 'matches',
  NOTIFICATIONS: 'notifications',
  METRICS: 'metrics',
  SHELTERS: 'shelters',
  FEEDBACK: 'feedback'
};

/**
 * Batch operations helper
 */
export const createBatch = () => getFirestore().batch();

/**
 * Transaction helper
 */
export const runTransaction = (updateFunction) => getFirestore().runTransaction(updateFunction);

/**
 * Server timestamp
 */
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;

/**
 * Array union helper
 */
export const arrayUnion = (...elements) => admin.firestore.FieldValue.arrayUnion(...elements);

/**
 * Array remove helper
 */
export const arrayRemove = (...elements) => admin.firestore.FieldValue.arrayRemove(...elements);

/**
 * Increment helper
 */
export const increment = (value) => admin.firestore.FieldValue.increment(value);

export default firebaseApp;
