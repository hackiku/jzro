<!-- Planet.svelte -->
<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let initialGravity = 20;
  let gravity = initialGravity;
  export let color = 'red'; // Customizable color prop
  export let label = '';

  let diameter;
  
  const dispatch = createEventDispatcher();
  
  const calculateDiameter = () => Math.sqrt(gravity) * (Math.min(window.innerWidth, window.innerHeight) / 20);
  
  onMount(() => {
    diameter = calculateDiameter(); // Initialize diameter on the client side

    const updateDiameter = () => diameter = calculateDiameter();
    window.addEventListener('resize', updateDiameter);

    return () => window.removeEventListener('resize', updateDiameter);
  });

  $: if (gravity !== initialGravity) {
    dispatch('gravityChange', { newGravity: gravity });
    diameter = calculateDiameter();
  }
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
  <div class="mt-6 relative z-20">
    <input type="range" min="2" max="100" bind:value={gravity} class="w-full max-w-xs">
  </div>
</div>
