<script>
  export let gravity = 4; // default value

  export let horizontalLabelOffset = 1;
  export let verticalLabelOffset = 1.4;

  // Calculate circle area based on viewport and gravity
  function calculateArea() {
    return Math.min(window.innerWidth, window.innerHeight) * gravity;
  }

  let area = calculateArea();

  // Since the area of a circle is πr^2, we solve for r: r = sqrt(area/π)
  $: radius = Math.sqrt(area / Math.PI);
  $: diameter = radius * 2;

  function updateArea() {
    area = calculateArea();
  }

  // Listen for resize events to update area
  window.addEventListener('resize', updateArea);

  // Cleanup resize listener when the component is destroyed
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    window.removeEventListener('resize', updateArea);
  });
</script>

<div class="planet" style="position: relative; display: inline-flex; align-items: center;">
  <svg style="display: block;" width={diameter + 'px'} height={diameter + 'px'}>
    <circle cx={radius} cy={radius} r={radius} fill="red" />
  </svg>
  <span class="label" style={`position: absolute; left: ${radius + horizontalLabelOffset * radius}px; top: ${radius - verticalLabelOffset * radius}px; transform: translate(0%, 0%);`}>
    <slot></slot> <!-- This allows passing in the label when using the component -->
  </span>
</div>

<style>
  .planet {
    /* Your additional styles here */
  }
  
  .label {
    /* Styles for the label text */
    color: white;
    font-family: 'font-mono', monospace;
    font-size: 0.8rem;
    white-space: nowrap;
  }
</style>
