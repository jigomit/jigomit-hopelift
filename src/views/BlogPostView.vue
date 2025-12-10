<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { blogPosts } from '../data/blog'
import BlogCard from '../components/BlogCard.vue'
import { useSEO, generateArticleSchema, generateBreadcrumbSchema } from '../composables/useSEO'

const route = useRoute()

const post = computed(() => {
  return blogPosts.find(p => p.slug === route.params.slug)
})

// Dynamic SEO based on blog post
watchEffect(() => {
  if (post.value) {
    useSEO({
      title: post.value.title,
      description: post.value.excerpt,
      keywords: [
        ...post.value.tags,
        'poverty alleviation',
        'nonprofit impact story',
        'community development',
        post.value.category
      ],
      url: `/blog/${post.value.slug}`,
      type: 'article',
      image: post.value.image,
      schema: generateArticleSchema({
        title: post.value.title,
        description: post.value.excerpt,
        author: post.value.author,
        authorRole: post.value.authorRole,
        date: post.value.date,
        image: post.value.image,
        url: `/blog/${post.value.slug}`
      })
    })
  }
})

const relatedPosts = computed(() => {
  if (!post.value) return []

  return blogPosts
    .filter(p => p.slug !== post.value.slug)
    .filter(p =>
      p.category === post.value.category ||
      p.tags.some(tag => post.value.tags.includes(tag))
    )
    .slice(0, 3)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const shareOnTwitter = () => {
  const url = window.location.href
  const text = post.value?.title || ''
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

const shareOnFacebook = () => {
  const url = window.location.href
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = window.location.href
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}
</script>

<template>
  <div v-if="post" class="page-shell">
    <!-- Hero Image -->
    <section class="blog-post-hero">
      <img :src="post.image" :alt="post.title" class="blog-post-hero-image" />
      <div class="blog-post-hero-overlay">
        <div class="container">
          <RouterLink to="/blog" class="blog-breadcrumb">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Article Header -->
    <section class="section">
      <div class="container blog-post-container">
        <article class="blog-post-article">
          <header class="blog-post-header" v-reveal>
            <span class="blog-post-category">{{ post.category }}</span>
            <h1 class="blog-post-title">{{ post.title }}</h1>
            <div class="blog-post-meta">
              <div class="author-info">
                <div class="author-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <div class="author-name">{{ post.author }}</div>
                  <div class="author-role">{{ post.authorRole }}</div>
                </div>
              </div>
              <div class="post-details">
                <span>{{ formatDate(post.date) }}</span>
                <span class="blog-meta-dot">•</span>
                <span>{{ post.readTime }} min read</span>
              </div>
            </div>
            <div class="blog-post-tags">
              <span v-for="tag in post.tags" :key="tag" class="blog-tag-large">{{ tag }}</span>
            </div>
          </header>

          <!-- Article Content -->
          <div class="blog-post-content" v-reveal v-html="post.content"></div>

          <!-- Share Section -->
          <div class="blog-post-share" v-reveal>
            <h3>Share this article</h3>
            <div class="share-buttons">
              <button @click="shareOnTwitter" class="share-btn share-twitter" type="button" aria-label="Share on Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
                Twitter
              </button>
              <button @click="shareOnFacebook" class="share-btn share-facebook" type="button" aria-label="Share on Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
                Facebook
              </button>
              <button @click="shareOnLinkedIn" class="share-btn share-linkedin" type="button" aria-label="Share on LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>

          <!-- Author Bio -->
          <div class="blog-post-author-bio" v-reveal>
            <div class="author-bio-avatar">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="author-bio-content">
              <h4>{{ post.author }}</h4>
              <p class="author-bio-role">{{ post.authorRole }}</p>
              <p class="author-bio-text">
                {{ post.author }} leads our work in {{ post.tags[1] || 'the field' }}, bringing years of experience in community development and poverty alleviation.
              </p>
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="blog-post-sidebar">
          <!-- Sticky Share -->
          <div class="sidebar-share" v-reveal>
            <p class="sidebar-label">Share</p>
            <div class="sidebar-share-buttons">
              <button @click="shareOnTwitter" class="sidebar-share-btn" type="button" aria-label="Share on Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </button>
              <button @click="shareOnFacebook" class="sidebar-share-btn" type="button" aria-label="Share on Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </button>
              <button @click="shareOnLinkedIn" class="sidebar-share-btn" type="button" aria-label="Share on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
            </div>
          </div>

          <!-- CTA Box -->
          <div class="sidebar-cta" v-reveal>
            <h4>Support This Work</h4>
            <p>Your donation directly funds the programs featured in this story.</p>
            <RouterLink to="/donate" class="btn btn-primary btn-primary--full">Donate Now</RouterLink>
          </div>
        </aside>
      </div>
    </section>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="section section--panel">
      <div class="container">
        <header class="section-header">
          <h2 class="section-title">Related Stories</h2>
          <p class="section-description">Continue exploring impact stories and field updates from our global work.</p>
        </header>
        <div class="blog-grid related-posts-grid">
          <BlogCard
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.slug"
            :post="relatedPost"
          />
        </div>
      </div>
    </section>
  </div>

  <!-- 404 State -->
  <div v-else class="page-shell">
    <section class="section">
      <div class="container blog-not-found" v-reveal>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h1>Article Not Found</h1>
        <p>The article you're looking for doesn't exist or may have been moved.</p>
        <RouterLink to="/blog" class="btn btn-primary">Browse All Articles</RouterLink>
      </div>
    </section>
  </div>
</template>
