import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'OAuth error',
        message: error,
      }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json({
        success: false,
        error: 'Authorization code not provided',
      }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store tokens securely (in production, use a database)
    // For now, we'll return them to be stored in environment variables
    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
      },
      instructions: [
        'Add these tokens to your .env.local file:',
        `GOOGLE_ACCESS_TOKEN=${tokens.access_token}`,
        `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`,
        'GOOGLE_TOKEN_EXPIRY_DATE=' + tokens.expiry_date,
      ],
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json({
      success: false,
      error: 'Authentication failed',
      message: error.message,
    }, { status: 500 });
  }
}
