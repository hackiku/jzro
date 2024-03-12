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
      physicsStore.calculateTrajectory();
      const handleResize = () => physicsStore.calculateTrajectory();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        unsubscribe();
      };
    });
  }
</script>

<section class="absolute top-0 left-0 z-0 w-screen h-screen">
  <svg width="100vw" height="100vh" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0">
    <path d={trajectoryPath} fill="none" stroke="#ff3d00" stroke-width="0.2" stroke-dasharray="2,2"/>
  </svg>
  </section>
