<!-- lib/grav/GravityLauncher.svelte -->
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  import gsap from 'gsap';
  import Planet from '$lib/Planet.svelte';
  // import Controls from '$lib/grav/Controls.svelte';

  let trajectoryPath = "M100,0 C150,200 250,200 100% 75%";
  
  let MotionPathPlugin;
  let velocity = 43;
  // let trajectoryPath = '';
  let hitTarget = false;


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

</script>

<!-- ========================================= -->

<section class="flex-col items-center justify-start h-screen z-0">

  <div class="relative w-full h-full">

    <!-- trajectory SVG -->
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="90" y1="100" x2="90" y2="0" stroke="#ff3d00" stroke-width="0.2" stroke-dasharray="2,2"/>
    </svg>

    <div class="absolute" style="right: 25vw; top: 10vh;" width="100" height="100">
      <Planet initialGravity={17} color="indigo" label="GravityLauncher" />
    </div> 

  </div>


</section>