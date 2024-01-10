<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let initialGravity = 20;
  let gravity = initialGravity;
  export let color = 'red'; // New prop for color customization
  export let label = '';
  export let horizontalLabelOffset = 1;
  export let verticalLabelOffset = 1.4;
  
  function calculateDiameter() {
    // Adjust this calculation as needed to maintain the proportionality
    return Math.sqrt(gravity) * (Math.min(window.innerWidth, window.innerHeight) / 100);
  }

  $: diameter = calculateDiameter();
  
  function updateDiameter() {
    diameter = calculateDiameter();
  }

  const dispatch = createEventDispatcher();
  $: if (gravity !== initialGravity) {
    dispatch('gravityChange', { newGravity: gravity });
    updateDiameter();
  }

  onMount(() => {
    window.addEventListener('resize', updateDiameter);
  });

  onDestroy(() => {
    window.removeEventListener('resize', updateDiameter);
  });

</script>

<!-- Component Markup -->
<div class="planet-container">
  <div class="planet" style="position: relative; display: inline-flex; align-items: center;">
    <svg style="width: {diameter}px; height: {diameter}px;">
      <circle cx={diameter / 2} cy={diameter / 2} r={diameter / 2} fill={color}/>
    </svg>
    <span class="label">
      {label}
    </span>
    <p>grav {gravity}</p>
    <p> | dia {diameter}</p>
  </div>

  <div class="gravity-slider">
    <input type="range" min="0" max="100" bind:value={gravity}>
  </div>
</div>

<style>
  :root {
    --planet-color: red; /* default color */
  }

  .planet-container {
    text-align: center;
    margin: 1rem 0;
  }

  .gravity-slider input[type=range] {
    width: 100%;
    max-width: 200px; /* Adjust as needed */
  }

  .planet circle {
    fill: var(--planet-color);
  }
  
  .label {
    /* Styles for the label text */
    color: white;
    font-family: 'font-mono', monospace;
    font-size: 0.8rem;
    white-space: nowrap;
  }
</style>
