# Quick Reference - Vercel Deployment

## 🚀 3-Step Deployment

```bash
# 1. Install dependencies
npm install

# 2. Test build (optional)
npm run build

# 3. Deploy
git push origin main
# Then import to Vercel
```

---

## 🔑 Environment Variables (Add to Vercel)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_AUTH_TOKEN=your_sanity_token
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_TO=recipient@gmail.com
NODE_ENV=production
```

---

## ✅ What Was Fixed

| Issue | Status |
|-------|--------|
| Environment variable typos (MEXT→NEXT) | ✅ Fixed |
| Hardcoded email credentials | ✅ Fixed |
| Hardcoded Sanity project ID | ✅ Fixed |
| Wrong share button URLs | ✅ Fixed |
| Problematic dependencies | ✅ Removed |
| Build scripts | ✅ Simplified |
| Security headers | ✅ Added |
| Documentation | ✅ Created |

---

## 📁 Files Changed

### Modified:
- `pages/blog/[slug].tsx` - Fixed env vars & URLs
- `pages/destinations/[slug].tsx` - Fixed env vars
- `pages/tours/[slug].tsx` - Fixed hardcoded project ID
- `pages/api/contact.ts` - Moved credentials to env vars
- `package.json` - Removed unused deps, fixed scripts
- `next.config.js` - Optimized for Vercel
- `.gitignore` - Added .env

### Created:
- `vercel.json` - Vercel config with security
- `env.example` - Env variables template
- `START_HERE.md` - Main guide
- `DEPLOYMENT.md` - Detailed instructions
- `README_DEPLOYMENT.md` - Quick guide
- `FIXES_SUMMARY.md` - All fixes
- `QUICK_REFERENCE.md` - This file

---

## 🎯 Vercel Dashboard Settings

### Build & Development Settings:
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

---

## 🔗 Important Links

- Sanity Dashboard: https://sanity.io/manage
- Google Analytics: https://analytics.google.com
- Vercel Dashboard: https://vercel.com/dashboard
- Gmail Security: https://myaccount.google.com/security

---

## ⚡ Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy with Vercel CLI
vercel --prod
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check env vars are set in Vercel |
| No emails | Use Gmail App Password |
| No images | Check Sanity Project ID |
| No content | Verify Sanity Auth Token |

---

## ✨ Performance Optimizations Applied

- ✅ SWC Minification enabled
- ✅ Image optimization configured
- ✅ Compression enabled
- ✅ Cache headers for static assets
- ✅ Security headers (X-Frame-Options, etc.)
- ✅ Optimized build configuration

---

## 📱 Post-Deployment Checklist

After deploying, verify:
- [ ] Site loads successfully
- [ ] All pages work (tours, destinations, blog)
- [ ] Contact form sends emails
- [ ] Images display correctly
- [ ] Navigation works
- [ ] Google Analytics tracking
- [ ] Sitemap accessible at /sitemap.xml

---

## 💡 Pro Tips

1. **Always test locally first**: `npm run build`
2. **Use environment-specific vars**: Vercel supports dev/preview/prod
3. **Check function logs**: Vercel Dashboard → Functions
4. **Monitor Analytics**: Vercel provides built-in analytics
5. **Set up custom domain**: Vercel Settings → Domains

---

**Need detailed help? Check START_HERE.md**

---

Last updated: Now - Ready to deploy! 🚀


