<!-- routes/boing/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import gsap from 'gsap';
  import MotionPathPlugin from 'gsap/MotionPathPlugin';

  gsap.registerPlugin(MotionPathPlugin);

  let velocity = 30;
  let trajectoryPath = '';

  function calculateTrajectory(velocity, width, height) {
    const startX = width * 0.05;
    const startY = height * 0.8;
    const heightModifier = (velocity / 50) * height * 0.8;
    const lengthModifier = (velocity / 50) * width * 1.6;
    const peakHeight = startY - heightModifier;
    const totalLength = startX + lengthModifier;
    return `M${startX},${startY} C${startX + totalLength / 4},${peakHeight} ${startX + 2.5 * totalLength / 4},${peakHeight} ${totalLength},${startY}`;
  }

  if (browser) {
    onMount(() => {
      updateTrajectory();
      window.addEventListener('resize', updateTrajectory);
    });
  }

  function updateTrajectory() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    trajectoryPath = calculateTrajectory(velocity, width, height);
  }

  $: if (browser && velocity) {
    updateTrajectory();
  }

  function startAnimation() {
    const rocketCopy = document.createElement('img');
    rocketCopy.src = 'game/rocket.png';
    rocketCopy.classList.add('absolute', 'rocket'); // Ensure you have 'rocket' class for basic styling
    document.body.appendChild(rocketCopy);

    gsap.to(rocketCopy, {
      duration: 5,
      ease: "power1.inOut",
      motionPath: {
        path: trajectoryPath,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      onComplete: () => rocketCopy.remove() // Clean up the rocket copy after animation
    });
  }
</script>

<!-- routes/boing/+page.svelte -->
<section class="flex flex-col items-center justify-start h-screen relative">
  <!-- Original rocket image, it stays static -->
  <img src="game/rocket.png" alt="rocket" class="rocket original" style="top: 0; left: 50%;"/>

  <!-- SVG for the trajectory -->
  <svg class="absolute" width="100vw" height="100vh" style="position: absolute; top: 0; left: 0;" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={trajectoryPath} id="trajectoryPath" fill="none" stroke="#ff3d00" stroke-width="0.5" stroke-dasharray="10,10"/>
  </svg>
    
  <!-- Target area (Optional for visual aid) -->
  <svg class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>

  <!-- Velocity slider and Launch button -->
  <div class="z-50 fixed p-6 bottom-12 rounded-full hover:backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2">
    <button class="text-4xl" on:click={startAnimation}>💥</button>
    <div class="relative flex flex-col justify-center ml-4">
      <input type="range" min="1" max="100" value={velocity} class="slider w-full" id="velocitySlider" on:input={(e) => velocity = e.target.value} />
      <p class="text-white mt-2">Velocity: <span class="velocity">{velocity} · 10^6 m/s</span></p>
    </div>
  </div>
</section>

<style>
.rocket {
  position: absolute;
  top: 0; /* Adjust based on your design */
  left: 50%; /* Center the rocket horizontally */
  transform: translateX(-50%); /* Adjust for exact centering */
  width: 50px; /* Adjust size as needed */
  z-index: 10; /* Ensure it's above other elements */
}
.original {
  /* Additional styles for the original rocket, if needed */
}
.velocity {
  color: #ff3d00;
}
</style>
