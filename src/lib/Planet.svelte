<!-- Planet.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let initialGravity = 20;
  let gravity = initialGravity;
  export let color = 'red'; // Customizable color prop
  export let label = '';
  let verticalLabelOffset = 24;
  let horizontalLabelOffset = 24;

  let isClient = false;
  let diameter;
  
  const dispatch = createEventDispatcher();
  
  const calculateDiameter = () => Math.sqrt(gravity) * (Math.min(window.innerWidth, window.innerHeight) / 50);
  
  onMount(() => {
    isClient = true;
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

{#if isClient}
  <div class="planet-container">
    <div class="planet" style="position: relative; display: inline-flex; align-items: center;">
      <svg style="width: {diameter}px; height: {diameter}px;">
        <circle cx={diameter / 2} cy={diameter / 2} r={diameter / 2} fill={color}/>
      </svg>
      <span class="label" style="left: {diameter / 2 + horizontalLabelOffset}px; top: {diameter / 2 - verticalLabelOffset}px;">
        {label}
      </span>
    </div>
    <div class="gravity-slider">
      <input type="range" min="0" max="100" bind:value={gravity}>
    </div>
  </div>
{/if}


<style>
  .planet-container {
    text-align: center;
    margin: 1rem 0;
  }

  .gravity-slider input[type=range] {
    width: 100%;
    max-width: 200px;
  }

  .label {
    color: white;
    position: absolute;
    transform: translate(0%, 0%);
    font-family: 'font-mono', monospace;
    font-size: 0.8rem;
    white-space: nowrap;
  }
</style>
