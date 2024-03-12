<!-- boing -->
<!-- routes/boing/+page.svelte -->

<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  // import { navigate } from 'svelte-routing';
  import gsap from 'gsap';
  // import Planet from '$lib/grav/Planet.svelte';
  // import GravityLauncher from '$lib/grav/GravityLauncher.svelte';
  // <GravityLauncher />

  let MotionPathPlugin;

  let velocity = 43;
  let trajectoryPath = '';

  let hitTarget = false;
  let hitMessage = 'Srecan Svetski Trifun i hvala, uvek, na tough love';

  function calculateTrajectory(velocity, width, height) {
    const startX = width * 0.01;
    const startY = height * 1;

    const heightModifier = (velocity / 50) * height * 0.8;
    const lengthModifier = (velocity / 50) * width * 1.6;

    const peakHeight = startY - heightModifier;
    const totalLength = startX + lengthModifier;

    return `M${startX},${startY} C${startX + totalLength / 4},${peakHeight} ${startX + 3 * totalLength / 4},${peakHeight} ${totalLength},${startY}`;
  }


if (browser) {

  onMount(async () => {
    if (typeof window !== 'undefined') {
      MotionPathPlugin = (await import('gsap/MotionPathPlugin')).MotionPathPlugin;
      gsap.registerPlugin(MotionPathPlugin);

      const width = window.innerWidth;
      const height = window.innerHeight;
      trajectoryPath = calculateTrajectory(velocity, width, height);

      window.addEventListener('resize', () => {
        trajectoryPath = calculateTrajectory(velocity, window.innerWidth, window.innerHeight);
      });
    }
  });
};

  function launchRocket() {
  // Create a copy of the rocket
  const rocketCopy = document.createElement('img');
  rocketCopy.src = 'game/bananica.png';
  rocketCopy.classList.add('rocket');
  rocketCopy.style.position = 'absolute';
  rocketCopy.style.width = '9em';
  rocketCopy.style.top = '80vh'; // Adjust based on the original rocket's position
  rocketCopy.style.left = '5vw'; // Adjust based on the original rocket's position
  document.body.appendChild(rocketCopy);

  gsap.to(rocketCopy, {
    duration: 80 / velocity,
    ease: "power1.inOut",
    motionPath: {
      path: trajectoryPath, // Use the dynamic path
      align: "self",
      // autoRotate: true,
      alignOrigin: [0, 0],
    },
    
    onUpdate: () => {
      // Check for collision during the animation
      const rocketRect = rocketCopy.getBoundingClientRect();
      const targetRect = document.querySelector('svg circle').getBoundingClientRect();

      // Simple overlap check
      if (rocketRect.right > targetRect.left && rocketRect.left < targetRect.right &&
          rocketRect.bottom > targetRect.top && rocketRect.top < targetRect.bottom) {
        hitTarget = true;
        gsap.killTweensOf(rocketCopy); // Stop the animation
        rocketCopy.remove(); // Remove the rocket
      }
    },
    onComplete: () => {
      if (!hitTarget) { // If target was not hit
        rocketCopy.remove();
      }
    },
  });
}

  // make sure client-side execution only
  $: if (browser && velocity) {
    trajectoryPath = calculateTrajectory(velocity, window.innerWidth, window.innerHeight);
  }
</script>


<!-- ========================================= -->



<section class="flex-col items-center justify-start h-screen">
  
  <div class="relative w-full h-full">
    <!-- Rocket positioned at a fixed point -->
    <img src="game/bananica.png" alt="rocket" class="rocket" />
    
    <!-- Corrected Trajectory SVG, now with the correct stroke color -->
    <svg class="absolute" width="100vw" height="100vh" style="position: absolute; bottom: 20vh; left: 5vw;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={trajectoryPath} fill="none" stroke="#ff3d00" stroke-width="0.5" stroke-dasharray="10,10"/>
    </svg>
  </div>
      
  <div>

    <!-- Target area -->
    <div class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100">
      <!-- <Planet initialGravity={40} color="#F4191D" label="Jao Bre" /> -->
    </div> 
    <!-- <svg class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100"> -->
      <!-- <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /> -->
      <!-- <text x="50" y="55" font-family="Times" font-size="1.6em" fill="white" text-anchor="middle" dominant-baseline="central">jao bre</text> -->
    <!-- </svg> -->
  </div>

  <!-- Velocity slider -->

  <div class="z-50 fixed p-6 bottom-6 rounded-full backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2">
    <button class="text-5xl mr-6 hover:bg-red-500 rounded-full" on:click={launchRocket}>💥</button>
    <div class="relative space-between-12 flex flex-col justify-center group hover:opacity-100 transition-opacity">
        <p>v = <span class="velocity">{velocity}</span> m/s</p>
      <input type="range" min="1" max="100" value={velocity} class="slider w-full" id="particleNumber" on:input={(e) => velocity = e.target.value} />
    </div>
  </div>

  <img src="assets/footer.svg" alt="" class="fixed inset-x-0 bottom-0 w-full z-0 mb-0">


  <!-- victory message -->
  
  {#if hitTarget}
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-4 rounded-2xl shadow-lg border-2" style="border-color: #F4191D;">
    <div class="flex flex-col text-center mb-4">
      <p class="text-center text-white text-xl mb-6">{hitMessage}</p>
      <p class="text-4xl text center">🫀📚</p>
      <a href="javascript:void(0);" onclick="window.location.reload();" class="text-[#F4191D] hover:text-red-700 mt-4 inline-block cursor-pointer" on:click={restartGame}>Restart →</a>
      </div>
  </div>
  {/if}


</section>


<style>
  .rocket {
    position: absolute;
    top: 80vh; 
    left: 5vw;
    transform: translateX(-20%);
    width: 9em !important;
    z-index: 10;
  }
  .original {
    /* Additional styles for the original rocket, if needed */
  }
  .velocity {
    color: #ff3d00;
  }
</style>
