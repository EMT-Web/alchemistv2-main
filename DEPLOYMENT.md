# Deployment Guide for Escorted Morocco Tours

## Prerequisites

Before deploying to Vercel, ensure you have:
1. A Vercel account
2. Sanity CMS project set up
3. Gmail account with App Password for contact form emails
4. Google Analytics ID

## Environment Variables Setup

You need to configure the following environment variables in your Vercel project settings:

### Required Environment Variables:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_AUTH_TOKEN=your_sanity_auth_token

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=your_google_analytics_id

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_TO=recipient@gmail.com

# Node Environment
NODE_ENV=production
```

## Step-by-Step Deployment to Vercel

### 1. Prepare Your Repository

Make sure all changes are committed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Add all environment variables in the "Environment Variables" section
6. Click "Deploy"

### 3. Configure Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Navigate to "Settings" > "Environment Variables"
3. Add each variable from the list above
4. Make sure to add them for all environments (Production, Preview, Development)

### 4. Configure Custom Domain (Optional)

1. Go to "Settings" > "Domains"
2. Add your custom domain (e.g., escortedmoroccotours.com)
3. Follow the DNS configuration instructions

## Gmail App Password Setup

For the contact form to work, you need to create a Gmail App Password:

1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Scroll to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password as `EMAIL_PASSWORD` environment variable

## Sanity CMS Setup

Ensure your Sanity project is properly configured:

1. Get your Project ID from Sanity Dashboard
2. Get/Generate an Auth Token with write permissions
3. Set the dataset name (usually "production")
4. Add these values to your environment variables

## Build Optimization

The project includes several optimizations:
- SWC minification enabled
- Image optimization through Next.js Image component
- Static generation for tours and destinations
- Server-side rendering for dynamic content
- Caching headers configured in vercel.json

## Post-Deployment Checklist

- [ ] Verify all environment variables are set correctly
- [ ] Test contact form functionality
- [ ] Verify Sanity CMS content is loading
- [ ] Check that images are loading from Sanity CDN
- [ ] Test all dynamic routes (tours, destinations, blog posts)
- [ ] Verify Google Analytics is tracking
- [ ] Test share buttons (Facebook, WhatsApp)
- [ ] Check mobile responsiveness
- [ ] Verify sitemap is generated at /sitemap.xml

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify Node.js version compatibility (recommended: 16.x or higher)
- Check for TypeScript errors: `npm run build` locally

### Contact Form Not Working
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- Check that Gmail "Less secure app access" is enabled or use App Password
- Check Vercel function logs for errors

### Images Not Loading
- Verify NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET are correct
- Check that Sanity images are published
- Verify image domains are configured in next.config.js

### Content Not Updating
- Check SANITY_AUTH_TOKEN permissions
- Verify Sanity dataset name
- Check Vercel deployment logs

## Redeployment

To redeploy after making changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically redeploy your site.

## Support

For issues specific to:
- **Vercel Deployment**: [Vercel Documentation](https://vercel.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Sanity CMS**: [Sanity Documentation](https://www.sanity.io/docs)

---

**Note**: Make sure to never commit your `.env` file or expose sensitive credentials in your code. Always use environment variables for sensitive data.


