import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { getStorage } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { FILE_CONSTRAINTS } from '../config/constants.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateFileUpload } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: FILE_CONSTRAINTS.MAX_SIZE,
    files: 5 // Maximum 5 files per request
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error(`Invalid file type. Allowed types: ${FILE_CONSTRAINTS.ALLOWED_TYPES.join(', ')}`));
    }
    cb(null, true);
  }
});

/**
 * @route   POST /api/upload/image
 * @desc    Upload and optimize image
 * @access  Private
 */
router.post('/image', 
  authenticateToken, 
  upload.single('image'), 
  validateFileUpload,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
        error: 'MISSING_FILE'
      });
    }

    const { purpose = 'general', width, height, quality = 80 } = req.body;
    const userId = req.userId;

    try {
      // Generate unique filename
      const fileExtension = 'jpg'; // Always convert to JPG for consistency
      const fileName = `${purpose}/${userId}/${uuidv4()}.${fileExtension}`;

      // Process image with Sharp
      let imageProcessor = sharp(req.file.buffer)
        .jpeg({ quality: parseInt(quality) })
        .rotate(); // Auto-rotate based on EXIF

      // Apply resizing based on purpose
      switch (purpose) {
        case 'profile':
          imageProcessor = imageProcessor.resize(300, 300, {
            fit: 'cover',
            position: 'center'
          });
          break;
        case 'listing':
          imageProcessor = imageProcessor.resize(800, 600, {
            fit: 'inside',
            withoutEnlargement: true
          });
          break;
        case 'thumbnail':
          imageProcessor = imageProcessor.resize(150, 150, {
            fit: 'cover',
            position: 'center'
          });
          break;
        default:
          // Custom dimensions if provided
          if (width && height) {
            imageProcessor = imageProcessor.resize(parseInt(width), parseInt(height), {
              fit: 'inside',
              withoutEnlargement: true
            });
          }
      }

      const processedBuffer = await imageProcessor.toBuffer();

      // Upload to Firebase Storage
      const bucket = getStorage().bucket();
      const file = bucket.file(fileName);

      const stream = file.createWriteStream({
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            uploadedBy: userId,
            purpose,
            originalName: req.file.originalname,
            uploadedAt: new Date().toISOString()
          }
        }
      });

      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(processedBuffer);
      });

      // Make file publicly accessible
      await file.makePublic();

      // Get public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      logger.info(`Image uploaded successfully: ${fileName} by user ${userId}`);

      res.json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: publicUrl,
          fileName,
          size: processedBuffer.length,
          dimensions: await getImageDimensions(processedBuffer),
          purpose
        }
      });

    } catch (error) {
      logger.error('Image upload error:', error);
      throw error;
    }
  })
);

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple images
 * @access  Private
 */
router.post('/multiple',
  authenticateToken,
  upload.array('images', 5),
  validateFileUpload,
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided',
        error: 'MISSING_FILES'
      });
    }

    const { purpose = 'general', quality = 80 } = req.body;
    const userId = req.userId;

    const uploadPromises = req.files.map(async (file, index) => {
      try {
        // Generate unique filename
        const fileName = `${purpose}/${userId}/${uuidv4()}.jpg`;

        // Process image
        const processedBuffer = await sharp(file.buffer)
          .jpeg({ quality: parseInt(quality) })
          .rotate()
          .resize(800, 600, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .toBuffer();

        // Upload to Firebase Storage
        const bucket = getStorage().bucket();
        const storageFile = bucket.file(fileName);

        const stream = storageFile.createWriteStream({
          metadata: {
            contentType: 'image/jpeg',
            metadata: {
              uploadedBy: userId,
              purpose,
              originalName: file.originalname,
              uploadedAt: new Date().toISOString(),
              index
            }
          }
        });

        await new Promise((resolve, reject) => {
          stream.on('error', reject);
          stream.on('finish', resolve);
          stream.end(processedBuffer);
        });

        await storageFile.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        return {
          url: publicUrl,
          fileName,
          originalName: file.originalname,
          size: processedBuffer.length,
          index
        };

      } catch (error) {
        logger.error(`Error uploading file ${file.originalname}:`, error);
        return {
          originalName: file.originalname,
          error: error.message,
          index
        };
      }
    });

    const results = await Promise.all(uploadPromises);

    const successfulUploads = results.filter(result => !result.error);
    const failedUploads = results.filter(result => result.error);

    logger.info(`Multiple image upload completed: ${successfulUploads.length} successful, ${failedUploads.length} failed by user ${userId}`);

    res.json({
      success: true,
      message: `${successfulUploads.length} images uploaded successfully`,
      data: {
        successful: successfulUploads,
        failed: failedUploads,
        totalUploaded: successfulUploads.length,
        totalFailed: failedUploads.length
      }
    });
  })
);

/**
 * @route   DELETE /api/upload/:fileName
 * @desc    Delete uploaded file
 * @access  Private
 */
router.delete('/:fileName(*)',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const fileName = req.params.fileName;
    const userId = req.userId;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        message: 'File name is required',
        error: 'MISSING_FILENAME'
      });
    }

    try {
      const bucket = getStorage().bucket();
      const file = bucket.file(fileName);

      // Check if file exists and get metadata
      const [exists] = await file.exists();
      
      if (!exists) {
        return res.status(404).json({
          success: false,
          message: 'File not found',
          error: 'FILE_NOT_FOUND'
        });
      }

      const [metadata] = await file.getMetadata();
      const uploadedBy = metadata.metadata?.uploadedBy;

      // Check if user owns the file or is admin
      if (uploadedBy !== userId && !req.user?.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'You can only delete your own files',
          error: 'UNAUTHORIZED_DELETE'
        });
      }

      // Delete the file
      await file.delete();

      logger.info(`File deleted: ${fileName} by user ${userId}`);

      res.json({
        success: true,
        message: 'File deleted successfully',
        data: {
          fileName,
          deletedAt: new Date()
        }
      });

    } catch (error) {
      logger.error(`Error deleting file ${fileName}:`, error);
      throw error;
    }
  })
);

/**
 * @route   GET /api/upload/signed-url
 * @desc    Get signed URL for direct upload (for large files)
 * @access  Private
 */
router.get('/signed-url',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const { fileName, contentType, purpose = 'general' } = req.query;
    const userId = req.userId;

    if (!fileName || !contentType) {
      return res.status(400).json({
        success: false,
        message: 'File name and content type are required',
        error: 'MISSING_PARAMETERS'
      });
    }

    // Validate content type
    if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid content type. Allowed types: ${FILE_CONSTRAINTS.ALLOWED_TYPES.join(', ')}`,
        error: 'INVALID_CONTENT_TYPE'
      });
    }

    const fullFileName = `${purpose}/${userId}/${uuidv4()}-${fileName}`;

    try {
      const bucket = getStorage().bucket();
      const file = bucket.file(fullFileName);

      const [signedUrl] = await file.getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType
      });

      res.json({
        success: true,
        message: 'Signed URL generated successfully',
        data: {
          signedUrl,
          fileName: fullFileName,
          expiresIn: '15 minutes',
          publicUrl: `https://storage.googleapis.com/${bucket.name}/${fullFileName}`
        }
      });

    } catch (error) {
      logger.error('Error generating signed URL:', error);
      throw error;
    }
  })
);

/**
 * Helper function to get image dimensions
 */
async function getImageDimensions(buffer) {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height
    };
  } catch (error) {
    return null;
  }
}

export default router;
