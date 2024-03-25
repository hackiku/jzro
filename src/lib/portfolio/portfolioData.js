// lib/portfolio/portfolioData.js

export let resultsData = [
  {
    name: 'awwwards honors',
    image: 'portfolio/awwwards-honors-badge.png',
    description: 'Awwwards honors badge for outstanding web design and creativity.',
    number: null,
    unit: null,
    stat: null,
  },
  {
    name: 'conversion',
    image: null,
    description: 'Boosted conversion rate with Facebook ads and landing page copywriting.',
    number: 127,
    unit: 'x',
    stat: 'conversion',
  },
];

export let portfolioTags = {
  'all': 1,
  'web': 2,
  'landing': 3,
  'devtools': 5,
  'UI/UX': 6,
  'wireframes': 4,
  'product': 7,
};

export let portfolioData = [
  {
    id: 'uploadcare',
    image: 'portfolio/uploadcare-flex.png',
    description: 'Landing pages & websites for leading devtool',
    link: 'https://uploadcare.com',
    result: null,
    award: null,
    tags: [2, 3], // 'web copy', 'landing page copy'
  },
  {
    id: 'omicron',
    image: 'portfolio/omicron-mood.png',
    description: 'Innovative web design for Omicron project',
    link: 'https://www.awwwards.com/sites/omicron-blockchain-solution',
    result: null,
    award: 'Awwwards Honors',
    tags: [2, 4, 5], // 'web copy', 'Wireframes', 'Branding'
  },
  {
    id: 'wordagents',
    image: 'portfolio/wordagents-ui.png',
    description: 'Oldtime SEO content agency website copy',
    link: 'https://wordagents.com',
    result: 'conversion',
    award: null,
    tags: [2, 3], // 'web copy', 'landing page UX'
  },
  {
    id: 'flowmyfigma',
    image: 'portfolio/flowmyfigma.png',
    description: 'Award-winning Figma to Webflow service & process',
    link: 'https://www.awwwards.com/sites/omicron-blockchain-solution',
    result: null,
    award: 'Awwwards Honors',
    tags: [5, 2, 4], // 'Figma', 'Product design', 'Copywriting'
  },
];
