// lib/portfolio/codePortfolioData.js

export const toolIcons = {
  Python: 'portfolio/tool-icons/python.svg',
  Streamlit: 'portfolio/tool-icons/streamlit.svg',
  Fortran: 'portfolio/tool-icons/whatsapp.svg',
  Svelte: 'portfolio/tool-icons/svelte.svg',
  Tailwind: 'portfolio/tool-icons/openai.svg',
  Scraping: 'portfolio/tool-icons/openai.svg',
  Onshape: 'portfolio/tool-icons/onshape.svg',
  Nativefier: 'portfolio/tool-icons/openai.svg',
  MacOS: 'portfolio/tool-icons/openai.svg',
  Docker: 'portfolio/tool-icons/docker.svg',
  Datcom: 'portfolio/tool-icons/openai.svg',
  RPA: 'portfolio/tool-icons/rpa.png',
};

export let codePortfolioData = [
  {
    id: 1,
    title: "Aircraft prototyping app",
    logo: 'portfolio/tool-icons/svelte.svg',
    image: 'portfolio/pipistrel-portfolio.png',
    description: 'Interactive airfoil design for Pipistrel Virus SW 121',
    link: 'https://pipistrel.streamlit.app',
    tools: ['Python', 'Streamlit', 'Fortran']
  },
  {
    id: 2,
    title: "Mars METAR",
    logo: 'portfolio/tool-icons/figma.svg',
    image: 'portfolio/mars-weather-portfolio.png',
    description: 'Mars weather aviation style with METARs and TAFs',
    link: '#',
    tools: ['Svelte', 'Tailwind', 'Scraping']

  },
  {
    id: 3,
    title: "OnShape Dark Mode for macOS",
    logo: 'portfolio/tool-icons/onshape.svg',
    image: 'portfolio/onshape-darkmode.png',
    description: 'OnShape dark mode macOS app created using Nativefier for a seamless design experience',
    link: 'https://www.youtube.com/watch?v=qEKsYfCBQoY',
    tools: ['Onshape', 'Nativefier', 'MacOS']
  },
  {
    id: 4,
    title: "Rocket Engine RPA Tool",
    logo: 'https://rocket-engine.streamlit.app/',
    image: 'portfolio/rocket-engine.png',
    description: 'Interactive rocket engine design, comparing analytical solution with Rocket Propulsion Analysis',
    link: '#',
    tools: ['RPA', 'Streamlit', 'Python']
  },
];
