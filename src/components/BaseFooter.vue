<script setup>
import { RouterLink } from 'vue-router'

const quickLinks = [
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Impact Report', path: '/impact' },
  { label: 'Blog', path: '/blog' },
  { label: 'Donate', path: '/donate' },
]

const contactDetails = [
  { label: 'Email', value: 'care@povertyalleviation.org' },
  { label: 'Phone', value: '+1 (202) 417-0900' },
  { label: 'Head Office', value: '347 Hope Street, Washington DC' },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <RouterLink to="/" class="brand footer-brand">
            <img src="/poverty-alleviation-logo.svg" alt="HopeLift Foundation logo" class="brand-logo" />
            <span>
              <strong class="brand-name">HopeLift Foundation</strong>
              <small class="brand-subtitle">Social Impact Network</small>
            </span>
          </RouterLink>
          <p class="footer-copy">
            Advancing food security, dignified employment, and resilient communities through
            people-first programming across rural and urban regions.
          </p>
        </div>
        <div>
          <h4>Quick links</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 0.45rem">
            <li v-for="item in quickLinks" :key="item.path">
              <RouterLink :to="item.path">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul style="list-style:none; padding:0; margin:0; display:grid; gap:0.4rem">
            <li v-for="detail in contactDetails" :key="detail.label">
              <strong style="display:block; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.12rem">{{ detail.label }}</strong>
              <span>{{ detail.value }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Stories of hope and transparent reporting delivered monthly.</p>
          <form class="contact-form" @submit.prevent>
            <input type="email" placeholder="Email address" required />
            <button class="btn btn-primary" type="submit">Join the list</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        © {{ currentYear }} Poverty Alleviation Initiative. Compassion-powered technology for good.
      </div>
    </div>
  </footer>
</template>
