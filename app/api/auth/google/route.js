import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Define the scopes for Google Tasks
    const scopes = [
      'https://www.googleapis.com/auth/tasks',
      'https://www.googleapis.com/auth/tasks.readonly',
    ];

    // Generate the authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent', // Force consent screen to get refresh token
    });

    return NextResponse.json({
      success: true,
      authUrl,
      instructions: [
        '1. Click the authUrl to authorize the application',
        '2. Complete the OAuth flow',
        '3. Copy the tokens from the callback response',
        '4. Add them to your .env.local file',
      ],
    });
  } catch (error) {
    console.error('OAuth initiation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to initiate OAuth',
      message: error.message,
    }, { status: 500 });
  }
}
