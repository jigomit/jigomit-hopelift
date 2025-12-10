<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  image: String,
  badge: {
    type: String,
    default: 'Poverty Alleviation',
  },
  imageWidth: {
    type: [Number, String],
    default: 800,
  },
  imageHeight: {
    type: [Number, String],
    default: 600,
  },
})
</script>

<template>
  <section class="page-hero" v-reveal>
    <div class="container page-hero__grid">
      <div class="page-hero__content">
        <p class="section-eyebrow">{{ props.badge }}</p>
        <h1 class="page-hero__title">{{ props.title }}</h1>
        <p class="page-hero__subtitle">{{ props.subtitle }}</p>
      </div>
      <div v-if="props.image" class="page-hero__image img-skeleton" aria-hidden="true">
        <img
          :src="props.image"
          :alt="props.title"
          :width="props.imageWidth"
          :height="props.imageHeight"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>
