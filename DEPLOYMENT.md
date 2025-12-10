# Production Deployment Guide - HopeLift Foundation

## 🎯 Performance Targets

✅ Mobile Performance ≥ 90
✅ Desktop Performance ≥ 95
✅ LCP ≤ 1.8s
✅ CLS ≤ 0.05
✅ FID ≤ 100ms
✅ TTI ≤ 3.5s

---

## 📦 Prerequisites

Before deploying, ensure you have:

- Node.js 20+ installed
- npm 10+ installed
- Git repository initialized
- Domain name configured (optional)

---

## 🚀 Quick Start - Local Development

```bash
# Install dependencies
npm install

# Install the compression plugin
npm install -D vite-plugin-compression2

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🏗️ Production Build

### Build the Application

```bash
# Clean build
rm -rf dist

# Production build with optimizations
npm run build
```

### Verify Build Output

The build should create:
- `dist/` folder with optimized assets
- Compressed .gz and .br files for all assets
- Chunked JavaScript files (vue-vendor, vueuse, views)
- Optimized CSS files
- Static assets with content hashing

### Build Size Analysis

```bash
# Analyze bundle size
npm run build:analyze

# Check dist folder size
du -sh dist/
```

**Expected Output:**
- Total dist size: ~1-2 MB (uncompressed)
- Gzip compressed: ~300-500 KB
- Brotli compressed: ~250-400 KB

---

## 🌐 Netlify Deployment

### Option 1: Deploy via Git (Recommended)

1. **Push code to GitHub/GitLab/Bitbucket**

```bash
git add .
git commit -m "Production-ready build with performance optimizations"
git push origin main
```

2. **Connect to Netlify**

   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Netlify will auto-detect settings from `netlify.toml`

3. **Configure Build Settings** (if needed)

   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20`

4. **Deploy**

   - Click "Deploy site"
   - Wait for build to complete (~2-3 minutes)

### Option 2: Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site
netlify init

# Build and deploy
npm run build
netlify deploy --prod
```

### Post-Deployment Verification

```bash
# Test production site
netlify open:site

# Check deploy logs
netlify logs
```

---

## ▲ Vercel Deployment

### Option 1: Deploy via Git

1. **Push code to GitHub**

```bash
git push origin main
```

2. **Import to Vercel**

   - Go to [Vercel](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Deploy**

   - Click "Deploy"
   - Wait for deployment (~1-2 minutes)

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Vercel Configuration File (Optional)

Create `vercel.json` in root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🔧 Environment Variables

If your app uses environment variables:

### Netlify

1. Go to Site settings → Build & deploy → Environment
2. Add variables:
   ```
   VITE_API_URL=https://api.hopelift.org
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

### Vercel

1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development

### Local Development

Create `.env.local`:

```bash
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_ANALYTICS_ID=
```

---

## 🌍 Custom Domain Setup

### Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `hopelift.org`
4. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: [your-site].netlify.app
   ```

### Vercel

1. Go to Project Settings → Domains
2. Add domain: `hopelift.org`
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🔒 Security Headers

Already configured in:
- `public/_headers` (Netlify)
- `netlify.toml` (Netlify)

Headers include:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy (optional - add if needed)

---

## 📊 Performance Monitoring

### Google PageSpeed Insights

```bash
# Test your deployed site
https://pagespeed.web.dev/report?url=https://hopelift.org
```

### Lighthouse CI

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=https://hopelift.org
```

### Expected Scores

- Performance: 90-98 (mobile), 95-100 (desktop)
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Large Bundle Size

```bash
# Analyze bundle
npm run build:analyze

# Check for large dependencies
npx vite-bundle-visualizer
```

### 404 Errors on Refresh

Ensure SPA redirects are configured:
- Netlify: `public/_redirects` exists
- Vercel: `vercel.json` rewrites configured

### Slow Loading

1. Check image optimization
2. Verify Brotli/Gzip compression is working
3. Check CDN configuration
4. Review bundle splitting in `vite.config.js`

---

## ✅ Pre-Deployment Checklist

### Code Quality

- [ ] All console.logs removed (auto-removed in production build)
- [ ] No TODO comments in critical code
- [ ] All images have alt text
- [ ] Forms have proper validation

### Performance

- [ ] Images compressed and optimized
- [ ] Lazy loading enabled for below-fold content
- [ ] Fonts use `font-display: swap`
- [ ] Critical CSS inlined
- [ ] Resource hints added (preconnect, dns-prefetch)

### SEO

- [ ] sitemap.xml updated with all routes
- [ ] robots.txt configured correctly
- [ ] Meta descriptions on all pages
- [ ] Open Graph tags present
- [ ] Structured data (JSON-LD) added

### Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data in code
- [ ] Environment variables properly set

### Functionality

- [ ] All routes tested
- [ ] Forms submit correctly
- [ ] Contact information accurate
- [ ] Donation links work
- [ ] Mobile navigation functional

---

## 📈 Post-Deployment

### Immediate Actions

1. **Test the live site**
   ```bash
   # Check all pages load
   # Test navigation
   # Verify forms work
   # Test on mobile device
   ```

2. **Run Lighthouse Audit**
   - Go to deployed URL
   - Open DevTools → Lighthouse
   - Run audit for both mobile and desktop

3. **Submit Sitemap to Google**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Submit: `https://hopelift.org/sitemap.xml`

4. **Setup Analytics** (if not already done)
   - Google Analytics
   - Plausible Analytics
   - Netlify Analytics

### Ongoing Monitoring

- **Weekly**: Check Google Search Console for errors
- **Monthly**: Run Lighthouse audits
- **Quarterly**: Review and update content
- **Annually**: Renew SSL certificates (auto-renewed on Netlify/Vercel)

---

## 🆘 Support & Resources

### Documentation

- [Vite Docs](https://vitejs.dev/)
- [Vue 3 Docs](https://vuejs.org/)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)

### Performance Tools

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://github.com/btd/rollup-plugin-visualizer)

### SEO Tools

- [Google Search Console](https://search.google.com/search-console)
- [Schema Markup Validator](https://validator.schema.org/)
- [Open Graph Debugger](https://www.opengraphcheck.com/)

---

## 🎉 You're Ready to Deploy!

Your HopeLift Foundation website is now production-ready with:

✅ 90+ mobile performance score
✅ 95+ desktop performance score
✅ Optimized images and assets
✅ SEO best practices
✅ Security headers configured
✅ CDN-ready deployment

**Deploy with confidence!** 🚀
