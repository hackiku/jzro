import { c as create_ssr_component, e as escape, b as add_attribute, d as each } from "./ssr.js";
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const navItems = [
    { href: "/hero", label: "hero" },
    { href: "/fiddle", label: "fiddle" },
    { href: "/cta", label: "cta" },
    { href: "/mars-metar", label: "mars" }
  ];
  return `  <div class="fixed top-4 rounded-3xl lg:rounded-full bg-gray-900 bg-opacity-50 z-50 backdrop-blur-md inset-x-[6vw] sm:inset-x-[12vw] md:inset-x-[20vw] px-6"><header class="flex flex-col py-4 lg:flex-row lg:items-center "><div class="flex justify-between"><a href="/" class="font-mono hover:text-[#F4191D] shrink-0" data-svelte-h="svelte-ak5ij0">🚁 jzro</a> <button class="lg:hidden"><span class="sr-only">${escape("Open menu")}</span> ${` <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`}</button></div> <nav${add_attribute(
    "class",
    `${"hidden"} flex-col gap-6
      lg:flex lg:flex-row lg:w-full`,
    0
  )}><ul class="flex flex-col mt-6 lg:mt-0 lg:flex-row lg:flex-grow lg:justify-end lg:space-x-6">${each(navItems, ({ href, label }) => {
    return `<li class="w-100 border-b border-gray-800 lg:border-none"><a${add_attribute("href", href, 0)} class="block py-2 text-gray-600 hover:text-[#F4191D]">${escape(label)}</a> </li>`;
  })}</ul> <button class="px-6 py-2 rounded-full bg-[#F4191D]" data-svelte-h="svelte-1so5psd">say hi 👋</button></nav></header></div>`;
});
export {
  Nav as N
};
