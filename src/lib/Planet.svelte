<script>
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let initialGravity = 20;
  let gravity = initialGravity;
  export let color = 'red'; // New prop for color customization
  export let label = '';
  export let horizontalLabelOffset = 1;
  export let verticalLabelOffset = 1.4;
  
  function calculateArea() {
    return Math.min(window.innerWidth, window.innerHeight) * gravity;
  }
  
  let area = calculateArea();
  
  $: radius = Math.sqrt(area / Math.PI);
  $: diameter = radius * 2;
  
  function updateArea() {
    area = calculateArea();
  }
  
  const dispatch = createEventDispatcher();
  $: if (gravity !== initialGravity) {
    dispatch('gravityChange', { newGravity: gravity });
  }

  onMount(() => {
    window.addEventListener('resize', updateArea);
  });

  onDestroy(() => {
    window.removeEventListener('resize', updateArea);
  });

</script>

<div class="planet-container">
  <div class="planet" style="position: relative; display: inline-flex; align-items: center;">
    <svg style="display: block;" width={diameter + 'px'} height={diameter + 'px'}>
      <circle cx={radius} cy={radius} r={radius} fill={color}/>
    </svg>
    <span class="label" style={`position: absolute; left: ${radius + horizontalLabelOffset * radius}px; top: ${radius - verticalLabelOffset * radius}px; transform: translate(0%, 0%);`}>
      <slot></slot> <!-- This allows passing in the label when using the component -->
    </span>
  </div>

  <!-- Slider for adjusting gravity -->
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
    max-width: 300px; /* Adjust as needed */
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
