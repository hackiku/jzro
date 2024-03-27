import { c as create_ssr_component, b as add_attribute, e as escape, d as each } from "./ssr.js";
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { y } = $$props;
  let lastY = 0;
  let navbarTop = 0;
  let isOpen = false;
  const navItems = [
    // { href: '/hero', label: 'hero' },
    // { href: '/fiddle', label: 'fiddle' },
    { href: "/boing", label: "boing" },
    { href: "/mars-metar", label: "metar" }
  ];
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  {
    {
      if (y > lastY) {
        navbarTop = "-50%";
        isOpen = false;
      } else {
        navbarTop = "1em";
      }
      lastY = y;
    }
  }
  return `   <div${add_attribute("class", `fixed top-0 inset-x-0 transition-all duration-300 ease-in-out ${isOpen ? "mt-2" : ""} rounded-3xl lg:rounded-full bg-gray-900 bg-opacity-50 z-50 backdrop-blur-md inset-x-[6vw] sm:inset-x-[12vw] md:inset-x-[20vw] px-6`, 0)} style="${"top: " + escape(navbarTop, true) + ";"}"><header class="flex flex-col py-4 lg:flex-row lg:items-center"><div class="flex justify-between"><a href="/" class="font-mono hover:text-[#F4191D] shrink-0" data-svelte-h="svelte-6xp39u">🚁 jzro</a>  <p class="text-xs ml-3 mt-1 px">${escape(y)}</p>  <button class="lg:hidden"><span class="sr-only">${escape(isOpen ? "Close menu" : "Open menu")}</span> ${isOpen ? ` <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>` : ` <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`}</button></div> <nav${add_attribute("class", `${isOpen ? "flex" : "hidden"} flex-col gap-6 lg:flex lg:flex-row lg:w-full`, 0)}><ul class="flex flex-col mt-6 lg:mt-0 lg:flex-row lg:flex-grow lg:justify-end lg:space-x-6">${each(navItems, ({ href, label }) => {
    return `<li class="w-100 border-b border-gray-800 lg:border-none"><a${add_attribute("href", href, 0)} class="block py-2 text-gray-600 hover:text-[#F4191D]">${escape(label)}</a> </li>`;
  })}</ul> <button class="px-6 py-2 rounded-full bg-[#F4191D]" data-svelte-h="svelte-1so5psd">say hi 👋</button></nav></header></div>`;
});
export {
  Nav as N
};
