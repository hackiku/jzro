<!-- /grav/Planet.svelte -->
<script>
  import physicsStore from '$lib/grav/physicsStore.js';
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let id;
  export let color = 'red';
  export let label = '';

  let diameter;
  let gravity;

  const dispatch = createEventDispatcher();

  // Subscribe to the physicsStore to react to changes in planet gravity
  const unsubscribe = physicsStore.subscribe(($physicsStore) => {
    const planet = $physicsStore.planets.find(p => p.id === id);
    if (planet) {
      gravity = planet.gravity;
      // Recalculate the diameter based on the updated gravity
      diameter = calculateDiameter(planet.gravity);
    }
  });

  // Function to calculate diameter based on gravity
  const calculateDiameter = (gravity) => Math.sqrt(gravity) * (Math.min(window.innerWidth, window.innerHeight) / 24);

  // Update gravity in the store when the user changes it via the slider
  function handleGravityChange(e) {
    const newGravity = parseFloat(e.target.value);
    physicsStore.update($physicsStore => {
      return {
        ...$physicsStore,
        planets: $physicsStore.planets.map(planet => 
          planet.id === id ? { ...planet, gravity: newGravity } : planet
        ),
      };
    });
    dispatch('gravityChange', { id, newGravity }); // Optional: Dispatch an event if needed
  }

  onMount(() => {
    window.addEventListener('resize', () => {
      diameter = calculateDiameter(gravity);
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="text-center my-4">
  <div class="inline-block relative z-0">
    <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style="width: {diameter}px; height: {diameter}px;">
      <circle cx="50%" cy="50%" r={diameter / 2} fill={color}/>
    </svg>
    <span class="absolute top-1/2 left-full transform -translate-y-1/2 ml-6 text-white font-mono text-sm whitespace-nowrap z-10">
      {label}
    </span>
  </div>
  <div class="mt-6 ml-16 relative z-20">
    <input
      type="range" min="0" max="100" value={gravity}
      class="w-1/2 max-w-1/4"
      on:input={handleGravityChange}
    >
  </div>
</div>
