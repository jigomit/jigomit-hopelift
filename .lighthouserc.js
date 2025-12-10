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
        preset: 'desktop', // Default to desktop, can override with CLI
        // Chrome flags for performance testing
        chromeFlags: '--no-sandbox --disable-gpu',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance scores
        'categories:performance': ['error', { minScore: 0.95 }], // Desktop: 95+
        'categories:accessibility': ['warn', { minScore: 0.90 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['warn', { minScore: 0.95 }],

        // Core Web Vitals - Desktop targets
        'largest-contentful-paint': ['error', { maxNumericValue: 1800 }], // 1.8s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }], // 0.05
        'total-blocking-time': ['warn', { maxNumericValue: 300 }], // 300ms
        'first-contentful-paint': ['warn', { maxNumericValue: 1200 }], // 1.2s
        'speed-index': ['warn', { maxNumericValue: 2000 }], // 2.0s
        'interactive': ['warn', { maxNumericValue: 3500 }], // 3.5s

        // Resource optimization
        'uses-responsive-images': 'warn',
        'modern-image-formats': 'warn',
        'offscreen-images': 'off', // We use lazy loading
        'uses-optimized-images': 'warn',
        'uses-text-compression': 'error',
        'uses-rel-preconnect': 'warn',

        // Best practices
        'no-document-write': 'error',
        'no-vulnerable-libraries': 'warn',
        'js-libraries': 'off', // Vue is detected
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
      target: 'temporary-public-storage', // Free temporary storage
      // For private storage, use: target: 'lhci',
      // serverBaseUrl: 'https://your-lhci-server.com',
      // token: process.env.LHCI_TOKEN,
    },
  },
};
