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
      v-for="(program, index) in props.programs"
      :key="program.title"
      :to="`/programs/${program.slug}`"
      class="program-card"
      v-reveal
    >
      <article>
        <div class="program-card__image img-skeleton">
          <img
            :src="program.image"
            :alt="program.title"
            width="600"
            height="400"
            :loading="index < 3 ? 'eager' : 'lazy'"
            :fetchpriority="index < 3 ? 'high' : 'auto'"
            :decoding="index < 3 ? 'async' : 'async'"
          />
        </div>
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
