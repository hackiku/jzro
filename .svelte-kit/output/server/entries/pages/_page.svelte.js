import { c as create_ssr_component, b as add_attribute, d as each, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { N as Nav } from "../../chunks/Nav.js";
import { C as Controls, G as GravityLauncher, L as Logos } from "../../chunks/GravityLauncher.js";
import { P as Planet } from "../../chunks/Planet.js";
const ScreenSizeDebug = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { y } = $$props;
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  return `  ${``}`;
});
let height = 70;
let atmosphereOffset = 20;
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pathD;
  let pathDAtmosphere;
  let width = 0;
  let flagSrc = "ui/mcrn.svg";
  pathD = `M0,${height} Q${width / 2},0 ${width},${height} V${height} H0`;
  pathDAtmosphere = `M0,${height - atmosphereOffset} Q${width / 2},${-atmosphereOffset} ${width},${height - atmosphereOffset} V${height} H0`;
  return `  <footer class="flex flex-col items-center justify-end w-full relative overflow-hidden"><div class="w-full px-12 md:pr-32 xl:pr-72 mb-20 flex justify-end space-x-4 z-20" data-svelte-h="svelte-15hai0v"><a href="https://instagram.com" target="_blank" class="h-7 w-7 opacity-40 hover:opacity-100"><img src="ui/instagram-icon.svg" alt="Instagram"></a> <a href="https://tiktok.com" target="_blank" class="h-7 w-7 opacity-40 hover:opacity-100"><img src="ui/tiktok-icon.svg" alt="TikTok"></a> <a href="https://linkedin.com" target="_blank" class="h-7 w-7 opacity-40 hover:opacity-100"><img src="ui/linkedin-icon.svg" alt="LinkedIn"></a></div>   <img${add_attribute("src", flagSrc, 0)} alt="Flag" class="absolute left-[10vw] md:left-[38vh] xl:left-[40vh] h-20 z-50" style="pointer-events: auto;"> <svg class="w-full absolute bottom-0"${add_attribute("viewBox", `0 0 ${width} ${height}`, 0)} xmlns="http://www.w3.org/2000/svg"><path${add_attribute("d", pathDAtmosphere, 0)} fill="#F21D26" opacity="0.2"></path><path${add_attribute("d", pathD, 0)} fill="#F21D26"></path></svg>   <div class="w-full flex mb-1 md:mb-2 items-end justify-center z-20" data-svelte-h="svelte-1p8jby5"><div class="text-sm text-darkBg">Copyalright © 2024 jzro |
      <a href="/privacy" target="_blank" class="mouse-pointer hover:underline hover:opacity-70">Privacy</a> |
      <a href="/terms" target="_blank" class="mouse-pointer hover:underline hover:opacity-70">Terms</a> |</div></div></footer>`;
});
let portfolioTags = {
  "all": 1,
  "web": 2,
  "landing": 3,
  "devtools": 5,
  "UI/UX": 6,
  "wireframes": 4,
  "product": 7
};
let portfolioData = [
  {
    id: "uploadcare",
    image: "portfolio/uploadcare-flex.png",
    description: "Landing pages & websites for leading devtool",
    link: "https://uploadcare.com",
    result: null,
    award: null,
    tags: [2, 3]
    // 'web copy', 'landing page copy'
  },
  {
    id: "omicron",
    image: "portfolio/omicron-mood.png",
    description: "Innovative web design for Omicron project",
    link: "https://www.awwwards.com/sites/omicron-blockchain-solution",
    result: null,
    award: "Awwwards Honors",
    tags: [2, 4, 5]
    // 'web copy', 'Wireframes', 'Branding'
  },
  {
    id: "wordagents",
    image: "portfolio/wordagents-ui.png",
    description: "Oldtime SEO content agency website copy",
    link: "https://wordagents.com",
    result: "conversion",
    award: null,
    tags: [2, 3]
    // 'web copy', 'landing page UX'
  },
  {
    id: "flowmyfigma",
    image: "portfolio/flowmyfigma.png",
    description: "Award-winning Figma to Webflow service & process",
    link: "https://www.awwwards.com/sites/omicron-blockchain-solution",
    result: null,
    award: "Awwwards Honors",
    tags: [5, 2, 4]
    // 'Figma', 'Product design', 'Copywriting'
  }
];
const css$1 = {
  code: ".scrollbar-hide.svelte-y6zvbd::-webkit-scrollbar{display:none}.scrollbar-hide.svelte-y6zvbd{-ms-overflow-style:none;scrollbar-width:none}",
  map: null
};
const Portfolio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let projectsPerTag;
  let displayedItems;
  let scrollContainer;
  let selectedItem = "all";
  $$result.css.add(css$1);
  projectsPerTag = Object.entries(portfolioTags).reduce(
    (acc, [tag, id]) => {
      acc[tag] = portfolioData.filter((item) => item.tags.includes(id)).length;
      return acc;
    },
    {}
  );
  displayedItems = [...portfolioData, ...portfolioData];
  return `   <div class="flex absolute left-0 bottom-0 overflow-x-auto space-x-12 scrollbar-hide w-screen svelte-y6zvbd" style="cursor: url(https://cdn.custom-cursor.com/db/cursor/32/NASA_Cursor.png) , default !important"${add_attribute("this", scrollContainer, 0)}>${each(displayedItems, (item) => {
    return `<div class="flex-shrink-0 w-[18em] min-h-[13em] shadow-lg rounded-3xl overflow-hidden rotate-rtl"> <img${add_attribute("src", item.image, 0)}${add_attribute("alt", item.description, 0)} class="min-w-full min-h-full object-cover rounded-2xl"> </div>`;
  })}</div>  <div class="flex absolute bottom-56 flex-wrap max-w-md justify-start items-start">${each(Object.keys(portfolioTags), (tag) => {
    return `<span class="${"text-md font-mono text-gray-500 hover:text-white cursor-pointer " + escape(selectedItem === tag ? "text-white" : "text-gray-500", true)}">${escape(tag)} ${escape(selectedItem === tag ? `(${projectsPerTag[tag]})` : "")} / 
    </span>`;
  })} </div>`;
});
const PipewriterDemo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { highlight = {
    wire: "portfolio/uploadcare-wire.png",
    ui: "portfolio/uploadcare-ui.png"
  } } = $$props;
  let sliderPosition = 50;
  if ($$props.highlight === void 0 && $$bindings.highlight && highlight !== void 0)
    $$bindings.highlight(highlight);
  return `  <div class="inset-0 flex justify-between p-4" data-svelte-h="svelte-5n0lr2"><img class="h-8" src="portfolio/tool-icons/docs.svg" alt="Docs Logo"> <img class="h-8" src="portfolio/tool-icons/figma.svg" alt="Figma Logo"></div>  <div class="relative shadow-2xl shadow-blue-600/30 flex items-center justify-center"><div class="relative w-full aspect-video"> <div class="absolute bg-no-repeat bg-cover inset-0 rounded-lg md:rounded-3xl lg:rounded-4xl" style="${"background-image: url(" + escape(highlight.wire, true) + "); background-size: contain; background-position: left center; clip-path: polygon(0 0, " + escape(sliderPosition, true) + "% 0, " + escape(sliderPosition, true) + "% 100%, 0% 100%);"}"></div>  <div class="absolute bg-no-repeat bg-cover inset-0 rounded-lg md:rounded-3xl lg:rounded-4xl" style="${"background-image: url(" + escape(highlight.ui, true) + "); background-size: contain; background-position: right center; clip-path: polygon(" + escape(sliderPosition, true) + "% 0, 100% 0, 100% 100%, " + escape(sliderPosition, true) + "% 100%);"}"></div>  <div class="absolute top-0 bg-blue-800 h-full w-1 cursor-col-resize" style="${"left: " + escape(sliderPosition, true) + "%;"}"></div></div></div>`;
});
let codePortfolioData = [
  {
    id: 1,
    title: "Interactive Airfoil Design",
    logo: "portfolio/tool-icons/svelte.svg",
    image: "portfolio/pipistrel-portfolio.png",
    description: "Interactive airfoil design for Pipistrel Virus SW 121",
    link: "https://pipistrel.streamlit.app"
  },
  {
    id: 2,
    title: "Mars Weather Aviation Dashboard",
    logo: "portfolio/tool-icons/figma.svg",
    image: "portfolio/mars-weather-portfolio.png",
    description: "Mars weather aviation style with METARs and TAFs",
    link: "#"
  },
  {
    id: 3,
    title: "OnShape Dark Mode for macOS",
    logo: "portfolio/tool-icons/onshape.svg",
    image: "portfolio/mars-weather-portfolio.png",
    description: "OnShape dark mode macOS app created using Nativefier for a seamless design experience",
    link: "https://www.youtube.com/watch?v=qEKsYfCBQoY"
  },
  {
    id: 4,
    title: "USA Air Force DATCOM UI",
    logo: "portfolio/tool-icons/docker.svg",
    image: "portfolio/pipistrel-portfolio.png",
    description: "Docker container and UI for United States Air Force Stability and Control Digital DATCOM",
    link: "#"
  },
  {
    id: 5,
    title: "Aerospace Component Catalog",
    logo: "portfolio/tool-icons/svelte.svg",
    image: "portfolio/pipistrel-portfolio.png",
    description: "A comprehensive digital catalog of aerospace components for engineers and designers",
    link: "#"
  }
];
const CodePortfolio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let displayedItems = codePortfolioData.slice(0, 2);
  return `  <div class="py-8"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-wrap justify-between gap-2">${each(displayedItems, (item) => {
    return `<div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 flex flex-col rounded-lg shadow-lg overflow-hidden" style="max-width: 340px;"><img${add_attribute("src", item.logo, 0)} alt="${escape(item.title, true) + " logo"}" class="w-12 h-12 object-contain self-center"> <div class="flex-grow relative" style="padding-top: 56.25%;"><img${add_attribute("src", item.image, 0)} alt="${escape(item.title, true) + " project image"}" class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"></div> <div class="flex justify-between items-center mt-4"><p class="text-sm">${escape(item.description)}</p> <a${add_attribute("href", item.link, 0)} class="text-indigo-500 hover:text-indigo-400 transition duration-300 text-sm">App →</a></div> </div>`;
  })}</div> ${codePortfolioData.length > 4 ? `<div class="flex justify-center mt-6"><button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">${escape("Show More")}</button></div>` : ``}</div></div>`;
});
const testimonialData = [
  {
    quote: "Ivan made us a neat $1M in a month writing landing page and facebook ads copy. That's 5x our previous sales record!",
    name: "Tommy Joiner",
    company: "WordAgents",
    role: "Co-Founder",
    image: "portfolio/headshots/tommy-joiner.png"
  },
  {
    quote: "Ivan is probably the smartest copywriter and direct response guy. He is also the founder of a very neat SaaS company and highly highly entertaining as well. He mixes right brain and left brain so that he pairs an analytical take with a high Emotional IQ delivery.",
    name: "Jameson Days",
    company: "SummaUp",
    role: "Co-Founder & Investor",
    image: "portfolio/headshots/jameson-days.png"
  },
  {
    quote: "Ivan's wireframe docs are gret for collab. We iterated copy and structure, for multiple Stoovo pivots, in a matter of hours.",
    name: "Hantz Févry",
    company: "Stoovo",
    role: "Co-Founder & CEO",
    image: "portfolio/headshots/hantz-fevry.png"
  },
  {
    // quote: "Conversations with him are a great use of time because he's quick on the uptake and helps to advance your own thinking",
    quote: " Ivan is exactly who I was looking for. He was able to take a very complex technical subject - which was largely new to him - and create coherent, accessible copy to launch our entire website.     He's driven, creative and a critical thinker - someone to whom you can present a problem and be confident that he will find a great solution. The kind of person you want on your team.",
    name: "Devon Price",
    company: "Vitanav",
    role: "Founder",
    image: "portfolio/headshots/devon-price.png"
  },
  {
    quote: "I work with a lot of copywriters. Few have the chops, confidence, and know how to create work like Ivan. His skillset extends beyond just copy and includes understanding the actual goal, personality of the organization, and how to create messaging that works - for the company and the prospect. Easy 5 stars and will call on him again for copywriting that converts.",
    name: "Ray Green",
    company: "",
    role: "Sales Consultant",
    image: "portfolio/headshots/heasdhot-placeholder.png"
  }
];
const Testimonials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTestimonialIndex = 0;
  return `  <div class="flex items-center justify-center"> <button class="p-2" data-svelte-h="svelte-uvttgt"><svg viewBox="0 0 24 24" class="h-8 w-8 fill-current text-white"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></button>  <div class="max-w-lg px-2 text-center"><blockquote class="text-lg mb-4">&quot;${escape(testimonialData[currentTestimonialIndex].quote)}&quot;</blockquote> <div class="flex items-center justify-center"><img${add_attribute("src", testimonialData[currentTestimonialIndex].image, 0)}${add_attribute("alt", testimonialData[currentTestimonialIndex].name, 0)} class="h-10 w-10 rounded-full mr-2"> <div class="flex flex-col items-start"><span class="text-md font-bold">${escape(testimonialData[currentTestimonialIndex].name)}</span> <span class="text-sm">${escape(testimonialData[currentTestimonialIndex].role)},
          ${escape(testimonialData[currentTestimonialIndex].company)}</span></div></div></div>  <button class="p-2" data-svelte-h="svelte-150fs3"><svg viewBox="0 0 24 24" class="h-8 w-8 fill-current"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"></path></svg></button></div>`;
});
const css = {
  code: "section.svelte-ukrypc{border-width:1px;border-style:dashed;--tw-border-opacity:1;border-color:rgb(17 24 39 / var(--tw-border-opacity))}.red.svelte-ukrypc{color:#F21D26}.glowing-text.svelte-ukrypc{transition:text-shadow 0.5s ease-in-out, color 0.3s ease-in-out;text-shadow:0 0 8px #1ABCFE}.glowing-text.svelte-ukrypc:hover{text-shadow:0 0 0.8em #1ABCFE}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let deliverables = [
    "software",
    "space tech",
    "agency gigs",
    "SaaS B2B",
    "LK-99 shipment",
    "right rudder"
  ];
  let currentDeliverableIndex = 0;
  let visibleDeliverable = deliverables[currentDeliverableIndex];
  let y = 0;
  $$result.css.add(css);
  return `  ${validate_component(ScreenSizeDebug, "ScreenSizeDebug").$$render($$result, { y }, {}, {})} ${validate_component(Controls, "Controls").$$render($$result, { y }, {}, {})} ${validate_component(Nav, "Nav").$$render($$result, { y }, {}, {})} ${validate_component(GravityLauncher, "GravityLauncher").$$render($$result, {}, {}, {})}  <main> <section class="relative flex flex-col justify-center items-center h-screen svelte-ukrypc"><div class="text-center px-4 mb-8 -mt-[14vh]" data-svelte-h="svelte-zsmv07"><h1 class="text-5xl sm:text-6xl xl:text-7xl mb-4">Aerospace UX</h1> <p class="text-2xl">User experience writing &amp; design <br> that makes products fly.</p></div> ${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      id: "cta",
      color: "#F4191D",
      label: "Fly me to Orbit"
    },
    {},
    {}
  )}  <div class="absolute bottom-0 my-20 max-w-xl sm:my-32 lg:max-w-2xl ">${validate_component(Logos, "Logos").$$render($$result, {}, {}, {})}</div></section>  <section class="relative py-12 h-[80vh] svelte-ukrypc"><div class="absolute right-[15vw] top-52 md:top-[18vh]">${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      id: "work",
      color: "#1ABCFE",
      label: "for work"
    },
    {},
    {}
  )}</div>  <div class="flex flex-wrap mx-auto md:max-w-3xl items-center px-8"><div class="w-full"><p class="text-md font-mono mb-4" data-svelte-h="svelte-gvavov">Copywriting + Design</p> <h2 class="text-3xl mb-3">Words and user flows<br>to sell more of your<br> <span class="text-[#1ABCFE] glowing-text svelte-ukrypc">${escape(visibleDeliverable)}</span></h2></div> ${validate_component(Portfolio, "Portfolio").$$render($$result, {}, {}, {})}</div></section> <div class="py-24">${validate_component(Testimonials, "Testimonials").$$render($$result, {}, {}, {})}</div>  <section class="relative flex flex-col items-center md:flex-row py-20 px-8 md:px-44 space-x-12 svelte-ukrypc"><div class="w-4/5 sm:w-3/5"> ${validate_component(PipewriterDemo, "PipewriterDemo").$$render($$result, {}, {}, {})}</div> <div class="w-full md:w-2/5"> <p class="text-md font-mono mb-4" data-svelte-h="svelte-1pkoqil">Product design /</p> <h3 class="text-xl mb-2" data-svelte-h="svelte-1rw8miw">Prototypes are wholesome: they&#39;re the first real shot at life any idea gets.
      I prototype digital products, and love building apps for 10x&#39;ing the process. Like
      <a href="https://pipewriter.io" target="blank" class="text-bold underline hover:opacity-80">Pipewriter</a>,
      my wireframing app for writers.</h3> ${``} <button class="text-sm my-4 font-mono text-blue-700 hover:underline">${escape("Read More +")}</button> </div></section>  <section class="relative md:px-44 py-12 svelte-ukrypc" data-svelte-h="svelte-2p83j7"><div class=""></div> <div class="max-w-xs"><img class="h-20" src="grav/asteroid.png" alt=""> </div>  <div class="absolute bottom-0 left-0 w-full h-16 z-0 bg-gradient-to-b from-darkBg to-lighterBg"></div></section>  <section class="bg-lighterBg py-8 px-8 md:px-8 h-screen svelte-ukrypc"><div class="flex flex-wrap max-w-3xl mx-auto items-center"><div class="w-full mt-20 -mb-8 p-8 md:w-1/2">${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      id: "fun",
      color: "#540087",
      label: "for fun"
    },
    {},
    {}
  )}</div> <div class="w-full md:w-1/2 p-4" data-svelte-h="svelte-18537sb"> <p class="text-md font-mono mb-4">Code + Engineering</p> <h2 class="text-4xl mb-3">Aerospacey Interfaces</h2> </div> ${validate_component(CodePortfolio, "CodePortfolio").$$render($$result, {}, {}, {})}</div></section> <div class="h-6 bg-gradient-to-t from-darkBg to-lighterBg py-8 flex justify-center items-center"></div>  <section class="mt-20 py-8 px-8 md:px-8 max-w-2xl mx-auto svelte-ukrypc"><div class="flex flex-wrap items-center"><div class="w-full md:w-1/2 p-4" data-svelte-h="svelte-1uq0x11"><h3 class="text-xl mb-3">Day jobbing aside, I *really* dig developing engineery apps for space and aviation.</h3> <h3 class="text-xl mb-3">They ain&#39;t smart as a 🛰️ DART, but sure are more fun than Fortran</h3> <p class="text-md mb-4 font-mono text-blue-700">Hire me to code ?</p></div> <div class="w-full mt-20 -mb-8 p-8 md:w-1/2">${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      id: "github",
      color: "#969696",
      label: "GitHub"
    },
    {},
    {}
  )} </div></div></section> <div class="flex w-auto max-w-xl mx-auto justify-center" data-svelte-h="svelte-dcumt5"><img class="h-40" src="grav/dangerous-go-alone.png" alt=""> </div>  <section class="mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto svelte-ukrypc" data-svelte-h="svelte-3vn1c2"><div class="flex flex-wrap items-center"> <div class="w-full md:w-1/2 p-4"><h2 class="text-4xl mb-3">I&#39;m Ivan 👋</h2> <p class="text-md mb-4">
        Oye, Dusters. I&#39;m a looongtime tech copywriter midlife-crisising into aerospace engineer, pilot, and HTML programmer.</p> <p class="text-md mb-4">Im doing it because space exploration is the OG and we should make more of it happen.</p> <p class="text-md mb-4">If you feel this way too, maybe we can test in prod together and <span class="text-white">design a human-centered space race.</span></p></div>  <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <div class="h-40 w-40 opacity-40 bg-slate-600"></div></div></div></section>  <section class="flex flex-col md:flex-row justify-center items-center mx-auto py-12 h-screen max-w-3xl svelte-ukrypc"> <div class="flex relative flex-col w-full md:w-1/2 items-center md:items-end space-y-4" data-svelte-h="svelte-1cq2rzl"><img src="memes/hello-friend.png" alt="Hello Friend Meme" class="absolute bottom-0 transform rotate-[15deg]"> <img src="memes/choppa.png" alt="Get to the Choppa Meme" class="absolute top-0 transform scale-75 rotate-[-15deg]"></div> <div class="flex justify-center p-12 items-center w-full md:w-1/2">${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      id: "contact",
      color: "#1B0087",
      label: "say hi"
    },
    {},
    {}
  )}</div> </section>   <section class="flex flex-row justify-center mt-8 mb-44 svelte-ukrypc" data-svelte-h="svelte-ipmuq3"><div class="flex flex-col justify-start"><p class="font-mono text-xs mb-3">March 18, 2024 • Sol 1094</p> <p class="text-2xl font-mono text-white"><span class="red svelte-ukrypc">JZRO</span> <span class="red svelte-ukrypc">03</span>2151Z 26004KT CLEAR <span class="red svelte-ukrypc">-22</span>/-77 Q<span class="red svelte-ukrypc">0073</span></p></div></section></main>  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
