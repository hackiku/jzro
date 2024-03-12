import { c as create_ssr_component, d as each, b as add_attribute, e as escape } from "./ssr.js";
const Logos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { logos = [
    {
      src: "portfolio/redocly-logo.svg",
      alt: "Redocly"
    },
    {
      src: "portfolio/uploadcare-logo.svg",
      alt: "Uploadcare"
    },
    {
      src: "portfolio/highfive-logo.svg",
      alt: "HighFive"
    },
    {
      src: "portfolio/linguado-logo.jpg",
      alt: "Linguado"
    },
    {
      src: "portfolio/uploadcare-logo.svg",
      alt: "Uploadcare"
    }
  ] } = $$props;
  if ($$props.logos === void 0 && $$bindings.logos && logos !== void 0)
    $$bindings.logos(logos);
  return `  <div class="flex flex-wrap justify-center items-center gap-4 sm:flex-nowrap sm:gap-6 md:gap-8 lg:gap-12">${each(logos, (logo) => {
    return `<div class="inline-block"${add_attribute(
      "style",
      `transform: ${logo.alt === "Linguado" ? "scale(1.5) rotate(14deg)" : "none"}; margin: ${logo.alt === "Linguado" ? "-10% 0" : "0"};`,
      0
    )}><img${add_attribute("class", `object-contain ${"opacity-90"} h-auto w-24 md:w-32 lg:w-40`, 0)}${add_attribute("src", logo.src, 0)}${add_attribute("alt", logo.alt, 0)}> </div>`;
  })}</div>`;
});
const css = {
  code: ".velocity.svelte-1dv1z6m{color:#FF3D00}",
  map: null
};
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { velocity = 17 } = $$props;
  if ($$props.velocity === void 0 && $$bindings.velocity && velocity !== void 0)
    $$bindings.velocity(velocity);
  $$result.css.add(css);
  return `   <div class="z-50 fixed p-6 bottom-6 rounded-full backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2 opacity-10 hover:opacity-100"><button class="text-5xl mr-6 hover:bg-red-500 rounded-full" data-svelte-h="svelte-156r4tt">💥</button>  <div class="relative w-1/2 flex flex-col space-y-2 items-start group transition-opacity"> <div class="flex flex-row items-center space-x-3 justify-center"> <p>v = <span class="velocity svelte-1dv1z6m">${escape(velocity)}</span> km/s</p></div>  <input type="range" min="1" max="100"${add_attribute("value", velocity, 0)} class="slider w-full" id="particleNumber"></div> </div>`;
});
export {
  Controls as C,
  Logos as L
};
