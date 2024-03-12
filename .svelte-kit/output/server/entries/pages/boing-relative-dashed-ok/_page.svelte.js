import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
const css = {
  code: ".rocket.svelte-1umrs40{position:absolute;top:80vh;left:5vw;transform:translateX(-20%);width:20em;z-index:10}.velocity.svelte-1umrs40{color:#ff3d00}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let velocity = 30;
  let trajectoryPath = "";
  $$result.css.add(css);
  return `  <section class="flex-col items-center justify-start h-screen"><div class="relative w-full h-full"> <img src="game/bananica.png" alt="rocket" class="rocket svelte-1umrs40">  <svg class="absolute" width="100vw" height="100vh" style="position: absolute; bottom: 20vh; left: 5vw;" fill="none" xmlns="http://www.w3.org/2000/svg"><path${add_attribute("d", trajectoryPath, 0)} fill="none" stroke="#ff3d00" stroke-width="0.5" stroke-dasharray="10,10"></path></svg></div> <div data-svelte-h="svelte-1klssmm"> <svg class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"></circle></svg></div>  <div class="z-50 fixed p-6 bottom-12 rounded-full hover:backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2"><button class="text-4xl" data-svelte-h="svelte-1n100iy">💥</button> <div class="relative space-between-12 flex flex-col justify-center group hover:opacity-100 transition-opacity"><p>v = <span class="velocity svelte-1umrs40">${escape(velocity)}</span> m/s</p> <input type="range" min="1" max="100"${add_attribute("value", velocity, 0)} class="slider w-full" id="particleNumber"></div></div> <img src="assets/footer.svg" alt="" class="absolute inset-x-0 bottom-0 w-full z-0 mb-0"> </section>`;
});
export {
  Page as default
};
