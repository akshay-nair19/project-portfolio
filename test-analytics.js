#!/usr/bin/env node

/**
 * Google Analytics Integration Test Script
 * This script helps you verify your Google Analytics setup
 */

const fs = require('fs');

function testAnalyticsSetup() {
  console.log('🧪 Testing Google Analytics Setup...\n');

  // Check if .env.local exists
  if (!fs.existsSync('.env.local')) {
    console.error('❌ .env.local file not found');
    console.error('Please run: npm run setup-google');
    return false;
  }

  // Read .env.local file
  const envContent = fs.readFileSync('.env.local', 'utf8');
  
  // Check for required environment variables
  const requiredVars = ['NEXT_PUBLIC_GA_ID'];
  const missingVars = requiredVars.filter(varName => !envContent.includes(varName));

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease add these to your .env.local file:');
    console.error('NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX');
    return false;
  }

  console.log('✅ Environment variables found');

  // Check if analytics component exists
  const analyticsComponent = 'app/components/analytics/google-analytics.jsx';
  if (!fs.existsSync(analyticsComponent)) {
    console.error(`❌ Analytics component not found: ${analyticsComponent}`);
    return false;
  }
  console.log('✅ Analytics component found');

  // Check if analytics hook exists
  const analyticsHook = 'app/hooks/useAnalytics.js';
  if (!fs.existsSync(analyticsHook)) {
    console.error(`❌ Analytics hook not found: ${analyticsHook}`);
    return false;
  }
  console.log('✅ Analytics hook found');

  // Check if layout includes analytics
  const layoutContent = fs.readFileSync('app/layout.js', 'utf8');
  if (!layoutContent.includes('GoogleAnalytics')) {
    console.error('❌ Google Analytics not integrated in layout.js');
    return false;
  }
  console.log('✅ Analytics integrated in layout');

  console.log('\n🎉 Google Analytics setup looks good!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Visit your portfolio and interact with it');
  console.log('3. Check Google Analytics Real-time reports');
  console.log('4. Verify events are being tracked');

  console.log('\n🔍 Testing Checklist:');
  console.log('□ Contact form submission');
  console.log('□ Project demo clicks');
  console.log('□ Project code clicks');
  console.log('□ Blog post views');
  console.log('□ Social media clicks');
  console.log('□ Page navigation');

  return true;
}

testAnalyticsSetup();
