<!-- jzro homepage -->
<!-- +page.svelte -->

<script>
  // import { scrollStore } from '$lib/grav/scrollStore.js';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  //ui
  import Nav from '$lib/Nav.svelte';
  import ScreenSizeDebug from '$lib/ui/ScreenSizeDebug.svelte';
  // proof
  import Logos from '$lib/portfolio/Logos.svelte';
  import Portfolio from '$lib/portfolio/Portfolio.svelte';
  import PipewriterDemo from '$lib/portfolio/PipewriterDemo.svelte';

  import CodePortfolio from '$lib/portfolio/CodePortfolio.svelte';
  import Testimonials from '$lib/portfolio/Testimonials.svelte';

  // grav
  import Controls from '$lib/grav/Controls.svelte';
  import Planet from '$lib/grav/Planet.svelte';
  
  import GravityLauncher from '$lib/grav/GravityLauncher.svelte';
  import Coin from '$lib/Coin.svelte';

  let deliverables = ['software', 'space tech', 'services', ];
  let currentDeliverableIndex = 0;
  let visibleDeliverable = deliverables[currentDeliverableIndex];

  onMount(() => {
    const interval = setInterval(() => {
      currentDeliverableIndex = (currentDeliverableIndex + 1) % deliverables.length;
      visibleDeliverable = deliverables[currentDeliverableIndex]; // Trigger transition
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  });


</script>

<!-- -------------------------------------------------- -->


<ScreenSizeDebug />

<Controls />

<!-- <Nav /> -->


<!-- scroll % -->
<div class="scroll-display opacity-20 fixed bottom-0 right-0 m-4 p-2 bg-gray-700 text-white rounded-lg">
  <!-- Scroll: {scrollPercent.toFixed(0)}% -->
</div>


<!-- <GravityLauncher /> -->

<main>

<!-- --------------------- 1. HERO --------------------- -->

<section class="relative flex flex-col justify-center items-center h-screen">
    
    <div class="text-center px-4 mb-8 -mt-[14vh]">
      <h1 class="text-5xl sm:text-6xl xl:text-7xl mb-4">Aerospace UX</h1>
      <p class="text-2xl">User experience engineered to <br >make products fly.</p>  
    </div>
    
    <Planet id="cta" color="#F4191D" label="Fly me to Orbit" />
  
  <!-- logos, centered within hero -->
  <div class="absolute bottom-0 my-20 max-w-xl
    sm:my-32 lg:max-w-2xl ">
    <Logos />
  </div>
</section>

<!------------------------ 2. WORK ------------------------>
<section class="relative py-12 h-[75vh]">
  
 <!-- <div class="flex flex-wrap max-w-3xl mx-auto items-center"> -->
 <div class="flex flex-wrap mx-auto md:max-w-3xl items-center px-8">
    <div class="w-full"> 
      <p class="text-md font-mono mb-4">Copywriting & UI/UX</p>
      
      <h2 class="text-4xl mb-3">Words and user flows<br>to sell more
        <span transition:fade={{ duration: 500 }} class="text-[#1ABCFE] glowing-text">
          {visibleDeliverable}
        </span>
      </h2>

    </div> 
    <!-- <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> -->
    <div class="absolute right-[15vw] top-52 md:top-[18vh]">
      <Planet id="work" color="#1ABCFE" label="for work"/>
    </div>
  </div>

  
  <div class="absolute bottom-0 w-full">
    <Portfolio />
    <!-- <Testimonials /> -->
  </div>

</section>



<!------------------------ PIPEWRITER ------------------------>


<!-- <section class="relative flex flex-col justify-center items-center h-screen"> -->

<section class="relative flex flex-col items-center md:flex-row
  px-8 md:px-44 space-x-12 h-full">
  
  <div class="w-full md:w-2/3">
    <PipewriterDemo />
  </div>

  <div class="w-full md:w-2/5"> <!-- left -->
    <h3 class="text-xl mb-3">Longtime tech copywriter on a mission to bring SaaS design to aerospace.</h3>
    <p class="text-md mb-4 font-mono text-blue-700">Explore Pipewriter →</p>
  </div> 

</section>


<!------------------------ TESTIMONIALS ------------------------>

<section class="relative md:px-44 py-12">

  <div class="">
    <Testimonials />
  </div>
  
  <div class="max-w-xs">
    <img class="h-20" src="grav/asteroid.png" alt="">  
    <!-- <Coin /> -->
  </div>

  <!-- gradient -->
  
  <div class="absolute bottom-0 left-0 w-full h-16
    z-0 bg-gradient-to-b from-darkBg to-lighterBg"></div>

</section>

<!------------------------ FUN ------------------------>

<section class="
  bg-lighterBg py-8 px-8 md:px-8 h-screen">
  <div class="flex flex-wrap max-w-3xl mx-auto items-center">
    <div class="w-full mt-20 -mb-8 p-8 md:w-1/2">
      <Planet id="fun" color="#540087" label="for fun"/>
    </div>
    <div class="w-full md:w-1/2 p-4"> <!-- right -->
      <p class="text-md font-mono mb-4">Code + Engineering</p>
      <h2 class="text-4xl mb-3">Aerospacey Interfaces </h2>
    </div> 
  </div>
  <CodePortfolio />
</section>


<div class="h-6 bg-gradient-to-b from-lighterBg to-darkBg mt-8 py-8 flex justify-center items-center"></div>

<!-- --------------------------------------------- -->


<section class="mt-20 py-8 px-8 md:px-8 max-w-2xl mx-auto">
  <div class="flex flex-wrap items-center">
    <div class="w-full md:w-1/2 p-4"> <!-- left -->
      <h3 class="text-xl mb-3">For fun, school and profit, I also *really* like building engineery apps that ain't smart as a DART 🛰️ but sure are more fun than Fortran</h3>
      <p class="text-md mb-4 font-mono text-blue-700">Hire me to code →</p>
    </div> 
    <div class="w-full mt-20 -mb-8 p-8 md:w-1/2">
      <Planet id="github" color="#F1F1F1" label="GitHub"/>
    </div>
  </div>
</section>

<div class="flex w-auto max-w-xl mx-auto justify-center">
  <img class="h-40" src="grav/dangerous-go-alone.png" alt="">  
  <!-- <Coin /> -->
</div>

<!------------------------ about ------------------------>
<section class="mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto">
  <div class="flex flex-wrap items-center">
     <!-- left -->
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-4xl mb-3">I'm Ivan 👋</h2>
      <p class="text-md mb-4"
      >Oye, Dusters. I'm a longtime tech copywriter midlife-crisising into aerospace engineer, pilot, and HTML programmer.</p>
      <p class="text-md mb-4"
      >Im doing it because space exploration is the OG and we should make more of it happen.</p>
      <p class="text-md mb-4"
      >If you feel this way too, maybe we can test in prod together and design a more human-centered space race.</p>
    </div> 
    <!-- left -->
    <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <!-- right -->
      <div class="h-40 w-40 opacity-40 bg-slate-600"></div>
    </div>
  </div>
</section>


<!-------------------------- cta -------------------------->
<section class="flex flex-col md:flex-row justify-center items-center mx-auto
  py-12 h-screen max-w-3xl">
  <!-- Memes Images -->
  <div class="flex relative flex-col w-full md:w-1/2
    items-center md:items-end space-y-4">
    <img src="memes/hello-friend.png" alt="Hello Friend Meme" 
    class="absolute bottom-0 transform rotate-[15deg]">
    <img src="memes/choppa.png" alt="Get to the Choppa Meme" 
    class="absolute top-0 transform scale-75 rotate-[-15deg]">
  </div>

  <div class="flex justify-center p-12 items-center w-full md:w-1/2">
    <Planet id="contact" color="#1B0087" label="say hi"/>
  </div>
  <!-- Contact Form inside Planet SVG -->
</section>


<!-------------------------- jzro -------------------------->
<div class="flex flex-row justify-center mt-8 mb-10">
	<div class="flex flex-col justify-start">
    <p class="font-mono text-xs mb-3">47 hours ago</p>
    <p class="text-2xl font-mono text-white"><span class="red">JZRO</span> 03<span class="red">2151</span>Z 26004KT CLEAR <span class="red">-6</span>/-14 Q<span class="red">127</span></p>
  </div>
</div>

</main>
<!-------------------------- footer -------------------------->

<footer class="relative text-center flex justify-center items-end h-[100px]"> <!-- Adjust the height and padding as necessary -->
  <p class="z-10 text-darkBg text-xs">Copyalright © 2024 Ivan Karaman | Privacy | Terms</p>
  <img src="assets/footer.svg" alt="" class="w-full h-full absolute z-0 top-2 left-0">
</footer>

<style>

  section {
    @apply border border-dashed border-gray-900;
  }

  .red {
    color: #F21D26;
  }

  .scroll-display {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
  }

  
  .glowing-text {
    /* @apply transition-all duration-1000 ease-in-out; */
    transition: text-shadow 0.5s ease-in-out, color 0.3s ease-in-out;
    text-shadow: 0 0 8px #1ABCFE;
  }
  .glowing-text:hover {
    text-shadow: 0 0 0.8em #1ABCFE;
  }
</style>


