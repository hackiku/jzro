<!-- /grav/Planet.svelte -->
<script>
  import { browser } from '$app/environment';
  import physicsStore from '$lib/grav/physicsStore.js';
  import { createEventDispatcher, onMount } from 'svelte';

  export let id;
  export let color = 'red';
  export let label = '';

  let diameter = 100; // Provide a default fallback for SSR
  let gravity;

  const dispatch = createEventDispatcher();

  // Function to calculate diameter based on gravity
  const calculateDiameter = (gravity) => {
    // Guard against SSR where window dimensions are not available
    if (!browser) return 100; // Default fallback diameter for SSR
    return Math.sqrt(gravity) * (Math.min(window.innerWidth, window.innerHeight) / 24);
  };

  // Subscribe to the physicsStore to react to changes in planet gravity
  physicsStore.subscribe(($physicsStore) => {
    const planet = $physicsStore.planets.find(p => p.id === id);
    if (planet) {
      gravity = planet.gravity;
      diameter = calculateDiameter(planet.gravity); // Calculate initial diameter
    }
  });

  // Update gravity in the store when the user changes it via the slider
  function handleGravityChange(e) {
    const newGravity = parseFloat(e.target.value);
    physicsStore.updatePlanetGravity(id, newGravity); // Use the new method to update gravity
    gravity = newGravity; 
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('resize', () => {
        diameter = calculateDiameter(gravity);
      });
    }
  });
</script>

<!-- ========================== HTML ========================== -->

<div class="text-center my-4">
  <div class="inline-block relative z-0">
    <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style="width: {diameter}px; height: {diameter}px;">
      <circle cx="50%" cy="50%" r={diameter / 2} fill={color}/>
      
      <!-- contact form -->
      {#if gravity > 99}
        <foreignObject x="0" y="0" width="{diameter}" height="{diameter}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
            <h3 class="text-4xl text-white mb-4">Let's Fly</h3>
            <a href="mailto:ivan@pipewriter.io" class="text-xl underline mb-4">ivan@pipewriter.io</a>
              <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
              <img class="h-24" src="assets/WhatsApp.svg" alt="WhatsApp">
            </a>
          </div>
        </foreignObject>
      {/if}

    </svg>
    
    <!-- message -->
    <span class="absolute top-1/2 left-full transform -translate-y-1/2 ml-6 text-white font-mono text-sm whitespace-nowrap z-10">
      {label}
    </span>
  
  </div>
  <div class="mt-6 relative z-20">
    <input
      type="range" min="0" max="100" value={gravity}
      class="w-[28vw] max-w-[12em]"
      on:input={handleGravityChange}
    >
  </div>
</div>
