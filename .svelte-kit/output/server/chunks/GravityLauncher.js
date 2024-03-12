import { c as create_ssr_component, b as add_attribute } from "./ssr.js";
console.log("physicsStore.js: physicsStore created");
const GravityLauncher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { gravity = 80 } = $$props;
  let trajectoryPath;
  if ($$props.gravity === void 0 && $$bindings.gravity && gravity !== void 0)
    $$bindings.gravity(gravity);
  return `   <section class="flex items-center justify-center h-screen z-0 relative"> <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0 z-0"><path${add_attribute("d", trajectoryPath, 0)} fill="none" stroke="#ff3d00" stroke-width="0.2" stroke-dasharray="2,2"></path></svg> </section>`;
});
export {
  GravityLauncher as G
};
