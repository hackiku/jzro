// lib/grav/physicsStore.js
// return `M${startX},${startY} Q${(startX + endX) / 2},${startY + bend} ${endX},${endY}`;

import { writable } from 'svelte/store';

const initialState = {
  velocity: 17,
  planets: [
    { id: 'cta', gravity: 7, x: 50, y: 50 },
    { id: 'work', gravity: 30, x: 60, y: 40 },
    { id: 'fun', gravity: 40, x: 20, y: 80 },
    { id: 'github', gravity: 15, x: 70, y: 20 },
    { id: 'contact', gravity: 140, x: 30, y: 70 },
  ],
  trajectoryPath: '',
};

function calculateTrajectory(velocity, planet) {
  const { gravity, x: planetX, y: planetY } = planet;
  
  // define origin point
  const fixedY = planetY + 80 - (gravity **1.4) / 60;
  
  // approx parabola bend
  const bend = 140 - gravity**1.2 + velocity;
  // mirror left & right 
  const leftX = 80 + bend;
  const rightX = 100 - leftX;
  
  let path = `M ${leftX},0    Q 50,${fixedY}   ${rightX},0`

  
  // let path = `M${startX},${fixedY} Q${planetX},${bendY} ${endX},${endY}`;
  // let path = `M${startX},${fixedY} Q${planetX},${bendY} ${endX},${endY}`;
  console.log(path)
  
  return path
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
