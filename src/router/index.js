import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/programs',
    name: 'programs',
    component: () => import('../views/ProgramsView.vue'),
    meta: { title: 'Programs' },
  },
  {
    path: '/programs/:slug',
    name: 'program-detail',
    component: () => import('../views/ProgramDetailView.vue'),
    meta: { title: 'Program Details' },
  },
  {
    path: '/impact',
    name: 'impact',
    component: () => import('../views/ImpactView.vue'),
    meta: { title: 'Impact' },
  },
  {
    path: '/donate',
    name: 'donate',
    component: () => import('../views/DonateView.vue'),
    meta: { title: 'Donate' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Contact' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: { title: 'Blog' },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('../views/BlogPostView.vue'),
    meta: { title: 'Blog' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const baseTitle = 'HopeLift Foundation'
  if (to.name === 'home') {
    document.title = baseTitle
  } else {
    const page = to.meta?.title || ''
    document.title = page ? `${page} | ${baseTitle}` : baseTitle
  }
})

export default router
