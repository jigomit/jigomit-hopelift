<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { programs } from '../data/content'
import PageHero from '../components/PageHero.vue'

const route = useRoute()
const program = computed(() => {
  return programs.find(p => p.slug === route.params.slug)
})

// If program not found, redirect handled by template
</script>

<template>
  <div class="page-shell">
    <div v-if="!program">
      <PageHero
        badge="Error"
        title="Program Not Found"
        subtitle="The program you're looking for doesn't exist."
      />
      <div class="section">
        <div class="container" style="text-align: center; padding: 3rem">
          <RouterLink to="/programs" class="btn btn-primary">Back to Programs</RouterLink>
        </div>
      </div>
    </div>

    <div v-else>
      <PageHero
        :badge="program.focus.join(' · ')"
        :title="program.title"
        :subtitle="program.description"
      />

      <section class="section section--panel">
        <div class="container">
          <div class="program-detail-layout">
            <div class="program-detail-image">
              <img :src="program.image" :alt="program.title" />
              <div class="program-metric-badge">
                <strong>{{ program.metric }}</strong>
              </div>
            </div>

            <div class="program-detail-content">
              <h2>About This Program</h2>
              <p class="lead-text">{{ program.fullDescription }}</p>

              <div class="program-locations">
                <h3>Active Locations</h3>
                <div class="location-tags">
                  <span v-for="location in program.locations" :key="location" class="location-tag">
                    {{ location }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--tint">
        <div class="container">
          <h2 class="section-title" style="text-align: center; margin-bottom: 2.5rem">Program Impact</h2>
          <div class="impact-grid">
            <div v-for="(value, key) in program.impact" :key="key" class="impact-stat-card" v-reveal>
              <div class="impact-stat-value">{{ value }}</div>
              <div class="impact-stat-label">{{ key.replace(/([A-Z])/g, ' $1').trim() }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--panel">
        <div class="container">
          <h2 class="section-title" style="margin-bottom: 2rem">Program Objectives</h2>
          <div class="objectives-list">
            <div v-for="(objective, index) in program.objectives" :key="index" class="objective-item" v-reveal>
              <div class="objective-number">{{ index + 1 }}</div>
              <p>{{ objective }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--panel section--panel--plain">
        <div class="container">
          <div class="cta-panel" v-reveal>
            <p class="section-eyebrow" style="color: rgba(255,255,255,0.8)">Make an impact</p>
            <h2 style="color:white; margin-bottom: 0.75rem">Support {{ program.title }}</h2>
            <p style="color: rgba(255,255,255,0.85); margin-bottom: 1.5rem">
              Your donation directly funds this program and helps us reach more communities in need.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap">
              <RouterLink to="/donate" class="btn btn-primary">Donate Now</RouterLink>
              <RouterLink to="/programs" class="btn btn-outline">View All Programs</RouterLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.program-detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.program-detail-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  aspect-ratio: 4 / 3;
}

.program-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.program-metric-badge {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  background: rgba(4, 29, 22, 0.92);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-md);
  color: white;
  text-align: center;
}

.program-metric-badge strong {
  font-size: 1.1rem;
  color: var(--color-primary);
}

.program-detail-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-deep);
}

.lead-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(4, 29, 22, 0.85);
  margin-bottom: 2rem;
}

.program-locations {
  margin-top: 2rem;
}

.program-locations h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.location-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.location-tag {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(15, 191, 130, 0.1), rgba(13, 148, 136, 0.15));
  border-radius: 999px;
  color: var(--color-primary-dark);
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid rgba(15, 191, 130, 0.2);
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.impact-stat-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(217, 245, 236, 0.9));
  border-radius: var(--radius-md);
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(4, 29, 22, 0.08);
}

.impact-stat-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-family: 'Sora', sans-serif;
}

.impact-stat-label {
  font-size: 0.95rem;
  color: rgba(4, 29, 22, 0.7);
  text-transform: capitalize;
}

.objectives-list {
  display: grid;
  gap: 1.5rem;
}

.objective-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(236, 248, 244, 0.9));
  border-radius: var(--radius-md);
  box-shadow: 0 10px 30px rgba(4, 21, 17, 0.08);
  border: 1px solid rgba(4, 29, 22, 0.06);
}

.objective-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.objective-item p {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(4, 29, 22, 0.85);
  padding-top: 0.5rem;
}

@media (max-width: 960px) {
  .program-detail-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .program-detail-image img {
    min-height: 300px;
  }
}

@media (max-width: 640px) {
  .program-detail-content h2 {
    font-size: 1.5rem;
  }

  .impact-stat-value {
    font-size: 1.8rem;
  }

  .objective-item {
    flex-direction: column;
    gap: 1rem;
  }

  .objective-number {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
