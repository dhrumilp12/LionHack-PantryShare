// Debug script to test Firebase configuration
import dotenv from 'dotenv';
import { logger } from './src/config/logger.js';

// Load environment variables
dotenv.config();

console.log('=== Environment Variables Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('FIREBASE_PRIVATE_KEY length:', process.env.FIREBASE_PRIVATE_KEY?.length);
console.log('FIREBASE_PRIVATE_KEY starts with:', process.env.FIREBASE_PRIVATE_KEY?.substring(0, 50));

// Test Firebase initialization
try {
  const { initializeFirebase } = await import('./src/config/firebase.js');
  console.log('\n=== Testing Firebase Initialization ===');
  const app = initializeFirebase();
  console.log('✅ Firebase initialized successfully');
  console.log('App name:', app.name);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  console.error('Stack:', error.stack);
}
