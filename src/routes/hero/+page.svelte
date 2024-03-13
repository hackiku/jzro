<!-- hero only to launch to prod jzro.co -->
<!-- hero/+page.svelte -->

<script>
  import { onMount , onDestroy } from 'svelte';
  import Nav from '$lib/Nav.svelte';
  import Logos from '$lib/portfolio/Logos.svelte';
  
  // grav
  import Planet from '$lib/grav/Planet.svelte';
  import Controls from '$lib/grav/Controls.svelte';
  import GravityLauncher from '$lib/grav/GravityLauncher.svelte';
      
  onMount(() => {
    // 
    });
  
</script>
  
<!-- ======================HTML====================== -->

  <GravityLauncher />
 

  <Controls />
  <Nav />
  
<main class="overflow-none">
  
  
  <!-- mock Earth top right -->
  <svg class="fixed top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
    <circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue" />
  </svg>


<!-- --------------------- hero --------------------- -->


<!-- <section class="flex flex-col justify-center items-center h-screen bg-gray-900 relative"> -->
  <section class="relative flex flex-col justify-center items-center h-screen">
    
    <div class="text-center space-y-4 -mt-[12vh]">
      <h2 class="text-6xl">Aerospace UX</h2>
      <p class="text-2xl">User experience writing & design <br> that makes products fly.</p>  
    </div>
    
    <Planet id="cta" color="#F4191D" label="Fly me to Orbit" />
  
  <!-- logos -->
  <div class="absolute bottom-28 mx-auto px-20 w-full max-w-4xl">
    <Logos />
  </div>
</section>
  
</main>