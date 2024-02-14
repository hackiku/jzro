<!-- routes/boing/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let velocity = 30;
  let trajectoryPath = '';
  let startX = 0, startY = 0; // Initialize startX and startY
  let rocketStyle = ''; // Initialize rocketStyle

  function calculateTrajectory(velocity, width, height) {
    // Use global startX and startY without redeclaring them
    startX = width * 0.05;
    startY = height * 0.95;
    const heightModifier = (velocity / 50) * height * 0.8;
    const lengthModifier = (velocity / 50) * width * 1.6;
    const peakHeight = startY - heightModifier;
    const totalLength = startX + lengthModifier;
    return `M${startX},${startY} C${startX + totalLength / 4},${peakHeight} ${startX + 2.5 * totalLength / 4},${peakHeight} ${totalLength},${startY}`;
  }

  if (browser) {
    onMount(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      trajectoryPath = calculateTrajectory(velocity, width, height);
      // Update rocketStyle based on initial calculations
      rocketStyle = `left: ${startX}px; bottom: ${window.innerHeight - startY}px;`;

      window.addEventListener('resize', () => {
        trajectoryPath = calculateTrajectory(velocity, window.innerWidth, window.innerHeight);
        // Update rocketStyle on resize as well
        rocketStyle = `left: ${startX}px; bottom: ${window.innerHeight - startY}px;`;
      });
    });
  }

  $: if (browser && velocity) {
    trajectoryPath = calculateTrajectory(velocity, window.innerWidth, window.innerHeight);
    // Ensure rocketStyle updates reactively with trajectoryPath
    rocketStyle = `left: ${startX}px; bottom: ${window.innerHeight - startY}px;`;
  }

  function startAnimation() {
    animateAlongPath('rocket', 5000); // Adjust duration as needed
  }

  function animateAlongPath(elementId, duration) {
    const rocketElement = document.getElementById(elementId);
    let start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / duration);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Use calculateTrajectory to get current position based on progress
      // Ensure the calculation here aligns with your desired animation path
      const point = calculatePointAtProgress(progress, width, height);
      rocketElement.style.transform = `translate(${point.x}px, ${point.y}px)`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function calculatePointAtProgress(progress, width, height) {
    // This function needs to accurately reflect the trajectory
    // Currently, it's a placeholder for demonstration
    const x = startX + (width * 0.9 * progress);
    const y = height - ((startY - height * 0.2) * Math.sin(progress * Math.PI));
    return { x, y };
  }
</script>



<div class="flex flex-col items-center justify-start h-screen">
  <div class="relative w-full h-full">
    <img src="game/rocket.png" alt="rocket" class="absolute" id="rocket" style={rocketStyle} />
    
    <svg class="absolute" width="100vw" height="100vh" style="position: absolute; bottom: 20vh; left: 5vw;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={trajectoryPath} id="trajectoryPath" fill="none" stroke="#ff3d00" stroke-width="0.5" stroke-dasharray="10,10"/>
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
    <button class="text-4xl" on:click={startAnimation}>💥</button>
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
