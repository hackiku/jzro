import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { N as Nav } from "../../../chunks/Nav.js";
import { C as Controls, L as Logos } from "../../../chunks/Controls.js";
import { P as Planet } from "../../../chunks/Planet.js";
import { G as GravityLauncher } from "../../../chunks/GravityLauncher.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `    <div class="fixed w-[100vw]">${validate_component(GravityLauncher, "GravityLauncher").$$render($$result, {}, {}, {})}</div> <main class="overflow-none">${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;"><circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue"></circle></svg>  <section class="hero mt-24 py-8 flex justify-center items-center"><div class="max-w-md text-center"><h2 class="text-6xl text-white mb-4" data-svelte-h="svelte-1qkgyhk">Aerospace UX</h2> <p class="text-2xl text-gray-500 mb-8" data-svelte-h="svelte-uqz3vq">User experience writing &amp; design <br> that makes products fly.</p> ${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      initialGravity: 10,
      color: "#F4191D",
      label: "Fly me to Orbit"
    },
    {},
    {}
  )} <div class="flex justify-center items-center space-x-4" data-svelte-h="svelte-u7kny"></div></div></section>  <section class="flex justify-center opacity-30 hover:opacity-100"><div class="px-20 w-full max-w-4xl">${validate_component(Logos, "Logos").$$render($$result, {}, {}, {})}</div></section></main>`;
});
export {
  Page as default
};
