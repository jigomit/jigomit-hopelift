<script setup>
import PageHero from '../components/PageHero.vue'
import { useSEO, generateBreadcrumbSchema } from '../composables/useSEO'

// SEO Configuration with Long-Tail Keywords
useSEO({
  title: 'About',
  description: 'Learn about HopeLift Foundation: nonprofit poverty alleviation organization serving families through food distribution, housing assistance, and financial support programs. Fighting hunger, homelessness, and economic crisis in local communities. Transparent, compassionate, effective.',
  keywords: [
    'about poverty alleviation nonprofit',
    'nonprofit helping families in poverty',
    'food distribution nonprofit organization',
    'housing assistance nonprofit',
    'financial support nonprofit',
    'transparent nonprofit poverty relief',
    'local poverty relief organization',
    'family support nonprofit mission',
    'nonprofit fighting hunger and homelessness',
    'community poverty alleviation organization',
    'emergency assistance nonprofit',
    'nonprofit helping struggling families'
  ],
  url: '/about',
  type: 'website',
  schema: generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ])
})

const aboutHero =
  'https://images.pexels.com/photos/6647126/pexels-photo-6647126.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'

const pillars = [
  {
    title: 'Community Governance',
    copy: 'Every grant is stewarded by advisory councils of women, elders, and youth to ensure local accountability.',
  },
  {
    title: 'Data Transparency',
    copy: 'Live dashboards track meals served, students supported, and income growth so donors know their impact.',
  },
  {
    title: 'Holistic Care',
    copy: 'Nutrition, health, livelihood, and education services layer together to address systemic poverty.',
  },
]

const values = [
  { label: 'Dignity', detail: 'We design with—not for—communities and honor lived expertise.' },
  { label: 'Trust', detail: 'Open books, traceable receipts, and onsite visits are always welcome.' },
  { label: 'Ingenuity', detail: 'We blend ancestral knowledge with modern tools and 3D simulations.' },
]

const teamMembers = [
  { name: 'Zahara Mwangi', title: 'Executive Director', focus: 'Former community health worker scaling women-led responses.' },
  { name: 'Mateo Rivas', title: 'Chief Data & Partnerships', focus: 'Builds open dashboards and multi-year philanthropic coalitions.' },
  { name: 'Nadia Rahman', title: 'Programs & Innovation', focus: 'Designs climate-ready livelihood pilots with local cooperatives.' },
]

const alliances = [
  {
    name: 'Community Impact Observatory',
    detail: 'Shared data protocols with six universities to verify impact in real time.',
  },
  {
    name: 'Equity Finance Collective',
    detail: 'Mission-aligned funders offering flexible capital to grassroots entrepreneurs.',
  },
  {
    name: 'Resilience Cities Forum',
    detail: 'City governments exchanging playbooks on food distribution and safe housing.',
  },
]
</script>

<template>
  <div class="page-shell">
    <PageHero
      title="People-centered poverty alleviation"
      subtitle="We are a global coalition of community organizers, technologists, and health workers responding to urgent needs while tackling the systemic causes of poverty."
      :image="aboutHero"
    />

    <section class="section section--panel">
      <div class="container info-grid info-grid--accent">
        <article class="info-card" v-reveal>
          <p class="section-eyebrow">Our mission</p>
          <h2 class="section-title" style="text-align:left">Every person deserves safety, nourishment, and opportunity.</h2>
          <p>
            We accelerate frontline leaders with funding, tools, and storytelling support. From pop-up health clinics to
            large-scale job programs, we back initiatives that deliver dignity today and prosperity tomorrow.
          </p>
        </article>
        <article class="info-card" v-reveal>
          <p class="section-eyebrow">Where we work</p>
          <p>
            87 communities across East & West Africa, Latin America, and Southeast Asia. Our distributed field teams keep
            operations lean and culturally fluent while our remote data team ensures transparency.
          </p>
          <ul style="padding-left:1rem; color:var(--color-muted)">
            <li>Food systems innovation in Kenya, Uganda, and Ghana</li>
            <li>Economic mobility programs in Peru and Guatemala</li>
            <li>Climate adaptation partnerships in Cambodia and Timor-Leste</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Our pillars</p>
          <h2 class="section-title">Principles that guide every investment</h2>
        </header>
        <div class="feature-grid">
          <article v-for="pillar in pillars" :key="pillar.title" class="feature-card" v-reveal>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container info-panel info-panel--accent" v-reveal>
        <div class="info-panel__copy">
          <p class="section-eyebrow">Our approach</p>
          <h2 class="section-title" style="text-align:left">Human stories + rigorous data</h2>
          <p>We pair qualitative storytelling with quantitative metrics. Every field team uses a mobile data kit to report assistance delivered, feedback gathered, and issues flagged.</p>
        </div>
        <div class="info-panel__stats">
          <div v-for="value in values" :key="value.label" class="info-chip">
            <strong>{{ value.label }}</strong>
            <p style="margin:0.3rem 0 0">{{ value.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Leadership</p>
          <h2 class="section-title">Experienced organizers guiding the coalition.</h2>
        </header>
        <div class="team-grid">
          <article v-for="member in teamMembers" :key="member.name" class="team-card" v-reveal>
            <h3>{{ member.name }}</h3>
            <p style="color:var(--color-muted); font-weight:600">{{ member.title }}</p>
            <p>{{ member.focus }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Alliances</p>
          <h2 class="section-title">We share playbooks, data, and accountability with peers.</h2>
        </header>
        <div class="alliance-grid">
          <article v-for="ally in alliances" :key="ally.name" class="alliance-card" v-reveal>
            <h3>{{ ally.name }}</h3>
            <p>{{ ally.detail }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
