// lib/grav/physicsStore.js
// return `M${startX},${startY} Q${(startX + endX) / 2},${startY + bend} ${endX},${endY}`;

import { writable } from 'svelte/store';

const initialState = {
  velocity: 17,
  planets: [
    { id: 'cta', gravity: 10, x: 50, y: 50 },
    // Ensure all planets have `x` and `y` properties
    { id: 'work', gravity: 30, x: 60, y: 40 },
    { id: 'fun', gravity: 40, x: 20, y: 80 },
    { id: 'github', gravity: 15, x: 70, y: 20 },
    { id: 'contact', gravity: 140, x: 30, y: 70 },
  ],
  trajectoryPath: '',
};

function calculateTrajectory(velocity, planet) {
  // Destructure the planet's properties for clarity
  const { gravity, x: planetX, y: planetY } = planet;
  
  // Define starting point (e.g., top right corner)
  const startX = 80, startY = 0;
  
  // Placeholder for end coordinates (could be dynamically calculated based on physics)
  const endX = startX, endY = 100;
  
  // Calculate the distance to the planet's center to adjust the gravity effect
  // This is a simplified version; you might need a more complex formula for accurate simulation
  const dx = planetX - startX;
  const dy = planetY - startY;
  const distance = Math.sqrt(dx*dx + dy*dy);
  const gravityEffect = gravity / (distance / 2); // Simplified gravity effect based on distance
  
  // Adjust the control point based on gravity effect and distance to planet
  const controlX = startX + (dx * gravityEffect);
  const controlY = startY + (dy * gravityEffect);

  return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
}

const physicsStore = writable(initialState);
physicsStore.update(state => {
  // Select the planet or use default settings for initial calculation
  const planet = state.planets.find(p => p.id === 'cta') || state.planets[0];
  state.trajectoryPath = calculateTrajectory(state.velocity, planet);
  return state;
});

// physicsStore.update(state => {
//   const defaultGravity = state.planets[0].gravity; // Default to first planet's gravity
//   const initialVelocity = state.velocity;
//   state.trajectoryPath = calculateTrajectory(initialVelocity, defaultGravity);
//   return state;
// });

const setVelocity = (newVelocity) => {
  physicsStore.update(state => {
    const planet = state.planets[0]; // Adjust to select the correct planet as needed
    const newTrajectoryPath = calculateTrajectory(newVelocity, planet);
    return { ...state, velocity: newVelocity, trajectoryPath: newTrajectoryPath };
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
    // Find the planet again to pass its full data to calculateTrajectory
    const planet = updatedPlanets.find(planet => planet.id === id);
    const newTrajectoryPath = calculateTrajectory(state.velocity, planet || updatedPlanets[0]);
    return { ...state, planets: updatedPlanets, trajectoryPath: newTrajectoryPath };
  });
};

export default {
  subscribe: physicsStore.subscribe,
  setVelocity,
  updatePlanetGravity,
};
