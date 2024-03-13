// lib/grav/physicsStore.js
// return `M${startX},${startY} Q${(startX + endX) / 2},${startY + bend} ${endX},${endY}`;

import { writable } from 'svelte/store';

const initialState = {
  velocity: 17,
  planets: [
    { id: 'cta', gravity: 7, x: 50, y: 50 },
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
  
  // Use gravity and velocity to influence the semi-major and semi-minor axes
  // For simplicity, we'll make the orbit more dramatic based on these values
  const gravityEffect = gravity;
  const velocityEffect = velocity;

  // Adjust these factors to suit the visual effect you're going for
  const orbitFactor = 0.5; // Adjust this to change the size of the orbit
  const semiMajorAxis = (velocityEffect + gravityEffect) * orbitFactor;
  const semiMinorAxis = semiMajorAxis * 3; // Adjust the ratio for ellipticity
  
  // For the second focus, we'll assume it's vertically aligned with the first
  // Since it's outside the viewport, we don't need its exact position for the path
  // We only need to ensure the path looks visually correct

  // Assuming the planet is one of the foci, we'll draw an ellipse centered on the planet
  // This simplification ignores the accurate orbital mechanics where the center and foci differ
  // but provides a visually appealing path
  
  // The SVG arc command needs a flag to decide the sweep direction and another to decide
  // whether to take the longer or shorter way around the ellipse. These are set to 1, 0
  // respectively for a visually appealing orbit
  let path = `M ${planetX - semiMajorAxis} ${planetY}`; // Start from the left-most point of the orbit
  path += ` A ${semiMajorAxis} ${semiMinorAxis} 0 1 0 ${planetX + semiMajorAxis} ${planetY}`; // Arc to the right-most point
  path += ` A ${semiMajorAxis} ${semiMinorAxis} 0 1 0 ${planetX - semiMajorAxis} ${planetY}`; // And back to start for a full orbit

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
