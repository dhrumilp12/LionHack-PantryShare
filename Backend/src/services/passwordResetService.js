/**
 * Password Reset Token Service
 * Handles creating, storing, and validating password reset tokens
 */

import crypto from 'crypto';
import { getFirestore } from '../config/firebase.js';
import { logger } from '../config/logger.js';

class PasswordResetService {
  constructor() {
    this.db = getFirestore();
    this.collection = 'passwordResets';
    this.tokenExpiry = 60 * 60 * 1000; // 1 hour in milliseconds
  }

  /**
   * Generate a secure reset token
   */
  generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Create and store a password reset token
   */
  async createResetToken(userId, email) {
    try {
      const token = this.generateResetToken();
      const expiresAt = new Date(Date.now() + this.tokenExpiry);

      const resetData = {
        userId,
        email: email.toLowerCase(),
        token,
        expiresAt,
        createdAt: new Date(),
        used: false
      };

      // Store in Firestore
      const docRef = this.db.collection(this.collection).doc();
      await docRef.set(resetData);

      logger.info(`Password reset token created for user ${userId}`);

      return {
        success: true,
        token,
        expiresAt
      };
    } catch (error) {
      logger.error('Failed to create reset token:', error);
      throw new Error('Failed to create password reset token');
    }
  }

  /**
   * Validate and retrieve reset token data
   */
  async validateResetToken(token) {
    try {
      const querySnapshot = await this.db
        .collection(this.collection)
        .where('token', '==', token)
        .where('used', '==', false)
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        return {
          success: false,
          error: 'Invalid or expired reset token'
        };
      }

      const doc = querySnapshot.docs[0];
      const resetData = doc.data();

      // Check if token has expired
      if (resetData.expiresAt.toDate() < new Date()) {
        // Mark as used to prevent reuse
        await doc.ref.update({ used: true });
        
        return {
          success: false,
          error: 'Reset token has expired'
        };
      }

      return {
        success: true,
        data: {
          id: doc.id,
          userId: resetData.userId,
          email: resetData.email,
          createdAt: resetData.createdAt.toDate(),
          expiresAt: resetData.expiresAt.toDate()
        }
      };
    } catch (error) {
      logger.error('Failed to validate reset token:', error);
      throw new Error('Failed to validate reset token');
    }
  }

  /**
   * Mark reset token as used
   */
  async markTokenAsUsed(tokenId) {
    try {
      await this.db
        .collection(this.collection)
        .doc(tokenId)
        .update({
          used: true,
          usedAt: new Date()
        });

      logger.info(`Reset token ${tokenId} marked as used`);
    } catch (error) {
      logger.error('Failed to mark token as used:', error);
      throw new Error('Failed to mark token as used');
    }
  }

  /**
   * Clean up expired tokens (should be run periodically)
   */
  async cleanupExpiredTokens() {
    try {
      // Get all tokens and filter expired ones in memory to avoid index requirements
      const allTokensQuery = await this.db
        .collection(this.collection)
        .get();

      const batch = this.db.batch();
      let deleteCount = 0;
      const now = new Date();

      allTokensQuery.docs.forEach(doc => {
        const data = doc.data();
        // Delete if expired
        if (data.expiresAt.toDate() < now) {
          batch.delete(doc.ref);
          deleteCount++;
        }
      });

      if (deleteCount > 0) {
        await batch.commit();
        logger.info(`Cleaned up ${deleteCount} expired reset tokens`);
      }

      return deleteCount;
    } catch (error) {
      logger.error('Failed to cleanup expired tokens:', error);
      throw new Error('Failed to cleanup expired tokens');
    }
  }

  /**
   * Get all reset tokens for a user (for admin purposes)
   */
  async getUserResetTokens(userId) {
    try {
      const querySnapshot = await this.db
        .collection(this.collection)
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const tokens = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        tokens.push({
          id: doc.id,
          token: data.token.substring(0, 8) + '...', // Partial token for security
          createdAt: data.createdAt.toDate(),
          expiresAt: data.expiresAt.toDate(),
          used: data.used,
          usedAt: data.usedAt?.toDate()
        });
      });

      return tokens;
    } catch (error) {
      logger.error('Failed to get user reset tokens:', error);
      throw new Error('Failed to get user reset tokens');
    }
  }

  /**
   * Revoke all active reset tokens for a user
   */
  async revokeUserTokens(userId) {
    try {
      // Use simple query that doesn't require complex indexing
      const userTokensQuery = await this.db
        .collection(this.collection)
        .where('userId', '==', userId)
        .get();

      if (userTokensQuery.empty) {
        logger.info(`No reset tokens found for user ${userId}`);
        return 0;
      }

      const batch = this.db.batch();
      let revokedCount = 0;
      const now = new Date();

      userTokensQuery.docs.forEach(doc => {
        const data = doc.data();
        // Check if token is active (not used and not expired) - do this in memory to avoid index requirements
        if (!data.used && data.expiresAt.toDate() > now) {
          batch.update(doc.ref, {
            used: true,
            revokedAt: now
          });
          revokedCount++;
        }
      });

      if (revokedCount > 0) {
        await batch.commit();
        logger.info(`Revoked ${revokedCount} reset tokens for user ${userId}`);
      } else {
        logger.info(`No active reset tokens found to revoke for user ${userId}`);
      }

      return revokedCount;
    } catch (error) {
      logger.error('Failed to revoke user tokens:', error);
      // Don't throw error - this shouldn't block password reset flow
      logger.warn('Continuing password reset process despite revocation failure');
      return 0;
    }
  }
}

export default PasswordResetService;
