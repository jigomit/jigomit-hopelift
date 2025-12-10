<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PageHero from '../components/PageHero.vue'
import contactPanelImage from '../assets/illustrations/contact-panel.svg'
import { useSEO, generateBreadcrumbSchema } from '../composables/useSEO'

// SEO Configuration with Long-Tail Keywords
useSEO({
  title: 'Contact',
  description: 'Contact HopeLift Foundation for emergency assistance, volunteer opportunities, program information, or donations. Get help with food, housing, or financial support. Apply for assistance or learn how to help families in need.',
  keywords: [
    'contact poverty alleviation nonprofit',
    'apply for emergency food assistance',
    'contact housing assistance program',
    'get help with rent and utilities',
    'volunteer at food pantry',
    'nonprofit emergency assistance contact',
    'apply for financial help',
    'contact family support program',
    'emergency food help contact',
    'eviction prevention help contact',
    'donate to poverty relief contact',
    'volunteer poverty alleviation programs'
  ],
  url: '/contact',
  type: 'website',
  schema: generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ])
})

const contactHero =
  'https://images.pexels.com/photos/6647005/pexels-photo-6647005.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'

const contactInfo = [
  { label: 'Field Partnerships', value: 'partners@povertyalleviation.org' },
  { label: 'Press & Speaking', value: 'press@povertyalleviation.org' },
  { label: 'Volunteer', value: 'volunteer@povertyalleviation.org' },
]

const regionalOffices = [
  {
    city: 'Nairobi',
    detail: 'Logistics + regional kitchen pilots. 102 Riverside Lane, Nairobi, Kenya.',
    phone: '+254 712 555 010',
  },
  {
    city: 'Lima',
    detail: 'Economic mobility programs + donor immersions. 88 Avenida El Sol, Cusco, Peru.',
    phone: '+51 84 605 902',
  },
  {
    city: 'Manila',
    detail: 'Climate readiness + emergency cache. 230 Aurora Blvd, Manila, Philippines.',
    phone: '+63 2 5310 2218',
  },
]

const faqs = [
  { question: 'Do you host site visits?', answer: 'Yes. We arrange hybrid visits—VR walk-throughs paired with in-person delegations twice per year.' },
  { question: 'How fast can you respond to crises?', answer: 'Our rapid response pods mobilize within 24 hours using pre-positioned supplies and unrestricted reserves.' },
  { question: 'Can we co-design custom reports?', answer: 'Absolutely. Data, storytelling, and finance teams collaborate on bespoke dashboards and ESG disclosures.' },
]

// Custom dropdown state
const dropdownOptions = [
  { value: 'partnership', label: 'Program partnership', hint: 'Co-design a field pilot or regional coalition', icon: '🤝' },
  { value: 'media', label: 'Media inquiry', hint: 'Press, podcasts, or editorial data pulls', icon: '📰' },
  { value: 'volunteer', label: 'Volunteer', hint: 'Hands-on deployments or remote sprints', icon: '🙌' },
  { value: 'donor', label: 'Major giving', hint: 'Briefings for families and foundations', icon: '💎' },
  { value: 'other', label: 'Other', hint: 'Anything else we should know', icon: '💬' },
]

const interestTags = [
  'Research briefing',
  'Immersion visit',
  'Product donation',
  'Local hiring',
  'Recurring giving',
]

const isDropdownOpen = ref(false)
const selectedOption = ref(null)
const dropdownRef = ref(null)
const selectedInterests = ref([])
const formErrors = ref({})
const showSuccess = ref(false)
const regionalOfficesRef = ref(null)

// Form state for floating labels
const formData = ref({
  name: '',
  email: '',
  message: '',
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectOption = (option) => {
  selectedOption.value = option
  isDropdownOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleInterest = (tag) => {
  if (selectedInterests.value.includes(tag)) {
    selectedInterests.value = selectedInterests.value.filter((item) => item !== tag)
  } else {
    selectedInterests.value = [...selectedInterests.value, tag]
  }
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    message: '',
  }
  selectedOption.value = null
  selectedInterests.value = []
}

const handleSubmit = () => {
  const errors = {}
  if (!formData.value.name.trim()) errors.name = 'Add your full name.'
  if (!formData.value.email.trim()) {
    errors.email = 'Add a contact email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = 'Enter a valid email.'
  }
  if (!selectedOption.value) errors.topic = 'Choose how we can help.'
  if (!formData.value.message.trim()) errors.message = 'Share a short note about your request.'

  formErrors.value = errors

  if (Object.keys(errors).length) {
    showSuccess.value = false
    return
  }

  showSuccess.value = true
  setTimeout(() => (showSuccess.value = false), 6000)

  resetForm()
}

const scrollToOffices = () => {
  if (regionalOfficesRef.value) {
    regionalOfficesRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="page-shell">
    <PageHero
      title="Let’s team up on bold poverty solutions"
      subtitle="Reach out for partnerships, volunteer roles, or customized impact briefings."
      :image="contactHero"
      badge="Contact"
    />

    <section class="section section--panel">
      <div class="container info-grid">
        <form class="contact-form modern-form" v-reveal @submit.prevent="handleSubmit" novalidate>
          <div class="form-intro">
            <p class="form-eyebrow">Priority lane</p>
            <h3>Share a few details and we’ll route you to the right partner lead.</h3>
            <p class="form-description">
              Requests enter a triage queue reviewed twice daily by our Nairobi, Lima, and Manila teams.
              Tell us how we can help so we can respond with the right context and attachments.
            </p>
            <div class="form-status">
              <div class="status-card">
                <span class="status-icon">⚡️</span>
                <div>
                  <p>Avg response</p>
                  <strong>48 hrs</strong>
                </div>
              </div>
              <div class="status-card">
                <span class="status-icon">📞</span>
                <div>
                  <p>Live follow-ups</p>
                  <strong>Tue & Thu</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="field-grid single">
            <div class="form-group" :class="{ 'has-error': formErrors.name }">
              <div class="input-wrapper">
                <span class="field-icon-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <div class="input-field">
                  <input
                    type="text"
                    v-model="formData.name"
                    id="name"
                    class="modern-input"
                    placeholder=" "
                    aria-required="true"
                    :aria-invalid="!!formErrors.name"
                    :aria-describedby="formErrors.name ? 'name-error' : null"
                  />
                  <label for="name" class="floating-label">Full name</label>
                </div>
              </div>
              <p v-if="formErrors.name" class="input-error" id="name-error">{{ formErrors.name }}</p>
            </div>

            <div class="form-group" :class="{ 'has-error': formErrors.email }">
              <div class="input-wrapper">
                <span class="field-icon-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <div class="input-field">
                  <input
                    type="email"
                    v-model="formData.email"
                    id="email"
                    class="modern-input"
                    placeholder=" "
                    aria-required="true"
                    :aria-invalid="!!formErrors.email"
                    :aria-describedby="formErrors.email ? 'email-error' : null"
                  />
                  <label for="email" class="floating-label">Email address</label>
                </div>
              </div>
              <p v-if="formErrors.email" class="input-error" id="email-error">{{ formErrors.email }}</p>
            </div>
          </div>

          <!-- Custom Dropdown -->
          <div class="form-group" :class="{ 'has-error': formErrors.topic }">
            <p class="field-label">How can we help?</p>
            <div
              class="custom-dropdown"
              ref="dropdownRef"
              role="combobox"
              aria-haspopup="listbox"
              :aria-expanded="isDropdownOpen"
              :aria-controls="'topic-menu'"
            >
              <div class="dropdown-header" @click="toggleDropdown" :class="{ 'is-open': isDropdownOpen }">
                <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <div class="dropdown-copy">
                  <span class="dropdown-label" :class="{ 'has-value': selectedOption }">
                    {{ selectedOption ? selectedOption.label : 'Select a topic' }}
                  </span>
                  <small v-if="selectedOption" class="dropdown-hint">{{ selectedOption.hint }}</small>
                </div>
                <svg class="dropdown-arrow" :class="{ 'is-open': isDropdownOpen }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <transition name="dropdown">
                <div v-if="isDropdownOpen" class="dropdown-menu" id="topic-menu" role="listbox">
                  <div
                    v-for="option in dropdownOptions"
                    :key="option.value"
                    class="dropdown-option"
                    :class="{ 'is-selected': selectedOption?.value === option.value }"
                    role="option"
                    :aria-selected="selectedOption?.value === option.value"
                    @click="selectOption(option)"
                  >
                    <span class="option-icon">{{ option.icon }}</span>
                    <div class="option-copy">
                      <span class="option-label">{{ option.label }}</span>
                      <small class="option-hint">{{ option.hint }}</small>
                    </div>
                    <svg v-if="selectedOption?.value === option.value" class="option-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </transition>
            </div>
            <p v-if="formErrors.topic" class="input-error input-error--flush">{{ formErrors.topic }}</p>
          </div>

          <div class="interest-group">
            <p class="field-label">Need anything specific?</p>
            <p class="field-hint">Optional quick selectors help us loop in the right teammate.</p>
            <div class="interest-chip-group">
              <button
                v-for="tag in interestTags"
                :key="tag"
                type="button"
                class="interest-chip"
                :class="{ 'is-selected': selectedInterests.includes(tag) }"
                @click="toggleInterest(tag)"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- Message Field with Floating Label -->
          <div class="form-group" :class="{ 'has-error': formErrors.message }">
            <label for="message" class="field-label">Share goals, context, and timing</label>
            <div class="input-wrapper input-wrapper--textarea">
              <span class="field-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              <div class="input-field">
                <textarea
                  v-model="formData.message"
                  id="message"
                  class="modern-input modern-textarea"
                  placeholder="Share goals, context, and timing"
                  rows="5"
                  aria-required="true"
                  :aria-invalid="!!formErrors.message"
                  :aria-describedby="formErrors.message ? 'message-error' : null"
                ></textarea>
              </div>
            </div>
            <p v-if="formErrors.message" class="input-error" id="message-error">{{ formErrors.message }}</p>
          </div>

          <div class="submit-row">
            <p class="helper-text">By submitting, you agree to our rapid-response outreach within two business days.</p>
            <button class="btn btn-primary btn-submit" type="submit">
              <span>Send message</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>

          <p v-if="showSuccess" class="form-success" role="status">
            Thank you! Your note is with our partnerships desk—expect a reply within 48 hours.
          </p>
        </form>
        <div class="info-panel-modern" v-reveal>
          <div class="response-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>2-day response time</span>
          </div>

          <p class="section-eyebrow">Stay connected</p>
          <h2 class="info-panel-title">We respond within 2 business days.</h2>
          <p class="info-panel-description">We believe in radical transparency and quick support. Choose a contact lane and our global team will reply with the info you need.</p>

          <div class="contact-cards-grid">
            <a
              v-for="item in contactInfo"
              :key="item.label"
              :href="`mailto:${item.value}`"
              class="contact-card"
            >
              <div class="contact-card-icon">
                <span v-if="item.label === 'Field Partnerships'">🤝</span>
                <span v-else-if="item.label === 'Press & Speaking'">📰</span>
                <span v-else>🙌</span>
              </div>
              <div class="contact-card-content">
                <h4 class="contact-card-label">{{ item.label }}</h4>
                <span class="contact-card-email">{{ item.value }}</span>
              </div>
              <svg class="contact-card-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div class="info-panel-image">
            <img :src="contactPanelImage" alt="Community workshop" />
            <div class="image-overlay">
              <button
                class="overlay-badge"
                @click="scrollToOffices"
                type="button"
                aria-label="View our regional offices"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Global Team Ready</span>
                <svg class="badge-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--panel" ref="regionalOfficesRef">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Regional offices</p>
          <h2 class="section-title">Neighbors ready to meet you in person.</h2>
        </header>
        <div class="office-grid">
          <article v-for="office in regionalOffices" :key="office.city" class="office-card" v-reveal>
            <h3>{{ office.city }}</h3>
            <p>{{ office.detail }}</p>
            <strong>{{ office.phone }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">FAQs</p>
          <h2 class="section-title">Everything partners ask before we launch together.</h2>
        </header>
        <div class="faq-list">
          <article v-for="item in faqs" :key="item.question" class="faq-item" v-reveal>
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
