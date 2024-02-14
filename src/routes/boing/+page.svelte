<!-- routes/boing/+page.svelte -->
<script>
  import { writable } from 'svelte/store';

  let velocity = 50; // Initial velocity in m/s
  let angle = 45; // Launch angle in degrees
  const g = 9.81; // Acceleration due to gravity in m/s^2
  const fire = writable(false); // Store to trigger the projectile firing

  // Convert angle to radians for calculation
  const angleRad = angle * (Math.PI / 180);

  // Calculate total flight time
  const totalTime = (2 * velocity * Math.sin(angleRad)) / g;

  // Function to calculate the position at a given time t
  function positionAtTime(t) {
    const x = velocity * Math.cos(angleRad) * t;
    const y = (velocity * Math.sin(angleRad) * t) - (0.5 * g * t * t);
    return {x, y};
  }

  let trajectoryPoints = [];
  let steps = 100; // Number of steps to divide the total time into
  for (let step = 0; step <= steps; step++) {
    let t = (totalTime / steps) * step;
    let pos = positionAtTime(t);
    trajectoryPoints.push(pos);
  }

  function shoot() {
    fire.set(true);
    // Logic to draw the trajectory can be triggered here
    setTimeout(() => {
      fire.set(false);
    }, 2000); // Reset after the animation or trajectory drawing
  }

  $: trajectoryPath = `M ${trajectoryPoints.map(p => `${p.x},${-p.y}`).join(' L ')}`;
  $: viewBox = `0 ${-Math.max(...trajectoryPoints.map(p => p.y))} ${Math.max(...trajectoryPoints.map(p => p.x))} ${Math.max(...trajectoryPoints.map(p => p.y))}`;
</script>



<!-- =================================== -->

<div class="flex flex-col items-center justify-start h-screen">  
  <!-- Projectile and target area -->
  <div class="relative w-full flex-1">
    {#if fire}
    <!-- Rocket image -->
    <img src="game/rocket.png" alt="rocket" class="absolute" style="left: 5vw; bottom: 20vh; animation: shoot 2s linear forwards;" />
  
    <!-- Dynamically scaled trajectory SVG -->
    <svg class="absolute top-0 left-0" width="100%" height="100%" viewBox="{viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" style="z-index: 10">
      <path d="{trajectoryPath}" fill="none" stroke="#F4191D" stroke-width="0.2"/>
    </svg>
  {/if}
      
    <!-- Target area -->
    <svg class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
  </div>


  <!-- Velocity slider -->
  <div class="z-50 fixed p-6 bottom-12 rounded-full hover:backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2">
    <button class="text-4xl" on:click={shoot}>💥</button>
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
