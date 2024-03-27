import { c as create_ssr_component, d as each, b as add_attribute, o as onDestroy, e as escape } from "./ssr.js";
import { p as physicsStore } from "./Planet.js";
const css$1 = {
  code: ".logo-container.svelte-1cu6jgp:hover .logo-item.svelte-1cu6jgp{opacity:1 !important}",
  map: null
};
const Logos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { logos = [
    {
      src: "portfolio/logos/redocly-logo.svg",
      alt: "Redocly",
      opacity: 1
    },
    {
      src: "portfolio/logos/uploadcare-logo.svg",
      alt: "Uploadcare",
      opacity: 0.3
    },
    {
      src: "portfolio/logos/lenovo-logo.svg",
      alt: "Lenovo",
      opacity: 0.8
    },
    // { src: 'portfolio/logos/uploadcare-logo.svg', alt: 'extra', opacity: 0.2 },
    {
      src: "portfolio/logos/linguado-logo.jpg",
      alt: "Linguado",
      opacity: 0.4
    },
    {
      src: "portfolio/logos/stoovo-logo.svg",
      alt: "Stoovo",
      opacity: 0.3
    }
  ] } = $$props;
  if ($$props.logos === void 0 && $$bindings.logos && logos !== void 0)
    $$bindings.logos(logos);
  $$result.css.add(css$1);
  return `  <div class="relative logo-container svelte-1cu6jgp"><div class="flex flex-wrap justify-center items-center gap-8 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-800 ease-in-out sm:flex-nowrap sm:gap-12 ">${each(logos, (logo) => {
    return `<div class="inline-block logo-item filter svelte-1cu6jgp"${add_attribute(
      "style",
      `opacity: ${logo.opacity}; transform: ${logo.alt === "Linguado" ? "scale(1.5) rotate(14deg)" : "none"};
          margin: ${logo.alt === "Linguado" ? "-10% 0" : "0"};`,
      0
    )}><img class="h-auto w-24 md:w-32 lg:w-40"${add_attribute("src", logo.src, 0)}${add_attribute("alt", logo.alt, 0)}> </div>`;
  })}</div> </div>`;
});
const css = {
  code: ".velocity.svelte-c1n4u5{color:#FF3D00}.glowing-bottom.svelte-c1n4u5{transition:box-shadow 0.5s ease-in-out, color 0.3s ease-in-out;box-shadow:0 0 1em #1ABCFE}.glowing-bottom.svelte-c1n4u5:hover{box-shadow:0 0 0.8em #1ABCFE}",
  map: null
};
let HIDDEN = "-80vw";
let VISIBLE = "1em";
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { y } = $$props;
  let lastY = 0;
  let isVisible = false;
  let localVelocity = 0;
  let controlsBottom = "";
  const unsubscribe = physicsStore.subscribe(($physicsStore) => {
    localVelocity = $physicsStore.velocity;
  });
  onDestroy(() => {
    unsubscribe();
  });
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  $$result.css.add(css);
  {
    {
      if (y > lastY) {
        controlsBottom = HIDDEN;
        isVisible = false;
      } else {
        controlsBottom = VISIBLE;
      }
      lastY = y;
    }
  }
  return `     ${isVisible === false ? `<div class="fixed bottom-0 h-1 mx-auto z-50 bg-[#1ABCFE] bg-opacity-20 glowing-bottom w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5 inset-x-10 svelte-c1n4u5" data-svelte-h="svelte-ln4syy"></div>` : ``}  <div class="z-50 fixed mx-auto py-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out bg-gray-500 bg-opacity-10 opacity-60 hover:opacity-100 flex justify-center items-center w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5 inset-x-10" style="${"bottom: " + escape(controlsBottom, true) + ";"}" role="button"><button class="text-5xl mr-6 hover:bg-red-500 rounded-full" data-svelte-h="svelte-156r4tt">💥</button>  <div class="relative w-1/2 flex flex-col space-y-2 items-start group transition-opacity"> <div class="flex flex-row items-center space-x-3 justify-center"><p>v = <span class="velocity svelte-c1n4u5">${escape(localVelocity)}</span> km/s</p></div>  <input type="range" min="1" max="100"${add_attribute("value", localVelocity, 0)} class="slider w-full" id="velocitySlider"></div></div>  `;
});
const GravityLauncher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trajectoryPath;
  physicsStore.subscribe(($physicsStore) => {
    trajectoryPath = $physicsStore.trajectoryPath;
  });
  return `  <section class="absolute top-0 left-0 z-0 opacity-50 w-screen h-screen"><svg width="100vw" height="100vh" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0"><path${add_attribute("d", trajectoryPath, 0)} fill="none" stroke="#4EBCFE" stroke-width="0.1" stroke-dasharray="2,2"></path></svg></section>`;
});
export {
  Controls as C,
  GravityLauncher as G,
  Logos as L
};
