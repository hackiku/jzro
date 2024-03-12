<!-- hero only to launch to prod jzro.co -->
<!-- hero/+page.svelte -->

<script>
  import { onMount , onDestroy } from 'svelte';
  import Nav from '$lib/Nav.svelte';
  import Logos from '$lib/Logos.svelte';
  
  // grav
  import Planet from '$lib/grav/Planet.svelte';
  import Controls from '$lib/grav/Controls.svelte';
  import GravityLauncher from '$lib/grav/GravityLauncher.svelte';
      
  onMount(() => {
    // 
    });
  
  </script>
  
<!-- ======================HTML====================== -->

<div class="fixed w-[100vw]">
    <GravityLauncher />
  </div>
 

<main class="overflow-none">
  <Controls />
  
  <Nav />
  
  <!-- mock Earth top right -->
  <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
    <circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue" />
  </svg>


  <!-- --------------------- hero --------------------- -->
  <section class="hero mt-24 py-8 flex justify-center items-center">
    <div class="max-w-md text-center">
      <h2 class="text-6xl  text-white mb-4">Aerospace UX</h2>
      <p class="text-2xl text-gray-500 mb-8">User experience writing & design <br> that makes products fly.</p>

        <!-- <Planet id="cta" color="#F4191D" label="Fly me to Orbit" /> -->
        
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