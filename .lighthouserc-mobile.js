module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/about',
        'http://localhost:4173/programs',
        'http://localhost:4173/impact',
        'http://localhost:4173/donate',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'mobile', // Mobile testing configuration
        // Mobile emulation settings
        formFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false,
        },
        emulatedUserAgent: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
        chromeFlags: '--no-sandbox --disable-gpu',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance scores - Mobile targets (more lenient than desktop)
        'categories:performance': ['error', { minScore: 0.90 }], // Mobile: 90+
        'categories:accessibility': ['warn', { minScore: 0.90 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['warn', { minScore: 0.95 }],

        // Core Web Vitals - Mobile targets (stricter due to slower devices)
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // 2.5s for mobile
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }], // 0.05
        'total-blocking-time': ['warn', { maxNumericValue: 600 }], // 600ms for mobile
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }], // 1.8s
        'speed-index': ['warn', { maxNumericValue: 3400 }], // 3.4s for mobile
        'interactive': ['warn', { maxNumericValue: 5000 }], // 5.0s for mobile

        // Resource optimization
        'uses-responsive-images': 'warn',
        'modern-image-formats': 'warn',
        'offscreen-images': 'off', // We use lazy loading
        'uses-optimized-images': 'warn',
        'uses-text-compression': 'error',
        'uses-rel-preconnect': 'warn',
        'render-blocking-resources': 'warn',

        // Mobile-specific
        'viewport': 'error',
        'content-width': 'error',
        'tap-targets': 'warn',

        // Best practices
        'no-document-write': 'error',
        'no-vulnerable-libraries': 'warn',
        'js-libraries': 'off',
        'deprecations': 'warn',
        'errors-in-console': 'warn',

        // Accessibility
        'color-contrast': 'warn',
        'image-alt': 'error',
        'html-has-lang': 'error',
        'meta-viewport': 'error',

        // SEO
        'document-title': 'error',
        'meta-description': 'error',
        'link-text': 'warn',
        'crawlable-anchors': 'warn',
        'is-crawlable': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
