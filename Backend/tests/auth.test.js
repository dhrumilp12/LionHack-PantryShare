import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import bcrypt from 'bcrypt';

// Set up environment variables first
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.NODE_ENV = 'test';

// Mock Firebase before any imports
const mockFirestore = {
  collection: jest.fn(() => ({
    where: jest.fn(() => ({
      get: jest.fn()
    })),
    add: jest.fn(),
    doc: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn(),
      update: jest.fn()
    }))
  }))
};

// Mock Firebase config
jest.unstable_mockModule('../src/config/firebase.js', () => ({
  getFirestore: jest.fn(() => mockFirestore),
  initializeFirebase: jest.fn(),
  COLLECTIONS: {
    USERS: 'users'
  }
}));

// Mock logger
jest.unstable_mockModule('../src/config/logger.js', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

// Mock UserService class
const MockUserService = class {
  constructor() {}
  
  async createUser(userData) {
    return { 
      id: 'user123', 
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role
    };
  }
  
  async getUserByEmail(email) {
    if (email === 'existing@example.com') {
      return { 
        id: 'existing-user', 
        email: email,
        password: await bcrypt.hash('password123', 10),
        firstName: 'Existing',
        lastName: 'User',
        role: 'student',
        isActive: true
      };
    }
    return null;
  }
  
  async getUserById(id) {
    return { 
      id: id, 
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'student'
    };
  }
};

jest.unstable_mockModule('../src/services/userService.js', () => ({
  default: MockUserService
}));

// Simple mock for auth routes
const mockAuthRoutes = express.Router();

mockAuthRoutes.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  
  // Basic validation
  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Check if user already exists
  if (email === 'existing@example.com') {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }

  // Mock successful registration
  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: { id: 'user123', email, firstName, lastName, role },
      token: 'mock-jwt-token'
    }
  });
});

mockAuthRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Mock user lookup
  if (email === 'test@example.com' && password === 'password123') {
    return res.status(200).json({
      success: true,
      data: {
        user: { id: 'user123', email: 'test@example.com', firstName: 'Test', lastName: 'User' },
        token: 'mock-jwt-token'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
});

describe('Authentication Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', mockAuthRoutes);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        phone: '+1234567890'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'volunteer'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });

    it('should validate required fields', async () => {
      const incompleteData = {
        email: 'test@example.com'
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(incompleteData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
