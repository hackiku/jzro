import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { N as Nav } from "../../../chunks/Nav.js";
import { G as GravityLauncher, C as Controls, L as Logos } from "../../../chunks/GravityLauncher.js";
import { P as Planet } from "../../../chunks/Planet.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `    ${validate_component(GravityLauncher, "GravityLauncher").$$render($$result, {}, {}, {})} ${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <main class="overflow-none"> <svg class="fixed top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;"><circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue"></circle></svg>   <section class="relative flex flex-col justify-center items-center h-screen"><div class="text-center space-y-4 -mt-[12vh]" data-svelte-h="svelte-1j5d85j"><h2 class="text-6xl">Aerospace UX</h2> <p class="text-2xl">User experience writing &amp; design <br> that makes products fly.</p></div> ${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      id: "cta",
      color: "#F4191D",
      label: "Fly me to Orbit"
    },
    {},
    {}
  )}  <div class="absolute bottom-28 mx-auto px-20 w-full max-w-4xl">${validate_component(Logos, "Logos").$$render($$result, {}, {}, {})}</div></section></main>`;
});
export {
  Page as default
};
