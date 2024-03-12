<!-- lib/grav/GravityLauncher.svelte -->
<script>
  import { onMount } from 'svelte';
  import physicsStore from './physicsStore.js';
  import gsap from 'gsap';
  import { browser } from '$app/environment';

  let trajectoryPath;

  // Subscribe to the store to get the updated trajectory path
  const unsubscribe = physicsStore.subscribe(($physicsStore) => {
    trajectoryPath = $physicsStore.trajectoryPath;
  });


  if (browser) {
    onMount(() => {
      gsap.registerPlugin(gsap.plugins.MotionPathPlugin);

      // Trigger initial trajectory calculation
      physicsStore.calculateTrajectory();

      const handleResize = () => {
        physicsStore.calculateTrajectory();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        unsubscribe(); // Cleanup store subscription
      };
    });
  }

</script>


<!-- ========================================= -->


<section class="absolute h-screen z-0 relative">

  <!-- trajectory SVG -->
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0 z-0">
    <path d={trajectoryPath} fill="none" stroke="#ff3d00" stroke-width="0.2" stroke-dasharray="2,2"/>
  </svg>

  <!-- Centered Planet -->

</section>
