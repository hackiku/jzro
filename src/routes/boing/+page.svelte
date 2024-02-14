<!-- routes/boing/+page.svelte -->
<script>
  let velocity = 50; // Initial velocity

  // Function to calculate the trajectory path based on velocity
  function calculateTrajectory(velocity) {
    // Adjust these values to match the starting point to the rocket's position
    const startX = 50; // Example starting X coordinate (adjust based on layout)
    const startY = 600; // Example starting Y coordinate (adjust based on layout and rocket image size)
    
    // Constants for the shape and scale of the parabola (adjust as needed)
    const baseHeight = startY;
    const baseLength = 1279; // Adjust if necessary for your layout
    
    // Modifiers for the trajectory path based on velocity
    const heightModifier = (velocity / 50) * 300;
    const lengthModifier = (velocity / 50) * 300;
    
    const peakHeight = baseHeight - heightModifier;
    const totalLength = baseLength + lengthModifier;
    
    // Return the new trajectory path starting from the rocket's position
    return `M${startX} ${startY}C${startX + totalLength / 4} ${peakHeight}, ${startX + 3 * totalLength / 4} ${peakHeight}, ${startX + totalLength} ${baseHeight}`;
  }

  // Initialize trajectory path
  let trajectoryPath = calculateTrajectory(velocity);

  // Reactive statement to update the path when velocity changes
  $: trajectoryPath = calculateTrajectory(velocity);
</script>


<div class="flex flex-col items-center justify-start h-screen">
  <div class="relative w-full h-full">
    <!-- Rocket positioned at a fixed point -->
    <img src="game/rocket.png" alt="rocket" class="absolute" style="left: 5vw; bottom: 20vh;" />
    
    <!-- Corrected Trajectory SVG, now with the correct stroke color -->
    <svg class="absolute" width="100%" height="100%" style="position: absolute; bottom: 20vh; left: 5vw;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={trajectoryPath} fill="none" stroke="#ff3d00" stroke-width="2"/>
    </svg>
  </div>
      
  <div>
    <!-- Target area -->
    <svg class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
  </div>

  <!-- Velocity slider -->
  <div class="z-50 fixed p-6 bottom-12 rounded-full hover:backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2">
    <button class="text-4xl">💥</button>
    <div class="relative flex flex-col justify-center group hover:opacity-100 transition-opacity">
      <div class="flex flex-row items-center justify-center">
        <p>v = <span class="velocity">{velocity}</span> · 10^6 m/s</p>
      </div>
      <!-- Slider -->
      <input type="range" min="1" max="100" value={velocity} class="slider w-full" id="particleNumber" on:input={(e) => velocity = e.target.value} />
    </div>
  </div>
</div>

<style>
  @keyframes shoot {
    to { transform: translate(80vw, -80vh); }
  }
  .velocity {
    color: #ff3d00;
  }
</style>
