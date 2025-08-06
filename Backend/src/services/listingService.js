import { getFirestore, COLLECTIONS, serverTimestamp, increment } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { LISTING_STATUS, FOOD_CATEGORIES } from '../config/constants.js';
import { UserService } from './userService.js';

export class ListingService {
  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection(COLLECTIONS.LISTINGS);
    this.userService = new UserService();
  }

  /**
   * Create a new listing
   */
  async createListing(listingData, ownerId) {
    try {
      const listingDoc = {
        ...listingData,
        ownerId,
        status: LISTING_STATUS.AVAILABLE,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        viewCount: 0,
        claimCount: 0,
        isActive: true
      };

      const docRef = await this.collection.add(listingDoc);
      
      // Update user stats
      await this.userService.updateUserStats(ownerId, {
        totalListings: increment(1)
      });

      // Get the created listing with ID
      const createdListing = await this.getListingById(docRef.id);
      
      logger.info(`Listing created successfully: ${docRef.id}`);
      return createdListing;
    } catch (error) {
      logger.error('Error creating listing:', error);
      throw error;
    }
  }

  /**
   * Get listing by ID
   */
  async getListingById(listingId) {
    try {
      const listingDoc = await this.collection.doc(listingId).get();
      
      if (!listingDoc.exists) {
        return null;
      }

      const listing = {
        id: listingDoc.id,
        ...listingDoc.data()
      };

      // Get owner information
      const owner = await this.userService.getUserById(listing.ownerId);
      if (owner) {
        listing.owner = {
          id: owner.id,
          firstName: owner.firstName,
          lastName: owner.lastName,
          profileImage: owner.profileImage,
          rating: owner.stats?.rating || 5.0
        };
      }

      return listing;
    } catch (error) {
      logger.error(`Error fetching listing ${listingId}:`, error);
      throw error;
    }
  }

  /**
   * Get listings with filters and pagination
   */
  async getListings(filters = {}, options = {}) {
    try {
      let query = this.collection.where('isActive', '==', true);

      // Apply filters
      if (filters.status) {
        query = query.where('status', '==', filters.status);
      } else {
        // Default to available listings
        query = query.where('status', '==', LISTING_STATUS.AVAILABLE);
      }

      if (filters.category) {
        query = query.where('category', '==', filters.category);
      }

      if (filters.ownerId) {
        query = query.where('ownerId', '==', filters.ownerId);
      }

      if (filters.volunteerId) {
        query = query.where('volunteerId', '==', filters.volunteerId);
      }

      // Apply sorting
      const sortBy = options.sortBy || 'createdAt';
      const sortOrder = options.sortOrder || 'desc';
      query = query.orderBy(sortBy, sortOrder);

      // Apply pagination
      const limit = Math.min(options.limit || 20, 100);
      query = query.limit(limit);

      if (options.startAfter) {
        const startAfterDoc = await this.collection.doc(options.startAfter).get();
        if (startAfterDoc.exists) {
          query = query.startAfter(startAfterDoc);
        }
      }

      const snapshot = await query.get();
      const listings = [];

      // Process listings in parallel
      const listingPromises = snapshot.docs.map(async (doc) => {
        const listing = {
          id: doc.id,
          ...doc.data()
        };

        // Get owner information
        const owner = await this.userService.getUserById(listing.ownerId);
        if (owner) {
          listing.owner = {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
            profileImage: owner.profileImage
          };
        }

        // Calculate distance if coordinates provided
        if (filters.latitude && filters.longitude && listing.location) {
          listing.distance = this.userService.calculateDistance(
            filters.latitude,
            filters.longitude,
            listing.location.latitude,
            listing.location.longitude
          );
        }

        return listing;
      });

      const processedListings = await Promise.all(listingPromises);

      // Filter by distance if radius provided
      let filteredListings = processedListings;
      if (filters.radius && filters.latitude && filters.longitude) {
        filteredListings = processedListings.filter(listing => 
          !listing.distance || listing.distance <= filters.radius
        );
      }

      // Sort by distance if coordinates provided
      if (filters.latitude && filters.longitude) {
        filteredListings.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }

      return {
        listings: filteredListings,
        hasMore: snapshot.docs.length === limit,
        lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null
      };
    } catch (error) {
      logger.error('Error fetching listings:', error);
      throw error;
    }
  }

  /**
   * Update listing
   */
  async updateListing(listingId, updateData, userId) {
    try {
      const listing = await this.getListingById(listingId);
      
      if (!listing) {
        throw new Error('Listing not found');
      }

      // Check ownership
      if (listing.ownerId !== userId) {
        throw new Error('Unauthorized to update this listing');
      }

      const updateDoc = {
        ...updateData,
        updatedAt: serverTimestamp()
      };

      // Remove undefined values
      Object.keys(updateDoc).forEach(key => {
        if (updateDoc[key] === undefined) {
          delete updateDoc[key];
        }
      });

      await this.collection.doc(listingId).update(updateDoc);
      
      logger.info(`Listing ${listingId} updated successfully`);
      return await this.getListingById(listingId);
    } catch (error) {
      logger.error(`Error updating listing ${listingId}:`, error);
      throw error;
    }
  }

  /**
   * Claim a listing by volunteer
   */
  async claimListing(listingId, volunteerId) {
    try {
      const listingRef = this.collection.doc(listingId);
      
      const result = await this.db.runTransaction(async (transaction) => {
        const listingDoc = await transaction.get(listingRef);
        
        if (!listingDoc.exists) {
          throw new Error('Listing not found');
        }

        const listing = listingDoc.data();
        
        if (listing.status !== LISTING_STATUS.AVAILABLE) {
          throw new Error('Listing is no longer available');
        }

        if (listing.ownerId === volunteerId) {
          throw new Error('Cannot claim your own listing');
        }

        // Check if listing has expired
        const now = new Date();
        const pickupEnd = new Date(listing.pickupWindow.end.toDate());
        if (pickupEnd < now) {
          throw new Error('Pickup window has expired');
        }

        // Update listing status
        transaction.update(listingRef, {
          status: LISTING_STATUS.CLAIMED,
          volunteerId,
          claimedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          claimCount: increment(1)
        });

        return {
          listingId,
          volunteerId,
          ownerId: listing.ownerId
        };
      });

      // Update volunteer stats
      await this.userService.updateUserStats(volunteerId, {
        totalPickups: increment(1)
      });

      logger.info(`Listing ${listingId} claimed by volunteer ${volunteerId}`);
      return result;
    } catch (error) {
      logger.error(`Error claiming listing ${listingId}:`, error);
      throw error;
    }
  }

  /**
   * Update listing status
   */
  async updateListingStatus(listingId, newStatus, userId, additionalData = {}) {
    try {
      const listing = await this.getListingById(listingId);
      
      if (!listing) {
        throw new Error('Listing not found');
      }

      // Check if user has permission to update status
      const canUpdate = listing.ownerId === userId || 
                       listing.volunteerId === userId ||
                       additionalData.isAdmin;

      if (!canUpdate) {
        throw new Error('Unauthorized to update listing status');
      }

      const updateData = {
        status: newStatus,
        updatedAt: serverTimestamp(),
        ...additionalData
      };

      // Add status-specific data
      switch (newStatus) {
        case LISTING_STATUS.IN_TRANSIT:
          updateData.pickupAt = serverTimestamp();
          break;
        case LISTING_STATUS.DELIVERED:
          updateData.deliveredAt = serverTimestamp();
          // Update stats for both owner and volunteer
          if (listing.volunteerId) {
            await this.userService.updateUserStats(listing.volunteerId, {
              totalDeliveries: increment(1),
              impactScore: increment(this.calculateImpactScore(listing))
            });
          }
          break;
        case LISTING_STATUS.CANCELLED:
          updateData.cancelledAt = serverTimestamp();
          updateData.cancellationReason = additionalData.reason;
          break;
        case LISTING_STATUS.EXPIRED:
          updateData.expiredAt = serverTimestamp();
          break;
      }

      await this.collection.doc(listingId).update(updateData);
      
      logger.info(`Listing ${listingId} status updated to ${newStatus}`);
      return await this.getListingById(listingId);
    } catch (error) {
      logger.error(`Error updating listing status ${listingId}:`, error);
      throw error;
    }
  }

  /**
   * Delete listing (soft delete)
   */
  async deleteListing(listingId, userId) {
    try {
      const listing = await this.getListingById(listingId);
      
      if (!listing) {
        throw new Error('Listing not found');
      }

      if (listing.ownerId !== userId) {
        throw new Error('Unauthorized to delete this listing');
      }

      if (listing.status === LISTING_STATUS.CLAIMED || listing.status === LISTING_STATUS.IN_TRANSIT) {
        throw new Error('Cannot delete listing that is claimed or in transit');
      }

      await this.collection.doc(listingId).update({
        isActive: false,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      logger.info(`Listing ${listingId} deleted by user ${userId}`);
    } catch (error) {
      logger.error(`Error deleting listing ${listingId}:`, error);
      throw error;
    }
  }

  /**
   * Increment view count
   */
  async incrementViewCount(listingId) {
    try {
      await this.collection.doc(listingId).update({
        viewCount: increment(1)
      });
    } catch (error) {
      logger.error(`Error incrementing view count for listing ${listingId}:`, error);
      // Don't throw error for view count updates
    }
  }

  /**
   * Search listings by text
   */
  async searchListings(searchTerm, filters = {}) {
    try {
      // Note: Firestore doesn't have full-text search
      // This is a simplified version - consider using Algolia or Elasticsearch for production
      
      let query = this.collection
        .where('isActive', '==', true)
        .where('status', '==', LISTING_STATUS.AVAILABLE);

      const snapshot = await query.get();
      const listings = [];

      const searchLower = searchTerm.toLowerCase();

      snapshot.forEach(doc => {
        const listing = {
          id: doc.id,
          ...doc.data()
        };

        // Simple text matching
        const titleMatch = listing.title?.toLowerCase().includes(searchLower);
        const descriptionMatch = listing.description?.toLowerCase().includes(searchLower);
        const categoryMatch = listing.category?.toLowerCase().includes(searchLower);

        if (titleMatch || descriptionMatch || categoryMatch) {
          listings.push(listing);
        }
      });

      return listings;
    } catch (error) {
      logger.error('Error searching listings:', error);
      throw error;
    }
  }

  /**
   * Get expiring listings
   */
  async getExpiringListings(hoursUntilExpiry = 2) {
    try {
      const cutoffTime = new Date();
      cutoffTime.setHours(cutoffTime.getHours() + hoursUntilExpiry);

      // Note: This is a simplified query
      // In production, you'd want to use a more sophisticated expiry checking system
      const snapshot = await this.collection
        .where('status', '==', LISTING_STATUS.AVAILABLE)
        .where('isActive', '==', true)
        .get();

      const expiringListings = [];

      snapshot.forEach(doc => {
        const listing = doc.data();
        const expiryDate = listing.expiryDate.toDate();
        
        if (expiryDate <= cutoffTime) {
          expiringListings.push({
            id: doc.id,
            ...listing
          });
        }
      });

      return expiringListings;
    } catch (error) {
      logger.error('Error fetching expiring listings:', error);
      throw error;
    }
  }

  /**
   * Get listing analytics
   */
  async getListingAnalytics(listingId) {
    try {
      const listing = await this.getListingById(listingId);
      
      if (!listing) {
        throw new Error('Listing not found');
      }

      return {
        id: listingId,
        views: listing.viewCount || 0,
        claims: listing.claimCount || 0,
        status: listing.status,
        createdAt: listing.createdAt,
        impactScore: this.calculateImpactScore(listing)
      };
    } catch (error) {
      logger.error(`Error fetching analytics for listing ${listingId}:`, error);
      throw error;
    }
  }

  /**
   * Calculate impact score for listing
   */
  calculateImpactScore(listing) {
    // Simplified impact calculation
    const baseScore = listing.quantity || 1;
    const categoryMultiplier = this.getCategoryMultiplier(listing.category);
    return Math.round(baseScore * categoryMultiplier);
  }

  /**
   * Get category multiplier for impact calculation
   */
  getCategoryMultiplier(category) {
    const multipliers = {
      [FOOD_CATEGORIES.MEAT]: 3.0,
      [FOOD_CATEGORIES.DAIRY]: 2.5,
      [FOOD_CATEGORIES.PREPARED]: 2.0,
      [FOOD_CATEGORIES.PRODUCE]: 1.5,
      [FOOD_CATEGORIES.BAKERY]: 1.3,
      [FOOD_CATEGORIES.PANTRY]: 1.2,
      [FOOD_CATEGORIES.BEVERAGES]: 1.0,
      [FOOD_CATEGORIES.SNACKS]: 1.0
    };

    return multipliers[category] || 1.0;
  }

  /**
   * Mark expired listings
   */
  async markExpiredListings() {
    try {
      const now = new Date();
      const snapshot = await this.collection
        .where('status', '==', LISTING_STATUS.AVAILABLE)
        .where('isActive', '==', true)
        .get();

      const batch = this.db.batch();
      let expiredCount = 0;

      snapshot.forEach(doc => {
        const listing = doc.data();
        const expiryDate = listing.expiryDate.toDate();
        
        if (expiryDate <= now) {
          batch.update(doc.ref, {
            status: LISTING_STATUS.EXPIRED,
            expiredAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          expiredCount++;
        }
      });

      if (expiredCount > 0) {
        await batch.commit();
        logger.info(`Marked ${expiredCount} listings as expired`);
      }

      return expiredCount;
    } catch (error) {
      logger.error('Error marking expired listings:', error);
      throw error;
    }
  }
}
