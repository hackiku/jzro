<!-- /grav/Planet.svelte -->
<script>
  import { browser } from '$app/environment';
  import physicsStore from '$lib/grav/physicsStore.js';
  import { createEventDispatcher, onMount } from 'svelte';

  export let id;
  export let color = 'red';
  export let label = '';

  let diameter = 100;
  let gravity;

  const dispatch = createEventDispatcher();

  
  const calculateDiameter = (gravity) => {
    // protection for SSR where window dimensions are not available
    if (!browser) return 100; // Default fallback diameter for SSR
    return Math.sqrt(gravity) * (Math.min(window.innerWidth, window.innerHeight) / 20);
  };

  // Subscribe to the physicsStore to react to changes in planet gravity
  physicsStore.subscribe(($physicsStore) => {
    const planet = $physicsStore.planets.find(p => p.id === id);
    if (planet) {
      gravity = planet.gravity;
      diameter = calculateDiameter(planet.gravity);
    }
  });

  // update gravity when user moves slider
  function handleGravityChange(e) {
    const newGravity = parseFloat(e.target.value);
    physicsStore.updatePlanetGravity(id, newGravity);
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

<div class="text-center">
  <div class="inline-block relative z-0">
    <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      style="width: {diameter * 1.4}px; height: {diameter * 1.2}px;">
      <defs>
        <radialGradient id="atmosphere-{id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="80%" stop-color={color} stop-opacity="0.4"/>
          <stop offset="100%" stop-color={color} stop-opacity="0.15"/>
        </radialGradient>
      </defs>
      <circle cx="50%" cy="50%" r="{diameter * 0.6}" fill={`url(#atmosphere-${id})`}/>
      <circle cx="50%" cy="50%" r="{diameter / 2}" fill={color}/>

      {#if gravity >= 100}
        <foreignObject x="0" y="0" width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml"
            class="h-full flex flex-col justify-center items-center">
            <div class="text-center mb-[12%] mt-[20%]">
              <h3 class="text-4xl mb-2">Let's Fly</h3>
              <a href="mailto:ivan@pipewriter.io" class="text-xl underline">ivan@pipewriter.io</a>
            </div>
            <div class="w-full flex justify-center">
              <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer"
                class=""> <!-- Adjust this margin as needed -->
                <img class="h-[4em] mb-[35%]" src="assets/WhatsApp.svg" alt="WhatsApp">
              </a>
            </div>
          </div>
        </foreignObject>
      {/if}
    
    </svg>

    <!-- message -->
    <span class="absolute top-1/2 left-full transform -translate-y-1/2 ml-6 text-white font-mono text-sm whitespace-nowrap z-10">
      {#if gravity < 99}
        {label}
      {/if}
    </span>
  
  </div>
  <div class="mt-6 relative z-20">
    <input
      type="range" min="0" max="100" value={gravity}
      class="w-[25vw] ml-[5em] max-w-[10em]"
      on:input={handleGravityChange}
    >
  </div>
</div>
