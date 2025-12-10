# Repository Guidelines

## Project Structure & Module Organization
Author code belongs in `src/`. Build atomic widgets in `src/components/`, wrap page-level flows in `src/views/`, and reserve `Base*.vue` for persistent chrome. Keep routes in `src/router/index.js`, shared copy in `src/data/content.js`, and directives such as `v-reveal` in `src/directives/`. Store tokens, fonts, and helper CSS in `src/assets/`; `public/` is for immutable assets only. Specs live beside their components as `ComponentName.spec.js`. Bundles land in `dist/` and remain read-only.

## Build, Test, and Development Commands
- `npm install` – install the Vue 3 + Vite toolchain and refresh `package-lock.json`.
- `npm run dev` – start the Vite dev server with HMR for accessibility sweeps and copy reviews.
- `npm run build` – create the production bundle in `dist/` and surface router or directive regressions early.
- `npm run preview` – serve the last build locally to verify lazy directives, hashed assets, and route hydration.
Add a `test` script (`vitest run`) once specs exist so automation stays consistent.

## Coding Style & Naming Conventions
Prefer `<script setup>` components, two-space indentation, and single-quoted imports (`import Hero from 'src/components/Hero.vue'`). Components and Base shells stay PascalCase; composables, helpers, and directives remain camelCase. Declare props/emits via `defineProps`/`defineEmits` or concise JSDoc. Scope styles locally, promoting any shared rule to `src/assets/main.css`; inline styles are reserved for one-off art direction adjustments.

## Testing Guidelines
Use Vitest plus Vue Test Utils, placing each spec beside the component it exercises (`Hero.spec.js`). Prioritize coverage for the hero, nav, scroll-triggered reveals, and testimonial carousels because they drive conversions. Run `npx vitest run` (or `npm run test` when scripted) and keep `npm run dev` plus `npm run preview` as manual smoke tests while no CI gate exists.

## Commit & Pull Request Guidelines
Write concise, imperative commit titles such as `Tighten hero CTA spacing`. Each pull request should restate the problem, summarize UX or architectural updates, and list verification evidence (commands, screenshots, or clips). Link briefs or issues and attach before/after imagery so reviewers can validate gradients, scroll choreography, and copy changes without pulling the branch.

## Security & Configuration Tips
Store secrets in `.env` files prefixed with `VITE_`; ignore them via `.gitignore` and document any new key in the PR body. Null-guard CMS or API responses, validate untrusted HTML, and avoid editing generated configuration outside documented entry points. Keep dependencies current via `npm install` when security alerts arrive.
