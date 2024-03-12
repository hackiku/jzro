import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { N as Nav } from "../../../chunks/Nav.js";
import { G as GravityLauncher, C as Controls, L as Logos } from "../../../chunks/GravityLauncher.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `    <div class="fixed w-[100vw]">${validate_component(GravityLauncher, "GravityLauncher").$$render($$result, {}, {}, {})}</div> <main class="overflow-none">${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;"><circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue"></circle></svg>  <section class="hero mt-24 py-8 flex justify-center items-center" data-svelte-h="svelte-12zzjls"><div class="max-w-md text-center"><h2 class="text-6xl text-white mb-4">Aerospace UX</h2> <p class="text-2xl text-gray-500 mb-8">User experience writing &amp; design <br> that makes products fly.</p>   <div class="flex justify-center items-center space-x-4"></div></div></section>  <section class="flex justify-center opacity-30 hover:opacity-100"><div class="px-20 w-full max-w-4xl">${validate_component(Logos, "Logos").$$render($$result, {}, {}, {})}</div></section></main>`;
});
export {
  Page as default
};
