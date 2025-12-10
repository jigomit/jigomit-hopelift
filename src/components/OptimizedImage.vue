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
  imgClass: {
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
    default: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
  },
  // Priority loading for LCP images
  priority: {
    type: Boolean,
    default: false
  },
  // Enable responsive srcset
  responsive: {
    type: Boolean,
    default: true
  }
})

const isLoaded = ref(false)
const hasError = ref(false)
const pictureRef = ref(null)

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

// Extract base filename from src (supports both old and new paths)
const getImagePath = (src) => {
  // If src already starts with /images/, use it directly
  if (src.startsWith('/images/')) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '')
  }

  // Otherwise, extract filename and convert to /images/ path
  const filename = src.split('/').pop().replace(/\.(jpg|jpeg|png)$/i, '')
  return `/images/${filename}`
}

const basePath = computed(() => getImagePath(props.src))

// Generate responsive srcset for WebP
const webpSrcSet = computed(() => {
  if (!props.responsive) return ''
  const base = basePath.value
  return `${base}-400.webp 400w, ${base}-800.webp 800w, ${base}-1200.webp 1200w, ${base}.webp 1600w`
})

// Generate responsive srcset for AVIF
const avifSrcSet = computed(() => {
  if (!props.responsive) return ''
  const base = basePath.value
  return `${base}-400.avif 400w, ${base}-800.avif 800w, ${base}-1200.avif 1200w, ${base}.avif 1600w`
})

// Fallback JPG src
const fallbackSrc = computed(() => {
  const base = basePath.value
  // Get the extension from original src
  const ext = props.src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg'
  return `${base}${ext}`
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
          if (entry.isIntersecting && pictureRef.value) {
            const img = pictureRef.value.querySelector('img')
            if (img && img.dataset.src) {
              img.src = img.dataset.src
              observer.unobserve(pictureRef.value)
            }
          }
        })
      },
      {
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    )

    if (pictureRef.value) {
      observer.observe(pictureRef.value)
    }

    return () => {
      if (pictureRef.value) {
        observer.unobserve(pictureRef.value)
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
    <picture ref="pictureRef">
      <!-- AVIF format (best compression) -->
      <source
        v-if="responsive"
        type="image/avif"
        :srcset="avifSrcSet"
        :sizes="sizes"
      />
      <source
        v-else
        type="image/avif"
        :srcset="`${basePath}.avif`"
      />

      <!-- WebP format (good compression, wide support) -->
      <source
        v-if="responsive"
        type="image/webp"
        :srcset="webpSrcSet"
        :sizes="sizes"
      />
      <source
        v-else
        type="image/webp"
        :srcset="`${basePath}.webp`"
      />

      <!-- Fallback to JPG (universal support) -->
      <img
        :src="fallbackSrc"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loadingAttr"
        :decoding="decodingAttr"
        :fetchpriority="fetchPriorityAttr"
        :class="[
          imgClass,
          {
            'img-loaded': isLoaded,
            'img-error': hasError
          }
        ]"
        @load="handleLoad"
        @error="handleError"
      />
    </picture>
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

.optimized-image-wrapper picture {
  display: block;
  width: 100%;
  height: 100%;
}

.optimized-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: block;
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
