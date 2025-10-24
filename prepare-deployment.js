#!/usr/bin/env node

/**
 * Pre-Deployment Checklist Script
 * This script helps you prepare your portfolio for Netlify deployment
 */

const fs = require('fs');
const path = require('path');

function checkDeploymentReadiness() {
  console.log('🚀 Pre-Deployment Checklist for Netlify\n');

  let allGood = true;

  // Check if build works
  console.log('📦 Build Status:');
  try {
    const { execSync } = require('child_process');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Build successful');
  } catch (error) {
    console.log('❌ Build failed - fix errors before deploying');
    allGood = false;
  }

  // Check environment variables
  console.log('\n🔧 Environment Variables:');
  const envPath = '.env.local';
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredVars = [
      'EMAIL_ADDRESS',
      'GMAIL_PASSKEY',
      'NEXT_PUBLIC_GA_ID',
      'NEXT_PUBLIC_GTM'
    ];
    
    const missingVars = requiredVars.filter(varName => !envContent.includes(varName));
    
    if (missingVars.length === 0) {
      console.log('✅ All required environment variables found');
    } else {
      console.log('⚠️  Missing environment variables:');
      missingVars.forEach(varName => console.log(`   - ${varName}`));
      console.log('   Add these to your .env.local file');
    }
  } else {
    console.log('❌ .env.local file not found');
    allGood = false;
  }

  // Check key files exist
  console.log('\n📁 Key Files:');
  const keyFiles = [
    'app/layout.js',
    'app/page.js',
    'app/components/homepage/contact/contact-form.jsx',
    'app/api/contact/route.js',
    'app/components/analytics/google-analytics.jsx',
    'app/hooks/useAnalytics.js'
  ];

  keyFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} missing`);
      allGood = false;
    }
  });

  // Check package.json scripts
  console.log('\n📜 Package Scripts:');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['dev', 'build', 'start'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts[script]) {
      console.log(`✅ ${script} script found`);
    } else {
      console.log(`❌ ${script} script missing`);
      allGood = false;
    }
  });

  // Deployment readiness summary
  console.log('\n🎯 Deployment Readiness:');
  if (allGood) {
    console.log('✅ Your portfolio is ready for Netlify deployment!');
    console.log('\n📋 Next Steps:');
    console.log('1. Push your code to GitHub');
    console.log('2. Connect your repo to Netlify');
    console.log('3. Set environment variables in Netlify');
    console.log('4. Deploy and test!');
  } else {
    console.log('❌ Fix the issues above before deploying');
    console.log('\n🔧 Common fixes:');
    console.log('- Run: npm run build (to check for errors)');
    console.log('- Add missing environment variables');
    console.log('- Check all files are present');
  }

  console.log('\n📚 Documentation:');
  console.log('- Netlify Deployment Guide: NETLIFY_DEPLOYMENT_GUIDE.md');
  console.log('- Analytics Setup: ANALYTICS_SETUP_SUMMARY.md');
  console.log('- Email Setup: MANUAL_SETUP.md');

  return allGood;
}

checkDeploymentReadiness();
