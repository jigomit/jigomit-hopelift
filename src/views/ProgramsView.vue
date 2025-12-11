<script setup>
import PageHero from '../components/PageHero.vue'
import ProgramGrid from '../components/ProgramGrid.vue'
import CallToAction from '../components/CallToAction.vue'
import { programs } from '../data/content'
import { useSEO, generateBreadcrumbSchema } from '../composables/useSEO'

// SEO Configuration with Long-Tail Keywords
useSEO({
  title: 'Programs',
  description: 'Seven comprehensive poverty alleviation programs: food distribution network, mobile food pantries, housing assistance, transitional housing, home repairs and weatherization, job training and placement, plus emergency financial support serving families in need.',
  keywords: [
    'food distribution programs for families',
    'mobile food pantry services',
    'housing assistance programs near me',
    'transitional housing for homeless families',
    'home repair assistance low income',
    'weatherization programs for low income',
    'job training placement programs',
    'vocational training and employment',
    'financial support programs for low income',
    'emergency food pantry services',
    'rental assistance eviction prevention',
    'utility bill assistance programs',
    'free groceries for struggling families',
    'emergency shelter programs',
    'financial counseling for families',
    'poverty relief programs',
    'community food distribution centers',
    'emergency housing support services',
    'family emergency financial assistance',
    'nonprofit poverty alleviation programs',
    'homeless to housing programs',
    'energy efficiency assistance programs',
    'living wage job placement',
    'skills training for employment'
  ],
  url: '/programs',
  type: 'website',
  schema: generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Programs', url: '/programs' }
  ])
})

const programsHero =
  'https://images.pexels.com/photos/6646870/pexels-photo-6646870.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'

const supports = [
  {
    title: 'Community co-design',
    detail: 'Each initiative begins with listening labs and participatory budgeting sessions.',
  },
  {
    title: 'Sustainable financing',
    detail: 'Programs receive multi-year runway, local hiring budgets, and monitoring support.',
  },
  {
    title: 'Open data',
    detail: 'Dashboards combine satellite data, household surveys, and financial summaries.',
  },
]

const serviceTracks = [
  {
    name: 'Emergency Relief',
    description: 'Hot meal brigades, cash transfers, and safe shelter delivered during climate or conflict shocks.',
    metric: '34 rapid deployments last year',
  },
  {
    name: 'Economic Mobility',
    description: 'Vocational labs, micro-factories, and entrepreneurship cohorts with childcare stipends.',
    metric: '6,400 jobs created',
  },
  {
    name: 'Health & Healing',
    description: 'Mobile clinics, trauma-informed counseling, and locally staffed telehealth desks.',
    metric: '24k screenings & sessions',
  },
]

const programMetrics = [
  { label: 'Average program length', value: '36 months' },
  { label: 'Local staff hired', value: '740+' },
  { label: 'Volunteer hours logged', value: '112K' },
  { label: 'Audit completion rate', value: '100%' },
]
</script>

<template>
  <div class="page-shell">
    <PageHero
      title="Programs that unlock opportunity"
      subtitle="From rapid hunger relief to long-term economic mobility, our portfolio is shaped by frontline leaders and sustained by partners like you."
      :image="programsHero"
      badge="Programs"
    />

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Portfolio</p>
          <h2 class="section-title">Active initiatives across three continents</h2>
          <p class="section-description">Select a program to sponsor, request custom reports, or schedule a live field briefing.</p>
        </header>
        <ProgramGrid :programs="programs" />
      </div>
    </section>

    <section class="section section--panel">
      <div class="container info-panel" v-reveal>
        <div>
          <p class="section-eyebrow">How we support partners</p>
          <h2 class="section-title" style="text-align:left">Tailored support for each program lead</h2>
          <p>We provide storytelling toolkits, financial coaching, procurement support, and impact evaluation resources.</p>
        </div>
        <div>
          <div v-for="support in supports" :key="support.title" style="margin-bottom:1rem">
            <h3 style="margin:0">{{ support.title }}</h3>
            <p style="margin:0.4rem 0 0">{{ support.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Service tracks</p>
          <h2 class="section-title">Partners select the pathway that meets their moment.</h2>
        </header>
        <div class="service-grid">
          <article v-for="track in serviceTracks" :key="track.name" class="service-card" v-reveal>
            <h3>{{ track.name }}</h3>
            <p>{{ track.description }}</p>
            <strong>{{ track.metric }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container metrics-grid" v-reveal>
        <article v-for="metric in programMetrics" :key="metric.label" class="metric-card">
          <p class="metric-value">{{ metric.value }}</p>
          <p class="metric-label">{{ metric.label }}</p>
        </article>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <CallToAction />
      </div>
    </section>
  </div>
</template>
