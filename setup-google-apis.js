#!/usr/bin/env node

/**
 * Google APIs Setup Script
 * This script helps you set up Google APIs for your portfolio
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Check if dotenv is installed
try {
  require('dotenv');
} catch (error) {
  console.log('📦 Installing required dependencies...');
  const { execSync } = require('child_process');
  execSync('npm install dotenv --legacy-peer-deps', { stdio: 'inherit' });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupGoogleAPIs() {
  console.log('\n🚀 Google APIs Setup for Portfolio\n');
  console.log('This script will help you configure Google APIs for email and task management.\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  if (envExists) {
    console.log('✅ .env.local file found');
  } else {
    console.log('⚠️  .env.local file not found. We\'ll create one for you.');
  }

  console.log('\n📧 Gmail Setup:');
  console.log('1. Go to https://myaccount.google.com/');
  console.log('2. Navigate to Security → 2-Step Verification');
  console.log('3. Enable 2-Step Verification if not already enabled');
  console.log('4. Go to Security → App passwords');
  console.log('5. Select "Mail" and create a new app password');
  console.log('6. Copy the 16-character password\n');

  const email = await question('Enter your Gmail address: ');
  const appPassword = await question('Enter your Gmail App Password (16 characters): ');

  console.log('\n🔧 Google Cloud Console Setup:');
  console.log('1. Go to https://console.cloud.google.com/');
  console.log('2. Create a new project or select existing one');
  console.log('3. Enable Google Tasks API');
  console.log('4. Go to APIs & Services → Credentials');
  console.log('5. Create OAuth 2.0 Client ID (Web application)');
  console.log('6. Add redirect URI: http://localhost:3000/api/auth/google/callback\n');

  const clientId = await question('Enter your Google Client ID: ');
  const clientSecret = await question('Enter your Google Client Secret: ');

  console.log('\n📝 Optional: Telegram Bot (for notifications)');
  const useTelegram = await question('Do you want to set up Telegram notifications? (y/n): ');
  
  let telegramToken = '';
  let telegramChatId = '';
  
  if (useTelegram.toLowerCase() === 'y') {
    console.log('\nTo set up Telegram:');
    console.log('1. Message @BotFather on Telegram');
    console.log('2. Create a new bot with /newbot');
    console.log('3. Get your bot token');
    console.log('4. Add your bot to a group and get the chat ID\n');
    
    telegramToken = await question('Enter your Telegram Bot Token: ');
    telegramChatId = await question('Enter your Telegram Chat ID: ');
  }

  // Create .env.local content
  let envContent = `# Gmail Configuration
EMAIL_ADDRESS=${email}
GMAIL_PASSKEY=${appPassword}

# Google APIs
GOOGLE_CLIENT_ID=${clientId}
GOOGLE_CLIENT_SECRET=${clientSecret}
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

`;

  if (useTelegram.toLowerCase() === 'y') {
    envContent += `# Telegram Configuration
TELEGRAM_BOT_TOKEN=${telegramToken}
TELEGRAM_CHAT_ID=${telegramChatId}
`;
  } else {
    envContent += `# Telegram Configuration (optional)
# TELEGRAM_BOT_TOKEN=your-telegram-bot-token
# TELEGRAM_CHAT_ID=your-telegram-chat-id
`;
  }

  envContent += `
# reCAPTCHA Configuration (optional)
# NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
`;

  // Write .env.local file
  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ .env.local file created successfully!');

  console.log('\n🔐 Next Steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Go to: http://localhost:3000/api/auth/google');
  console.log('3. Complete OAuth flow and copy the tokens');
  console.log('4. Add the tokens to your .env.local file:');
  console.log('   GOOGLE_ACCESS_TOKEN=your-access-token');
  console.log('   GOOGLE_REFRESH_TOKEN=your-refresh-token');
  console.log('5. Test your contact form and task manager!');

  console.log('\n📚 Documentation:');
  console.log('- Contact form: http://localhost:3000/');
  console.log('- Task manager: http://localhost:3000/tasks');
  console.log('- API documentation: Check SETUP_GUIDE.md');

  rl.close();
}

setupGoogleAPIs().catch(console.error);
