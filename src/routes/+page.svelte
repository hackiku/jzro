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


<!-- <GravityLauncher /> -->

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

<!------------------------ services zigzag ------------------------>
<section class="mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto">
  <div class="flex flex-wrap items-center">
    <div class="w-full md:w-1/2 p-4"> <!-- left -->
      <p class="text-md mb-4">Copywriting & UI/UX</p>
      <h2 class="text-4xl mb-3">Words and vectors <br> that sell <span style="color: #1ABCFE">software</span></h2>
    </div> 
    <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <!-- right -->
      <Planet id="work" color="#1ABCFE" label="for work"/>
    </div>
  </div>
</section>


<Portfolio />

<Testimonials />

<!-- --------------------------------------------- -->

<div class="h-6 bg-gradient-to-b from-darkBg to-lighterBg mt-8 py-8 flex justify-center items-center"></div>

<section class="relative bg-lighterBg">
  <!-- Text aligned with padding, responsive for smaller screens -->
  <div class="flex justify-end mr-16 md:mr-32 lg:mr-64">
    <div class="max-w-xl lg:max-w-3xl">
      <p class="text-sm mb-4 font-mono">Engineering & Code</p>
      <h3 class="text-3xl mb-4">Aerospacey interfaces</h3>
    </div>
  </div>

  <!-- Planet with responsive positioning -->
  <div class="absolute left-[10%] md:left-[10%] lg:left-[10%]">
    <Planet id="fun" color="#540087" label="for fun"/>
  </div>
</section>

<div class="h-6 bg-gradient-to-b from-lighterBg to-darkBg mt-8 py-8 flex justify-center items-center"></div>

<!-- --------------------------------------------- -->

<Portfolio />

<section class="mt-20 py-8 px-8 md:px-8 max-w-2xl mx-auto">
  <div class="flex flex-wrap items-center">
    <div class="w-full md:w-1/2 p-4"> <!-- left -->
      <h3 class="text-xl mb-3">I also *really* like building engineery apps that ain't smart as a DART 🛰️ but sure are more fun than Fortran</h3>
      <p class="text-md mb-4 font-mono text-blue-700">Hire me to code →</p>
    </div> 
    <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <!-- right -->
      <Planet id="github" color="#F1F1F1" label="GitHub"/>

    </div>
  </div>
</section>

<div class="flex w-auto max-w-xl mx-auto justify-center">
  <img class="h-40" src="assets/dangerous-go-alone.png" alt="">  
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
