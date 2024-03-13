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
      opacity: 0.2
    },
    {
      src: "portfolio/logos/lenovo-logo.svg",
      alt: "Lenovo",
      opacity: 1
    },
    // { src: 'portfolio/logos/uploadcare-logo.svg', alt: 'extra', opacity: 0.2 },
    {
      src: "portfolio/logos/linguado-logo.jpg",
      alt: "Linguado",
      opacity: 0.2
    },
    {
      src: "portfolio/logos/stoovo-logo.svg",
      alt: "Stoovo",
      opacity: 0.2
    }
  ] } = $$props;
  if ($$props.logos === void 0 && $$bindings.logos && logos !== void 0)
    $$bindings.logos(logos);
  $$result.css.add(css$1);
  return `  <div class="relative logo-container svelte-1cu6jgp"><div class="flex flex-wrap justify-center items-center gap-8 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-800 ease-in-out sm:flex-nowrap sm:gap-12 opacity-75 ">${each(logos, (logo) => {
    return `<div class="inline-block logo-item filter svelte-1cu6jgp"${add_attribute(
      "style",
      `opacity: ${logo.opacity}; transform: ${logo.alt === "Linguado" ? "scale(1.5) rotate(14deg)" : "none"};
          margin: ${logo.alt === "Linguado" ? "-10% 0" : "0"};`,
      0
    )}><img class="h-auto w-24 md:w-32 lg:w-40"${add_attribute("src", logo.src, 0)}${add_attribute("alt", logo.alt, 0)}> </div>`;
  })}</div> </div>`;
});
const css = {
  code: ".velocity.svelte-1dv1z6m{color:#FF3D00}",
  map: null
};
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let localVelocity;
  const unsubscribe = physicsStore.subscribe(($physicsStore) => {
    localVelocity = $physicsStore.velocity;
  });
  onDestroy(() => {
    unsubscribe();
  });
  $$result.css.add(css);
  return `   <div class="z-50 fixed bottom-6 mx-auto p-4 rounded-full backdrop-blur-md bg-gray-500 bg-opacity-10 opacity-10 hover:opacity-100 flex justify-center items-center w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5 inset-x-10"> <button class="text-5xl mr-6 hover:bg-red-500 rounded-full" data-svelte-h="svelte-156r4tt">💥</button>  <div class="relative w-1/2 flex flex-col space-y-2 items-start group transition-opacity"> <div class="flex flex-row items-center space-x-3 justify-center"><p>v = <span class="velocity svelte-1dv1z6m">${escape(localVelocity)}</span> km/s</p></div>  <input type="range" min="1" max="100"${add_attribute("value", localVelocity, 0)} class="slider w-full" id="velocitySlider"></div> </div>`;
});
export {
  Controls as C,
  Logos as L
};
