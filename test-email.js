#!/usr/bin/env node

/**
 * Email Functionality Test Script
 * This script tests your email configuration
 */

const nodemailer = require('nodemailer');
const fs = require('fs');

// Load environment variables from .env.local if it exists
if (fs.existsSync('.env.local')) {
  require('dotenv').config({ path: '.env.local' });
} else {
  console.log('⚠️  .env.local file not found. Please run: npm run setup-google');
  process.exit(1);
}

async function testEmail() {
  console.log('🧪 Testing Email Configuration...\n');

  // Check environment variables
  const requiredVars = ['EMAIL_ADDRESS', 'GMAIL_PASSKEY'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease run: node setup-google-apis.js');
    process.exit(1);
  }

  console.log('✅ Environment variables found');

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSKEY,
    },
  });

  try {
    // Test connection
    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful');

    // Send test email
    console.log('📧 Sending test email...');
    const testEmail = {
      from: 'Portfolio Test',
      to: process.env.EMAIL_ADDRESS,
      subject: 'Portfolio Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #007BFF;">✅ Email Test Successful!</h2>
            <p>Your portfolio email functionality is working correctly.</p>
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>From: Portfolio Test</li>
              <li>To: ${process.env.EMAIL_ADDRESS}</li>
              <li>Timestamp: ${new Date().toLocaleString()}</li>
            </ul>
            <p style="font-size: 12px; color: #888;">This is a test email from your portfolio setup.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log(`📬 Check your inbox: ${process.env.EMAIL_ADDRESS}`);

  } catch (error) {
    console.error('❌ Email test failed:');
    console.error(error.message);
    
    if (error.message.includes('Invalid login')) {
      console.error('\n💡 Possible solutions:');
      console.error('1. Check your Gmail App Password');
      console.error('2. Ensure 2-Factor Authentication is enabled');
      console.error('3. Verify the App Password is correct');
    }
    
    process.exit(1);
  }
}

testEmail().catch(console.error);
