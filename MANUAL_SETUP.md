# Manual Setup Guide

Since the interactive setup script requires user input, here's a manual setup guide:

## Step 1: Gmail Configuration

### Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### Generate App Password
1. Go to **Security** → **App passwords**
2. Select **Mail** as the app
3. Select **Other (custom name)** and enter "Portfolio Contact Form"
4. Copy the generated 16-character password

## Step 2: Google Cloud Console Setup

### Create Project and Enable APIs
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Tasks API
   - Gmail API (optional)

### Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Set Application type to **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback` (for production)
5. Copy the Client ID and Client Secret

## Step 3: Create Environment File

Create a `.env.local` file in your project root with the following content:

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
# TELEGRAM_BOT_TOKEN=your-telegram-bot-token
# TELEGRAM_CHAT_ID=your-telegram-chat-id

# Optional: reCAPTCHA Configuration
# NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

## Step 4: Get Access Tokens

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to: `http://localhost:3000/api/auth/google`

3. Complete the OAuth flow and copy the tokens from the response

4. Add the tokens to your `.env.local` file:
   ```env
   GOOGLE_ACCESS_TOKEN=your-access-token
   GOOGLE_REFRESH_TOKEN=your-refresh-token
   ```

## Step 5: Test Your Setup

### Test Email Configuration
```bash
npm run test-email
```

### Test Contact Form
1. Go to your portfolio contact form
2. Fill out and submit the form
3. Check your email for the message

### Test Task Manager
1. Go to: `http://localhost:3000/tasks`
2. Create, edit, and delete tasks
3. Mark tasks as complete

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
