<!-- routes/boing/+page.svelte -->
<script>
  let velocity = 50; // Placeholder for future use
  let angle = 45; // Placeholder angle, unused in this simplified example

  // Updated trajectory path to start from the rocket's position and display correctly
  let trajectoryPath = "M1 640C52.6667 427 252.8 1 640 1C1027.2 1 1227.33 427 1279 640";
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
