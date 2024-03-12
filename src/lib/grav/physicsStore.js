import { writable, get } from 'svelte/store';

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
  // More physics-related properties can be added here
};

const createPhysicsStore = () => {
  const { subscribe, set, update } = writable(initialState);

  // Define your physics calculations as methods
  const methods = {
    setVelocity: (newVelocity) => {
      update(state => {
        return { ...state, velocity: newVelocity };
      });
    },
    togglePlanetActive: (planetId) => {
      update(state => {
        const planets = state.planets.map(planet => {
          if (planet.id === planetId) {
            return { ...planet, isActive: !planet.isActive };
          }
          return planet;
        });
        return { ...state, planets };
      });
    },
    calculateTrajectory: () => {
      // A simplified placeholder for your trajectory calculation
      // This would be a function that uses current state to calculate the new trajectory
      const trajectory = {}; // Complex calculation based on current velocity and planet gravities

      // Here, you could also check for collisions based on the trajectory and planet positions

      return trajectory;
    },
    // Add more methods for different calculations as needed
  };

  return {
    subscribe,
    set,
    ...methods
  };
}

console.log('physicsStore.js: physicsStore created');

export const physicsStore = createPhysicsStore();
