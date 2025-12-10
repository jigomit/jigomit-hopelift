<script setup>
import { ref, computed } from 'vue'
import PageHero from '../components/PageHero.vue'
import BlogCard from '../components/BlogCard.vue'
import { blogPosts, blogCategories } from '../data/blog'
import { useSEO, generateBreadcrumbSchema } from '../composables/useSEO'

// SEO Configuration with Long-Tail Keywords
useSEO({
  title: 'Blog',
  description: 'HopeLift Foundation blog: field stories, impact updates, community voices from poverty alleviation programs in Kenya, Peru, Ghana, Ethiopia, Mali. Food security success stories, women entrepreneurship, youth employment, climate-smart agriculture.',
  keywords: [
    'poverty alleviation blog',
    'nonprofit impact stories',
    'community transformation stories',
    'food security success stories Africa',
    'women entrepreneurs poverty reduction',
    'youth employment program stories',
    'climate-smart agriculture blog',
    'nonprofit field updates',
    'poverty relief case studies',
    'grassroots development stories'
  ],
  url: '/blog',
  type: 'website',
  schema: generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ])
})

const blogHero = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'

const selectedCategory = ref('All Posts')
const searchQuery = ref('')

const filteredPosts = computed(() => {
  let posts = blogPosts

  // Filter by category
  if (selectedCategory.value !== 'All Posts') {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return posts
})

const featuredPost = computed(() => {
  return blogPosts.find(post => post.featured) || blogPosts[0]
})

const setCategory = (category) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="page-shell">
    <PageHero
      title="Stories From the Field"
      subtitle="Real impact updates, community voices, and insights from our global poverty alleviation work."
      :image="blogHero"
      badge="Blog"
    />

    <section class="section section--panel">
      <div class="container">
        <!-- Search and Filter -->
        <div class="blog-controls" v-reveal>
          <div class="blog-search">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles, topics, or tags..."
              class="blog-search-input"
            />
          </div>
          <div class="blog-categories">
            <button
              v-for="category in blogCategories"
              :key="category"
              @click="setCategory(category)"
              :class="['category-btn', { active: selectedCategory === category }]"
              type="button"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Featured Post -->
        <div v-if="selectedCategory === 'All Posts' && !searchQuery" class="featured-post" v-reveal>
          <RouterLink :to="`/blog/${featuredPost.slug}`" class="featured-post-link">
            <div class="featured-post-image">
              <img :src="featuredPost.image" :alt="featuredPost.title" />
              <span class="featured-badge">Featured Story</span>
            </div>
            <div class="featured-post-content">
              <span class="featured-category">{{ featuredPost.category }}</span>
              <h2 class="featured-title">{{ featuredPost.title }}</h2>
              <p class="featured-excerpt">{{ featuredPost.excerpt }}</p>
              <div class="featured-meta">
                <span class="featured-author">By {{ featuredPost.author }}</span>
                <span class="blog-meta-dot">•</span>
                <span>{{ featuredPost.readTime }} min read</span>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Blog Grid -->
        <div class="blog-grid">
          <BlogCard
            v-for="post in filteredPosts"
            :key="post.slug"
            :post="post"
          />
        </div>

        <!-- No Results -->
        <div v-if="filteredPosts.length === 0" class="no-results" v-reveal>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No articles found</h3>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
          <button @click="searchQuery = ''; selectedCategory = 'All Posts'" class="btn btn-primary">
            Clear filters
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="section section--panel section--panel--plain">
      <div class="container blog-cta" v-reveal>
        <div class="blog-cta-content">
          <h2>Never Miss an Update</h2>
          <p>Get monthly impact stories, field updates, and transparent reporting delivered to your inbox.</p>
          <form class="blog-newsletter-form" @submit.prevent>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
