<!-- hero dev -->
<!-- hero/+page.svelte -->

<script>
  import { onMount , onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import Planet from '$lib/Planet.svelte';
  import Nav from '$lib/Nav.svelte';
  import Logos from '$lib/Logos.svelte';

  // grav
  import Controls from '$lib/grav/Controls.svelte';
  import GravityLauncher from '$lib/grav/GravityLauncher.svelte';
    
  import { scrollPosition, updateScrollPosition } from '$lib/scrollStore';
  
  // temp cta slider
  // let diameter = 400;
  let sliderValue = writable(50);
  $: diameter = $sliderValue * 8;
  
  
  onMount(() => {
      window.addEventListener('scroll', updateScrollPosition);
      updateScrollPosition(); // To set initial scroll position
  
      onDestroy(() => {
        window.removeEventListener('scroll', updateScrollPosition);
      });
    });
  
  </script>
  
<main>
  <Controls />
  
  <Nav />
  <!-- --------------------- svgs --------------------- -->
  
  <!-- <OrbitSvg /> -->
  
  <!-- mock Earth top right -->
  <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
    <circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue" />
  </svg>

  <GravityLauncher />

  <!-- mock orbit for visual reference -->
  <img class="absolute z-0" src="assets/orbit.svg">
  
  
  <!-- --------------------- hero --------------------- -->
  <section class="hero mt-24 py-8 flex justify-center items-center">
    <div class="max-w-md text-center">
      <h2 class="text-6xl  text-white mb-4">Aerospace UX</h2>
      <p class="text-2xl text-gray-500 mb-8">User experience writing & design <br> that makes products fly.</p>
      <!-- <Planet initialGravity={40} color="#F4191D" label="Fly me to Orbit" /> -->
      <Planet initialGravity={14} color="#F4191D" label="Take me to Morty" />
      <div class="flex justify-center items-center space-x-4">
      </div>
    </div>
  </section>
  
  
  <!-- logos -->
  <section class="flex justify-center opacity-30 hover:opacity-100">
    <div class="px-20 w-full max-w-4xl">
      <Logos />
    </div>
  </section>
  
</main>