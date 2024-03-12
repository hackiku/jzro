// lib/grav/physicsStore.js
// return `M${startX},${startY} Q${(startX + endX) / 2},${startY + bend} ${endX},${endY}`;

import { writable } from 'svelte/store';

const initialState = {
  velocity: 17,
  planets: [
    { id: 'cta', gravity: 10 },
    { id: 'work', gravity: 30 },
    { id: 'fun', gravity: 40 },
    { id: 'github', gravity: 15 },
    { id: 'contact', gravity: 140 },
  ],
  // trajectoryPath: '',

};

function calculateTrajectory(velocity, gravity) {
  // Enhance the effect calculation to account for decreasing gravity influence with distance
  const effect = Math.max(0, 1 - (velocity / 100)); // Maintains the initial approach
  const bend = gravity * effect; // Determines the overall bend influenced by gravity
  
  const startX = 80, startY = 0;
  
  const endX = 80 - bend, endY = 100; // Maintains the direction towards bottom
  
  // Control points influence the curve's shape; adjusting these based on gravity and velocity
  // can simulate how gravity would realistically pull the trajectory
  const controlX = (startX + endX) / 2;
  const controlY = startY + (endY - startY) * (effect); // Adjust based on gravity's effect
  
  return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
}

const physicsStore = writable(initialState);

physicsStore.update(state => {
  const defaultGravity = state.planets[0].gravity; // Default to first planet's gravity
  const initialVelocity = state.velocity;
  state.trajectoryPath = calculateTrajectory(initialVelocity, defaultGravity);
  return state;
});

const setVelocity = (newVelocity) => {
  physicsStore.update(state => {
    // Assuming the first planet's gravity as the acting force for simplicity
    const gravity = state.planets[0].gravity;
    const newTrajectoryPath = calculateTrajectory(newVelocity, gravity);
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
    // Assuming the update is for the first planet as the acting force
    const newTrajectoryPath = calculateTrajectory(state.velocity, newGravity);
    return { ...state, planets: updatedPlanets, trajectoryPath: newTrajectoryPath };
  });
};

export default {
  subscribe: physicsStore.subscribe,
  setVelocity,
  updatePlanetGravity,
};
