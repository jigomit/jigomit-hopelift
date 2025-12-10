<script setup>
import PageHero from '../components/PageHero.vue'
import ImpactShowcase from '../components/ImpactShowcase.vue'
import { impactStats, impactStories } from '../data/content'
import { useSEO, generateBreadcrumbSchema } from '../composables/useSEO'

// SEO Configuration with Long-Tail Keywords
useSEO({
  title: 'Impact',
  description: 'HopeLift Foundation impact: 19,000+ families receiving services, 420,000 meals distributed monthly, 48,000 emergency shelter nights provided, $1.8M in financial assistance distributed. Real outcomes from food distribution, housing assistance, and financial support programs.',
  keywords: [
    'nonprofit impact report poverty alleviation',
    'food distribution program results',
    'housing assistance program outcomes',
    'financial support program impact',
    'nonprofit accountability transparency',
    'measurable poverty relief results',
    'food pantry program effectiveness',
    'eviction prevention success rates',
    'emergency assistance program outcomes',
    'family support program impact data',
    'nonprofit helping families statistics',
    'poverty alleviation program results'
  ],
  url: '/impact',
  type: 'website',
  schema: generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Impact', url: '/impact' }
  ])
})

const impactHero =
  'https://images.pexels.com/photos/6647009/pexels-photo-6647009.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'

const reportHighlights = [
  { title: 'Carbon-smart farming', detail: 'Farmers adopting regenerative practices saw a 22% drop in fertilizer costs.' },
  { title: 'Cash transfers', detail: 'Families receiving digital cash stipends increased savings by 34%.' },
  { title: 'Education outcomes', detail: '97% of teens in our Future-Proof program completed secondary school.' },
]

const dataPractices = [
  {
    title: 'Community consent loops',
    detail: 'Beneficiaries approve data categories before collection, with opt-out available in every survey channel.',
  },
  {
    title: 'Independent verification',
    detail: 'Regional universities audit raw data quarterly and publish peer-reviewed briefs on methodology.',
  },
  {
    title: 'Real-time integrity checks',
    detail: 'Sensor anomalies trigger on-call analysts to compare against satellite, SMS, and volunteer logs.',
  },
]

const reportingLayers = [
  { label: 'Open dashboard refresh rate', value: '60 minutes' },
  { label: 'Household surveys completed', value: '12,400 annually' },
  { label: 'Sensors deployed', value: '380 water + climate nodes' },
  { label: 'Story capsules archived', value: '1,120 interviews' },
]
</script>

<template>
  <div class="page-shell">
    <PageHero
      title="Impact rooted in transparency"
      subtitle="We pair human-centered storytelling with satellite and sensor data to monitor progress around food security, health, education, and livelihoods."
      :image="impactHero"
      badge="Impact"
    />

    <section class="section section--tint">
      <div class="container">
        <ImpactShowcase :stats="impactStats" :story="{ title: 'Emergency to stability', summary: 'Households experiencing acute hunger dropped from 62% to 28% after layered interventions combining meals, cash, and business coaching.' }" />
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Stories of change</p>
          <h2 class="section-title">Innovation built at the edges</h2>
        </header>
        <div class="story-grid">
          <article v-for="story in impactStories" :key="story.title" class="story-card" v-reveal>
            <h3>{{ story.title }}</h3>
            <p>{{ story.summary }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container info-grid">
        <article v-for="report in reportHighlights" :key="report.title" class="feature-card" v-reveal>
          <p class="section-eyebrow" style="text-align:left">Highlight</p>
          <h3>{{ report.title }}</h3>
          <p>{{ report.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Data practice</p>
          <h2 class="section-title">Safeguarding privacy while surfacing actionable insight.</h2>
        </header>
        <div class="data-grid">
          <article v-for="practice in dataPractices" :key="practice.title" class="data-card" v-reveal>
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container metrics-grid" v-reveal>
        <article v-for="layer in reportingLayers" :key="layer.label" class="metric-card">
          <p class="metric-value">{{ layer.value }}</p>
          <p class="metric-label">{{ layer.label }}</p>
        </article>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container info-panel" v-reveal>
        <div>
          <p class="section-eyebrow">Download reports</p>
          <h2 class="section-title" style="text-align:left">Interactive dashboards & ESG-ready data</h2>
          <p>Access anonymized beneficiary data, carbon footprint modeling, and program-level breakdowns updated quarterly.</p>
        </div>
        <div style="display:grid; gap:1rem">
          <button class="btn btn-primary" type="button">Request full report</button>
          <button class="btn btn-outline" type="button">Schedule an impact briefing</button>
        </div>
      </div>
    </section>
  </div>
</template>
