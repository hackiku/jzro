import { c as create_ssr_component, b as compute_rest_props, d as spread, f as escape_object, h as escape_attribute_value, p as each, v as validate_component, a as subscribe, e as escape, i as add_attribute } from "./ssr.js";
import { w as writable } from "./index.js";
import { i as is_void } from "./names.js";
/**
 * @license lucide-svelte v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name = void 0 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode = [] } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Jzro = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen = false } = $$props;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
  return `  ${isOpen ? `<div class="absolute top-full left-0 mt-2 p-6 text-white bg-gray-900 border border-gray-800 rounded-lg shadow-lg w-[80vw] max-w-4xl" data-svelte-h="svelte-1pmbmcf"><h2 class="text-2xl font-mono mb-3">JZRO 242151Z 26007KT CLEAR -13/-76 Q0073</h2> <p class="text-sm text-gray-400 mb-3">March 24, 2024 / Sol 11007</p> <p class="text-base mb-6 text-gray-400">The Ingenuity helicopter earned Mars ICAO: JZRO, the only official airport code outside
      of Earth. This is the most recent weather report on Mars, Jezero crater, based on NASA data. It doesn&#39;t get more &#39;aero+space&#39; than that. Rest in peace wingy angel 💔</p> <a href="/" class="text-blue-500 hover:underline">Back to Home</a></div>` : ``}`;
});
const isMenuOpen = writable(false);
const activeTab = writable("");
const MenuTabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isMenuOpen, $$unsubscribe_isMenuOpen;
  let $activeTab, $$unsubscribe_activeTab;
  $$unsubscribe_isMenuOpen = subscribe(isMenuOpen, (value) => $isMenuOpen = value);
  $$unsubscribe_activeTab = subscribe(activeTab, (value) => $activeTab = value);
  const menuItems = ["Work", "About", "Contact"];
  $$unsubscribe_isMenuOpen();
  $$unsubscribe_activeTab();
  return `  ${$isMenuOpen ? ` <div class="absolute top-1/2 right-full mr-2 bg-gray-900 border border-gray-800 rounded-lg p-2 shadow-lg transform -translate-y-1/2"><div class="flex flex-row space-x-4">${each(menuItems, (item) => {
    return `<button class="${[
      "px-4 py-2 rounded-lg transition-colors duration-200 text-white text-lg",
      $activeTab === item.toLowerCase() ? "bg-gray-800" : ""
    ].join(" ").trim()}">${escape(item)} </button>`;
  })}</div></div>` : ``}`;
});
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isMenuOpen, $$unsubscribe_isMenuOpen;
  $$unsubscribe_isMenuOpen = subscribe(isMenuOpen, (value) => $isMenuOpen = value);
  let isJzroOpen = false;
  let navElement;
  let menuButtonElement;
  $$unsubscribe_isMenuOpen();
  return `  <nav class="fixed top-0 left-0 w-full px-4 sm:px-10 sm:px-16 py-6 flex justify-between items-center z-50"${add_attribute("this", navElement, 0)}><div class="relative"><button class="text-[#F3201D] text-2xl font-medium hover:underline h-12 flex items-center">${escape("jzro")}</button> ${validate_component(Jzro, "Jzro").$$render($$result, { isOpen: isJzroOpen }, {}, {})}</div> <div class="relative"><button class="text-white w-12 h-12 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors duration-200"${add_attribute("this", menuButtonElement, 0)}><div class="w-8 h-8 flex items-center justify-center">${$isMenuOpen ? `${validate_component(X, "X").$$render($$result, { size: 24 }, {}, {})}` : `${validate_component(Menu, "Menu").$$render($$result, { size: 24 }, {}, {})}`}</div></button> ${validate_component(MenuTabs, "MenuTabs").$$render($$result, {}, {}, {})}</div></nav>`;
});
export {
  Icon as I,
  Nav as N,
  activeTab as a,
  isMenuOpen as i
};
