// lib/physicsStore.js
import { writable } from 'svelte/store';

// Define the initial state for your physics, including velocity and planet gravity.
const initialState = {
  velocity: 10,
  planets: [
    { id: 'cta', gravity: 0.5, isActive: false },
    { id: 'work', gravity: 1, isActive: false },
    { id: 'fun', gravity: 1.5, isActive: false },
    { id: 'github', gravity: 1.5, isActive: false },
    { id: 'contact', gravity: 1.5, isActive: false },
  ],
  trajectoryPath: '',
};

const physicsStore = writable(initialState);
// const physicsStore = writable({...initialState, trajectoryPath: calculateTrajectory(initialState.velocity, initialGravity)});


// calculate trajectory based on velocity and gravity
function calculateTrajectory(velocity, gravity) {
  // Placeholder calculation - replace with actual physics logic.
  const normalizedGravityEffect = 50 - gravity; // Simulating gravity's pull.
  const normalizedVelocityEffect = Math.min(velocity / 10, 10); // Simulating velocity's effect.

  const controlX1 = 50 + normalizedVelocityEffect * 5;
  const controlY1 = 75 - normalizedGravityEffect * 2;
  const controlX2 = 50 + normalizedVelocityEffect * 10;
  const controlY2 = 25 + normalizedGravityEffect;
  const endX = 80 - normalizedGravityEffect;
  const endY = 0;

  return `M40,100 C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
}

// Adding methods to the store.
const customPhysicsStore = {
  subscribe: physicsStore.subscribe,
  setVelocity: (newVelocity) => {
    physicsStore.update(state => {
      // Perform your calculation with the new velocity.
      const newTrajectoryPath = calculateTrajectory(newVelocity, state.planets[0].gravity);
      return { ...state, velocity: newVelocity, trajectoryPath: newTrajectoryPath };
    });
  },
  togglePlanetActive: (planetId) => {
    physicsStore.update(state => {
      const planets = state.planets.map(planet => {
        if (planet.id === planetId) {
          return { ...planet, isActive: !planet.isActive };
        }
        return planet;
      });
      // Recalculate trajectory in case the active planet's gravity has changed.
      const newTrajectoryPath = calculateTrajectory(state.velocity, planets[0].gravity);
      return { ...state, planets, trajectoryPath: newTrajectoryPath };
    });
  },
  // Other methods can be added here as needed.
};

console.log('physicsStore.js: physicsStore created');

export default customPhysicsStore;
