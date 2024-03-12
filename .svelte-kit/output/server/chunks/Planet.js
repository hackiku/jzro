import { c as create_ssr_component, h as createEventDispatcher, e as escape, b as add_attribute } from "./ssr.js";
const Planet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { initialGravity = 20 } = $$props;
  let { gravity = initialGravity } = $$props;
  let { color = "red" } = $$props;
  let { label = "" } = $$props;
  let diameter;
  const dispatch = createEventDispatcher();
  const calculateDiameter = () => Math.sqrt(gravity) * (Math.min(window.innerWidth, window.innerHeight) / 24);
  if ($$props.initialGravity === void 0 && $$bindings.initialGravity && initialGravity !== void 0)
    $$bindings.initialGravity(initialGravity);
  if ($$props.gravity === void 0 && $$bindings.gravity && gravity !== void 0)
    $$bindings.gravity(gravity);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  {
    if (gravity !== initialGravity) {
      dispatch("gravityChange", { newGravity: gravity });
      diameter = calculateDiameter();
    }
  }
  return `  <div class="text-center my-4"><div class="inline-block relative z-0"><svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style="${"width: " + escape(diameter, true) + "px; height: " + escape(diameter, true) + "px;"}"><circle cx="50%" cy="50%"${add_attribute("r", diameter / 2, 0)}${add_attribute("fill", color, 0)}></circle></svg> <span class="absolute top-1/2 left-full transform -translate-y-1/2 ml-6 text-white font-mono text-sm whitespace-nowrap z-10">${escape(label)}</span></div> <div class="mt-6 ml-16 relative z-20"><input type="range" min="0" max="100" class="w-1/2 max-w-1/4"${add_attribute("value", gravity, 0)}></div></div>`;
});
export {
  Planet as P
};
