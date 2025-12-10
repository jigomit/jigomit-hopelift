<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const active = ref(0)
let timer

const next = () => {
  active.value = (active.value + 1) % props.items.length
}

const prev = () => {
  active.value = (active.value - 1 + props.items.length) % props.items.length
}

onMounted(() => {
  timer = setInterval(next, 6000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

watch(active, () => {
  clearInterval(timer)
  timer = setInterval(next, 6000)
})
</script>

<template>
  <section class="testimonial-shell" v-reveal>
    <button
      type="button"
      class="testimonial-arrow testimonial-arrow--left"
      aria-label="Previous testimonial"
      @click="prev"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button
      type="button"
      class="testimonial-arrow testimonial-arrow--right"
      aria-label="Next testimonial"
      @click="next"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
    <svg class="testimonial-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" stroke-width="1.5" stroke-linecap="round">
      <path d="M9 11h-3l3-5V5H4v2h3l-3 5v2h5v-3Zm9 0h-3l3-5V5h-5v2h3l-3 5v2h5v-3Z" />
    </svg>
    <p class="testimonial-quote">"{{ props.items[active].quote }}"</p>
    <div class="testimonial-meta">
      <img :src="props.items[active].image" :alt="props.items[active].name" class="meta-avatar" loading="lazy" />
      <div class="testimonial-meta-text">
        <strong>{{ props.items[active].name }}</strong>
        <small class="testimonial-meta-title">{{ props.items[active].title }}</small>
      </div>
    </div>
    <div class="testimonial-dots">
      <button
        v-for="(item, index) in props.items"
        :key="item.name"
        type="button"
        class="testimonial-dot"
        :class="{ 'testimonial-dot--active': active === index }"
        :aria-label="`Show testimonial from ${item.name}`"
        @click="active = index"
      ></button>
    </div>
  </section>
</template>
