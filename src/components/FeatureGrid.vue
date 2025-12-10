<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const iconMap = {
  kitchen:
    'M4 14h16M4 14V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6M4 14l2.5 6h11L20 14M9 4v4m6-4v4',
  hands:
    'M4 15s2-2 4-2 3 2 4 2 2-2 4-2 4 2 4 2M7 11V9a5 5 0 0 1 10 0v2',
  education:
    'M3 8 12 4l9 4-9 4-9-4Zm0 0v6l9 4 9-4V8',
  health:
    'M12 21C10 18 6 15.5 6 11a6 6 0 0 1 12 0c0 4.5-4 7-6 10Zm0-9 2-2m-2 2-2-2',
}
</script>

<template>
  <div class="feature-grid">
    <article v-for="item in props.items" :key="item.title" class="feature-card" v-reveal>
      <div class="feature-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
          <path :d="iconMap[item.icon]" />
        </svg>
      </div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </article>
  </div>
</template>
