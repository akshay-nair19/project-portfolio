#!/usr/bin/env node

/**
 * Google Tag Manager Test Script
 * This script helps you verify your GTM setup
 */

const fs = require('fs');

function testGTMSetup() {
  console.log('🧪 Testing Google Tag Manager Setup...\n');

  // Check if .env.local exists
  if (!fs.existsSync('.env.local')) {
    console.error('❌ .env.local file not found');
    console.error('Please create .env.local file with your GTM container ID');
    return false;
  }

  // Read .env.local file
  const envContent = fs.readFileSync('.env.local', 'utf8');
  
  // Check for GTM environment variable
  if (!envContent.includes('NEXT_PUBLIC_GTM')) {
    console.error('❌ NEXT_PUBLIC_GTM not found in .env.local');
    console.error('Please add: NEXT_PUBLIC_GTM=GTM-XXXXXXX');
    return false;
  }

  console.log('✅ GTM environment variable found');

  // Check if layout includes GTM
  const layoutContent = fs.readFileSync('app/layout.js', 'utf8');
  if (!layoutContent.includes('GoogleTagManager')) {
    console.error('❌ Google Tag Manager not integrated in layout.js');
    return false;
  }
  console.log('✅ GTM integrated in layout');

  // Check if @next/third-parties is installed
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (!packageJson.dependencies['@next/third-parties']) {
    console.error('❌ @next/third-parties not installed');
    console.error('Please run: npm install @next/third-parties');
    return false;
  }
  console.log('✅ @next/third-parties installed');

  console.log('\n🎉 Google Tag Manager setup looks good!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Visit your portfolio');
  console.log('3. Check GTM Preview mode');
  console.log('4. Verify tags are firing');

  console.log('\n🔍 GTM Testing Checklist:');
  console.log('□ GTM container loads');
  console.log('□ Data layer is populated');
  console.log('□ Tags fire correctly');
  console.log('□ Variables are set');
  console.log('□ Triggers work');

  console.log('\n📊 GTM Preview Mode:');
  console.log('1. Go to GTM dashboard');
  console.log('2. Click "Preview"');
  console.log('3. Enter your website URL');
  console.log('4. Check if tags fire');

  return true;
}

testGTMSetup();
