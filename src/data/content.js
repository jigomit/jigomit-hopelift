import harvestImage from '../assets/programs/harvest-basket.jpg'
import womenImage from '../assets/programs/women-cooperative.jpg'
import healthImage from '../assets/programs/health-initiative.jpg'
import testimonialAma from '../assets/illustrations/testimonial-ama.svg'
import testimonialDaniela from '../assets/illustrations/testimonial-daniela.svg'
import testimonialSamuel from '../assets/illustrations/testimonial-samuel.svg'

export const featureHighlights = [
  {
    title: 'Food Distribution',
    description: 'Fresh produce, nutritious meals, and food pantry staples delivered directly to families in need.',
    icon: 'kitchen',
  },
  {
    title: 'Housing Assistance',
    description: 'Emergency shelter, rent support, and housing stability programs for families facing homelessness.',
    icon: 'health',
  },
  {
    title: 'Financial Support',
    description: 'Emergency funds, utility assistance, and financial counseling to help families overcome economic hardship.',
    icon: 'hands',
  },
]

export const programs = [
  {
    slug: 'food-distribution-network',
    title: 'Food Distribution Network',
    description: 'Community-led food distribution centers providing fresh produce, nutritious meals, and pantry staples to families in need.',
    focus: ['Food Security', 'Nutrition'],
    image: harvestImage,
    metric: '12,000+ families served weekly',
    fullDescription: 'Our Food Distribution Network connects local food banks, community pantries, and mobile distribution sites to ensure nutritious food reaches families facing food insecurity. We serve fresh produce, hot meals, and essential groceries to those who need it most.',
    objectives: [
      'Serve 15,000 families weekly by 2025',
      'Establish distribution sites in underserved neighborhoods',
      'Reduce food waste through efficient distribution',
      'Provide nutrition education and cooking classes'
    ],
    impact: {
      familiesServed: '12,000+ weekly',
      mealsProvided: '420,000 monthly',
      distributionSites: '42 active',
      communityVolunteers: '850+'
    },
    locations: ['Local Communities', 'Urban Centers', 'Rural Areas'],
  },
  {
    slug: 'housing-assistance-program',
    title: 'Housing Assistance Program',
    description: 'Emergency shelter, rent assistance, and housing stability support for families facing homelessness or housing insecurity.',
    focus: ['Housing', 'Shelter'],
    image: healthImage,
    metric: '3,200+ families housed',
    fullDescription: 'Our Housing Assistance Program provides emergency shelter, rental assistance, utility support, and case management to help families maintain stable housing. We work with landlords, social services, and community partners to prevent homelessness and support housing stability.',
    objectives: [
      'Prevent homelessness for 5,000 families annually',
      'Provide emergency shelter within 24 hours of need',
      'Offer rental assistance for up to 6 months',
      'Connect families with long-term affordable housing'
    ],
    impact: {
      familiesHoused: '3,200+',
      emergencyShelterNights: '48,000 annually',
      rentAssistanceProvided: '$2.4M',
      housingStabilityRate: '87%'
    },
    locations: ['Local Communities', 'Urban Centers', 'Suburban Areas'],
  },
  {
    slug: 'family-financial-support',
    title: 'Family Financial Support',
    description: 'Emergency financial assistance, utility support, and financial counseling to help families overcome economic hardship.',
    focus: ['Financial Aid', 'Family Support'],
    image: womenImage,
    metric: '$1.8M in emergency aid distributed',
    fullDescription: 'Our Family Financial Support program provides emergency grants, utility assistance, and financial counseling to families facing economic crisis. We help cover essential expenses, prevent utility shutoffs, and provide financial literacy training to build long-term stability.',
    objectives: [
      'Assist 4,000 families annually with emergency funds',
      'Prevent utility shutoffs for vulnerable families',
      'Provide financial counseling and budgeting support',
      'Connect families with employment and benefits resources'
    ],
    impact: {
      familiesAssisted: '3,800+',
      emergencyGrantsDistributed: '$1.8M',
      utilitiesPreserved: '2,100 households',
      financialCounselingSessions: '5,600'
    },
    locations: ['Local Communities', 'Urban Centers', 'Rural Areas'],
  },
]

export const impactStats = [
  { label: 'Families receiving essential services', value: '19,000+' },
  { label: 'Meals distributed every month', value: '420,000' },
  { label: 'Emergency shelter nights provided', value: '48,000' },
  { label: 'Financial assistance distributed', value: '$1.8M' },
]

export const testimonials = [
  {
    quote:
      'When I lost my job, I didn\'t know how I would feed my three kids. The Food Distribution Network provided fresh groceries and hot meals every week until I got back on my feet. My family never went hungry.',
    name: 'Maria Rodriguez',
    title: 'Single Mother of Three',
    image: testimonialAma,
  },
  {
    quote:
      'After my apartment flooded, we had nowhere to go. The Housing Assistance Program found us emergency shelter that same day and helped with rent for three months while I recovered. They saved my family from homelessness.',
    name: 'James Wilson',
    title: 'Father and Construction Worker',
    image: testimonialSamuel,
  },
  {
    quote:
      'I was behind on utility bills and facing shutoff during winter. The Financial Support program not only paid my bills but taught me budgeting skills. Now I\'m financially stable and helping other families in my community.',
    name: 'Sarah Chen',
    title: 'Community Member',
    image: testimonialDaniela,
  },
]

export const impactStories = [
  {
    title: 'Mobile food pantries reach rural communities',
    summary: 'Our mobile distribution sites bring fresh produce and hot meals to underserved neighborhoods twice weekly, ensuring no family goes without food.',
  },
  {
    title: 'Rapid response prevents homelessness',
    summary: 'Emergency shelter and rental assistance programs provide same-day housing support for families facing eviction or displacement, with 87% achieving long-term housing stability.',
  },
  {
    title: 'Financial counseling builds lasting stability',
    summary: 'Families receiving emergency funds also get budgeting support and financial literacy training, helping them build savings and avoid future crises.',
  },
]
