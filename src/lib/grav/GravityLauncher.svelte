<!-- lib/grav/GravityLauncher.svelte -->
<script>
  import { onMount } from 'svelte';
  import { physicsStore } from './physicsStore.js';

  import gsap from 'gsap';
  import { browser } from '$app/environment';
  // import Planet from '$lib/grav/Planet.svelte';

  // $: trajectoryPath = $physicsStore.calculateTrajectory();

  export let gravity = 80;

  let trajectoryPath;

  function calculateTrajectory(velocity, gravity, width, height) {
    // Normalize gravity and velocity to fit within the SVG viewBox dimensions.
    // The example path suggests the curve peaks towards the top quarter of the viewport and bends slightly.
    
    // Adjust these formulas as necessary to fit your specific design and physics model:
    const normalizedGravityEffect = 50 - gravity; // Simulates gravity's pull by affecting the peak of the curve.
    const normalizedVelocityEffect = Math.min(velocity / 10, 10); // Adjusts how far to the right the path extends before curving down.
    
    // Calculate control points:
    // Start control point pulls the path up and to the right, simulating the initial launch trajectory.
    const controlX1 = 50 + normalizedVelocityEffect * 5;
    const controlY1 = 75 - normalizedGravityEffect * 2; // Higher gravity pulls the curve lower
    
    // End control point guides the path back down, simulating gravity's increasing influence.
    const controlX2 = 50 + normalizedVelocityEffect * 10;
    const controlY2 = 25 + normalizedGravityEffect; // Lower gravity lets the curve stay higher

    // The end point should reflect the trajectory escaping gravity's pull if velocity is high.
    const endX = 80 - normalizedGravityEffect; // Adjusts endpoint based on gravity
    const endY = 0; // Always ends at the top of the viewport

    trajectoryPath = `M40,100 C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
  }

  if (browser) {
    onMount(() => {
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(gsap.plugins.MotionPathPlugin);

        const width = 100;
        const height = 100;
        const velocity = 10;

        calculateTrajectory(velocity, gravity, width, height);

        window.addEventListener('resize', () => {
          calculateTrajectory(velocity, gravity, width, height);
        });

        return () => window.removeEventListener('resize', calculateTrajectory);
      }
    });
  }
</script>

<!-- ========================================= -->


<section class="flex items-center justify-center h-screen z-0 relative">

  <!-- trajectory SVG -->
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0 z-0">
    <path d={trajectoryPath} fill="none" stroke="#ff3d00" stroke-width="0.2" stroke-dasharray="2,2"/>
  </svg>

  <!-- Centered Planet -->

</section>
