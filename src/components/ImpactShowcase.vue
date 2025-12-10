<script setup>
const props = defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
  story: {
    type: Object,
    default: () => null,
  },
})
</script>

<template>
  <div class="impact-panel" v-reveal>
    <article v-for="stat in props.stats" :key="stat.label" class="impact-stat">
      <p class="impact-stat-value">{{ stat.value }}</p>
      <p>{{ stat.label }}</p>
    </article>
  </div>
  <article v-if="props.story" class="impact-story" v-reveal>
    <h3 style="margin-top:0">{{ props.story.title }}</h3>
    <p>{{ props.story.summary }}</p>
  </article>
</template>
