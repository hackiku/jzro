<!-- routes/boing/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment'; // Import browser variable

  let velocity = 30; // Initial velocity
  let trajectoryPath = ''; // Initialize empty string for the path

  function calculateTrajectory(velocity, width, height) {
    const startX = width * 0.01; // 5% from the left of the viewport
    const startY = height * 1; // Adjusted for the rocket's position

    const heightModifier = (velocity / 50) * height * 0.8;
    const lengthModifier = (velocity / 50) * width * 1.6;

    const peakHeight = startY - heightModifier;
    const totalLength = startX + lengthModifier;

    return `M${startX},${startY} C${startX + totalLength / 4},${peakHeight} ${startX + 3 * totalLength / 4},${peakHeight} ${totalLength},${startY}`;
  }

  // Only run this code client-side, after the component has mounted
  if (browser) {
    onMount(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      trajectoryPath = calculateTrajectory(velocity, width, height);

      // Recalculate path on viewport resize
      window.addEventListener('resize', () => {
        trajectoryPath = calculateTrajectory(velocity, window.innerWidth, window.innerHeight);
      });
    });
  }

  // Reactive statement to update the path when velocity changes, guarded for client-side execution
  $: if (browser && velocity) {
    trajectoryPath = calculateTrajectory(velocity, window.innerWidth, window.innerHeight);
  }
</script>



<div class=" flex-col items-center justify-start h-screen">
  <div class="relative w-full h-full">
    <!-- Rocket positioned at a fixed point -->
    <img src="game/rocket.png" alt="rocket" class="absolute" style="left: 5vw; bottom: 20vh;" />
    
    <!-- Corrected Trajectory SVG, now with the correct stroke color -->
    <svg class="absolute" width="100vw" height="100vh" style="position: absolute; bottom: 20vh; left: 5vw;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={trajectoryPath} fill="none" stroke="#ff3d00" stroke-width="0.5" stroke-dasharray="10,10"/>
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
