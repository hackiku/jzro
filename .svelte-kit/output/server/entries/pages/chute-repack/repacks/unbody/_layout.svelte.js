import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { B as BeforeAfter } from "../../../../../chunks/BeforeAfter.js";
import { p as page } from "../../../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isAfter = $page.url.searchParams.get("view") === "after";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  ${slots.default ? slots.default({}) : ``} <div class="fixed bottom-2 translate-x-0.5">${validate_component(BeforeAfter, "BeforeAfter").$$render(
      $$result,
      { value: isAfter },
      {
        value: ($$value) => {
          isAfter = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Layout as default
};
