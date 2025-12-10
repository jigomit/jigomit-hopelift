<script setup>
import { RouterLink } from 'vue-router'

const heroStats = [
  { label: 'Families nourished each week', value: '18,500+' },
  { label: 'Community partners worldwide', value: '87' },
  { label: 'Local volunteers on duty', value: '4,300' },
]

const heroThemes = ['Community-led', 'Open data', 'Future-forward']

const heroImages = [
  {
    url: 'https://images.pexels.com/photos/4959222/pexels-photo-4959222.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Volunteers distributing hot meals to families',
  },
  {
    url: 'https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'HopeLift field team guiding young student in class',
  },
  {
    url: 'https://i.pinimg.com/736x/95/c2/a8/95c2a8f77674d16e0a275d05277bcb2a.jpg',
    alt: 'Community agriculture support and harvest',
  },
  {
    url: 'https://i.pinimg.com/1200x/0f/05/fa/0f05fabcf96b5c3de66e169f11a635f2.jpg',
    alt: 'Health workers providing medical care',
  },
]
</script>

<template>
  <section class="hero hero--spaced">
    <span class="hero-spark hero-spark--one" aria-hidden="true"></span>
    <span class="hero-spark hero-spark--two" aria-hidden="true"></span>
    <div class="container hero-layout">
      <div class="hero-copy">
        <p class="hero-eyebrow">Poverty Alleviation Initiative</p>
        <ul class="hero-pill-group">
          <li v-for="pill in heroThemes" :key="pill" class="hero-pill">{{ pill }}</li>
        </ul>
        <h1 class="hero-title">
          When every family thrives, every community becomes unstoppable.
        </h1>
        <p class="hero-subtitle">
          We activate food security, dignified work, and bold education solutions designed by the people most affected by poverty.
          Together we fund proven models and scale compassion with data.
        </p>
        <div class="hero-cta">
          <RouterLink to="/donate" class="btn btn-primary">Fund a Program</RouterLink>
          <RouterLink to="/impact" class="btn btn-outline">See real impact</RouterLink>
        </div>
        <div class="hero-stat-grid">
          <div v-for="stat in heroStats" :key="stat.label" class="hero-stat">
            <div class="hero-stat-value">{{ stat.value }}</div>
            <div class="hero-stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
      <div class="hero-gallery">
        <div
          v-for="(image, index) in heroImages"
          :key="image.url"
          class="hero-gallery__card"
        >
          <img :src="image.url" :alt="image.alt" loading="lazy" />
        </div>
        <div class="hero-badge">
          <p class="badge-eyebrow">HopeLift today</p>
          <strong>Food · Education · Health · Youth</strong>
          <span>4 continents | 87 partners</span>
          <RouterLink to="/impact" class="badge-link">View live dashboard</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
