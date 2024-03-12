import { c as create_ssr_component, d as each, b as add_attribute, o as onDestroy, e as escape } from "./ssr.js";
import { w as writable } from "./index.js";
const Logos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { logos = [
    {
      src: "portfolio/redocly-logo.svg",
      alt: "Redocly"
    },
    {
      src: "portfolio/uploadcare-logo.svg",
      alt: "Uploadcare"
    },
    {
      src: "portfolio/highfive-logo.svg",
      alt: "HighFive"
    },
    {
      src: "portfolio/linguado-logo.jpg",
      alt: "Linguado"
    },
    {
      src: "portfolio/uploadcare-logo.svg",
      alt: "Uploadcare"
    }
  ] } = $$props;
  if ($$props.logos === void 0 && $$bindings.logos && logos !== void 0)
    $$bindings.logos(logos);
  return `  <div class="flex flex-wrap justify-center items-center gap-4 sm:flex-nowrap sm:gap-6 md:gap-8 lg:gap-12">${each(logos, (logo) => {
    return `<div class="inline-block"${add_attribute(
      "style",
      `transform: ${logo.alt === "Linguado" ? "scale(1.5) rotate(14deg)" : "none"}; margin: ${logo.alt === "Linguado" ? "-10% 0" : "0"};`,
      0
    )}><img${add_attribute("class", `object-contain ${"opacity-90"} h-auto w-24 md:w-32 lg:w-40`, 0)}${add_attribute("src", logo.src, 0)}${add_attribute("alt", logo.alt, 0)}> </div>`;
  })}</div>`;
});
const initialState = {
  velocity: 10,
  planets: [
    { id: "cta", gravity: 0.5, isActive: false },
    { id: "work", gravity: 1, isActive: false },
    { id: "fun", gravity: 1.5, isActive: false },
    { id: "github", gravity: 1.5, isActive: false },
    { id: "contact", gravity: 1.5, isActive: false }
  ],
  trajectoryPath: ""
};
const physicsStore = writable(initialState);
function calculateTrajectory(velocity, gravity) {
  const normalizedGravityEffect = 50 - gravity;
  const normalizedVelocityEffect = Math.min(velocity / 10, 10);
  const controlX1 = 50 + normalizedVelocityEffect * 5;
  const controlY1 = 75 - normalizedGravityEffect * 2;
  const controlX2 = 50 + normalizedVelocityEffect * 10;
  const controlY2 = 25 + normalizedGravityEffect;
  const endX = 80 - normalizedGravityEffect;
  const endY = 0;
  return `M40,100 C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
}
const customPhysicsStore = {
  subscribe: physicsStore.subscribe,
  setVelocity: (newVelocity) => {
    physicsStore.update((state) => {
      const newTrajectoryPath = calculateTrajectory(newVelocity, state.planets[0].gravity);
      return { ...state, velocity: newVelocity, trajectoryPath: newTrajectoryPath };
    });
  },
  togglePlanetActive: (planetId) => {
    physicsStore.update((state) => {
      const planets = state.planets.map((planet) => {
        if (planet.id === planetId) {
          return { ...planet, isActive: !planet.isActive };
        }
        return planet;
      });
      const newTrajectoryPath = calculateTrajectory(state.velocity, planets[0].gravity);
      return { ...state, planets, trajectoryPath: newTrajectoryPath };
    });
  }
  // Other methods can be added here as needed.
};
console.log("physicsStore.js: physicsStore created");
const css = {
  code: ".velocity.svelte-1dv1z6m{color:#FF3D00}",
  map: null
};
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let localVelocity;
  const unsubscribe = customPhysicsStore.subscribe(($physicsStore) => {
    localVelocity = $physicsStore.velocity;
  });
  onDestroy(() => {
    unsubscribe();
  });
  $$result.css.add(css);
  return `   <div class="z-50 fixed p-6 bottom-6 rounded-full backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2 opacity-10 hover:opacity-100"><button class="text-5xl mr-6 hover:bg-red-500 rounded-full" data-svelte-h="svelte-156r4tt">💥</button>  <div class="relative w-1/2 flex flex-col space-y-2 items-start group transition-opacity"> <div class="flex flex-row items-center space-x-3 justify-center"><p>v = <span class="velocity svelte-1dv1z6m">${escape(localVelocity)}</span> km/s</p></div>  <input type="range" min="1" max="100"${add_attribute("value", localVelocity, 0)} class="slider w-full" id="velocitySlider"></div> </div>`;
});
const GravityLauncher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trajectoryPath;
  customPhysicsStore.subscribe((state) => {
    trajectoryPath = state.trajectoryPath;
  });
  return `   <section class="flex items-center justify-center h-screen z-0 relative"> <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0 z-0"><path${add_attribute("d", trajectoryPath, 0)} fill="none" stroke="#ff3d00" stroke-width="0.2" stroke-dasharray="2,2"></path></svg> </section>`;
});
export {
  Controls as C,
  GravityLauncher as G,
  Logos as L,
  customPhysicsStore as c
};
