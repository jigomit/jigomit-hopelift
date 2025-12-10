import { useHead } from '@vueuse/head'

export function useSEO({
  title,
  description,
  keywords = [],
  image = '/poverty-alleviation-logo.svg',
  url = '',
  type = 'website',
  schema = null
}) {
  const baseUrl = 'https://hopelift.org' // Update with your actual domain
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullTitle = title ? `${title} | HopeLift Foundation` : 'HopeLift Foundation | Community Impact Coalition'

  const headConfig = {
    title: fullTitle,
    meta: [
      // Primary Meta Tags
      {
        name: 'description',
        content: description
      },
      {
        name: 'keywords',
        content: keywords.join(', ')
      },

      // Open Graph / Facebook
      {
        property: 'og:type',
        content: type
      },
      {
        property: 'og:url',
        content: fullUrl
      },
      {
        property: 'og:title',
        content: fullTitle
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: image.startsWith('http') ? image : `${baseUrl}${image}`
      },

      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:url',
        content: fullUrl
      },
      {
        name: 'twitter:title',
        content: fullTitle
      },
      {
        name: 'twitter:description',
        content: description
      },
      {
        name: 'twitter:image',
        content: image.startsWith('http') ? image : `${baseUrl}${image}`
      },

      // Additional SEO
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'author',
        content: 'HopeLift Foundation'
      },
      {
        name: 'theme-color',
        content: '#0fbf82'
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: fullUrl
      }
    ]
  }

  // Add JSON-LD structured data if provided
  if (schema) {
    headConfig.script = [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }
    ]
  }

  useHead(headConfig)
}

// Organization Schema Generator
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'HopeLift Foundation',
    alternateName: 'Community Impact Coalition',
    url: 'https://hopelift.org',
    logo: 'https://hopelift.org/poverty-alleviation-logo.svg',
    description: 'Poverty alleviation through food distribution, housing assistance, and financial support for families in need. Serving families facing hunger, homelessness, and economic crisis.',
    email: 'care@povertyalleviation.org',
    telephone: '+1-202-417-0900',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '347 Hope Street',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      addressCountry: 'US'
    },
    sameAs: [
      'https://www.facebook.com/hopeliftfoundation',
      'https://twitter.com/hopeliftorg',
      'https://www.linkedin.com/company/hopelift-foundation'
    ],
    foundingDate: '2016',
    areaServed: {
      '@type': 'Place',
      name: 'United States',
      description: 'Local communities, urban centers, and rural areas'
    },
    knowsAbout: [
      'Poverty Alleviation',
      'Food Distribution',
      'Food Security',
      'Housing Assistance',
      'Eviction Prevention',
      'Emergency Shelter',
      'Financial Assistance',
      'Financial Counseling',
      'Family Support Services',
      'Emergency Relief Programs'
    ]
  }
}

// Article Schema Generator for Blog Posts
export function generateArticleSchema({ title, description, author, authorRole, date, image, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image.startsWith('http') ? image : `https://hopelift.org${image}`,
    author: {
      '@type': 'Person',
      name: author,
      jobTitle: authorRole
    },
    publisher: {
      '@type': 'Organization',
      name: 'HopeLift Foundation',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hopelift.org/poverty-alleviation-logo.svg'
      }
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hopelift.org${url}`
    }
  }
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://hopelift.org${item.url}`
    }))
  }
}
