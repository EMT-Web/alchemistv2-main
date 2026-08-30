# Quick Setup Guide - Minimum Requirements

## ✅ YES! You Can Deploy With ONLY Sanity Credentials

Your site will build and deploy perfectly with just the Sanity configuration. Here's what will and won't work:

### What WILL Work ✅
- ✅ Homepage
- ✅ Tours pages (all tours will display)
- ✅ Destinations pages
- ✅ Blog posts
- ✅ All navigation
- ✅ All images from Sanity
- ✅ Complete site functionality

### What WON'T Work (But Won't Break Anything) ⚠️
- ❌ Contact form (will show error when submitted)
- ❌ Google Analytics tracking (no visitor stats)

**Bottom Line**: Your site will deploy and work 100%, you just can't receive contact form emails yet.

---

## 📝 Step-by-Step Setup

### For Local Development (Your Computer)

**1. Create a file named `.env.local` in your project root:**

```bash
# Your project root folder structure:
thealchemistv2-main/
├── .env.local  ← Create this file here
├── pages/
├── components/
├── package.json
└── ...
```

**2. Add ONLY these 3 lines to `.env.local`:**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_AUTH_TOKEN=your_actual_auth_token
```

**That's it!** Just 3 variables and you're ready to go.

---

### For Vercel Deployment (Production)

**DON'T create any .env file for Vercel!** Instead:

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Add these 3 variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_AUTH_TOKEN` | Your Sanity auth token |

4. Click "Add" for each one
5. Deploy!

---

## 🔑 Getting Your Sanity Credentials

### 1. Sanity Project ID
```
1. Go to: https://sanity.io/manage
2. Select your project
3. Copy the "Project ID" from the top
```

### 2. Sanity Dataset
```
Usually just: production
(unless you created a custom dataset name)
```

### 3. Sanity Auth Token
```
1. In your Sanity project dashboard
2. Go to: API → Tokens
3. Click "Add API token"
4. Name it: "Vercel Production"
5. Permissions: Editor (or Viewer if read-only)
6. Copy the token (you'll only see it once!)
```

---

## 📋 Quick Commands

```bash
# 1. Install dependencies
npm install

# 2. Run locally (make sure .env.local exists first!)
npm run dev

# 3. Test build
npm run build

# 4. Push to GitHub
git add .
git commit -m "Initial deployment"
git push origin main

# 5. Deploy to Vercel (via website or CLI)
```

---

## 🎯 File Naming: .env vs .env.local

### Use `.env.local` (Recommended) ✅
- **For**: Local development on your computer
- **Why**: Next.js prefers this for local development
- **Security**: Already in .gitignore (won't be pushed to GitHub)

### Don't use `.env` ❌
- **Why not**: Can accidentally be committed to Git
- **Use only if**: You understand Git and have proper .gitignore setup

**My Recommendation: Use `.env.local`** - It's safer and Next.js standard.

---

## 💡 Adding Email & Analytics Later

When you're ready to add the contact form and analytics:

### For Local (.env.local):
```bash
# Just add these lines to your existing .env.local:
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_TO=recipient@gmail.com
```

### For Vercel:
```
Go to Settings → Environment Variables
Add the new variables
Click "Redeploy" to apply changes
```

---

## 🚀 Minimum Deployment Checklist

- [ ] Create `.env.local` file with 3 Sanity variables
- [ ] Run `npm install`
- [ ] Test with `npm run dev` (should work!)
- [ ] Push to GitHub
- [ ] Add 3 Sanity variables to Vercel
- [ ] Deploy to Vercel
- [ ] Site goes live! 🎉

---

## ⚠️ Common Questions

**Q: Will the contact form show an error?**  
A: Only when someone tries to submit it. The form itself will display fine.

**Q: Can I add email later without redeploying?**  
A: Yes! Just add the variables in Vercel dashboard and redeploy.

**Q: Do I need NODE_ENV variable?**  
A: No, Next.js and Vercel set this automatically.

**Q: What if I don't have a Sanity project yet?**  
A: You need one! The site content comes from Sanity CMS. Go to sanity.io and create a free project.

---

## 🎊 You're Ready!

With just these 3 Sanity variables, your entire site will work perfectly:
- All content will load
- All pages will work
- All features except contact form will work
- Google Analytics can wait

**Start simple, add more later!** ✨

---

**Next Step**: Create your `.env.local` file with the 3 Sanity credentials and run `npm install`!

