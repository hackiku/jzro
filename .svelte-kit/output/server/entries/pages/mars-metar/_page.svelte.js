import { c as create_ssr_component, d as each, e as escape, i as null_to_empty, v as validate_component } from "../../../chunks/ssr.js";
/* empty css                                                 */
import { N as Nav } from "../../../chunks/Nav.js";
const css = {
  code: ".text-red-600.svelte-qapxe5{color:#F4191D}",
  map: null
};
const Jzro = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let metarData = [
    {
      code: "JZRO",
      explanation: "Jezero Crater\nSyrtis Major quadrangle\nMars",
      color: "text-red-600"
    },
    {
      code: "032151Z",
      explanation: "Day of the month and time in UTC",
      color: "text-white"
    }
  ];
  $$result.css.add(css);
  return `   <div class="flex justify-center mt-8 text-2xl font-mono text-white">${each(metarData, (segment) => {
    return `<div class="group relative mx-1"><span class="${escape(null_to_empty(segment.color), true) + " svelte-qapxe5"}">${escape(segment.code)}</span> <div class="absolute left-0 right-0 bottom-0 mb-6 hidden group-hover:block bg-darkBg p-2 rounded"><span class="text-white text-xs whitespace-pre">${escape(segment.explanation)}</span></div> </div>`;
  })} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(Jzro, "Jzro").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
