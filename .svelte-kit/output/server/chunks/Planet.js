import { c as create_ssr_component, f as createEventDispatcher, e as escape, b as add_attribute } from "./ssr.js";
import { w as writable } from "./index.js";
const initialState = {
  velocity: 17,
  planets: [
    { id: "cta", gravity: 7, x: 50, y: 50 },
    { id: "work", gravity: 30, x: 60, y: 40 },
    { id: "fun", gravity: 40, x: 20, y: 80 },
    { id: "github", gravity: 15, x: 70, y: 20 },
    { id: "contact", gravity: 140, x: 30, y: 70 }
  ],
  trajectoryPath: ""
};
function calculateTrajectory(velocity, planet) {
  const { gravity, x: planetX, y: planetY } = planet;
  const fixedY = planetY + 100 - gravity ** 1.4 / 60;
  const bend = 120 - gravity ** 1.1 + velocity;
  const leftX = 80 + bend;
  const rightX = 100 - leftX;
  let path = `M ${leftX},0    Q 50,${fixedY}   ${rightX},0`;
  console.log(path);
  return path;
}
const physicsStore = writable(initialState);
physicsStore.update((state) => {
  const planet = state.planets.find((p) => p.id === "cta") || state.planets[0];
  state.trajectoryPath = calculateTrajectory(state.velocity, planet);
  return state;
});
const setVelocity = (newVelocity) => {
  physicsStore.update((state) => {
    const planet = state.planets[0];
    const newTrajectoryPath = calculateTrajectory(newVelocity, planet);
    return { ...state, velocity: newVelocity, trajectoryPath: newTrajectoryPath };
  });
};
const updatePlanetGravity = (id, newGravity) => {
  physicsStore.update((state) => {
    const updatedPlanets = state.planets.map((planet2) => {
      if (planet2.id === id) {
        return { ...planet2, gravity: newGravity };
      }
      return planet2;
    });
    const planet = updatedPlanets.find((planet2) => planet2.id === id);
    const newTrajectoryPath = calculateTrajectory(state.velocity, planet || updatedPlanets[0]);
    return { ...state, planets: updatedPlanets, trajectoryPath: newTrajectoryPath };
  });
};
const physicsStore$1 = {
  subscribe: physicsStore.subscribe,
  setVelocity,
  updatePlanetGravity
};
const Planet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { color = "red" } = $$props;
  let { label = "" } = $$props;
  let diameter = 100;
  let gravity;
  createEventDispatcher();
  const calculateDiameter = (gravity2) => {
    return 100;
  };
  physicsStore$1.subscribe(($physicsStore) => {
    const planet = $physicsStore.planets.find((p) => p.id === id);
    if (planet) {
      gravity = planet.gravity;
      diameter = calculateDiameter(planet.gravity);
    }
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `   <div class="text-center"><div class="inline-block relative z-0"><svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style="${"width: " + escape(diameter * 1.4, true) + "px; height: " + escape(diameter * 1.2, true) + "px;"}"><defs><radialGradient id="${"atmosphere-" + escape(id, true)}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="80%"${add_attribute("stop-color", color, 0)} stop-opacity="0.4"></stop><stop offset="100%"${add_attribute("stop-color", color, 0)} stop-opacity="0.15"></stop></radialGradient></defs><circle cx="50%" cy="50%"${add_attribute("r", diameter * 0.6, 0)}${add_attribute("fill", `url(#atmosphere-${id})`, 0)}></circle><circle cx="50%" cy="50%"${add_attribute("r", diameter / 2, 0)}${add_attribute("fill", color, 0)}></circle>${gravity >= 100 ? `<foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" class="h-full flex flex-col justify-center items-center"><div class="text-center mb-[12%] mt-[12%]"><div class="opacity-60 inline-flex items-center justify-center px-2 py-1 bg-gray-300 border border-gray-300 rounded-full gap-2 mb-3"><div class="text-[0.5em]">🟢</div><div class="text-xs text-gray-600">for hire</div></div><h3 class="text-4xl mb-2">Hey 👋</h3><a href="mailto:ivan@pipewriter.io" class="text-xl underline mb-4">ivan@pipewriter.io</a></div><div class="w-full flex justify-center"><a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" class=""><img class="h-[4em] mb-[35%]" src="assets/WhatsApp.svg" alt="WhatsApp"></a></div></div></foreignObject>` : ``}</svg>  <span class="absolute top-1/2 left-full transform -translate-y-1/2 ml-6 text-white font-mono text-sm whitespace-nowrap z-10">${gravity < 99 ? `${escape(label)}` : ``}</span></div> <div class="mt-6 relative z-20"><input type="range" min="0" max="100"${add_attribute("value", gravity, 0)} class="w-[25vw] ml-[5em] max-w-[10em]"></div></div>`;
});
export {
  Planet as P,
  physicsStore$1 as p
};
