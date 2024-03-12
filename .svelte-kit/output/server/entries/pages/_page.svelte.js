import { c as create_ssr_component, b as add_attribute, e as escape, d as each, v as validate_component, f as createEventDispatcher, o as onDestroy, a as subscribe } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
/* empty css                                              */
import { N as Nav } from "../../chunks/Nav.js";
import { c as customPhysicsStore, G as GravityLauncher, C as Controls, L as Logos } from "../../chunks/GravityLauncher.js";
const scrollPosition = writable(0);
const css$1 = {
  code: ".portfolio-item.svelte-1s5m09b{max-width:340px}.portfolio-image-wrapper.svelte-1s5m09b{padding-top:56.25%;position:relative}.portfolio-image.svelte-1s5m09b{position:absolute;top:0;right:0;bottom:0;left:0}",
  map: null
};
const PortfolioItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$1);
  return `  <div class="portfolio-item rounded-lg shadow-lg overflow-hidden flex flex-col p-4 space-y-4 svelte-1s5m09b"><img${add_attribute("src", item.logo, 0)} alt="Logo" class="portfolio-logo w-12 h-12 object-contain"> <div class="portfolio-image-wrapper flex-grow svelte-1s5m09b"><img${add_attribute("src", item.image, 0)} alt="Portfolio Image" class="portfolio-image w-full h-full object-cover svelte-1s5m09b"></div> <div class="flex justify-between items-center"><p class="portfolio-description text-sm">${escape(item.description)}</p> <a${add_attribute("href", item.link, 0)} class="portfolio-link text-indigo-500 hover:text-indigo-400 transition duration-300 text-sm self-start mt-2">App →</a></div> </div>`;
});
const Portfolio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let scrollContainer;
  let portfolioData = [
    {
      id: 1,
      logo: "assets/svelte-logo.svg",
      image: "portfolio/pipistrel-portfolio.png",
      description: "Interactive airfoil design for Pipistrel Virus SW 121",
      link: "https://pipistrel.streamlit.app"
    },
    {
      id: 2,
      logo: "assets/figma-logo.svg",
      image: "portfolio/mars-weather-portfolio.png",
      description: "Mars weather aviation style with METARs and TAFs",
      link: "#"
    }
  ];
  return `  <section class="p-8 px-4 md:px-6 bg-lighterBg"><div class="flex flex-wrap items-center max-w-full mx-auto"><div class="w-full relative"> <div class="flex overflow-x-auto space-x-2"${add_attribute("this", scrollContainer, 0)}>${each(portfolioData, (item) => {
    return `${validate_component(PortfolioItem, "PortfolioItem").$$render($$result, { item }, {}, {})}`;
  })}</div></div></div> </section>`;
});
const testimonialData = [
  {
    quote: "Ivan made us a neat $1M in a month writing landing page and facebook ads copy. 3x our previous sales record!",
    name: "Tommy Joiner",
    company: "WordAgents",
    image: "/clients/tommy-joiner-headshot.png"
    // path to Tommy Joiner's image
  }
  // ... other testimonials
];
const Testimonials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTestimonialIndex = 0;
  return `<section class="flex items-center justify-center py-8 px-4 md:px-6"> <button class="p-4" data-svelte-h="svelte-4v0pzy"> <svg viewBox="0 0 24 24" class="h-8 w-8 fill-current text-white"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></button>  <div class="max-w-lg text-center"><blockquote class="mb-4">&quot;${escape(testimonialData[currentTestimonialIndex].quote)}&quot;</blockquote> <div class="flex items-center justify-center"><img${add_attribute("src", testimonialData[currentTestimonialIndex].image, 0)}${add_attribute("alt", testimonialData[currentTestimonialIndex].name, 0)} class="h-10 w-10 rounded-full mr-2"> <cite class="not-italic">${escape(testimonialData[currentTestimonialIndex].name)} @ ${escape(testimonialData[currentTestimonialIndex].company)}</cite></div></div>  <button class="border-none p-4" data-svelte-h="svelte-1k4x4gi"><svg viewBox="0 0 24 24" class="h-8 w-8 fill-current"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"></path></svg></button></section>`;
});
const Planet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { color = "red" } = $$props;
  let { label = "" } = $$props;
  let diameter;
  let gravity;
  createEventDispatcher();
  const unsubscribe = customPhysicsStore.subscribe(($physicsStore) => {
    const planet = $physicsStore.planets.find((p) => p.id === id);
    if (planet) {
      gravity = planet.gravity;
      diameter = calculateDiameter(planet.gravity);
    }
  });
  const calculateDiameter = (gravity2) => Math.sqrt(gravity2) * (Math.min(window.innerWidth, window.innerHeight) / 24);
  onDestroy(() => {
    unsubscribe();
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `  <div class="text-center my-4"><div class="inline-block relative z-0"><svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style="${"width: " + escape(diameter, true) + "px; height: " + escape(diameter, true) + "px;"}"><circle cx="50%" cy="50%"${add_attribute("r", diameter / 2, 0)}${add_attribute("fill", color, 0)}></circle></svg> <span class="absolute top-1/2 left-full transform -translate-y-1/2 ml-6 text-white font-mono text-sm whitespace-nowrap z-10">${escape(label)}</span></div> <div class="mt-6 ml-16 relative z-20"><input type="range" min="0" max="100"${add_attribute("value", gravity, 0)} class="w-1/2 max-w-1/4"></div></div>`;
});
const css = {
  code: ".red.svelte-bs9zae{color:#F21D26}.scroll-display.svelte-bs9zae{position:fixed;bottom:20px;right:20px;background-color:rgba(0, 0, 0, 0.7);color:white;padding:10px;border-radius:5px;z-index:1000}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let diameter;
  let $sliderValue, $$unsubscribe_sliderValue;
  let $scrollPosition, $$unsubscribe_scrollPosition;
  $$unsubscribe_scrollPosition = subscribe(scrollPosition, (value) => $scrollPosition = value);
  let sliderValue = writable(50);
  $$unsubscribe_sliderValue = subscribe(sliderValue, (value) => $sliderValue = value);
  $$result.css.add(css);
  diameter = $sliderValue * 8;
  $$unsubscribe_sliderValue();
  $$unsubscribe_scrollPosition();
  return `   ${validate_component(GravityLauncher, "GravityLauncher").$$render($$result, {}, {}, {})} ${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}   <div class="scroll-display svelte-bs9zae">Scroll Position: ${escape($scrollPosition)}%</div> <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;"><circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue"></circle></svg>   <div class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" data-svelte-h="svelte-qjoyxb"><svg width="100%" height="100%" viewBox="0 0 1171 6191" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" d="M1021 0C1021 494.043 704.871 535.527 474.836 636.5C-0.164276 845 539.757 1346.07 877.336 1440C1421.84 1591.5 1193.83 2670 307.335 2843.5C-145.124 2932.05 -111.35 3674.12 508.962 3966.33C1129.27 4258.53 796.869 6158.19 701.336 6190" stroke="#1ABCFE" stroke-dasharray="2 7"></path></svg></div>  <section class="hero mt-24 py-8 flex justify-center items-center"><div class="max-w-md text-center"><h2 class="text-6xl text-white mb-4" data-svelte-h="svelte-1qkgyhk">Aerospace UX</h2> <p class="text-2xl text-gray-500 mb-8" data-svelte-h="svelte-uqz3vq">User experience writing &amp; design <br> that makes products fly.</p>  ${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      initialGravity: 14,
      color: "#F4191D",
      label: "Take me to Orbit"
    },
    {},
    {}
  )} <div class="flex justify-center items-center space-x-4" data-svelte-h="svelte-ofxsgu"></div></div></section>  <section class="flex justify-center opacity-30 hover:opacity-100"><div class="px-20 w-full max-w-4xl">${validate_component(Logos, "Logos").$$render($$result, {}, {}, {})}</div></section>  <section class="mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto"><div class="flex flex-wrap items-center"><div class="w-full md:w-1/2 p-4" data-svelte-h="svelte-1dtzlti"> <p class="text-md mb-4">Copywriting &amp; UI/UX</p> <h2 class="text-4xl mb-3">Words and vectors <br> that sell <span style="color: #1ABCFE">software</span></h2></div> <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> ${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      initialGravity: 22,
      color: "#1ABCFE",
      label: "for work"
    },
    {},
    {}
  )}</div></div></section> ${validate_component(Portfolio, "Portfolio").$$render($$result, {}, {}, {})} ${validate_component(Testimonials, "Testimonials").$$render($$result, {}, {}, {})}  <div class="h-6 bg-gradient-to-b from-darkBg to-lighterBg mt-8 py-8 flex justify-center items-center"></div> <section class="relative bg-lighterBg"> <div class="flex justify-end mr-16 md:mr-32 lg:mr-64" data-svelte-h="svelte-15uzfn4"><div class="max-w-xl lg:max-w-3xl"><p class="text-sm mb-4 font-mono">Engineering &amp; Code</p> <h3 class="text-3xl mb-4">Aerospacey interfaces</h3></div></div>  <div class="absolute left-[10%] md:left-[10%] lg:left-[10%]">${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      initialGravity: 40,
      color: "#540087",
      label: "for fun"
    },
    {},
    {}
  )}</div></section> <div class="h-6 bg-gradient-to-b from-lighterBg to-darkBg mt-8 py-8 flex justify-center items-center"></div>  ${validate_component(Portfolio, "Portfolio").$$render($$result, {}, {}, {})} <section class="mt-20 py-8 px-8 md:px-8 max-w-2xl mx-auto"><div class="flex flex-wrap items-center"><div class="w-full md:w-1/2 p-4" data-svelte-h="svelte-17yavvl"> <h3 class="text-xl mb-3">I also *really* like building engineery apps that ain&#39;t smart as a DART 🛰️ but sure are more fun than Fortran</h3> <p class="text-md mb-4 font-mono text-blue-700">Hire me to code →</p></div> <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> ${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      initialGravity: 8,
      color: "#F1F1F1",
      label: "GitHub"
    },
    {},
    {}
  )}</div></div></section> <div class="flex w-auto max-w-xl mx-auto justify-center" data-svelte-h="svelte-13sz6zc"><img class="h-40" src="assets/dangerous-go-alone.png" alt=""> </div>  <section class="mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto" data-svelte-h="svelte-1qty1v8"><div class="flex flex-wrap items-center"> <div class="w-full md:w-1/2 p-4"><h2 class="text-4xl mb-3">I&#39;m Ivan 👋</h2> <p class="text-md mb-4">Oye, Dusters. I&#39;m a longtime tech copywriter midlife-crisising into aerospace engineer, pilot, and HTML programmer.</p> <p class="text-md mb-4">Im doing it because space exploration is the OG and we should make more of it happen.</p> <p class="text-md mb-4">If you feel this way too, maybe we can test in prod together and design a more human-centered space race.</p></div>  <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <div class="h-40 w-40 opacity-40 bg-slate-600"></div></div></div></section>  <section class="flex flex-row mx-20 px-20 py-12 bg-darkBg text-white"> <div class="flex flex-col items-end space-y-4 p-14" data-svelte-h="svelte-1amq5a8"><img src="memes/hello-friend.png" alt="Hello Friend Meme" class="transform rotate-[15deg]"> <img src="memes/choppa.png" alt="Get to the Choppa Meme" class="h-48 transform rotate-[-15deg]"></div>  <div class="flex justify-center items-center text-white"> <svg class="relative z-10"${add_attribute("width", diameter, 0)}${add_attribute("height", diameter, 0)} viewBox="${"0 0 " + escape(diameter, true) + " " + escape(diameter, true)}"><circle${add_attribute("cx", diameter / 2, 0)}${add_attribute("cy", diameter / 2, 0)}${add_attribute("r", diameter / 2, 0)} fill="#1B0087"></circle><foreignObject x="0" y="0"${add_attribute("width", diameter, 0)}${add_attribute("height", diameter, 0)}><div xmlns="http://www.w3.org/1999/xhtml" style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;"><h3 class="text-4xl text-white mb-4">Let&#39;s Fly</h3><a href="mailto:ivan@pipewriter.io" class="text-xl underline mb-4">ivan@pipewriter.io</a><input type="range" min="10" max="100" class="slider w-48 mb-4" id="ctaSlider"${add_attribute("value", $sliderValue, 0)}><a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer"><img class="h-24" src="assets/WhatsApp.svg" alt="WhatsApp"></a></div></foreignObject></svg></div></section>  <div class="flex flex-row justify-center mt-8 mb-10" data-svelte-h="svelte-10q2mgw"><div class="flex flex-col justify-start"><p class="font-mono text-xs mb-3">47 hours ago</p> <p class="text-2xl font-mono text-white"><span class="red svelte-bs9zae">JZRO</span> 03<span class="red svelte-bs9zae">2151</span>Z 26004KT CLEAR <span class="red svelte-bs9zae">-6</span>/-14 Q<span class="red svelte-bs9zae">127</span></p></div></div>  <footer class="relative text-center flex justify-center items-end h-[100px]" data-svelte-h="svelte-p23eke"> <p class="z-10 text-darkBg text-xs">Copyalright © 2024 Ivan Karaman | Privacy | Terms</p> <img src="assets/footer.svg" alt="" class="w-full h-full absolute z-0 top-2 left-0"> </footer>`;
});
export {
  Page as default
};
