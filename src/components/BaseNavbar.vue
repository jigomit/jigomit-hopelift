<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Impact', path: '/impact' },
  { name: 'Donate', path: '/donate' },
  { name: 'Contact', path: '/contact' },
]

const menuOpen = ref(false)
const isSolid = ref(false)
const route = useRoute()
let observer = null

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  // Use IntersectionObserver to detect scroll past 10px threshold
  // This avoids forced reflows from reading window.scrollY
  const sentinel = document.getElementById('navbar-scroll-sentinel')

  if (sentinel && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When sentinel is NOT intersecting, we've scrolled past it
          isSolid.value = !entry.isIntersecting
        })
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    )

    observer.observe(sentinel)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)
</script>

<template>
  <header :class="['site-header', { 'site-header--solid': isSolid }]">
    <div class="container navbar">
      <div class="brand-block">
        <RouterLink to="/" class="brand">
          <img src="/poverty-alleviation-logo.svg" alt="HopeLift Foundation logo" class="brand-logo" />
          <span>
            <strong class="brand-name">HopeLift Foundation</strong>
            <small class="brand-subtitle">Community Impact Coalition</small>
          </span>
        </RouterLink>
        <span class="brand-pill">
          <span class="pill-dot" aria-hidden="true"></span>
          18,500 families nourished this week
        </span>
      </div>
      <button
        class="menu-toggle"
        type="button"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <nav class="nav-links" :class="{ 'is-open': menuOpen }">
        <RouterLink v-for="link in navLinks" :key="link.name" :to="link.path" class="nav-link">
          {{ link.name }}
        </RouterLink>
        <div class="nav-meta">
          <p>Need to talk? <RouterLink to="/contact">Contact our field team</RouterLink></p>
          <RouterLink class="btn btn-primary btn-primary--full" to="/donate">Donate now</RouterLink>
        </div>
      </nav>
      <div class="nav-actions">
        <RouterLink class="btn btn-outline nav-outline" to="/impact">Our Impact</RouterLink>
        <RouterLink class="btn btn-primary nav-primary" to="/donate">
          Donate
          <span class="nav-pulse" aria-hidden="true"></span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
