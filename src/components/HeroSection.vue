<script setup>
import { RouterLink } from 'vue-router'
import OptimizedImage from './OptimizedImage.vue'

const heroStats = [
  { label: 'Families nourished each week', value: '18,500+' },
  { label: 'Community partners worldwide', value: '87' },
  { label: 'Local volunteers on duty', value: '4,300' },
]

const heroThemes = ['Community-led', 'Open data', 'Future-forward']

const heroImages = [
  {
    src: '/images/volunteers-meals.jpg',
    alt: 'Volunteers distributing hot meals to families',
    priority: true, // LCP image
  },
  {
    src: '/images/field-team-student.jpg',
    alt: 'HopeLift field team guiding young student in class',
    priority: false,
  },
  {
    src: '/images/agriculture-harvest.jpg',
    alt: 'Community agriculture support and harvest',
    priority: false,
  },
  {
    src: '/images/health-workers-care.jpg',
    alt: 'Health workers providing medical care',
    priority: false,
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
        <OptimizedImage
          v-for="image in heroImages"
          :key="image.src"
          :src="image.src"
          :alt="image.alt"
          :width="800"
          :height="600"
          :priority="image.priority"
          :lazy="false"
          img-class="hero-gallery__card"
        />
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
