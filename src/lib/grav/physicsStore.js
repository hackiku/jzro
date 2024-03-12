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
  const { gravity, x: planetX, y: planetY } = planet;
  const startX = 80;
  const startY = 0;
  const straightPathEndY = 100; // The end of the velocity vector, going straight down

  // Adjust gravity effect for visualization, might need fine-tuning
  const gravityEffect = gravity * 4; 

  // Calculate the semi-major and semi-minor axes, simplified for the demonstration
  const distanceToPlanet = Math.sqrt((planetX - startX) ** 2 + (planetY - startY) ** 2);
  const semiMajorAxis = distanceToPlanet / 2 + gravityEffect;
  const semiMinorAxis = semiMajorAxis * 0.75; // Simplification for elliptical shape

  // Assuming the planet is always to the left for simplification
  const ellipseCenterX = startX;
  const ellipseCenterY = planetY; // Align with the end of the straight path

  // Construct the SVG path
  let path = `M ${startX} ${startY} L ${startX} ${straightPathEndY}`; // The initial straight path

  // Add the elliptical orbit. This needs adjustment for proper orientation and positioning
  // The ellipse is drawn to ensure it's oriented towards the planet and tangent to the velocity vector
  path += ` M ${ellipseCenterX} ${ellipseCenterY}`;
  path += ` A ${semiMajorAxis} ${semiMinorAxis} 0 1 0 ${startX - semiMajorAxis * 2} ${ellipseCenterY}`;
  path += ` A ${semiMajorAxis} ${semiMinorAxis} 0 1 0 ${ellipseCenterX} ${ellipseCenterY}`;

  return path;
}


const physicsStore = writable(initialState);
physicsStore.update(state => {
  // Select the planet or use default settings for initial calculation
  const planet = state.planets.find(p => p.id === 'cta') || state.planets[0];
  state.trajectoryPath = calculateTrajectory(state.velocity, planet);
  return state;
});

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
