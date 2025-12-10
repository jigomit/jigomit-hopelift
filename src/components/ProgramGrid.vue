<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  programs: {
    type: Array,
    required: true,
  },
  dense: Boolean,
})
</script>

<template>
  <div class="program-grid">
    <RouterLink
      v-for="program in props.programs"
      :key="program.title"
      :to="`/programs/${program.slug}`"
      class="program-card"
      v-reveal
    >
      <article>
        <img :src="program.image" :alt="program.title" loading="lazy" />
        <div class="program-body">
          <div class="program-tags">
            <span v-for="tag in program.focus" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <h3>{{ program.title }}</h3>
          <p>{{ program.description }}</p>
          <small style="font-weight:600; color:var(--color-primary-dark)">{{ program.metric }}</small>
        </div>
      </article>
    </RouterLink>
  </div>
</template>
