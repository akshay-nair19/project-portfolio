# Email and Google Task Manager Setup Guide

## Gmail Email Setup

### 1. Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### 2. Generate App Password
1. Go to **Security** → **App passwords**
2. Select **Mail** as the app
3. Select **Other (custom name)** and enter "Portfolio Contact Form"
4. Copy the generated 16-character password

### 3. Environment Variables
Create a `.env.local` file in your project root with:

```env
# Gmail Configuration
EMAIL_ADDRESS=your-email@gmail.com
GMAIL_PASSKEY=your-16-character-app-password

# Telegram Configuration (if using)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google APIs (for Task Manager)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Google Tasks API
GOOGLE_TASKS_API_KEY=your-google-tasks-api-key
```

## Google Task Manager Setup

### 1. Create Google Cloud Project
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Tasks API
   - Gmail API (if needed)
   - Google Calendar API (optional)

### 2. Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Set Application type to **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback` (for production)
5. Copy the Client ID and Client Secret

### 3. Create API Key (Optional)
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Restrict the key to your domain (recommended)

## Testing Your Setup

### Test Email Functionality
1. Start your development server: `npm run dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check your email for the message

### Test Google Tasks Integration
1. Ensure all environment variables are set
2. Test the Google Tasks API endpoints
3. Verify OAuth flow works correctly

## Troubleshooting

### Common Issues:
1. **"Invalid login" error**: Check your Gmail App Password
2. **"Less secure app access"**: Use App Passwords instead of regular password
3. **CORS errors**: Ensure your domain is added to authorized origins
4. **API quota exceeded**: Check your Google Cloud Console quotas

### Security Notes:
- Never commit `.env.local` to version control
- Use App Passwords instead of your regular Gmail password
- Restrict API keys to specific domains in production
- Enable 2FA on all Google accounts
