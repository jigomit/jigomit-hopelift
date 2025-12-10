<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  width: {
    type: [Number, String],
    required: true
  },
  height: {
    type: [Number, String],
    required: true
  },
  // Lazy load by default, set to false for above-fold images
  lazy: {
    type: Boolean,
    default: true
  },
  // CSS class for styling
  class: {
    type: String,
    default: ''
  },
  // Aspect ratio class (e.g., 'aspect-16-9')
  aspectRatio: {
    type: String,
    default: ''
  },
  // Sizes attribute for responsive images
  sizes: {
    type: String,
    default: '100vw'
  },
  // Priority loading for LCP images
  priority: {
    type: Boolean,
    default: false
  }
})

const isLoaded = ref(false)
const hasError = ref(false)
const imgRef = ref(null)

// Determine loading strategy
const loadingAttr = computed(() => {
  return props.priority || !props.lazy ? 'eager' : 'lazy'
})

// Determine decoding strategy
const decodingAttr = computed(() => {
  return props.priority ? 'sync' : 'async'
})

// Determine fetchpriority
const fetchPriorityAttr = computed(() => {
  return props.priority ? 'high' : 'auto'
})

// Handle image load
const handleLoad = () => {
  isLoaded.value = true
}

// Handle image error
const handleError = () => {
  hasError.value = true
  console.error(`Failed to load image: ${props.src}`)
}

// Intersection Observer for lazy loading (fallback)
onMounted(() => {
  if (props.lazy && !props.priority && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.value) {
            const img = imgRef.value
            if (img.dataset.src) {
              img.src = img.dataset.src
              observer.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    )

    if (imgRef.value) {
      observer.observe(imgRef.value)
    }

    return () => {
      if (imgRef.value) {
        observer.unobserve(imgRef.value)
      }
    }
  }
})
</script>

<template>
  <div
    class="optimized-image-wrapper"
    :class="[aspectRatio, { 'img-skeleton': !isLoaded && !hasError }]"
    :style="{
      aspectRatio: `${width} / ${height}`
    }"
  >
    <img
      ref="imgRef"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loadingAttr"
      :decoding="decodingAttr"
      :fetchpriority="fetchPriorityAttr"
      :class="[
        class,
        {
          'img-loaded': isLoaded,
          'img-error': hasError
        }
      ]"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<style scoped>
.optimized-image-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(15, 191, 130, 0.05) 0%,
    rgba(15, 191, 130, 0.1) 50%,
    rgba(15, 191, 130, 0.05) 100%
  );
}

.optimized-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.optimized-image-wrapper img.img-loaded {
  opacity: 1;
}

.optimized-image-wrapper img.img-error {
  opacity: 0.5;
  filter: grayscale(100%);
}

/* Skeleton loading animation */
.img-skeleton {
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
