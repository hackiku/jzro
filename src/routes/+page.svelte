<!-- homepage +page.svelte -->
<script>
import { onMount , onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import Planet from '$lib/Planet.svelte';
import Coin from '$lib/Coin.svelte';
import Portfolio from '$lib/Portfolio.svelte';
import Testimonials from '$lib/Testimonials.svelte';
import Controls from '$lib/Controls.svelte';
// import OrbitSvg from '$lib/OrbitSvg.svelte';
// import Orbit from '$lib/Orbit.svelte';
// import Spaceship from '$lib/Spaceship.svelte';

import { scrollPosition, updateScrollPosition } from '$lib/scrollStore';

let diameter = 300;

onMount(() => {
    window.addEventListener('scroll', updateScrollPosition);
    updateScrollPosition(); // To set initial scroll position

    onDestroy(() => {
      window.removeEventListener('scroll', updateScrollPosition);
    });
  });



</script>

<Controls />

<!-- --------------------- svgs --------------------- -->

<!-- <OrbitSvg /> -->
<div class="scroll-display">Scroll Position: {$scrollPosition}%</div>

<svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
  <circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue" />
</svg>

<!-- <img class="absolute z-0" src="assets/orbit.svg"> -->

<!-- Replace the <img> tag with an inline SVG and apply Tailwind classes -->
<div class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
  <svg width="100%" height="100%" viewBox="0 0 1171 6191" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.7" d="M1021 0C1021 494.043 704.871 535.527 474.836 636.5C-0.164276 845 539.757 1346.07 877.336 1440C1421.84 1591.5 1193.83 2670 307.335 2843.5C-145.124 2932.05 -111.35 3674.12 508.962 3966.33C1129.27 4258.53 796.869 6158.19 701.336 6190" stroke="#1ABCFE" stroke-dasharray="2 7"/>
  </svg>
</div>

<!-- --------------------- nav --------------------- -->

<div class="container mx-auto px-4">
  <header class="flex justify-between items-center py-4 px-20
  ">
    <h1 class="text-sm text-white font-mono">🚁 jzro</h1>
    <nav>
      <ul class="flex space-x-4 items-center relative">
        <li><a href="/fiddle" class="text-white hover:text-blue-500">fiddle</a></li>
        <li><a href="/orbit-test" class="text-white hover:text-blue-500">orbit</a></li>
      <li><a href="/cta" class="text-white hover:text-blue-500">cta</a></li>
        <li><a href="./grav-sym" class="text-[#F21D26] hover:text-blue-500">grav</a></li>
      </ul>
    </nav>
  </header>
</div>

<!-- --------------------- hero --------------------- -->
<section class="hero mt-24 py-8 flex justify-center items-center">
  <div class="max-w-md text-center">
    <h2 class="text-6xl  text-white mb-4">Aerospace UX</h2>
    <p class="text-2xl text-gray-500 mb-8">User experience writing & design <br> that makes products fly.</p>
    <!-- <Planet initialGravity={40} color="#F4191D" label="Fly me to Orbit" /> -->
    <Planet initialGravity={4} color="#F4191D" label="Take me to Orbit" />
    <div class="flex justify-center items-center space-x-4">
    </div>
  </div>
</section>

<!-- logos -->
<section class="text-center mb-2">
  <div class="grayscale	flex flex-wrap justify-center items-center space-x-8">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Northrop_Grumman_logo_blue-on-clear_2020.svg" alt="Logo 1" class="w-32">
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/European_Space_Agency_logo.svg" alt="Logo 2" class="w-32">
    <p class="text-gray-700">Logo</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Lockheed_Martin_logo.svg" alt="Logo 3" class="w-32">
    <p class="text-gray-700">Logo</p>
  </div>
</section>

<svg class="absolute top-0 right-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
  <!-- Orbit Path -->
  <path d="M 100,0 Q 50,50 0,100" stroke="white" stroke-width="0.1" fill="none"/>
</svg>


<!------------------------ services zigzag ------------------------>
<section class="mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto">
  <div class="flex flex-wrap items-center">
    <div class="w-full md:w-1/2 p-4"> <!-- left -->
      <p class="text-md mb-4">Copywriting & UI/UX</p>
      <h2 class="text-4xl mb-3">Words and vectors <br> that sell <span style="color: #1ABCFE">software</span></h2>
    </div> 
    <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <!-- right -->
      <Planet initialGravity={22} color="#1ABCFE" label="Work"/>
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
    <Planet initialGravity={40} color="#540087" label="For Fun"/>
  </div>
</section>

<div class="h-6 bg-gradient-to-b from-lighterBg to-darkBg mt-8 py-8 flex justify-center items-center"></div>

<!-- --------------------------------------------- -->

<Portfolio />

<section class="mt-20 py-8 px-8 md:px-8 max-w-3xl mx-auto">
  <div class="flex flex-wrap items-center">
    <div class="w-full md:w-1/2 p-4"> <!-- left -->
      <h2 class="text-xl mb-3">Building apps for engineers that try to be smart as a DART 🛰️ (I wish) and more fun than Fortran.</h2>
      <p class="text-md mb-4 font-mono text-blue-700">Hire me to code →</p>
    </div> 
    <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <!-- right -->
      <Planet initialGravity={8} color="#F1F1F1" label="GitHub"/>
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
      <h2 class="text-4xl mb-3">Oye Dusters 👋</h2>
      <p class="text-md mb-4"
      >I’m Ivan, longtime tech copywriter midlife-crisising into an aerospace engineer, pilot and HTML programmer.</p>
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
<section class="flex flex-row mx-20 px-20 py-12 bg-darkBg text-white">
  <!-- Memes Images -->
  <div class="flex flex-col items-end space-y-4 p-14">
    <img src="memes/hello-friend.png" alt="Hello Friend Meme" 
    class="transform rotate-[15deg]">
    <img src="memes/choppa.png" alt="Get to the Choppa Meme" 
    class="h-48 transform rotate-[-15deg]">
  </div>

  <!-- Contact Form inside Planet SVG -->
  <div class="flex justify-center items-center text-white">
    <!-- SVG Circle with Contact Content -->
    <svg class="relative z-10" width="{diameter}" height="{diameter}" viewBox="0 0 {diameter} {diameter}">
      <circle cx="{diameter / 2}" cy="{diameter / 2}" r="{diameter / 2}" fill="#1B0087" />
      
      <!-- Contact Content inside SVG -->
      <foreignObject x="0" y="0" width="{diameter}" height="{diameter}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
          <h3 class="text-4xl text-white mb-4">Let's Talk</h3>
          <a href="mailto:ivan@jzro.co" class="text-xl underline mb-4">ivan@jzro.co</a>
          <input type="range" min="1" max="100" class="slider w-48 mb-4" id="ctaSlider" />
          <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
            <img class="h-24" src="assets/WhatsApp.svg" alt="WhatsApp">
          </a>
        </div>
      </foreignObject>
  </div>
</section>


<!-------------------------- jzro -------------------------->


<!-------------------------- footer -------------------------->

<footer class="relative text-center flex justify-center items-end h-[100px]"> <!-- Adjust the height and padding as necessary -->
  <p class="z-10 text-darkBg text-xs">Copyalright © 2024 Ivan Karaman | Privacy | Terms</p>
  <img src="assets/footer.svg" alt="" class="w-full h-full absolute z-0 top-2 left-0">
</footer>

<style>
  .btn {
    @apply bg-brandBlue rounded-full text-white px-6 py-3 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300;
  }
  .zigzag-section {
    @apply py-8 px-8 md:px-8 bg-lighterBg;
  }
  .zigzag-content {
    @apply flex flex-wrap items-center max-w-xl mx-auto mt-8 py-12;
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
