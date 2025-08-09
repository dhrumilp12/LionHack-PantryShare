/**
 * Email Service
 * Handles sending emails using nodemailer
 */

import nodemailer from 'nodemailer';
import { logger } from '../config/logger.js';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  /**
   * Initialize nodemailer transporter
   */
  initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      logger.info('Email transporter initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize email transporter:', error);
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email, firstName = 'User', resetToken) {
    if (!this.transporter) {
      throw new Error('Email transporter not initialized');
    }

        // Create reset link
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: {
        name: 'PantryShare',
        address: process.env.SMTP_USER
      },
      to: email,
      subject: 'Reset Your PantryShare Password',
      html: this.getPasswordResetTemplate(firstName, resetLink, email),
      text: `Hi ${firstName},

You requested to reset your password for your PantryShare account.

Click the link below to reset your password:
${resetLink}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
The PantryShare Team

---
This email was sent to ${email}. If you have any questions, please contact our support team.`
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Password reset email sent to ${email}: ${info.messageId}`);
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      logger.error(`Failed to send password reset email to ${email}:`, error);
      throw new Error('Failed to send password reset email');
    }
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(email, firstName = 'User') {
    if (!this.transporter) {
      throw new Error('Email transporter not initialized');
    }

    const mailOptions = {
      from: {
        name: 'PantryShare',
        address: process.env.SMTP_USER
      },
      to: email,
      subject: 'Welcome to PantryShare! 🌱',
      html: this.getWelcomeTemplate(firstName),
      text: `Hi ${firstName},

Welcome to PantryShare! 🌱

Thank you for joining our community of food rescuers. Together, we're making a difference by reducing food waste and helping those in need.

Here's what you can do next:
• Complete your profile
• Browse available food listings
• Start your first food rescue mission

Visit your dashboard: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard

Best regards,
The PantryShare Team

---
Making a difference, one meal at a time.`
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Welcome email sent to ${email}: ${info.messageId}`);
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      logger.error(`Failed to send welcome email to ${email}:`, error);
      // Don't throw error for welcome emails - it's not critical
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Password reset email template
   */
  getPasswordResetTemplate(firstName, resetLink, email) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your PantryShare Password</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
            }
            .header { 
                background: linear-gradient(135deg, #059669, #10b981); 
                color: white; 
                padding: 30px 20px; 
                text-align: center; 
                border-radius: 10px 10px 0 0; 
            }
            .content { 
                background: #f9f9f9; 
                padding: 30px 20px; 
                border-radius: 0 0 10px 10px; 
            }
            .button { 
                display: inline-block; 
                background: linear-gradient(135deg, #059669, #10b981); 
                color: white; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 8px; 
                font-weight: bold; 
                margin: 20px 0; 
            }
            .footer { 
                margin-top: 30px; 
                padding-top: 20px; 
                border-top: 1px solid #ddd; 
                font-size: 12px; 
                color: #666; 
            }
            .warning {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌱 PantryShare</h1>
            <h2>Password Reset Request</h2>
        </div>
        
        <div class="content">
            <p>Hi <strong>${firstName}</strong>,</p>
            
            <p>You requested to reset your password for your PantryShare account. Click the button below to create a new password:</p>
            
            <div style="text-align: center;">
                <a href="${resetLink}" class="button">Reset My Password</a>
            </div>
            
            <div class="warning">
                <strong>⚠️ Important:</strong> This link will expire in <strong>1 hour</strong> for security reasons.
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 4px;">
                ${resetLink}
            </p>
            
            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p>Best regards,<br>
            <strong>The PantryShare Team</strong></p>
        </div>
        
        <div class="footer">
            <p>This email was sent to ${email}. If you have any questions, please contact our support team.</p>
            <p>PantryShare - Making a difference, one meal at a time. 🌱</p>
        </div>
    </body>
    </html>`;
  }

  /**
   * Welcome email template
   */
  getWelcomeTemplate(firstName) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to PantryShare!</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
            }
            .header { 
                background: linear-gradient(135deg, #059669, #10b981); 
                color: white; 
                padding: 30px 20px; 
                text-align: center; 
                border-radius: 10px 10px 0 0; 
            }
            .content { 
                background: #f9f9f9; 
                padding: 30px 20px; 
                border-radius: 0 0 10px 10px; 
            }
            .stats {
                display: flex;
                justify-content: space-around;
                margin: 20px 0;
                text-align: center;
            }
            .stat {
                background: white;
                padding: 15px;
                border-radius: 8px;
                flex: 1;
                margin: 0 5px;
            }
            .button { 
                display: inline-block; 
                background: linear-gradient(135deg, #059669, #10b981); 
                color: white; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 8px; 
                font-weight: bold; 
                margin: 20px 0; 
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌱 Welcome to PantryShare!</h1>
            <p>Thank you for joining our food rescue community</p>
        </div>
        
        <div class="content">
            <p>Hi <strong>${firstName}</strong>,</p>
            
            <p>Welcome to PantryShare! We're excited to have you join our community of food rescuers who are making a real difference in fighting food waste and helping those in need.</p>
            
            <div class="stats">
                <div class="stat">
                    <h3>15K+</h3>
                    <p>Meals Rescued</p>
                </div>
                <div class="stat">
                    <h3>39K kg</h3>
                    <p>CO₂ Saved</p>
                </div>
                <div class="stat">
                    <h3>2K+</h3>
                    <p>Active Users</p>
                </div>
            </div>
            
            <h3>🚀 Get Started:</h3>
            <ul>
                <li>✅ Complete your profile</li>
                <li>🍎 Browse available food listings</li>
                <li>🚚 Start your first food rescue mission</li>
                <li>💬 Connect with your local community</li>
            </ul>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="button">Go to Dashboard</a>
            </div>
            
            <p>Together, we're building a more sustainable future, one rescued meal at a time!</p>
            
            <p>Best regards,<br>
            <strong>The PantryShare Team</strong> 🌱</p>
        </div>
    </body>
    </html>`;
  }

  /**
   * Test email connection
   */
  async testConnection() {
    if (!this.transporter) {
      throw new Error('Email transporter not initialized');
    }

    try {
      await this.transporter.verify();
      logger.info('Email server connection verified');
      return true;
    } catch (error) {
      logger.error('Email server connection failed:', error);
      throw error;
    }
  }
}

export default EmailService;
