<script>
  import { onMount } from 'svelte';
  import Planet from '$lib/Planet.svelte';
  import Portfolio from '$lib/Portfolio.svelte';
    import Testimonials from '$lib/Testimonials.svelte';


  onMount(() => {
    // Additional setup if needed
  });
  
</script>

<Planet initialGravity={90} horizontalLabelOffset={0.1} color={"lightblue"} label={"test1ss"} />

<!-- <Planet initialGravity={40} color="green" label="test2" /> -->


<div class="container mx-auto px-4">
  <header class="flex justify-between items-center py-4">
    <h1 class="text-sm text-white font-mono">jzro</h1>
    <nav>
      <ul class="flex space-x-4">
        <li><a href="#" class="text-white hover:text-gray-300">Work</a></li>
        <li><a href="#" class="text-white hover:text-gray-300">Play</a></li>
        <li><a href="#" class="text-white hover:text-gray-300">About</a></li>
      </ul>
    </nav>
  </header>
</div>


<!-- hero -->
<section class="hero mt-16 py-8 flex justify-center items-center">
  <div class="max-w-md text-center">
    <h2 class="text-5xl  text-white mb-4">Aerospace UX</h2>
    <p class="text-xl text-gray-500 mb-8">JZRO is a space-race-paced user experience lab for those who make things fly.</p>
    <div class="flex justify-center items-center space-x-4">
      <!-- Take me to Orbit Button -->
      <button class="bg-brandBlue rounded-full text-white px-6 py-3 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
        Take me to Orbit
      </button>

      <!-- GitHub Button -->
      <button class="bg-black rounded-full text-white px-6 py-3 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
        <svg class="h-6 w-6 inline-block mr-2 -mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12c1.26 1.96 3.35 3.27 5.7 3.45 0.42 0.07 0.57-0.18 0.57-0.4v-1.59c-2.28 0.5-2.76-1.1-2.76-1.1-0.5-1.27-1.22-1.6-1.22-1.6-1-0.68 0.07-0.67 0.07-0.67 1.1 0.08 1.68 1.13 1.68 1.13 0.98 1.68 2.56 1.2 3.19 0.92 0.1-0.71 0.38-1.2 0.69-1.47-1.82-0.21-3.73-0.91-3.73-4.05 0-0.9 0.32-1.63 0.84-2.2-0.08-0.21-0.36-1.05 0.08-2.19 0 0 0.69-0.22 2.25 0.82 0.65-0.18 1.35-0.27 2.05-0.27s1.4 0.09 2.05 0.27c1.56-1.04 2.25-0.82 2.25-0.82 0.44 1.14 0.16 1.98 0.08 2.19 0.52 0.57 0.84 1.3 0.84 2.2 0 3.14-1.91 3.84-3.73 4.05 0.39 0.34 0.74 1 0.74 2.01v2.99c0 0.22 0.15 0.48 0.57 0.4 2.35-0.18 4.44-1.49 5.7-3.45 0 0 0.02-4.52-1.98-8.52C18 6.48 17.52 2 12 2z"/>
        </svg>
        GitHub
      </button>
    </div>
  </div>
</section>


  <!-- logos -->
  <section class="py-8 text-center mb-4">
    <h3 class="mb-4 text-xs text-gray-700">We come in peace from tech</h3>
    <div class="grayscale	flex flex-wrap justify-center items-center space-x-4">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Northrop_Grumman_logo_blue-on-clear_2020.svg" alt="Logo 1" class="w-24 h-8">
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/European_Space_Agency_logo.svg" alt="Logo 2" class="w-24 h-8">
      <p class="text-gray-700">Logo</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Lockheed_Martin_logo.svg" alt="Logo 3" class="w-24 h-8">
      <p class="text-gray-700">Logo</p>
      <p class="text-gray-700">Logo</p>
    </div>
  </section>
  

  <section class="h-12 bg-gradient-to-b from-darkBg to-lighterBg mt-8 py-8 flex justify-center items-center">
      <h3 class="text-md font-mono text-gray-400 mb-4 text-center">◀ Work</h3>
  </section>

  <!------------------------ services ------------------------>
  <section class="mt-8 py-8 px-8 md:px-8 max-w-2xl mx-auto">
    <div class="flex flex-wrap items-center">
      <div class="w-full md:w-1/2 p-4">
        <h3 class="text-2xl mb-3">Copywriting & design for the space industry</h3>
        <p class="mb-4">Bringing the lessons of human-centered design from tech to space tech.</p>
      </div>
      <div class="w-full p-8 md:w-1/2">
        <Planet initialGravity={80} color="#a84e32" label="SaaS"/>
      </div>
    </div>
  </section>

  <Portfolio />

  <section class="py-8 px-8 md:px-8 bg-lighterBg">
    <div class="flex flex-wrap items-center max-w-xl mx-auto mt-8 py-12">
      <div class="w-full md:w-1/2 p-4 relative">
        <Planet initialGravity={40} color="blue" label="SaaS"/>
      </div>
      <div class="w-full md:w-2/5">
        <h5 class="mb-3">Bringing the lessons of human-centered design from tech to space tech</h5>
      </div>  
    </div>
  </section>
  
  <img class="h-12" src="https://latvijasalfabets.lv/assets/images/ribbons/awwwards_honorable_white_right@2x.png" alt="">
  
  <Testimonials />

  <!--------------------------------------------------------->
  <section class="mt-8 py-8 px-8 md:px-8 max-w-2xl mx-auto">
    <div class="flex flex-wrap items-center">
      <div class="w-full md:w-1/2 p-4">
        <h3 class="text-2xl font-bold mb-3">Understanding the gravity of the situation</h3>
        <p class="mb-4">We bring the best lessons from SaaS and big tech design to the industry.</p>
        <button class="border-brandBlue border-2 rounded-full text-brandBlue px-6 py-2 hover:bg-gray-400 focus:ring-gray-300">
          Choose violence →
        </button>
  
      </div>
        <div class="w-full p-8 md:w-1/2">
      </div>
    </div>
  </section>

  <!-- ========= GRAVITY SITUATION =========  -->
<section class="py-8 px-8 md:px-8">
  <div class="max-w-xl mx-auto text-center">
    <h3 class="text-xl font-bold mb-4">Rate the gravity of the situation</h3>
    <p class="text-xl mb-8">Aerospace needs UX posthaste</p>
    <Planet initialGravity={30} color={"lightblue"} label={"gravity level"} />
    <!-- Single Planet Component -->
    <div class="mb-8">
      <!-- <Planet initialGravity={30} color="blue" label="UX Importance"/> -->
    </div>
  </div>
</section>      


  <!--------------------------footer-------------------------->  
  <footer class="border-t border-gray-800 text-center p-12 text-gray-600">
    <form class="flex justify-center items-center">
      <input type="email" placeholder="email away" class="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300" />
      <button class="bg-brandBlue rounded-r text-white px-4 py-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">Subscribe</button>
    </form>
  </footer>

  <!------------------------------>
  <style>
  </style>
