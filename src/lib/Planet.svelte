<script>
    // This scaling factor represents the "gravity" and can later be adjusted dynamically.
    const gravity = 0.005; // Example scaling factor
    
    // Calculate the area based on the viewport size and gravity.
    let area = Math.min(window.innerWidth, window.innerHeight) * gravity;
    
    // Since the area of a circle is πr^2, we solve for r: r = sqrt(area/π)
    $: radius = Math.sqrt(area / Math.PI);
    $: diameter = radius * 2;
  </script>
  
  <div class="planet" style="position: relative; display: inline-block; margin: 1rem;">
    <svg style="display: block;" width={diameter + 'px'} height={diameter + 'px'}>
      <circle cx={radius} cy={radius} r={radius} fill="blue" />
    </svg>
    <span class="label" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); white-space: nowrap;">
      <slot></slot> <!-- This will allow us to pass in the label when using the component -->
    </span>
  </div>
  
  <style>
    .planet {
      /* Additional styles can be added if needed */
    }
    
    .label {
      /* Style for the label text */
      color: white;
      font-family: 'font-mono', monospace;
      font-size: 1rem;
      text-align: center;
    }
  </style>
  