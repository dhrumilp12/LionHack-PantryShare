import { getFirestore, COLLECTIONS, serverTimestamp } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { USER_ROLES } from '../config/constants.js';

export class UserService {
  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection(COLLECTIONS.USERS);
  }

  /**
   * Create a new user
   */
  async createUser(userData) {
    try {
      // Clean undefined values from userData
      const cleanedUserData = this.cleanUndefinedValues(userData);
      
      const userDoc = {
        ...cleanedUserData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        emailVerified: false,
        profileComplete: false,
        stats: {
          totalListings: 0,
          totalPickups: 0,
          totalDeliveries: 0,
          impactScore: 0
        },
        preferences: {
          notifications: {
            email: true,
            push: true,
            sms: false
          },
          maxDistance: 10, // km
          availabilityWindow: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          preferredCategories: []
        }
      };

      const docRef = await this.collection.add(userDoc);
      
      // Get the created user with ID
      const createdUser = await this.getUserById(docRef.id);
      
      logger.info(`User created successfully: ${docRef.id}`);
      return createdUser;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    try {
      const userDoc = await this.collection.doc(userId).get();
      
      if (!userDoc.exists) {
        return null;
      }

      return {
        id: userDoc.id,
        ...userDoc.data()
      };
    } catch (error) {
      logger.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email) {
    try {
      const snapshot = await this.collection
        .where('email', '==', email.toLowerCase())
        .limit(1)
        .get();

      if (snapshot.empty) {
        return null;
      }

      const userDoc = snapshot.docs[0];
      return {
        id: userDoc.id,
        ...userDoc.data()
      };
    } catch (error) {
      logger.error(`Error fetching user by email ${email}:`, error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUser(userId, updateData) {
    try {
      // Clean undefined values from updateData
      const cleanedUpdateData = this.cleanUndefinedValues(updateData);
      
      const updateDoc = {
        ...cleanedUpdateData,
        updatedAt: serverTimestamp()
      };

      await this.collection.doc(userId).update(updateDoc);
      
      // Return updated user
      return await this.getUserById(userId);
    } catch (error) {
      logger.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Update user stats
   */
  async updateUserStats(userId, statsUpdate) {
    try {
      const userRef = this.collection.doc(userId);
      
      await this.db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        
        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const currentStats = userDoc.data().stats || {};
        const newStats = {
          ...currentStats,
          ...statsUpdate
        };

        transaction.update(userRef, {
          stats: newStats,
          updatedAt: serverTimestamp()
        });
      });

      logger.info(`Updated stats for user ${userId}:`, statsUpdate);
    } catch (error) {
      logger.error(`Error updating user stats ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get users by location (for volunteer matching)
   */
  async getUsersByLocation(latitude, longitude, radiusKm = 10) {
    try {
      // Note: Firestore doesn't have built-in geospatial queries
      // This is a simplified version - in production, consider using GeoFirestore
      const snapshot = await this.collection
        .where('isActive', '==', true)
        .where('role', 'in', [USER_ROLES.VOLUNTEER, USER_ROLES.STUDENT])
        .get();

      const users = [];
      snapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.location) {
          const distance = this.calculateDistance(
            latitude,
            longitude,
            userData.location.latitude,
            userData.location.longitude
          );

          if (distance <= radiusKm) {
            users.push({
              id: doc.id,
              ...userData,
              distance
            });
          }
        }
      });

      // Sort by distance
      users.sort((a, b) => a.distance - b.distance);
      
      return users;
    } catch (error) {
      logger.error('Error fetching users by location:', error);
      throw error;
    }
  }

  /**
   * Get volunteers available in time window
   */
  async getAvailableVolunteers(latitude, longitude, timeWindow, radiusKm = 10) {
    try {
      const nearbyUsers = await this.getUsersByLocation(latitude, longitude, radiusKm);
      
      // Filter by availability (simplified - in production, check actual availability)
      const availableVolunteers = nearbyUsers.filter(user => {
        return user.role === USER_ROLES.VOLUNTEER && 
               user.preferences?.availabilityWindow &&
               this.isAvailableInWindow(user.preferences.availabilityWindow, timeWindow);
      });

      return availableVolunteers;
    } catch (error) {
      logger.error('Error fetching available volunteers:', error);
      throw error;
    }
  }

  /**
   * Update user location
   */
  async updateUserLocation(userId, latitude, longitude, address = null) {
    try {
      const locationData = {
        location: {
          latitude,
          longitude,
          address,
          updatedAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      };

      await this.collection.doc(userId).update(locationData);
      
      logger.info(`Updated location for user ${userId}`);
    } catch (error) {
      logger.error(`Error updating location for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Mark user as active/inactive
   */
  async setUserActiveStatus(userId, isActive) {
    try {
      await this.collection.doc(userId).update({
        isActive,
        updatedAt: serverTimestamp()
      });

      logger.info(`User ${userId} status updated to: ${isActive ? 'active' : 'inactive'}`);
    } catch (error) {
      logger.error(`Error updating user status ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Delete user (soft delete)
   */
  async deleteUser(userId) {
    try {
      await this.collection.doc(userId).update({
        isActive: false,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      logger.info(`User ${userId} soft deleted`);
    } catch (error) {
      logger.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.degToRad(lat2 - lat1);
    const dLon = this.degToRad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.degToRad(lat1)) * Math.cos(this.degToRad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
  }

  /**
   * Convert degrees to radians
   */
  degToRad(deg) {
    return deg * (Math.PI/180);
  }

  /**
   * Check if user is available in given time window
   */
  isAvailableInWindow(userAvailability, timeWindow) {
    // Simplified availability check
    const dayOfWeek = new Date(timeWindow.start).toLocaleLowerCase();
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const day = weekdays[new Date(timeWindow.start).getDay()];
    
    return userAvailability.includes(day);
  }

  /**
   * Get user dashboard data
   */
  async getUserDashboard(userId) {
    try {
      const user = await this.getUserById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      // Get user's recent activity
      const listingsSnapshot = await this.db.collection(COLLECTIONS.LISTINGS)
        .where('ownerId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get();

      const recentListings = [];
      listingsSnapshot.forEach(doc => {
        recentListings.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return {
        profile: user,
        stats: user.stats,
        recentListings,
        achievements: this.calculateAchievements(user.stats)
      };
    } catch (error) {
      logger.error(`Error fetching dashboard for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Calculate user achievements based on stats
   */
  calculateAchievements(stats) {
    const achievements = [];

    if (stats.totalListings >= 1) {
      achievements.push({ name: 'First Contribution', description: 'Created your first listing' });
    }
    if (stats.totalListings >= 10) {
      achievements.push({ name: 'Active Contributor', description: 'Created 10 listings' });
    }
    if (stats.totalPickups >= 5) {
      achievements.push({ name: 'Helpful Volunteer', description: 'Completed 5 pickups' });
    }
    if (stats.impactScore >= 100) {
      achievements.push({ name: 'Impact Maker', description: 'Saved 100+ meals' });
    }

    return achievements;
  }

  /**
   * Helper method to remove undefined values from objects
   */
  cleanUndefinedValues(obj) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    const cleaned = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
          // Recursively clean nested objects
          const cleanedNested = this.cleanUndefinedValues(value);
          if (Object.keys(cleanedNested).length > 0) {
            cleaned[key] = cleanedNested;
          }
        } else {
          cleaned[key] = value;
        }
      }
    });

    return cleaned;
  }
}
