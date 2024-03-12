import { c as create_ssr_component, v as validate_component, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { N as Nav } from "../../../chunks/Nav.js";
let diameter = 340;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `    ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <section class="flex flex-row mr-12 px-20 py-12 bg-darkBg text-white"> <div class="flex flex-col items-end space-y-4 p-14" data-svelte-h="svelte-4pjopx"><img src="memes/hello-friend.png" alt="Hello Friend Meme" class="transform rotate-[15deg]"> <img src="memes/choppa.png" alt="Get to the Choppa Meme" class="transform rotate-[-15deg]"></div>  <div class="flex justify-center items-center text-white"> <svg class="z-10"${add_attribute("width", diameter, 0)}${add_attribute("height", diameter, 0)} viewBox="${"0 0 " + escape(diameter, true) + " " + escape(diameter, true)}"><circle${add_attribute("cx", diameter / 2, 0)}${add_attribute("cy", diameter / 2, 0)}${add_attribute("r", diameter / 2, 0)} fill="#1B0087"></circle><foreignObject x="0" y="0"${add_attribute("width", diameter, 0)}${add_attribute("height", diameter, 0)}><div xmlns="http://www.w3.org/1999/xhtml" style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;"><h3 class="text-4xl text-white mb-4">Let&#39;s Talk</h3><a href="mailto:ivan@jzro.co" class="text-xl underline mb-4">ivan@jzro.co</a><input type="range" min="1" max="100" class="slider w-48 mb-4" id="ctaSlider"><a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer"><img class="h-24" src="assets/WhatsApp.svg" alt="WhatsApp"></a></div></foreignObject></svg></div></section>`;
});
export {
  Page as default
};
