// lib/grav/physicsStore.js
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

// physicsStore.update(state => {
//   const defaultGravity = 50;
//   const newTrajectoryPath = calculateTrajectory(state.velocity, defaultGravity);
//   return { ...state, trajectoryPath: newTrajectoryPath };
// });


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
      const newTrajectoryPath = calculateTrajectory(newVelocity, 50); // Assuming a default or currently active planet's gravity
      return { ...state, velocity: newVelocity, trajectoryPath: newTrajectoryPath };
    });
  },
  calculateTrajectory: () => { // This method now properly reflects on the customPhysicsStore object.
    physicsStore.update(state => {
      const activePlanetGravity = state.planets.find(planet => planet.isActive)?.gravity || 50; // Assuming a default gravity if none is active
      const newTrajectoryPath = calculateTrajectory(state.velocity, activePlanetGravity);
      return { ...state, trajectoryPath: newTrajectoryPath };
    });
  }
};

console.log('physicsStore.js: physicsStore created');

export default customPhysicsStore;
