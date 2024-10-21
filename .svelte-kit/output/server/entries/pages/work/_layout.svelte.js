import { c as create_ssr_component } from "../../../chunks/ssr.js";
/* empty css                  */
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${$$result.head += `<!-- HEAD_svelte-7jzmt4_START -->${$$result.title = `<title>Work | jzro</title>`, ""}<meta name="description" content="Portfolio of aerospace UX and software projects by jzro."><!-- HEAD_svelte-7jzmt4_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
