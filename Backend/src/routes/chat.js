import express from 'express';
import { getFirestore, COLLECTIONS, serverTimestamp } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateSendMessage } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @route   GET /api/chat/:listingId
 * @desc    Get chat messages for a listing
 * @access  Private
 */
router.get('/:listingId', authenticateToken, asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const { limit = 50, offset = 0 } = req.query;
  const userId = req.userId;

  const db = getFirestore();
  
  // Check if user is part of this listing (owner or volunteer)
  const listingDoc = await db.collection(COLLECTIONS.LISTINGS).doc(listingId).get();
  
  if (!listingDoc.exists) {
    return res.status(404).json({
      success: false,
      message: 'Listing not found',
      error: 'LISTING_NOT_FOUND'
    });
  }

  const listing = listingDoc.data();
  const isOwner = listing.ownerId === userId;
  const isVolunteer = listing.volunteerId === userId;

  if (!isOwner && !isVolunteer) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to view this chat',
      error: 'UNAUTHORIZED_CHAT_ACCESS'
    });
  }

  // Get messages
  const messagesSnapshot = await db
    .collection(COLLECTIONS.MESSAGES)
    .where('listingId', '==', listingId)
    .orderBy('createdAt', 'desc')
    .limit(parseInt(limit))
    .offset(parseInt(offset))
    .get();

  const messages = [];
  messagesSnapshot.forEach(doc => {
    messages.push({
      id: doc.id,
      ...doc.data()
    });
  });

  res.json({
    success: true,
    message: 'Messages retrieved successfully',
    data: {
      messages: messages.reverse(), // Return in chronological order
      listingId,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: messages.length === parseInt(limit)
      }
    }
  });
}));

/**
 * @route   POST /api/chat/send
 * @desc    Send a message in a chat
 * @access  Private
 */
router.post('/send', authenticateToken, validateSendMessage, asyncHandler(async (req, res) => {
  const { listingId, content, type = 'text', metadata } = req.body;
  const senderId = req.userId;

  const db = getFirestore();
  
  // Verify listing exists and user has access
  const listingDoc = await db.collection(COLLECTIONS.LISTINGS).doc(listingId).get();
  
  if (!listingDoc.exists) {
    return res.status(404).json({
      success: false,
      message: 'Listing not found',
      error: 'LISTING_NOT_FOUND'
    });
  }

  const listing = listingDoc.data();
  const isOwner = listing.ownerId === senderId;
  const isVolunteer = listing.volunteerId === senderId;

  if (!isOwner && !isVolunteer) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to send messages in this chat',
      error: 'UNAUTHORIZED_CHAT_ACCESS'
    });
  }

  // Create message
  const messageData = {
    listingId,
    senderId,
    content: content.trim(),
    type,
    metadata: metadata || {},
    createdAt: serverTimestamp(),
    isRead: false
  };

  const messageRef = await db.collection(COLLECTIONS.MESSAGES).add(messageData);
  
  // Get the created message
  const messageDoc = await messageRef.get();
  const message = {
    id: messageDoc.id,
    ...messageDoc.data()
  };

  // Emit socket event
  const io = req.app.get('io');
  if (io) {
    const recipientId = isOwner ? listing.volunteerId : listing.ownerId;
    
    io.to(`user_${recipientId}`).emit('new_message', {
      message,
      listingId
    });

    io.to(`listing_${listingId}`).emit('message_sent', {
      message
    });
  }

  logger.info(`Message sent in listing ${listingId} by user ${senderId}`);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: {
      message
    }
  });
}));

/**
 * @route   PUT /api/chat/messages/:messageId/read
 * @desc    Mark message as read
 * @access  Private
 */
router.put('/messages/:messageId/read', authenticateToken, asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const userId = req.userId;

  const db = getFirestore();
  
  // Get message
  const messageDoc = await db.collection(COLLECTIONS.MESSAGES).doc(messageId).get();
  
  if (!messageDoc.exists) {
    return res.status(404).json({
      success: false,
      message: 'Message not found',
      error: 'MESSAGE_NOT_FOUND'
    });
  }

  const message = messageDoc.data();
  
  // Only recipient can mark message as read
  if (message.senderId === userId) {
    return res.status(400).json({
      success: false,
      message: 'Cannot mark your own message as read',
      error: 'INVALID_OPERATION'
    });
  }

  // Verify user has access to this chat
  const listingDoc = await db.collection(COLLECTIONS.LISTINGS).doc(message.listingId).get();
  const listing = listingDoc.data();
  
  const hasAccess = listing.ownerId === userId || listing.volunteerId === userId;
  if (!hasAccess) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized access',
      error: 'UNAUTHORIZED_ACCESS'
    });
  }

  // Update message
  await db.collection(COLLECTIONS.MESSAGES).doc(messageId).update({
    isRead: true,
    readAt: serverTimestamp()
  });

  res.json({
    success: true,
    message: 'Message marked as read'
  });
}));

/**
 * @route   GET /api/chat/conversations
 * @desc    Get user's chat conversations
 * @access  Private
 */
router.get('/conversations', authenticateToken, asyncHandler(async (req, res) => {
  const userId = req.userId;
  const db = getFirestore();

  // Get listings where user is owner or volunteer
  const ownerListingsSnapshot = await db
    .collection(COLLECTIONS.LISTINGS)
    .where('ownerId', '==', userId)
    .where('volunteerId', '!=', null)
    .get();

  const volunteerListingsSnapshot = await db
    .collection(COLLECTIONS.LISTINGS)
    .where('volunteerId', '==', userId)
    .get();

  const listingIds = new Set();
  
  // Collect all listing IDs
  ownerListingsSnapshot.forEach(doc => listingIds.add(doc.id));
  volunteerListingsSnapshot.forEach(doc => listingIds.add(doc.id));

  if (listingIds.size === 0) {
    return res.json({
      success: true,
      message: 'No conversations found',
      data: {
        conversations: []
      }
    });
  }

  // Get latest message for each conversation
  const conversations = [];
  
  for (const listingId of listingIds) {
    const latestMessageSnapshot = await db
      .collection(COLLECTIONS.MESSAGES)
      .where('listingId', '==', listingId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    const listingDoc = await db.collection(COLLECTIONS.LISTINGS).doc(listingId).get();
    const listing = listingDoc.data();

    let latestMessage = null;
    if (!latestMessageSnapshot.empty) {
      const messageDoc = latestMessageSnapshot.docs[0];
      latestMessage = {
        id: messageDoc.id,
        ...messageDoc.data()
      };
    }

    // Get unread count
    const unreadSnapshot = await db
      .collection(COLLECTIONS.MESSAGES)
      .where('listingId', '==', listingId)
      .where('senderId', '!=', userId)
      .where('isRead', '==', false)
      .get();

    const otherUserId = listing.ownerId === userId ? listing.volunteerId : listing.ownerId;
    
    conversations.push({
      listingId,
      listing: {
        id: listingId,
        title: listing.title,
        status: listing.status,
        imageUrl: listing.imageUrl
      },
      otherUserId,
      latestMessage,
      unreadCount: unreadSnapshot.size
    });
  }

  // Sort by latest message time
  conversations.sort((a, b) => {
    const aTime = a.latestMessage?.createdAt?.toDate() || new Date(0);
    const bTime = b.latestMessage?.createdAt?.toDate() || new Date(0);
    return bTime - aTime;
  });

  res.json({
    success: true,
    message: 'Conversations retrieved successfully',
    data: {
      conversations
    }
  });
}));

export default router;
