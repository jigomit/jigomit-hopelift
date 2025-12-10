import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024, // Only compress files larger than 1KB
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false
    }),
    // Brotli compression (better compression ratio)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false
    })
  ],

  // Build optimizations
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2015',

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Generate sourcemaps for production debugging (optional - remove if not needed)
    sourcemap: false,

    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,

    // Rollup options for advanced optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vue core and router in separate chunk
          'vue-vendor': ['vue', 'vue-router'],
          // VueUse head in separate chunk
          'vueuse': ['@vueuse/head'],
          // Large components/views
          'views': [
            './src/views/HomeView.vue',
            './src/views/AboutView.vue',
            './src/views/ProgramsView.vue',
            './src/views/ImpactView.vue',
            './src/views/DonateView.vue',
            './src/views/ContactView.vue',
            './src/views/BlogView.vue',
            './src/views/BlogPostView.vue',
            './src/views/ProgramDetailView.vue'
          ]
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log'] // Remove specific console methods
      },
      format: {
        comments: false // Remove comments
      }
    }
  },

  // CSS optimization
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      css: {
        // Minimize CSS output
        minimize: true
      }
    }
  },

  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },

  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false
  }
})
