<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import PageHero from '../components/PageHero.vue'
import { useSEO, generateBreadcrumbSchema } from '../composables/useSEO'

// SEO Configuration with Long-Tail Keywords
useSEO({
  title: 'Donate',
  description: 'Make a tax-deductible donation to help families facing hunger, homelessness, and poverty. Support food distribution, housing assistance, and financial aid programs. One-time or monthly giving. Transparent nonprofit helping local families in crisis.',
  keywords: [
    'donate to help families in poverty',
    'tax-deductible poverty donation',
    'donate to food pantry programs',
    'support homeless families donation',
    'donate emergency housing assistance',
    'monthly recurring donation poverty relief',
    'donate to help hungry families',
    'financial assistance donation',
    'transparent nonprofit donations',
    'where to donate to fight poverty',
    'help families in crisis donation',
    'donate to eviction prevention',
    'emergency food assistance donation',
    'nonprofit family support programs donation'
  ],
  url: '/donate',
  type: 'website',
  schema: generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Donate', url: '/donate' }
  ])
})

const donateHero =
  'https://images.pexels.com/photos/9532273/pexels-photo-9532273.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'

const donationOptions = [
  {
    title: '$35 nourishes a family',
    detail: 'Provide emergency groceries and hot meals for a household for one week.',
  },
  {
    title: '$85 funds job training',
    detail: 'Covers a full month of Future-Proof Youth technical training and mentorship.',
  },
  {
    title: '$250 powers a clinic day',
    detail: 'Keeps a mobile clinic staffed with nurses, medicine, and fuel for an entire day.',
  },
]

const quickAmounts = [
  { amount: 35, label: 'Nourish a family' },
  { amount: 85, label: 'Fund job training' },
  { amount: 250, label: 'Power a clinic day' },
  { amount: 500, label: 'Establish seed bank' },
]

const frequencyOptions = [
  { value: 'one-time', label: 'One-time gift', hint: 'Make an immediate impact', icon: '⚡' },
  { value: 'monthly', label: 'Monthly recurring', hint: 'Sustained support, greatest impact', icon: '🔄' },
  { value: 'quarterly', label: 'Quarterly giving', hint: 'Four gifts per year', icon: '📅' },
  { value: 'annual', label: 'Annual gift', hint: 'Once per year contribution', icon: '🎁' },
]

const programOptions = [
  { value: 'general', label: 'Where needed most', hint: 'Maximum flexibility and impact', icon: '🌍' },
  { value: 'food', label: 'Food Security', hint: 'Harvest baskets & nutrition programs', icon: '🌾' },
  { value: 'women', label: "Women's Empowerment", hint: 'Microloans & cooperative support', icon: '👩' },
  { value: 'youth', label: 'Youth Education & Jobs', hint: 'Tech training & job placement', icon: '💻' },
  { value: 'health', label: 'Healthcare Access', hint: 'Mobile clinics & telehealth', icon: '🏥' },
  { value: 'climate', label: 'Climate Resilience', hint: 'Sustainable agriculture & adaptation', icon: '🌱' },
  { value: 'water', label: 'Clean Water', hint: 'Solar water systems', icon: '💧' },
]

const givingMethods = [
  {
    name: 'Community impact circles',
    detail: 'Gather friends or colleagues, pick a program, and fund quarterly milestones together.',
    perk: 'Live briefings + shared dashboard',
  },
  {
    name: 'Legacy giving',
    detail: 'Blend wills, DAFs, or appreciated assets to secure multi-year runway for frontline leaders.',
    perk: 'Personalized stewardship plan',
  },
  {
    name: 'Corporate solidarity funds',
    detail: 'Tie product launches or employee campaigns to targeted grants with transparent reporting.',
    perk: 'Co-branded progress reports',
  },
]

const transparencyReceipts = [
  { label: 'Impact receipt delivered', value: '< 5 minutes' },
  { label: 'Programs funded in 2024', value: '62' },
  { label: 'Average monthly recurring gift', value: '$78' },
  { label: 'Audit-ready statements shared', value: '4x per year' },
]

// Form state
const formData = ref({
  amount: '',
  customAmount: false,
  name: '',
  email: '',
})

const selectedFrequency = ref(null)
const selectedProgram = ref(null)
const isFrequencyOpen = ref(false)
const isProgramOpen = ref(false)
const frequencyRef = ref(null)
const programRef = ref(null)
const formErrors = ref({})
const showSuccess = ref(false)

const selectQuickAmount = (amount) => {
  formData.value.amount = amount
  formData.value.customAmount = false
}

const enableCustomAmount = () => {
  formData.value.customAmount = true
  formData.value.amount = ''
}

const toggleFrequency = () => {
  isFrequencyOpen.value = !isFrequencyOpen.value
  if (isFrequencyOpen.value) isProgramOpen.value = false
}

const toggleProgram = () => {
  isProgramOpen.value = !isProgramOpen.value
  if (isProgramOpen.value) isFrequencyOpen.value = false
}

const selectFrequency = (option) => {
  selectedFrequency.value = option
  isFrequencyOpen.value = false
}

const selectProgram = (option) => {
  selectedProgram.value = option
  isProgramOpen.value = false
}

const handleClickOutside = (event) => {
  if (frequencyRef.value && !frequencyRef.value.contains(event.target)) {
    isFrequencyOpen.value = false
  }
  if (programRef.value && !programRef.value.contains(event.target)) {
    isProgramOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Set defaults
  selectedFrequency.value = frequencyOptions[0]
  selectedProgram.value = programOptions[0]
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const impactPreview = computed(() => {
  const amount = parseFloat(formData.value.amount) || 0
  if (amount >= 500) return 'Establishes a community seed bank serving 100+ farmers'
  if (amount >= 250) return 'Funds a full day of mobile clinic operations'
  if (amount >= 85) return 'Provides one month of youth tech training'
  if (amount >= 35) return 'Nourishes a family for one week'
  if (amount >= 15) return 'Provides clean water for a family for one month'
  return 'Every dollar makes a difference'
})

const resetForm = () => {
  formData.value = {
    amount: '',
    customAmount: false,
    name: '',
    email: '',
  }
  selectedFrequency.value = frequencyOptions[0]
  selectedProgram.value = programOptions[0]
}

const handleSubmit = () => {
  const errors = {}

  if (!formData.value.amount || parseFloat(formData.value.amount) < 5) {
    errors.amount = 'Minimum donation is $5'
  }

  if (!formData.value.name.trim()) {
    errors.name = 'Please enter your full name'
  }

  if (!formData.value.email.trim()) {
    errors.email = 'Please enter your email address'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = 'Please enter a valid email address'
  }

  formErrors.value = errors

  if (Object.keys(errors).length) {
    showSuccess.value = false
    return
  }

  // Success!
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
    resetForm()
  }, 8000)
}
</script>

<template>
  <div class="page-shell">
    <PageHero
      title="Fuel the movement to end poverty"
      subtitle="Your generosity unleashes proven programs in food security, healthcare, and livelihoods."
      :image="donateHero"
      badge="Donate"
    />

    <section class="section section--panel">
      <div class="container donate-options">
        <article v-for="option in donationOptions" :key="option.title" class="donate-card" v-reveal>
          <h3>{{ option.title }}</h3>
          <p>{{ option.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container info-grid">
        <form class="contact-form modern-form donate-form-modern" v-reveal @submit.prevent="handleSubmit" novalidate>
          <div class="form-intro">
            <p class="form-eyebrow">Make a secure gift</p>
            <h3>Your generosity creates lasting change</h3>
            <p class="form-description">
              Choose an amount, select your giving frequency, and designate where your gift will make the biggest impact. Every contribution is 100% tax-deductible.
            </p>
          </div>

          <!-- Quick Amount Selection -->
          <div class="quick-amounts-section">
            <p class="field-label">Select an amount or enter custom</p>
            <div class="quick-amounts">
              <button
                v-for="quick in quickAmounts"
                :key="quick.amount"
                type="button"
                @click="selectQuickAmount(quick.amount)"
                :class="['quick-amount-btn', { active: formData.amount === quick.amount && !formData.customAmount }]"
              >
                <span class="quick-amount-value">${{ quick.amount }}</span>
                <span class="quick-amount-label">{{ quick.label }}</span>
              </button>
              <button
                type="button"
                @click="enableCustomAmount"
                :class="['quick-amount-btn', { active: formData.customAmount }]"
              >
                <span class="quick-amount-value">Custom</span>
                <span class="quick-amount-label">Your amount</span>
              </button>
            </div>
          </div>

          <!-- Custom Amount Input -->
          <div class="form-group" :class="{ 'has-error': formErrors.amount }">
            <div class="input-wrapper">
              <span class="field-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </span>
              <div class="input-field">
                <input
                  type="number"
                  v-model="formData.amount"
                  id="amount"
                  class="modern-input"
                  placeholder=" "
                  min="5"
                  step="5"
                  aria-required="true"
                  :aria-invalid="!!formErrors.amount"
                  :aria-describedby="formErrors.amount ? 'amount-error' : null"
                />
                <label for="amount" class="floating-label">Donation amount ($)</label>
              </div>
            </div>
            <p v-if="formErrors.amount" class="input-error" id="amount-error">{{ formErrors.amount }}</p>
          </div>

          <!-- Frequency Dropdown -->
          <div class="form-group" :class="{ 'has-error': formErrors.frequency }">
            <p class="field-label">Giving frequency</p>
            <div
              class="custom-dropdown"
              ref="frequencyRef"
              role="combobox"
              aria-haspopup="listbox"
              :aria-expanded="isFrequencyOpen"
              :aria-controls="'frequency-menu'"
            >
              <div class="dropdown-header" @click="toggleFrequency" :class="{ 'is-open': isFrequencyOpen }">
                <span class="dropdown-icon">{{ selectedFrequency?.icon }}</span>
                <div class="dropdown-copy">
                  <span class="dropdown-label has-value">{{ selectedFrequency?.label }}</span>
                  <small class="dropdown-hint">{{ selectedFrequency?.hint }}</small>
                </div>
                <svg class="dropdown-arrow" :class="{ 'is-open': isFrequencyOpen }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <transition name="dropdown">
                <div v-if="isFrequencyOpen" class="dropdown-menu" id="frequency-menu" role="listbox">
                  <div
                    v-for="option in frequencyOptions"
                    :key="option.value"
                    class="dropdown-option"
                    :class="{ 'is-selected': selectedFrequency?.value === option.value }"
                    role="option"
                    :aria-selected="selectedFrequency?.value === option.value"
                    @click="selectFrequency(option)"
                  >
                    <span class="option-icon">{{ option.icon }}</span>
                    <div class="option-copy">
                      <span class="option-label">{{ option.label }}</span>
                      <small class="option-hint">{{ option.hint }}</small>
                    </div>
                    <svg v-if="selectedFrequency?.value === option.value" class="option-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Program Dropdown -->
          <div class="form-group">
            <p class="field-label">Designate your gift (optional)</p>
            <p class="field-hint">Choose a specific program or let us allocate where needs are greatest.</p>
            <div
              class="custom-dropdown"
              ref="programRef"
              role="combobox"
              aria-haspopup="listbox"
              :aria-expanded="isProgramOpen"
              :aria-controls="'program-menu'"
            >
              <div class="dropdown-header" @click="toggleProgram" :class="{ 'is-open': isProgramOpen }">
                <span class="dropdown-icon">{{ selectedProgram?.icon }}</span>
                <div class="dropdown-copy">
                  <span class="dropdown-label has-value">{{ selectedProgram?.label }}</span>
                  <small class="dropdown-hint">{{ selectedProgram?.hint }}</small>
                </div>
                <svg class="dropdown-arrow" :class="{ 'is-open': isProgramOpen }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <transition name="dropdown">
                <div v-if="isProgramOpen" class="dropdown-menu" id="program-menu" role="listbox">
                  <div
                    v-for="option in programOptions"
                    :key="option.value"
                    class="dropdown-option"
                    :class="{ 'is-selected': selectedProgram?.value === option.value }"
                    role="option"
                    :aria-selected="selectedProgram?.value === option.value"
                    @click="selectProgram(option)"
                  >
                    <span class="option-icon">{{ option.icon }}</span>
                    <div class="option-copy">
                      <span class="option-label">{{ option.label }}</span>
                      <small class="option-hint">{{ option.hint }}</small>
                    </div>
                    <svg v-if="selectedProgram?.value === option.value" class="option-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Name and Email Fields -->
          <div class="field-grid">
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

          <div class="submit-row">
            <p class="helper-text">Your donation is 100% tax-deductible. You'll receive an instant receipt and impact report.</p>
            <button class="btn btn-primary btn-submit" type="submit">
              <span>Complete donation</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <p v-if="showSuccess" class="form-success" role="status">
            Thank you for your generous gift! Check your email for your receipt and impact report. Together, we're creating lasting change.
          </p>
        </form>

        <div class="info-panel-modern donate-sidebar" v-reveal>
          <!-- Impact Preview -->
          <div class="sidebar-impact-preview">
            <div class="impact-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h4>Your Impact</h4>
            <p class="impact-description">{{ impactPreview }}</p>
            <div v-if="formData.amount" class="impact-multiplier">
              <span v-if="selectedFrequency?.value === 'monthly'" class="multiplier-badge">
                ${{ formData.amount * 12 }}/year impact
              </span>
              <span v-else-if="selectedFrequency?.value === 'quarterly'" class="multiplier-badge">
                ${{ formData.amount * 4 }}/year impact
              </span>
            </div>
          </div>

          <!-- Transparency Box -->
          <div class="sidebar-transparency">
            <p class="sidebar-label">Transparency</p>
            <h4>93¢ per dollar goes directly into programs</h4>
            <p>No surprises. Receive a digital impact profile, donation receipt, and quarterly updates tailored to your interests.</p>
          </div>

          <!-- Trust Badges -->
          <div class="sidebar-trust">
            <div class="trust-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Secure & encrypted</span>
            </div>
            <div class="trust-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Tax-deductible</span>
            </div>
          </div>

          <!-- Contact -->
          <div class="sidebar-contact">
            <p class="sidebar-label">Need help?</p>
            <p>Email <a href="mailto:give@povertyalleviation.org">give@povertyalleviation.org</a> for support with stocks, DAFs, or legacy gifts.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Ways to partner</p>
          <h2 class="section-title">Design a giving plan that matches your ambitions.</h2>
        </header>
        <div class="service-grid">
          <article v-for="method in givingMethods" :key="method.name" class="service-card" v-reveal>
            <h3>{{ method.name }}</h3>
            <p>{{ method.detail }}</p>
            <strong>{{ method.perk }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container metrics-grid" v-reveal>
        <article v-for="receipt in transparencyReceipts" :key="receipt.label" class="metric-card">
          <p class="metric-value">{{ receipt.value }}</p>
          <p class="metric-label">{{ receipt.label }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
