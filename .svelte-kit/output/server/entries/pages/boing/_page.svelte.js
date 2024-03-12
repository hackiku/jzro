import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import { P as Planet } from "../../../chunks/Planet.js";
const css = {
  code: ".rocket.svelte-1jnt8wo{position:absolute;top:80vh;left:5vw;transform:translateX(-20%);width:9em !important;z-index:10}.velocity.svelte-1jnt8wo{color:#ff3d00}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let velocity = 43;
  let trajectoryPath = "";
  $$result.css.add(css);
  return `    <section class="flex-col items-center justify-start h-screen"><div class="relative w-full h-full"> <img src="game/bananica.png" alt="rocket" class="rocket svelte-1jnt8wo">  <svg class="absolute" width="100vw" height="100vh" style="position: absolute; bottom: 20vh; left: 5vw;" fill="none" xmlns="http://www.w3.org/2000/svg"><path${add_attribute("d", trajectoryPath, 0)} fill="none" stroke="#ff3d00" stroke-width="0.5" stroke-dasharray="10,10"></path></svg></div> <div> <div class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100">${validate_component(Planet, "Planet").$$render(
    $$result,
    {
      initialGravity: 40,
      color: "#F4191D",
      label: "Jao Bre"
    },
    {},
    {}
  )}</div>    </div>  <div class="z-50 fixed p-6 bottom-6 rounded-full backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2"><button class="text-5xl mr-6 hover:bg-red-500 rounded-full" data-svelte-h="svelte-156r4tt">💥</button> <div class="relative space-between-12 flex flex-col justify-center group hover:opacity-100 transition-opacity"><p>v = <span class="velocity svelte-1jnt8wo">${escape(velocity)}</span> m/s</p> <input type="range" min="1" max="100"${add_attribute("value", velocity, 0)} class="slider w-full" id="particleNumber"></div></div> <img src="assets/footer.svg" alt="" class="fixed inset-x-0 bottom-0 w-full z-0 mb-0">  ${``} </section>`;
});
export {
  Page as default
};
