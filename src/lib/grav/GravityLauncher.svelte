<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import gsap from 'gsap';
  import Planet from '$lib/Planet.svelte';
  
  let MotionPathPlugin;
  let velocity = 43;
  let trajectoryPath = '';
  let hitTarget = false;

</script>


<!-- ========================================= -->

<section class="flex-col items-center justify-start h-screen z-0">

  <div class="relative w-full h-full">

    <!-- trajectory SVG -->
    <svg class="absolute" width="100vw" height="100vh" style="position: absolute; bottom: 20vh; left: 5vw;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={trajectoryPath} fill="none" stroke="#ff3d00" stroke-width="0.5" stroke-dasharray="10,10"/>
    </svg>

  </div>

      <!-- Target area -->
  

  

</section>

