# Google Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your portfolio to track visitor behavior and engagement.

## 🚀 Quick Setup

### Step 1: Create Google Analytics Account

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Sign in** with your Google account
3. **Click "Start measuring"**
4. **Create a new account** for your portfolio
5. **Set up a property** for your website
6. **Choose "Web" as your platform**
7. **Enter your website details**:
   - Website name: "Akshay Nair Portfolio"
   - Website URL: `https://yourdomain.com` (or `http://localhost:3000` for development)
   - Industry category: "Technology"
   - Business size: Choose appropriate size

### Step 2: Get Your Measurement ID

1. **Go to Admin** (gear icon in bottom left)
2. **Select your property**
3. **Go to Data Streams**
4. **Click on your web stream**
5. **Copy the Measurement ID** (starts with "G-")

### Step 3: Add to Environment Variables

Add this to your `.env.local` file:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## 📊 What's Being Tracked

### Automatic Tracking
- ✅ **Page views** - Every page visit
- ✅ **Session duration** - How long visitors stay
- ✅ **Bounce rate** - Single-page sessions
- ✅ **Traffic sources** - Where visitors come from
- ✅ **Device information** - Desktop, mobile, tablet
- ✅ **Geographic data** - Visitor locations

### Custom Events (Portfolio-Specific)
- ✅ **Contact form submissions** - Success and error tracking
- ✅ **Project demo clicks** - When visitors click "View Demo"
- ✅ **Project code clicks** - When visitors click "View Code"
- ✅ **Blog post views** - When visitors read your blogs
- ✅ **File downloads** - Resume, portfolio downloads
- ✅ **Social media clicks** - LinkedIn, GitHub, etc.
- ✅ **Skill interactions** - When visitors hover/click skills

## 🎯 Analytics Dashboard

### Key Metrics to Monitor

1. **Audience Overview**
   - Total users and sessions
   - New vs returning visitors
   - Geographic distribution
   - Device and browser usage

2. **Engagement Metrics**
   - Contact form submissions
   - Project interactions
   - Blog post views
   - Time spent on site

3. **Traffic Sources**
   - Direct traffic (people typing your URL)
   - Search engines (Google, Bing)
   - Social media (LinkedIn, Twitter)
   - Referral sites

4. **Content Performance**
   - Most viewed pages
   - Popular projects
   - Blog post engagement
   - Download rates

## 🔧 Advanced Configuration

### Custom Events

The portfolio tracks these custom events:

```javascript
// Contact form events
gtag('event', 'contact_form_submit', {
  event_category: 'engagement',
  event_label: 'contact_form_success'
});

// Project interaction events
gtag('event', 'project_demo_click', {
  event_category: 'engagement',
  event_label: 'Project Name'
});

// Blog reading events
gtag('event', 'blog_view', {
  event_category: 'engagement',
  event_label: 'Blog Title'
});
```

### Setting Up Goals

1. **Go to Admin** → **Goals**
2. **Create new goal** for contact form submissions
3. **Set up conversion tracking** for key actions

### Enhanced Ecommerce (Optional)

If you want to track portfolio downloads as "purchases":

1. **Enable Enhanced Ecommerce** in GA4
2. **Set up conversion tracking** for resume downloads
3. **Track "purchases"** when visitors download your resume

## 📈 Understanding Your Data

### Key Reports to Check Regularly

1. **Real-time Reports**
   - See live visitor activity
   - Monitor current sessions
   - Check traffic sources in real-time

2. **Audience Reports**
   - Demographics and interests
   - Technology usage
   - Geographic data

3. **Acquisition Reports**
   - How visitors find your site
   - Campaign performance
   - Social media traffic

4. **Behavior Reports**
   - Most popular pages
   - User flow through your site
   - Content engagement

### Setting Up Alerts

1. **Go to Admin** → **Custom Alerts**
2. **Create alerts** for:
   - High traffic spikes
   - Contact form submissions
   - Error rate increases
   - Goal completions

## 🛠️ Troubleshooting

### Common Issues

#### Analytics Not Tracking
- ✅ Check your Measurement ID is correct
- ✅ Verify the script is loading (check browser console)
- ✅ Ensure your domain is added to authorized domains
- ✅ Check if ad blockers are interfering

#### Missing Data
- ✅ Wait 24-48 hours for data to appear
- ✅ Check if you're in the right timezone
- ✅ Verify your filters aren't excluding data
- ✅ Ensure you're looking at the right date range

#### Real-time Not Working
- ✅ Check if you're logged into the same Google account
- ✅ Verify your IP isn't being filtered out
- ✅ Clear browser cache and cookies
- ✅ Try incognito/private browsing

### Debug Mode

Enable debug mode to see events in real-time:

1. **Add debug parameter** to your URL: `?debug_mode=true`
2. **Check browser console** for gtag events
3. **Use Google Analytics Debugger** Chrome extension

## 🔒 Privacy and Compliance

### GDPR Compliance

- ✅ **Cookie consent** - Add cookie banner if required
- ✅ **Data retention** - Set appropriate retention periods
- ✅ **User consent** - Implement consent management
- ✅ **Privacy policy** - Update your privacy policy

### Data Protection

- ✅ **IP anonymization** - Enable in GA4 settings
- ✅ **Data sharing** - Disable unnecessary data sharing
- ✅ **User deletion** - Implement user data deletion
- ✅ **Secure transmission** - All data is encrypted

## 📱 Mobile Analytics

### Mobile-Specific Tracking

- ✅ **Mobile user behavior** - Touch interactions
- ✅ **App-like experience** - PWA tracking
- ✅ **Mobile performance** - Load times and errors
- ✅ **Responsive design** - Breakpoint tracking

## 🚀 Production Deployment

### Environment Variables

Set these in your production environment:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM=GTM-XXXXXXX (if using GTM)
```

### Domain Configuration

1. **Add your production domain** to GA4
2. **Set up cross-domain tracking** if needed
3. **Configure referral exclusions**
4. **Set up search console integration**

## 📊 Reporting and Insights

### Weekly Reports

Check these metrics weekly:

- **Total visitors** and sessions
- **Contact form submissions**
- **Most popular projects**
- **Traffic sources**
- **Geographic distribution**

### Monthly Analysis

- **Growth trends** in traffic
- **Content performance** analysis
- **User engagement** patterns
- **Conversion rate** optimization

### Quarterly Reviews

- **Goal completion** rates
- **ROI analysis** for portfolio
- **Content strategy** adjustments
- **Technical performance** improvements

## 🎯 Optimization Tips

### Improve Analytics Data Quality

1. **Set up proper goals** and conversions
2. **Use UTM parameters** for campaign tracking
3. **Implement enhanced ecommerce** if applicable
4. **Set up custom dimensions** for portfolio-specific data

### Actionable Insights

1. **Identify popular content** and create more
2. **Optimize underperforming pages**
3. **Improve user experience** based on behavior data
4. **Adjust content strategy** based on audience interests

Your Google Analytics is now fully integrated and tracking all the important metrics for your portfolio! 🎉
