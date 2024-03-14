<!-- homepage -->
<!-- +page.svelte -->
<script>
// import { scrollStore } from '$lib/grav/scrollStore.js';
//ui
  import Nav from '$lib/Nav.svelte';
  import ScreenSizeDebug from '$lib/ui/ScreenSizeDebug.svelte';
  // content
  import Portfolio from '$lib/Portfolio.svelte';
  import Testimonials from '$lib/Testimonials.svelte';
  import Logos from '$lib/portfolio/Logos.svelte';
  // grav
  import Controls from '$lib/grav/Controls.svelte';
  import Planet from '$lib/grav/Planet.svelte';
    import GravityLauncher from '$lib/grav/GravityLauncher.svelte';


</script>

<ScreenSizeDebug />
<Controls />

<Nav />


<!-- scroll % -->
<div class="scroll-display opacity-20 fixed bottom-0 right-0 m-4 p-2 bg-gray-700 text-white rounded-lg">
  <!-- Scroll: {scrollPercent.toFixed(0)}% -->
</div>


<GravityLauncher />

<main>

<!-- --------------------- hero --------------------- -->


  <section class="relative flex flex-col justify-center items-center h-screen">
    
    <div class="text-center px-4 mb-8 -mt-[14vh]">
      <h2 class="text-5xl sm:text-6xl xl:text-7xl mb-4">Aerospace UX</h2>
      <p class="text-2xl">User experience writing & design <br >that makes products fly.</p>  
    </div>
    
    <Planet id="cta" color="#F4191D" label="Fly me to Orbit" />
  
  <!-- logos, centered within hero -->
  <div class="absolute bottom-0 my-20 max-w-xl
    sm:my-32 lg:max-w-2xl ">
    <Logos />
  </div>
  
  
</section>

</main>

<footer class="relative text-center flex justify-center items-end h-[100px]"> <!-- Adjust the height and padding as necessary -->
  <p class="z-10 text-darkBg text-xs">Copyalright © 2024 Ivan Karaman | Privacy | Terms</p>
  <img src="assets/footer.svg" alt="" class="w-full h-full absolute z-0 top-2 left-0">
</footer>

<!-------------------------- footer -------------------------->


<style>

  .red {
    color: #F21D26;
  }

  .scroll-display {
    position: fixed; /* Or any other positioning you prefer */
    bottom: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000; /* Ensure it's above other content */
  }

</style>
