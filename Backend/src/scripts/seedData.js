import { getFirestore, COLLECTIONS, serverTimestamp } from '../config/firebase.js';
import { initializeFirebase } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { USER_ROLES, FOOD_CATEGORIES, LISTING_STATUS } from '../config/constants.js';
import bcrypt from 'bcrypt';

/**
 * Seed database with sample data for development and testing
 */
async function seedDatabase() {
  try {
    // Initialize Firebase
    initializeFirebase();
    const db = getFirestore();

    logger.info('Starting database seeding...');

    // Create sample users
    const users = await createSampleUsers(db);
    logger.info(`Created ${users.length} sample users`);

    // Create sample listings
    const listings = await createSampleListings(db, users);
    logger.info(`Created ${listings.length} sample listings`);

    // Create sample messages
    const messages = await createSampleMessages(db, listings);
    logger.info(`Created ${messages.length} sample messages`);

    // Create sample metrics
    await createSampleMetrics(db);
    logger.info('Created sample metrics');

    logger.info('Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
}

/**
 * Create sample users
 */
async function createSampleUsers(db) {
  const users = [];
  const saltRounds = 12;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  const sampleUsers = [
    {
      email: 'admin@pantryshare.com',
      password: defaultPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: USER_ROLES.SUPER_ADMIN,
      phone: '+1-555-0001',
      bio: 'Platform administrator',
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: 'New York, NY'
      }
    },
    {
      email: 'volunteer1@example.com',
      password: defaultPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: USER_ROLES.VOLUNTEER,
      phone: '+1-555-0101',
      bio: 'Passionate about reducing food waste and helping the community.',
      location: {
        latitude: 40.7589,
        longitude: -73.9851,
        address: 'Manhattan, NY'
      },
      preferences: {
        notifications: { email: true, push: true, sms: false },
        maxDistance: 15,
        availabilityWindow: ['monday', 'tuesday', 'wednesday', 'friday'],
        preferredCategories: [FOOD_CATEGORIES.PRODUCE, FOOD_CATEGORIES.PREPARED]
      }
    },
    {
      email: 'volunteer2@example.com',
      password: defaultPassword,
      firstName: 'Mike',
      lastName: 'Chen',
      role: USER_ROLES.VOLUNTEER,
      phone: '+1-555-0102',
      bio: 'College student volunteer with flexible schedule.',
      location: {
        latitude: 40.7505,
        longitude: -73.9934,
        address: 'Midtown, NY'
      },
      preferences: {
        notifications: { email: true, push: true, sms: true },
        maxDistance: 10,
        availabilityWindow: ['thursday', 'friday', 'saturday', 'sunday'],
        preferredCategories: [FOOD_CATEGORIES.BAKERY, FOOD_CATEGORIES.PANTRY]
      }
    },
    {
      email: 'school1@example.com',
      password: defaultPassword,
      firstName: 'Lincoln',
      lastName: 'High Cafeteria',
      role: USER_ROLES.SCHOOL_ADMIN,
      phone: '+1-555-0201',
      bio: 'Lincoln High School cafeteria - reducing daily food waste.',
      location: {
        latitude: 40.7282,
        longitude: -73.9942,
        address: 'Lincoln High School, NY'
      }
    },
    {
      email: 'student1@example.com',
      password: defaultPassword,
      firstName: 'Emma',
      lastName: 'Williams',
      role: USER_ROLES.STUDENT,
      phone: '+1-555-0301',
      bio: 'High school student organizing food drives.',
      location: {
        latitude: 40.7614,
        longitude: -73.9776,
        address: 'Upper East Side, NY'
      }
    },
    {
      email: 'shelter1@example.com',
      password: defaultPassword,
      firstName: 'Downtown',
      lastName: 'Food Bank',
      role: USER_ROLES.SHELTER_ADMIN,
      phone: '+1-555-0401',
      bio: 'Community food bank serving downtown area.',
      location: {
        latitude: 40.7074,
        longitude: -74.0113,
        address: 'Downtown Community Center, NY'
      }
    }
  ];

  for (const userData of sampleUsers) {
    const userDoc = {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      emailVerified: true,
      profileComplete: true,
      stats: {
        totalListings: 0,
        totalPickups: 0,
        totalDeliveries: 0,
        impactScore: 0,
        rating: 5.0
      }
    };

    const docRef = await db.collection(COLLECTIONS.USERS).add(userDoc);
    users.push({ id: docRef.id, ...userData });
  }

  return users;
}

/**
 * Create sample listings
 */
async function createSampleListings(db, users) {
  const listings = [];
  
  // Find users by role for realistic listings
  const schoolAdmins = users.filter(u => u.role === USER_ROLES.SCHOOL_ADMIN);
  const students = users.filter(u => u.role === USER_ROLES.STUDENT);
  const volunteers = users.filter(u => u.role === USER_ROLES.VOLUNTEER);

  const sampleListings = [
    {
      title: 'Fresh Sandwiches from School Lunch',
      description: 'Leftover sandwiches from today\'s lunch service. All are fresh and properly stored. Perfect for evening distribution.',
      category: FOOD_CATEGORIES.PREPARED,
      quantity: 25,
      unit: 'pieces',
      expiryDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      pickupWindow: {
        start: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        end: new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hours from now
      },
      location: schoolAdmins[0]?.location || { latitude: 40.7282, longitude: -73.9942, address: 'Lincoln High School, NY' },
      allergens: [FOOD_CATEGORIES.WHEAT],
      specialInstructions: 'Please bring insulated bags. Located at the main cafeteria entrance.',
      status: LISTING_STATUS.AVAILABLE,
      ownerId: schoolAdmins[0]?.id
    },
    {
      title: 'Fresh Produce from School Garden',
      description: 'Organic vegetables from our school garden. Includes tomatoes, lettuce, and carrots that are perfect for salads.',
      category: FOOD_CATEGORIES.PRODUCE,
      quantity: 5,
      unit: 'kg',
      expiryDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
      pickupWindow: {
        start: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        end: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours from now
      },
      location: students[0]?.location || { latitude: 40.7614, longitude: -73.9776, address: 'Upper East Side, NY' },
      allergens: [],
      specialInstructions: 'Vegetables are unwashed. Please bring your own bags.',
      status: LISTING_STATUS.CLAIMED,
      ownerId: students[0]?.id,
      volunteerId: volunteers[0]?.id,
      claimedAt: new Date(Date.now() - 30 * 60 * 1000) // Claimed 30 minutes ago
    },
    {
      title: 'Bakery Items - Bread and Pastries',
      description: 'Day-old bread and pastries from local bakery partnership. Still fresh and delicious!',
      category: FOOD_CATEGORIES.BAKERY,
      quantity: 15,
      unit: 'pieces',
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      pickupWindow: {
        start: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        end: new Date(Date.now() + 10 * 60 * 60 * 1000) // 10 hours from now
      },
      location: { latitude: 40.7505, longitude: -73.9934, address: 'Midtown Bakery, NY' },
      allergens: ['wheat', 'eggs', 'dairy'],
      specialInstructions: 'Mix of bread loaves and sweet pastries. Some items contain nuts.',
      status: LISTING_STATUS.AVAILABLE,
      ownerId: students[0]?.id
    },
    {
      title: 'Canned Goods Collection',
      description: 'Assorted canned vegetables and soups collected from food drive. All items are within expiration dates.',
      category: FOOD_CATEGORIES.PANTRY,
      quantity: 20,
      unit: 'pieces',
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      pickupWindow: {
        start: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        end: new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours from now
      },
      location: { latitude: 40.7589, longitude: -73.9851, address: 'Manhattan Community Center, NY' },
      allergens: [],
      specialInstructions: 'Heavy items - please bring a cart or multiple volunteers.',
      status: LISTING_STATUS.DELIVERED,
      ownerId: students[0]?.id,
      volunteerId: volunteers[1]?.id,
      claimedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // Claimed 4 hours ago
      deliveredAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // Delivered 1 hour ago
    }
  ];

  for (const listingData of sampleListings) {
    const listingDoc = {
      ...listingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      viewCount: Math.floor(Math.random() * 50),
      claimCount: listingData.status === LISTING_STATUS.AVAILABLE ? 0 : 1,
      isActive: true
    };

    const docRef = await db.collection(COLLECTIONS.LISTINGS).add(listingDoc);
    listings.push({ id: docRef.id, ...listingData });
  }

  return listings;
}

/**
 * Create sample messages
 */
async function createSampleMessages(db, listings) {
  const messages = [];
  
  // Create messages for claimed/delivered listings
  const claimedListings = listings.filter(l => l.status === LISTING_STATUS.CLAIMED || l.status === LISTING_STATUS.DELIVERED);

  for (const listing of claimedListings) {
    if (!listing.volunteerId || !listing.ownerId) continue;

    const sampleMessages = [
      {
        listingId: listing.id,
        senderId: listing.ownerId,
        content: 'Hi! Thanks for claiming this listing. The items are ready for pickup.',
        type: 'text',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        isRead: true
      },
      {
        listingId: listing.id,
        senderId: listing.volunteerId,
        content: 'Great! I\'ll be there in about 30 minutes. Should I come to the main entrance?',
        type: 'text',
        createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000), // 2.5 hours ago
        isRead: true
      },
      {
        listingId: listing.id,
        senderId: listing.ownerId,
        content: 'Yes, come to the main entrance. I\'ll be waiting with the items.',
        type: 'text',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: true
      }
    ];

    for (const messageData of sampleMessages) {
      const messageDoc = {
        ...messageData,
        metadata: {}
      };

      const docRef = await db.collection(COLLECTIONS.MESSAGES).add(messageDoc);
      messages.push({ id: docRef.id, ...messageData });
    }
  }

  return messages;
}

/**
 * Create sample metrics
 */
async function createSampleMetrics(db) {
  const globalStats = {
    totalListings: 150,
    totalUsers: 89,
    totalMealsRescued: 1247,
    totalCO2Saved: 3117.5, // kg
    totalWaterSaved: 31175, // liters
    activeListings: 23,
    completedListings: 98,
    lastUpdated: serverTimestamp()
  };

  await db.collection(COLLECTIONS.METRICS).doc('global').set(globalStats);
}

// Run the seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
