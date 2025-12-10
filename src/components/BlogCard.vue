<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <RouterLink :to="`/blog/${post.slug}`" class="blog-card" v-reveal>
    <div class="blog-card-image">
      <img :src="post.image" :alt="post.title" />
      <span class="blog-card-category">{{ post.category }}</span>
    </div>
    <div class="blog-card-content">
      <div class="blog-card-meta">
        <span class="blog-meta-author">{{ post.author }}</span>
        <span class="blog-meta-dot">•</span>
        <span class="blog-meta-date">{{ formatDate(post.date) }}</span>
        <span class="blog-meta-dot">•</span>
        <span class="blog-meta-read">{{ post.readTime }} min read</span>
      </div>
      <h3 class="blog-card-title">{{ post.title }}</h3>
      <p class="blog-card-excerpt">{{ post.excerpt }}</p>
      <div class="blog-card-tags">
        <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="blog-tag">{{ tag }}</span>
      </div>
      <div class="blog-card-footer">
        <span class="blog-read-more">
          Read article
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </div>
  </RouterLink>
</template>
