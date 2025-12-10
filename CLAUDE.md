# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 3 + Vite single-page application for a poverty alleviation nonprofit website. The application focuses on three core services: food distribution, housing assistance, and financial support for families in need.

**Mission**: Poverty alleviation through food distribution, housing help, and financial support for families.

**Key features**:
- Client-side routing with vue-router and lazy-loaded components
- SEO-optimized with meta tags, Open Graph, and structured data via @vueuse/head
- Dynamic content system for programs and blog posts
- Scroll-triggered animations using custom IntersectionObserver directive
- Responsive design with mobile-first approach

## Development Commands

- **Install dependencies**: `npm install`
- **Development server**: `npm run dev` — Hot-reloading dev server for daily UI work
- **Production build**: `npm run build` — Emit optimized bundle into `dist/`; run before proposing changes to catch regressions
- **Preview build**: `npm run preview` — Serve the `dist/` output locally to test production routing and asset paths
- **Build analysis**: `npm run build:analyze` — Analyze bundle size and composition

## Architecture

### Application Structure

**Entry point**: `src/main.js` creates the Vue app, registers the router, initializes @vueuse/head for SEO management, and mounts the global `v-reveal` directive (scroll animations).

**Layout shell**: `src/App.vue` wraps all routes with `BaseNavbar` and `BaseFooter`, providing persistent chrome across page transitions with animated route switching.

**Routing**: `src/router/index.js` defines nine lazy-loaded routes using `createWebHistory()` with smooth scroll-to-top behavior:
- Core pages: Home, About, Programs, Impact, Donate, Contact
- Blog system: Blog (listing), BlogPost (individual posts)
- Dynamic routes: ProgramDetail (`:slug` parameter for individual programs)

The router's `afterEach` hook updates `document.title` based on route meta with the pattern `{Page} | HopeLift Foundation`.

**Content data layer**: Two primary data modules provide structured content:

`src/data/content.js` — Core program and impact data:
- `featureHighlights` — 3 service highlights (Food Distribution, Housing Assistance, Financial Support) with title/description/icon
- `programs` — 3 programs with comprehensive fields: slug, title, description, focus tags, image, metric, fullDescription, objectives array, impact object (with specific metrics), locations array
  1. Food Distribution Network
  2. Housing Assistance Program
  3. Family Financial Support
- `impactStats` — 4 key metrics (families served, meals distributed, shelter nights, financial assistance)
- `testimonials` — 3 testimonials matching the core programs
- `impactStories` — 3 impact narratives aligned with food, housing, and financial support

`src/data/blog.js` — Blog content system:
- `blogPosts` — 6 detailed blog posts covering food distribution, housing assistance, financial support, and community resources with slug, title, excerpt, category, tags, author info, date, readTime, image, featured flag, and full HTML content
- `blogCategories` — 4 categories: 'All Posts', 'Impact Stories', 'Program Insights', and 'Community Resources'

Both files import images from `src/assets/programs/` and `src/assets/illustrations/`. Views and components import from these modules to ensure consistency.

### Component Organization

**Base components** (`Base*.vue`): Shared chrome used across all views
- `BaseNavbar.vue` — Responsive navigation with scroll-triggered background, mobile menu toggle, and action buttons. Tracks scroll position to apply solid background after 10px.
- `BaseFooter.vue` — Site-wide footer with links and branding

**Feature components**: Reusable UI blocks
- `HeroSection.vue` — Home page hero
- `PageHero.vue` — Generic hero for interior pages with badge, title, and subtitle props
- `FeatureGrid.vue` — Grid of feature highlights with icons
- `ProgramGrid.vue` — Grid of program cards with images and metrics
- `ImpactShowcase.vue` — Stats display with narrative
- `TestimonialsCarousel.vue` — Rotating testimonial cards
- `CallToAction.vue` — CTA section with buttons
- `BlogCard.vue` — Blog post preview cards with category, tags, author, date, and read time

### Views

Each view in `src/views/` represents a route and composes feature components:
- `HomeView.vue` — Assembles hero, features, all 3 programs (Food, Housing, Financial), impact stats, testimonials, and CTA sections. Includes SEO with organization schema.
- `AboutView.vue`, `ProgramsView.vue`, `ImpactView.vue`, `DonateView.vue`, `ContactView.vue` — Interior pages with page-specific SEO
- `ProgramDetailView.vue` — Dynamic program detail page for the 3 core programs. Fetches program by slug from route params, displays full description, objectives, impact metrics, locations. Shows 404-style message if slug not found.
- `BlogView.vue` — Blog listing page with category filtering (All Posts, Impact Stories, Program Insights, Community Resources) and search. Uses computed properties to filter the 6 blog posts by category and search query.
- `BlogPostView.vue` — Individual blog post display with full HTML content rendering for posts about food distribution, housing assistance, and financial support. Includes article schema for SEO.

### Custom Directives

**`v-reveal`** (`src/directives/scrollReveal.js`): Intersection Observer-based scroll animation directive. Adds `.reveal-init` class on mount and `.reveal-visible` when element enters viewport. Configure via binding value:
```javascript
v-reveal="{ threshold: 0.2, margin: '0px', once: true }"
```
Default behavior unobserves after first intersection. Clean up occurs in `unmounted` hook.

### Composables

**`useSEO`** (`src/composables/useSEO.js`): Comprehensive SEO management using `@vueuse/head`. Handles meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.

Key functions:
- `useSEO({ title, description, keywords, image, url, type, schema })` — Main composable that configures all meta tags and structured data
- `generateOrganizationSchema()` — Returns schema.org NGO structured data with contact info and areas served
- `generateArticleSchema({ title, description, author, authorRole, date, image, url })` — Returns schema.org Article markup for blog posts
- `generateBreadcrumbSchema(items)` — Returns breadcrumb navigation schema

All views should call `useSEO()` with appropriate page-specific parameters to ensure proper SEO meta tags and social sharing.

### Styling

Global styles in `src/assets/main.css` define design tokens, typography, utility classes, and scoped component styles. Components use `<style scoped>` for component-specific overrides. Maintain two-space indentation and 100-character line limits.

**Asset organization**:
- `src/assets/illustrations/` — SVG illustrations for heroes, testimonials, and decorative elements
- `src/assets/programs/` — JPG program photography for cards and detail pages
- Images are imported directly in data modules (`content.js`, `blog.js`) and referenced by components

### Build Optimization

The production build (`vite.config.js`) includes aggressive optimization:

**Compression**: Dual compression with Gzip and Brotli for files >1KB via `vite-plugin-compression`

**Code splitting**: Manual chunks separate vendor code from application code:
- `vue-vendor` chunk — Vue core and vue-router
- `vueuse` chunk — @vueuse/head SEO library
- `views` chunk — All 9 lazy-loaded view components

**Minification**: Terser with aggressive settings including:
- `drop_console: true` — Removes all console statements in production
- `passes: 2` — Two-pass minification for maximum compression
- `unsafe` optimizations enabled for smaller bundles
- Top-level variable mangling

**CSS optimization**: Code splitting enabled, source maps disabled in production

These settings prioritize bundle size reduction. When debugging production issues, temporarily disable Terser's `drop_console` or enable source maps.

## Coding Conventions

- **Vue syntax**: Use `<script setup>` composition API exclusively
- **Formatting**: Two-space indentation, single quotes for imports
- **Naming**: PascalCase for components (`CallToAction.vue`), camelCase for utilities and directives (`scrollReveal.js`), kebab-case for slugs in routing and data
- **Props/Emits**: Declare via `defineProps`/`defineEmits` for autocomplete
- **Styling**: Use `<style scoped>` unless styles are shared globally; extend `main.css` for reusable tokens
- **SEO**: All views must call `useSEO()` in `<script setup>` with title, description, keywords, and appropriate structured data schema
- **Data management**: Content lives in data modules (`content.js`, `blog.js`), not hardcoded in components. When adding programs or blog posts, update the data files rather than creating new components.
- **Core focus**: All content must align with the three core programs: Food Distribution, Housing Assistance, and Financial Support. Do not add programs outside this scope.

## Testing

No automated test suite exists. Before opening PRs, manually verify:
1. Run `npm run dev` for local testing
2. Run `npm run build` to catch build errors
3. Run `npm run preview` to test production routing and lazy chunks

When adding logic-heavy features (data transformations, carousel timing, directive math), consider introducing Vitest + Vue Test Utils with specs colocated next to source files.

## Commit Guidelines

- Use imperative commit titles scoped to one concern (e.g., "Add momentum highlights data")
- In PR descriptions, state the problem, the change, and validation method (screenshots for UI changes)
- Reference related issues or design briefs
