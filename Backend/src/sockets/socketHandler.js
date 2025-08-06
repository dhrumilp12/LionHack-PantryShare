import jwt from 'jsonwebtoken';
import { logger } from '../config/logger.js';
import { SOCKET_EVENTS } from '../config/constants.js';
import { UserService } from '../services/userService.js';

/**
 * Handle Socket.IO connections and events
 */
export const socketHandler = (io) => {
  // Initialize UserService here instead of at module level
  const userService = new UserService();
  
  // Middleware for socket authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user information
      const user = await userService.getUserById(decoded.userId);
      
      if (!user || !user.isActive) {
        return next(new Error('User not found or inactive'));
      }

      // Attach user to socket
      socket.userId = user.id;
      socket.user = user;
      
      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  // Handle new connections
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    const userId = socket.userId;
    const user = socket.user;
    
    logger.info(`User connected via socket: ${userId} (${user.firstName} ${user.lastName})`);

    // Join user to their personal room
    socket.join(`user_${userId}`);
    
    // Notify user they're connected
    socket.emit('connected', {
      message: 'Successfully connected to PantryShare',
      userId,
      timestamp: new Date()
    });

    // Broadcast user online status to their contacts (optional)
    socket.broadcast.emit(SOCKET_EVENTS.USER_ONLINE, {
      userId,
      name: `${user.firstName} ${user.lastName}`,
      timestamp: new Date()
    });

    // Handle joining listing-specific rooms
    socket.on(SOCKET_EVENTS.JOIN_ROOM, (data) => {
      const { roomId, roomType } = data;
      
      if (!roomId || !roomType) {
        socket.emit('error', { message: 'Room ID and type are required' });
        return;
      }

      // Validate room access based on type
      if (roomType === 'listing') {
        joinListingRoom(socket, roomId);
      } else if (roomType === 'chat') {
        joinChatRoom(socket, roomId);
      } else {
        socket.emit('error', { message: 'Invalid room type' });
      }
    });

    // Handle leaving rooms
    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (data) => {
      const { roomId } = data;
      
      if (roomId) {
        socket.leave(roomId);
        logger.debug(`User ${userId} left room: ${roomId}`);
        
        socket.emit('room_left', {
          roomId,
          timestamp: new Date()
        });
      }
    });

    // Handle real-time messaging
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (data) => {
      try {
        await handleNewMessage(socket, data);
      } catch (error) {
        logger.error('Error handling new message:', error);
        socket.emit('message_error', {
          error: 'Failed to send message',
          timestamp: new Date()
        });
      }
    });

    // Handle listing updates
    socket.on('listing_update', (data) => {
      handleListingUpdate(socket, data);
    });

    // Handle location updates
    socket.on('location_update', async (data) => {
      try {
        await handleLocationUpdate(socket, data);
      } catch (error) {
        logger.error('Error handling location update:', error);
        socket.emit('location_error', {
          error: 'Failed to update location',
          timestamp: new Date()
        });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { chatId } = data;
      socket.to(`chat_${chatId}`).emit('user_typing', {
        userId,
        name: `${user.firstName} ${user.lastName}`,
        chatId,
        timestamp: new Date()
      });
    });

    socket.on('typing_stop', (data) => {
      const { chatId } = data;
      socket.to(`chat_${chatId}`).emit('user_stopped_typing', {
        userId,
        chatId,
        timestamp: new Date()
      });
    });

    // Handle volunteer availability updates
    socket.on('availability_update', async (data) => {
      try {
        await handleAvailabilityUpdate(socket, data);
      } catch (error) {
        logger.error('Error handling availability update:', error);
        socket.emit('availability_error', {
          error: 'Failed to update availability',
          timestamp: new Date()
        });
      }
    });

    // Handle disconnect
    socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      logger.info(`User disconnected: ${userId} (${reason})`);
      
      // Broadcast user offline status
      socket.broadcast.emit(SOCKET_EVENTS.USER_OFFLINE, {
        userId,
        name: `${user.firstName} ${user.lastName}`,
        timestamp: new Date()
      });
    });

    // Handle custom events for notifications
    socket.on('mark_notification_read', (data) => {
      const { notificationId } = data;
      // Handle notification read status
      socket.emit('notification_marked_read', {
        notificationId,
        timestamp: new Date()
      });
    });

    // Handle emergency notifications
    socket.on('emergency_alert', (data) => {
      if (user.role === 'admin' || user.role === 'super_admin') {
        io.emit('emergency_broadcast', {
          message: data.message,
          severity: data.severity || 'high',
          from: `${user.firstName} ${user.lastName}`,
          timestamp: new Date()
        });
        
        logger.warn(`Emergency alert sent by ${userId}: ${data.message}`);
      }
    });
  });

  /**
   * Join a listing-specific room
   */
  async function joinListingRoom(socket, listingId) {
    try {
      // Verify user has access to this listing
      const listing = await listingService.getListingById(listingId);
      
      if (!listing) {
        socket.emit('error', { message: 'Listing not found' });
        return;
      }

      const hasAccess = listing.ownerId === socket.userId || 
                       listing.volunteerId === socket.userId;

      if (!hasAccess) {
        socket.emit('error', { message: 'Access denied to this listing' });
        return;
      }

      const roomId = `listing_${listingId}`;
      socket.join(roomId);
      
      logger.debug(`User ${socket.userId} joined listing room: ${roomId}`);
      
      socket.emit('room_joined', {
        roomId,
        roomType: 'listing',
        listingId,
        timestamp: new Date()
      });

    } catch (error) {
      logger.error('Error joining listing room:', error);
      socket.emit('error', { message: 'Failed to join listing room' });
    }
  }

  /**
   * Join a chat room
   */
  async function joinChatRoom(socket, chatId) {
    try {
      // In this case, chatId is the listingId since each listing has one chat
      const listing = await listingService.getListingById(chatId);
      
      if (!listing) {
        socket.emit('error', { message: 'Chat not found' });
        return;
      }

      const hasAccess = listing.ownerId === socket.userId || 
                       listing.volunteerId === socket.userId;

      if (!hasAccess) {
        socket.emit('error', { message: 'Access denied to this chat' });
        return;
      }

      const roomId = `chat_${chatId}`;
      socket.join(roomId);
      
      logger.debug(`User ${socket.userId} joined chat room: ${roomId}`);
      
      socket.emit('room_joined', {
        roomId,
        roomType: 'chat',
        chatId,
        timestamp: new Date()
      });

    } catch (error) {
      logger.error('Error joining chat room:', error);
      socket.emit('error', { message: 'Failed to join chat room' });
    }
  }

  /**
   * Handle new message in real-time
   */
  async function handleNewMessage(socket, data) {
    const { chatId, content, type = 'text' } = data;
    
    if (!chatId || !content) {
      socket.emit('message_error', { message: 'Chat ID and content are required' });
      return;
    }

    // Broadcast message to chat room
    const messageData = {
      id: `temp_${Date.now()}`, // Temporary ID until saved to database
      senderId: socket.userId,
      senderName: `${socket.user.firstName} ${socket.user.lastName}`,
      content,
      type,
      chatId,
      timestamp: new Date()
    };

    socket.to(`chat_${chatId}`).emit(SOCKET_EVENTS.NEW_MESSAGE, messageData);
    
    // Confirm message sent to sender
    socket.emit(SOCKET_EVENTS.MESSAGE_SENT, {
      tempId: messageData.id,
      status: 'delivered',
      timestamp: new Date()
    });

    logger.debug(`Message sent in chat ${chatId} by user ${socket.userId}`);
  }

  /**
   * Handle listing updates
   */
  function handleListingUpdate(socket, data) {
    const { listingId, status, updates } = data;
    
    if (!listingId) {
      socket.emit('error', { message: 'Listing ID is required' });
      return;
    }

    // Broadcast update to listing room
    socket.to(`listing_${listingId}`).emit(SOCKET_EVENTS.LISTING_UPDATE, {
      listingId,
      status,
      updates,
      updatedBy: socket.userId,
      timestamp: new Date()
    });

    logger.debug(`Listing ${listingId} updated by user ${socket.userId}`);
  }

  /**
   * Handle location updates
   */
  async function handleLocationUpdate(socket, data) {
    const { latitude, longitude, address } = data;
    
    if (!latitude || !longitude) {
      socket.emit('location_error', { message: 'Latitude and longitude are required' });
      return;
    }

    // Update user location in database
    await userService.updateUserLocation(socket.userId, latitude, longitude, address);

    // Emit confirmation
    socket.emit('location_updated', {
      latitude,
      longitude,
      address,
      timestamp: new Date()
    });

    logger.debug(`Location updated for user ${socket.userId}`);
  }

  /**
   * Handle availability updates
   */
  async function handleAvailabilityUpdate(socket, data) {
    const { availability, maxDistance } = data;
    
    if (socket.user.role !== 'volunteer') {
      socket.emit('availability_error', { message: 'Only volunteers can update availability' });
      return;
    }

    const updateData = {
      preferences: {
        ...socket.user.preferences,
        availabilityWindow: availability,
        maxDistance
      }
    };

    await userService.updateUser(socket.userId, updateData);

    socket.emit('availability_updated', {
      availability,
      maxDistance,
      timestamp: new Date()
    });

    logger.debug(`Availability updated for volunteer ${socket.userId}`);
  }
};

export default socketHandler;
