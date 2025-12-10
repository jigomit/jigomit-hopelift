<script setup>
import { RouterLink } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import FeatureGrid from '../components/FeatureGrid.vue'
import ProgramGrid from '../components/ProgramGrid.vue'
import ImpactShowcase from '../components/ImpactShowcase.vue'
import TestimonialsCarousel from '../components/TestimonialsCarousel.vue'
import CallToAction from '../components/CallToAction.vue'
import { featureHighlights, programs, impactStats, testimonials } from '../data/content'
import { useSEO, generateOrganizationSchema } from '../composables/useSEO'

// SEO Configuration with Long-Tail Keywords
useSEO({
  title: '',  // Empty for home page - will show just "HopeLift Foundation"
  description: 'Poverty alleviation through food distribution, housing assistance, and financial support for families in need. Emergency food pantries, rental assistance, eviction prevention, utility help, and financial counseling. Serving families facing hunger, homelessness, and economic crisis.',
  keywords: [
    'poverty alleviation programs for families',
    'emergency food distribution assistance',
    'free food pantry for low income families',
    'emergency rental assistance programs',
    'eviction prevention help',
    'emergency shelter for families',
    'financial assistance for families in crisis',
    'utility bill assistance programs',
    'food assistance for struggling families',
    'housing help for homeless families',
    'emergency financial aid programs',
    'help for families facing poverty',
    'nonprofit poverty relief organizations',
    'donate to help families in need'
  ],
  url: '/',
  type: 'website',
  schema: generateOrganizationSchema()
})

const innovationHighlights = [
  {
    tag: 'Live dashboards',
    title: 'Immersive 3D impact maps',
    detail: 'Track food deliveries, household wellbeing, and economic markers with volumetric charts refreshed every hour.',
    metric: '118 villages tracked',
  },
  {
    tag: 'Predictive aid',
    title: 'AI-ready forecasting models',
    detail: 'We layer satellite data, SMS surveys, and weather sensors to anticipate shortages weeks in advance.',
    metric: '42% faster response',
  },
  {
    tag: 'Community voices',
    title: 'Story capsules & AR tours',
    detail: 'Residents record updates that transform into immersive walkthroughs for donors and advocates worldwide.',
    metric: '360° site access',
  },
]

const globalFootprint = [
  { region: 'East Africa', reach: '27 partners', focus: 'Community kitchens, rapid nutrition support, regenerative farming pilots' },
  { region: 'West Africa', reach: '18 partners', focus: 'Cash-for-care networks, safe water kiosks, women-led cooperatives' },
  { region: 'Latin America', reach: '22 partners', focus: 'Cultural preservation enterprises, anti-violence services, trade schools' },
  { region: 'Southeast Asia', reach: '20 partners', focus: 'Climate adaptation hubs, mobile health, resilient housing retrofits' },
]

const fieldUpdates = [
  {
    title: 'Rapid meal deployment',
    location: 'Lamu County, Kenya',
    summary: 'Community kitchens prepped 8,200 servings across five islands after monsoon disruptions cut ferry routes.',
    metric: '8,200 meals / 48 hrs',
  },
  {
    title: 'Digital stipends go live',
    location: 'Cusco, Peru',
    summary: 'Text-based enrollment registered 1,400 caregivers for quarterly cash transfers tied to school attendance.',
    metric: '$182K stipends sent',
  },
  {
    title: 'Youth innovation lab',
    location: 'Ho, Ghana',
    summary: 'Teen-led cohort built solar chilling units for village markets, reducing food loss by 35% in pilot sites.',
    metric: '35% spoilage drop',
  },
]

const partnerMarquee = [
  'Global Nutrition Alliance',
  'Open Relief Data Lab',
  'UN SDG Action Hub',
  'Women in Dev Finance Forum',
  'Community Health Impact Fund',
]

const timelineMilestones = [
  { year: '2016', headline: 'Seeded first rapid response kitchens', detail: 'Local chefs, diaspora donors, and city councils formed the playbook we still scale today.' },
  { year: '2019', headline: 'Launched open data dashboard', detail: 'Shared real-time metrics publicly, unlocking multi-year commitments from institutional partners.' },
  { year: '2022', headline: 'Expanded to climate adaptation', detail: 'Integrated regenerative agriculture and resilient housing to protect gains from shocks.' },
  { year: '2024', headline: 'Built 3D field storytelling labs', detail: 'Beneficiaries now co-produce immersive updates used in advocacy and virtual site visits.' },
]
</script>

<template>
  <div class="page-shell">
    <HeroSection />

    <section class="section section--panel section--panel--plain">
      <div class="container info-panel info-panel--accent" v-reveal>
        <div class="info-panel__copy">
          <p class="section-eyebrow">Why we show up</p>
          <h2 class="section-title info-panel__title">
            Designed with community leaders, powered by data, rooted in dignity.
          </h2>
          <p>
            We co-create livelihood plans alongside parents, farmers, teachers, and youth so that every intervention is
            culturally specific and measurable. 3D dashboards track nutrition, income, and wellbeing indicators in real time
            so donors see exactly where their support lands.
          </p>
        </div>
        <div class="info-panel__stats">
          <article class="info-chip">
            <header>
              <span class="chip-eyebrow">Activation</span>
              <strong>24/7</strong>
            </header>
            <p>
              Field responders supply meals and medical care around the clock through regional rapid response hubs.
            </p>
          </article>
          <article class="info-chip">
            <header>
              <span class="chip-eyebrow">Every dollar</span>
              <strong>93¢</strong>
            </header>
            <p>Flows directly into community-designed solutions.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Holistic pathway</p>
          <h2 class="section-title">Focusing on essentials that interrupt the root causes of poverty.</h2>
          <p class="section-description">Food security, safe shelter, and sustainable incomes reinforce one another. Our integrated services are designed to advance all three.</p>
        </header>
        <FeatureGrid :items="featureHighlights" />
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Global footprint</p>
          <h2 class="section-title">Neighbors, councils, and cooperatives across four regions.</h2>
          <p class="section-description">We invest in the power brokers already running mutual aid while connecting them to data, funding, and storytelling tools.</p>
        </header>
        <div class="global-grid">
          <article v-for="area in globalFootprint" :key="area.region" class="global-card" v-reveal>
            <p class="section-eyebrow" style="text-align:left">{{ area.region }}</p>
            <h3>{{ area.reach }}</h3>
            <p>{{ area.focus }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel" style="padding-top:0">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Programs</p>
          <h2 class="section-title">Programs built with local expertise</h2>
          <p class="section-description">Each initiative is locally staffed, governed by community councils, and audited against our open impact dashboard.</p>
        </header>
        <ProgramGrid :programs="programs.slice(0, 3)" />
        <div style="text-align:center; margin-top:2rem">
          <RouterLink to="/programs" class="btn btn-outline">Explore all programs</RouterLink>
        </div>
      </div>
    </section>

    <section class="section section--tint">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Impact</p>
          <h2 class="section-title">Transparent reporting and bold goals</h2>
          <p class="section-description">Real-time monitoring keeps every donor, partner, and volunteer looped in on key indicators.</p>
        </header>
        <ImpactShowcase :stats="impactStats" :story="{ title: 'Community resilience', summary: 'Families now report two additional months of food security after harvest because income diversification programs introduced year-round revenue.' }" />
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Innovation lab</p>
          <h2 class="section-title">Tools that keep communities several moves ahead.</h2>
        </header>
        <div class="innovation-grid">
          <article v-for="innovation in innovationHighlights" :key="innovation.title" class="innovation-card" v-reveal>
            <span class="innovation-tag">{{ innovation.tag }}</span>
            <h3>{{ innovation.title }}</h3>
            <p>{{ innovation.detail }}</p>
            <strong>{{ innovation.metric }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Voices</p>
          <h2 class="section-title">Stories from neighbors leading the change</h2>
        </header>
        <TestimonialsCarousel :items="testimonials" />
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Field updates</p>
          <h2 class="section-title">Live coordination notes from the ground.</h2>
        </header>
        <div class="field-updates">
          <article v-for="update in fieldUpdates" :key="update.title" class="update-card" v-reveal>
            <p class="section-eyebrow" style="text-align:left">{{ update.location }}</p>
            <h3>{{ update.title }}</h3>
            <p>{{ update.summary }}</p>
            <strong>{{ update.metric }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel section--panel--plain">
      <div class="container partner-marquee" v-reveal>
        <p class="section-eyebrow" style="text-align:center">Allies & Coverage</p>
        <div class="partner-track">
          <span v-for="partner in partnerMarquee" :key="partner" class="partner-pill">{{ partner }}</span>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Path ahead</p>
          <h2 class="section-title">Milestones charting our next decade.</h2>
        </header>
        <div class="timeline">
          <article v-for="milestone in timelineMilestones" :key="milestone.year" class="timeline__item" v-reveal>
            <span class="timeline__year">{{ milestone.year }}</span>
            <h3>{{ milestone.headline }}</h3>
            <p>{{ milestone.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel section--panel--plain">
      <div class="container">
        <CallToAction />
      </div>
    </section>
  </div>
</template>
