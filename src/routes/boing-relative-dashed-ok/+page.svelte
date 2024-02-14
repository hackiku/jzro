<!-- routes/boing/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment'; // Import browser variable
  import gsap from 'gsap';
  
  let MotionPathPlugin;

  let velocity = 30; // Initial velocity
  let trajectoryPath = '';
  let rocketLaunched = false; // State to control rocket animation

  // const width = window.innerWidth;
  // const height = window.innerHeight;


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
  rocketCopy.style.width = '12em';
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
    onComplete: () => {
      rocketCopy.remove();
    },
  });
}


  // make sure client-side execution only
  $: if (browser && velocity) {
    trajectoryPath = calculateTrajectory(velocity, window.innerWidth, window.innerHeight);
  }
</script>



<section class=" flex-col items-center justify-start h-screen">
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
    <svg class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
  </div>

  <!-- Velocity slider -->
  <div class="z-50 fixed p-6 bottom-12 rounded-full hover:backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2">
    <button class="text-4xl" on:click={launchRocket}>💥</button>
    <div class="relative space-between-12 flex flex-col justify-center group hover:opacity-100 transition-opacity">
        <p>v = <span class="velocity">{velocity}</span> m/s</p>
      <input type="range" min="1" max="100" value={velocity} class="slider w-full" id="particleNumber" on:input={(e) => velocity = e.target.value} />
    </div>
  </div>
  <img src="assets/footer.svg" alt="" class="absolute inset-x-0 bottom-0 w-full z-0 mb-0">
</section>


<style>
  .rocket {
    position: absolute;
    top: 80vh; 
    left: 5vw;
    transform: translateX(-20%);
    width: 20em;
    z-index: 10;
  }
  .original {
    /* Additional styles for the original rocket, if needed */
  }
  .velocity {
    color: #ff3d00;
  }
</style>
