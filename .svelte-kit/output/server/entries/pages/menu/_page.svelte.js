import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { a as activeTab, i as isMenuOpen, N as Nav } from "../../../chunks/Nav.js";
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeTab, $$unsubscribe_activeTab;
  $$unsubscribe_activeTab = subscribe(activeTab, (value) => $activeTab = value);
  $$unsubscribe_activeTab();
  return `  <div class="p-4">${$activeTab === "work" ? `<h2 class="text-3xl mb-4" data-svelte-h="svelte-1xe11jb">Work</h2>  <p data-svelte-h="svelte-1qugeq8">Work content goes here</p>` : `${$activeTab === "about" ? `<h2 class="text-3xl mb-4" data-svelte-h="svelte-1nnyf2h">About</h2>  <p data-svelte-h="svelte-1li1d2k">About content goes here</p>` : `${$activeTab === "contact" ? `<h2 class="text-3xl mb-4" data-svelte-h="svelte-1fkl5u">Contact</h2>  <p data-svelte-h="svelte-1apb551">Contact content goes here</p>` : `<p data-svelte-h="svelte-cwybdx">Select a tab to view content</p>`}`}`}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isMenuOpen, $$unsubscribe_isMenuOpen;
  $$unsubscribe_isMenuOpen = subscribe(isMenuOpen, (value) => $isMenuOpen = value);
  $$unsubscribe_isMenuOpen();
  return `  <div class="relative w-screen h-screen bg-gray-900 text-white overflow-hidden">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <main class="pt-20 px-4 h-full overflow-y-auto">${$isMenuOpen ? `${validate_component(Content, "Content").$$render($$result, {}, {}, {})}` : `<h1 class="text-4xl mb-4" data-svelte-h="svelte-1rdb873">Welcome to the Menu Test Page</h1> <p data-svelte-h="svelte-1wp0eog">Click the menu icon to explore different sections.</p>`}</main></div>`;
});
export {
  Page as default
};
