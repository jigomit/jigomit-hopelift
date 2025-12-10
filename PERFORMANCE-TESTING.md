# Performance Testing Guide

Complete guide for testing and optimizing website performance to achieve 90+ mobile and 95+ desktop scores.

## Quick Start

```bash
# 1. Build the production bundle
npm run build

# 2. Run performance tests
npm run perf:test:desktop    # Desktop performance audit
npm run perf:test:mobile      # Mobile performance audit
npm run perf:build            # Full audit (desktop + mobile)
```

## Available Commands

### `npm run perf:optimize`
Optimizes all images in `src/assets/programs/`:
- Converts JPG to WebP (80% quality)
- Converts JPG to AVIF (75% quality)
- Generates responsive sizes: 400w, 800w, 1200w
- Outputs to `public/images/`

**When to run:** After adding new images to the project

### `npm run perf:test:desktop`
Runs Lighthouse CI with desktop configuration:
- Tests 5 pages (Home, About, Programs, Impact, Donate)
- Runs 3 audits per page for consistency
- Enforces 95% performance score minimum
- LCP target: ≤ 1.8s
- CLS target: ≤ 0.05

### `npm run perf:test:mobile`
Runs Lighthouse CI with mobile configuration:
- Simulates mobile device (Moto G Power 2022)
- 3G network throttling
- 4x CPU slowdown
- Enforces 90% performance score minimum
- LCP target: ≤ 2.5s
- CLS target: ≤ 0.05

### `npm run perf:build`
Full performance testing workflow:
1. Builds production bundle
2. Runs desktop audit
3. Runs mobile audit
4. Fails if any scores below threshold

**When to run:** Before creating PRs, before deployments

## Performance Targets

| Device | Performance | LCP | CLS | TBT | FCP |
|--------|-------------|-----|-----|-----|-----|
| Desktop | ≥ 95% | ≤ 1.8s | ≤ 0.05 | ≤ 300ms | ≤ 1.2s |
| Mobile | ≥ 90% | ≤ 2.5s | ≤ 0.05 | ≤ 600ms | ≤ 1.8s |

## Configuration Files

### `.lighthouserc.js`
Desktop performance configuration:
- Preset: `desktop`
- Tests 5 key pages
- 3 runs per page (median reported)
- Strict Core Web Vitals thresholds
- Uploads results to temporary public storage

### `.lighthouserc-mobile.js`
Mobile performance configuration:
- Preset: `mobile`
- Mobile device emulation (375x667, 2x scale)
- Network throttling (3G)
- CPU throttling (4x slowdown)
- Mobile-specific thresholds

### `netlify.toml`
Netlify deployment configuration:
- Auto-runs Lighthouse on every deploy
- **Blocks deployment** if performance < thresholds
- Tests both mobile and desktop
- Stores reports in `reports/lighthouse/`

## How Performance Testing Works

### Local Testing
1. **Build Step**: `npm run build` creates optimized production bundle
2. **Preview Server**: Starts local server on `http://localhost:4173`
3. **Lighthouse Runs**: Audits each page 3 times
4. **Analysis**: Collects performance metrics
5. **Assertion**: Fails if metrics below thresholds
6. **Reporting**: Outputs scores to terminal

### CI/CD Testing (Netlify)
1. Push code to repository
2. Netlify build triggers
3. `npm run build` executes
4. Lighthouse plugin runs automatically
5. Build fails if performance < 90%
6. Reports available in Netlify UI

## Understanding the Results

### Performance Score
Overall score combining multiple metrics:
- **90-100**: Excellent (green)
- **50-89**: Needs improvement (orange)
- **0-49**: Poor (red)

Target: **95+ desktop, 90+ mobile**

### Core Web Vitals

**LCP (Largest Contentful Paint)**
- Measures loading performance
- Target: ≤ 1.8s (desktop), ≤ 2.5s (mobile)
- Optimizations: Image optimization, eager loading, preloading

**CLS (Cumulative Layout Shift)**
- Measures visual stability
- Target: ≤ 0.05
- Optimizations: Image dimensions, skeleton loading, reserved space

**TBT (Total Blocking Time)**
- Measures interactivity
- Target: ≤ 300ms (desktop), ≤ 600ms (mobile)
- Optimizations: Code splitting, defer non-critical JS

**FCP (First Contentful Paint)**
- Measures perceived loading speed
- Target: ≤ 1.2s (desktop), ≤ 1.8s (mobile)
- Optimizations: Critical CSS inline, resource hints

## Troubleshooting

### Test Fails with "Server not ready"
**Cause:** Preview server didn't start
**Fix:**
```bash
# Start preview manually first
npm run build
npm run preview

# In new terminal
npm run perf:test:desktop
```

### Low Performance Score
**Common causes:**
1. Images not optimized → Run `npm run perf:optimize`
2. Missing width/height on images → Add explicit dimensions
3. Render-blocking resources → Check critical CSS is inlined
4. Large JavaScript bundles → Review code splitting

### Tests Pass Locally, Fail on Netlify
**Causes:**
- Different server environment
- Network conditions
- Netlify plugin uses different Chrome version

**Fix:**
- Test with stricter thresholds locally
- Use mobile preset (harder to pass)
- Check Netlify deploy logs for specific failures

### Images Not Loading After Optimization
**Cause:** Images still reference old paths
**Fix:** OptimizedImage component automatically converts paths. If using raw `<img>` tags, update to:
```vue
<OptimizedImage
  src="/images/filename.jpg"
  alt="Description"
  width="800"
  height="600"
/>
```

## Best Practices

### Before Every PR
```bash
npm run build
npm run perf:test:desktop
npm run perf:test:mobile
```

### After Adding Images
```bash
# 1. Add JPG to src/assets/programs/
# 2. Optimize
npm run perf:optimize

# 3. Use in components
<OptimizedImage src="your-image.jpg" ... />

# 4. Test
npm run build && npm run perf:test:mobile
```

### Monthly Performance Audit
```bash
# Test production site
npx lighthouse https://your-site.com --view

# Or use PageSpeed Insights
open https://pagespeed.web.dev/

# Check real-world data
# Chrome UX Report: crux-compare.netlify.app
```

## Performance Monitoring

### Metrics to Track
- **Lighthouse scores** (CI/CD)
- **Real User Metrics** (Chrome UX Report)
- **Bundle sizes** (vite build output)
- **Image sizes** (public/images/)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/performance/)

## Continuous Improvement

### If Scores Drop Below Targets

1. **Identify Regression**
   ```bash
   git log --oneline
   git checkout <previous-commit>
   npm run perf:build
   ```

2. **Find Cause**
   - New images added without optimization?
   - New JavaScript libraries?
   - CSS changes affecting CLS?
   - Removed critical optimizations?

3. **Fix and Verify**
   ```bash
   # Make fixes
   npm run build
   npm run perf:test:mobile  # Mobile is stricter
   ```

4. **Prevent Future Regressions**
   - Add tests for new features
   - Review PR bundle size changes
   - Keep Lighthouse CI enabled

## Support

**Performance issues?**
- Check PERFORMANCE-CHECKLIST.md for optimization status
- Review .lighthouserc.js assertions
- Run `npm run perf:test:mobile -- --help` for CLI options
- Check Netlify deploy logs for CI errors

**Questions?**
- Read Vue.js performance guide: https://vuejs.org/guide/best-practices/performance.html
- Read Vite performance guide: https://vitejs.dev/guide/performance.html
- Read web.dev performance docs: https://web.dev/performance/

---

**Last Updated:** December 10, 2024
