// lib/grav/physicsStore.js
import { writable } from 'svelte/store';

const initialState = {
  velocity: 17,
  planets: [
    { id: 'cta', gravity: 10, isActive: false },
    { id: 'work', gravity: 30, isActive: false },
    { id: 'fun', gravity: 40, isActive: false },
    { id: 'github', gravity: 15, isActive: false },
    { id: 'contact', gravity: 140, isActive: false },
  ],
  trajectoryPath: '',
};

const physicsStore = writable(initialState);
physicsStore.update(state => {
  // Use the first planet's gravity or a sensible default for the initial trajectory
  const defaultGravity = state.planets[0].gravity; // Adjust as necessary
  const initialVelocity = state.velocity;
  return { ...state, trajectoryPath: calculateTrajectory(initialVelocity, defaultGravity) };
});

function calculateTrajectory(velocity, gravity) {
  // Your trajectory calculation logic
  // Placeholder calculation for demonstration
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

// Define methods to be attached to the store
const setVelocity = (newVelocity) => {
  physicsStore.update(state => {
    const newTrajectoryPath = calculateTrajectory(newVelocity, state.planets.find(planet => planet.isActive)?.gravity || 50);
    return { ...state, velocity: newVelocity, trajectoryPath: newTrajectoryPath };
  });
};

const togglePlanetActive = (planetId) => {
  physicsStore.update(state => {
    const updatedPlanets = state.planets.map(planet => {
      if (planet.id === planetId) {
        return { ...planet, isActive: !planet.isActive };
      }
      return planet;
    });
    return { ...state, planets: updatedPlanets };
  });
};

const updatePlanetGravity = (id, newGravity) => {
  physicsStore.update(state => {
    const updatedPlanets = state.planets.map(planet => {
      if (planet.id === id) {
        return { ...planet, gravity: newGravity };
      }
      return planet;
    });
    return { ...state, planets: updatedPlanets };
  });
};

// Expose the custom store interface
export default {
  subscribe: physicsStore.subscribe,
  setVelocity,
  togglePlanetActive,
  updatePlanetGravity, // Correctly include this for external use
  calculateTrajectory, // Ensure this is properly exposed
};
