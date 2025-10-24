# Google APIs Setup Guide

This guide will help you set up Gmail integration and Google Task Manager for your portfolio.

## Quick Start

### 1. Run the Setup Script
```bash
npm run setup-google
```

This interactive script will guide you through the entire setup process.

### 2. Test Your Configuration
```bash
npm run test-email
```

This will test your Gmail configuration and send a test email.

## Manual Setup (Alternative)

### Gmail Configuration

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

#### Step 2: Generate App Password
1. Go to **Security** → **App passwords**
2. Select **Mail** as the app
3. Select **Other (custom name)** and enter "Portfolio Contact Form"
4. Copy the generated 16-character password

#### Step 3: Create Environment File
Create a `.env.local` file in your project root:

```env
# Gmail Configuration
EMAIL_ADDRESS=your-email@gmail.com
GMAIL_PASSKEY=your-16-character-app-password

# Google APIs
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Telegram Configuration
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
```

### Google Cloud Console Setup

#### Step 1: Create Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Tasks API
   - Gmail API (if needed)

#### Step 2: Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Set Application type to **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback` (for production)
5. Copy the Client ID and Client Secret

#### Step 3: Get Access Tokens
1. Start your development server: `npm run dev`
2. Go to: `http://localhost:3000/api/auth/google`
3. Complete the OAuth flow
4. Copy the tokens from the response
5. Add them to your `.env.local`:
   ```env
   GOOGLE_ACCESS_TOKEN=your-access-token
   GOOGLE_REFRESH_TOKEN=your-refresh-token
   ```

## Features

### Email Functionality
- ✅ Contact form sends emails via Gmail
- ✅ HTML email templates
- ✅ Reply-to functionality
- ✅ Error handling and validation

### Task Manager
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete
- ✅ Due dates and notes
- ✅ Real-time updates
- ✅ Google Tasks API integration

### API Endpoints
- `POST /api/contact` - Send contact form emails
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks` - Update task
- `DELETE /api/tasks` - Delete task
- `GET /api/auth/google` - Initiate OAuth
- `GET /api/auth/google/callback` - OAuth callback

## Testing

### Test Email Functionality
1. Start your server: `npm run dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check your email for the message

### Test Task Manager
1. Go to: `http://localhost:3000/tasks`
2. Create a new task
3. Mark tasks as complete
4. Edit and delete tasks

## Troubleshooting

### Common Issues

#### "Invalid login" error
- Check your Gmail App Password
- Ensure 2-Factor Authentication is enabled
- Verify the App Password is correct

#### "Less secure app access" error
- Use App Passwords instead of regular password
- Don't use your regular Gmail password

#### CORS errors
- Ensure your domain is added to authorized origins
- Check your redirect URIs in Google Cloud Console

#### API quota exceeded
- Check your Google Cloud Console quotas
- Wait for quota reset or request increase

#### OAuth errors
- Verify your Client ID and Client Secret
- Check your redirect URIs
- Ensure the Google Tasks API is enabled

### Debug Steps
1. Check your `.env.local` file has all required variables
2. Verify your Gmail App Password is correct
3. Test the email functionality with `npm run test-email`
4. Check the browser console for errors
5. Verify your Google Cloud Console settings

## Security Notes

- Never commit `.env.local` to version control
- Use App Passwords instead of regular Gmail password
- Restrict API keys to specific domains in production
- Enable 2FA on all Google accounts
- Regularly rotate your App Passwords

## Production Deployment

### Environment Variables
Set these in your production environment:
- `EMAIL_ADDRESS`
- `GMAIL_PASSKEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_ACCESS_TOKEN`
- `GOOGLE_REFRESH_TOKEN`
- `NEXT_PUBLIC_APP_URL` (your production domain)

### OAuth Redirect URIs
Add your production domain to authorized redirect URIs:
- `https://yourdomain.com/api/auth/google/callback`

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Test with the provided test scripts
4. Check the browser console for errors
5. Review the Google Cloud Console for API status

## Files Created

- `app/api/contact/route.js` - Contact form API
- `app/api/tasks/route.js` - Tasks API
- `app/api/auth/google/route.js` - OAuth initiation
- `app/api/auth/google/callback/route.js` - OAuth callback
- `app/components/task-manager/index.jsx` - Task manager component
- `app/tasks/page.js` - Task manager page
- `setup-google-apis.js` - Setup script
- `test-email.js` - Email test script
- `SETUP_GUIDE.md` - Detailed setup guide
