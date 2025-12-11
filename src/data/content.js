// Testimonial illustrations (small SVGs, keep as imports)
import testimonialAma from '../assets/illustrations/testimonial-ama.svg'
import testimonialDaniela from '../assets/illustrations/testimonial-daniela.svg'
import testimonialSamuel from '../assets/illustrations/testimonial-samuel.svg'

// Program images (use string paths for OptimizedImage component)
// These reference /images/ directory where AVIF/WebP versions are generated

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
    image: '/images/harvest-basket.jpg',
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
    image: '/images/housing-assistance.jpg',
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
    image: '/images/women-cooperative.jpg',
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
  {
    slug: 'mobile-food-pantry',
    title: 'Mobile Food Pantry Program',
    description: 'Bringing fresh groceries and prepared meals directly to underserved rural communities and neighborhoods with limited access to food resources.',
    focus: ['Food Security', 'Mobile Services'],
    image: '/images/mobile-food-pantry.jpg',
    metric: '2,800+ families reached monthly',
    fullDescription: 'Our Mobile Food Pantry Program operates a fleet of refrigerated trucks that travel to rural areas, senior living facilities, and underserved neighborhoods where traditional food pantries are inaccessible. Each mobile pantry provides fresh produce, proteins, dairy products, and pantry staples, ensuring that transportation barriers never prevent families from accessing nutritious food.',
    objectives: [
      'Expand mobile routes to cover 15 additional rural communities by 2025',
      'Serve 3,500 families monthly through mobile distributions',
      'Partner with local organizations to identify high-need areas',
      'Reduce food deserts by providing consistent weekly service'
    ],
    impact: {
      familiesReached: '2,800+ monthly',
      mobileSitesActive: '28 locations',
      poundsDistributed: '185,000 lbs/month',
      averageDistance: '45 miles per route'
    },
    locations: ['Rural Communities', 'Remote Areas', 'Senior Facilities'],
  },
  {
    slug: 'transitional-housing',
    title: 'Transitional Housing Program',
    description: 'Safe, temporary housing combined with case management and support services to help families transition from homelessness to permanent housing.',
    focus: ['Housing', 'Case Management'],
    image: '/images/transitional-housing.jpg',
    metric: '180 families in transitional housing',
    fullDescription: 'Our Transitional Housing Program provides safe, furnished apartments for families experiencing homelessness while they work toward permanent housing stability. Each family receives intensive case management, employment support, financial counseling, and life skills training. The program typically lasts 6-18 months, giving families time to build income, savings, and the skills needed for long-term housing success.',
    objectives: [
      'Maintain 200 transitional housing units by 2025',
      'Achieve 90% transition rate to permanent housing',
      'Provide wraparound services including childcare and transportation',
      'Connect families with education and employment opportunities'
    ],
    impact: {
      familiesHoused: '180 currently',
      permanentHousingRate: '85%',
      averageStayLength: '11 months',
      childrenSupported: '340+'
    },
    locations: ['Urban Centers', 'Suburban Areas', 'Local Communities'],
  },
  {
    slug: 'home-repair-weatherization',
    title: 'Home Repair & Weatherization',
    description: 'Emergency home repairs and energy efficiency improvements for low-income homeowners, preventing displacement and reducing utility costs.',
    focus: ['Housing Stability', 'Home Repair'],
    image: '/images/home-repair.jpg',
    metric: '450 homes repaired annually',
    fullDescription: 'Our Home Repair & Weatherization program helps low-income homeowners maintain safe, energy-efficient homes through emergency repairs and weatherization services. We address critical safety issues (roof repairs, plumbing, heating systems), improve energy efficiency (insulation, windows, HVAC upgrades), and make accessibility modifications for seniors and people with disabilities. This prevents displacement and keeps families in their homes.',
    objectives: [
      'Complete 600 home repairs and weatherization projects annually by 2025',
      'Reduce average utility costs by 30% for participating households',
      'Prioritize repairs for seniors, families with children, and people with disabilities',
      'Train and employ local residents in construction trades'
    ],
    impact: {
      homesRepaired: '450 annually',
      averageUtilitySavings: '$840/year',
      emergencyRepairs: '280 completed',
      localJobsCreated: '35 positions'
    },
    locations: ['Local Communities', 'Urban Centers', 'Rural Areas'],
  },
  {
    slug: 'job-training-placement',
    title: 'Job Training & Placement',
    description: 'Skills training, industry certifications, and job placement assistance to help unemployed and underemployed individuals secure stable, living-wage employment.',
    focus: ['Employment', 'Skills Training'],
    image: '/images/future-youth.jpg',
    metric: '1,240 jobs secured in 2024',
    fullDescription: 'Our Job Training & Placement program provides comprehensive employment support including skills assessment, vocational training, industry certifications, resume development, interview coaching, and direct connections to hiring employers. We partner with local businesses to understand workforce needs and design training programs that lead directly to employment. Participants receive support for up to one year after job placement to ensure retention and advancement.',
    objectives: [
      'Place 1,500 participants in living-wage jobs annually by 2025',
      'Achieve 80% job retention rate at 12 months',
      'Expand training programs to include healthcare, IT, and skilled trades',
      'Partner with 100+ employers committed to hiring program graduates'
    ],
    impact: {
      participantsTrained: '1,680 annually',
      jobsSecured: '1,240 placements',
      averageWageIncrease: '$6.50/hour',
      employerPartners: '85 active'
    },
    locations: ['Urban Centers', 'Local Communities', 'Suburban Areas'],
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
