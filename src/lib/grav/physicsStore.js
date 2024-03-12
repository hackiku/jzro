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
  const initialAngle = 270;

  // Calculate adjustments for gravity and initial velocity
  // This section needs more precise physics for realistic orbits, simplified here
  const gravityEffect = gravity; // Directly use gravity for this example
  const velocityEffect = velocity / 2; // Simplify the effect of velocity

  // Estimate ellipse parameters based on gravity and velocity
  // These are placeholders and need adjustment for realistic orbital dynamics
  const semiMajorAxis = velocityEffect + gravityEffect; // Simplify for demo
  const semiMinorAxis = semiMajorAxis * 0.5; // Arbitrary for now

  // Calculate ellipse position (focus at planet position, adjust accordingly)
  // The ellipse's center and the planet's position do not coincide in a realistic orbit
  // For simplification, treat them as if they do
  const ellipseCenterX = (startX + planetX) / 2;
  const ellipseCenterY = (startY + planetY) / 2;

  // Construct SVG path for the orbit
  let path = `M ${startX} ${startY}`;
  path += ` A ${semiMajorAxis} ${semiMinorAxis} 0 1 1 ${planetX} ${planetY}`;
  path += ` A ${semiMajorAxis} ${semiMinorAxis} 0 1 1 ${startX} ${startY}`;

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
