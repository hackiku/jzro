<script>
  import { onMount } from 'svelte';
  import Planet from '$lib/Planet.svelte';
  import Portfolio from '$lib/Portfolio.svelte';
  
  let gravity = 2
  onMount(() => {
    // Any logic you need to execute when the component is first mounted
    // This could include fetching data, setting up state, etc.
  });

  // If you need to handle resizing or other interactions for the 'Planet',
  // you would add that logic here, otherwise, the 'Planet' component will
  // manage its own state and behavior.
</script>



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
    <p class="text-xl text-gray-500 mb-8">jzro is a space-race-paced boutique user experience design lab.</p>
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
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Lockheed_Martin_logo.svg" alt="Logo 3" class="w-24 h-8">
      <p class="text-gray-700">Logo</p>
    </div>
  </section>
  

  <section class="h-12 bg-gradient-to-b from-darkBg to-lighterBg mt-8 py-8 flex justify-center items-center">
      <h3 class="text-md font-mono text-gray-400 mb-4 text-center">◀ Work</h3>
  </section>

  <!-- Zigzag Sections -->

  <section class="py-8 px-8 md:px-8 bg-lighterBg">
    <div class="flex flex-wrap items-center max-w-xl mx-auto mt-8 py-12">
      <div class="w-full md:w-1/2 p-4 relative">
        <Planet>SaaS design</Planet>
      </div>
      <div class="w-full md:w-1/2">
        <h3 class="text-2xl font-bold mb-3">Words & design for the space industry</h3>
        <p class="mb-4">We bring the best lessons from SaaS and big tech design to the industry.</p>
      </div>  
    </div>
  </section>

  <Portfolio />

  <!-- ========= GRAVITY SITUATION =========  -->
  <section class="py-8 px-8 md:px-8">
    <div class="max-w-xl mx-auto text-center">
  
      <!-- Heading and Subheading -->
      <h3 class="text-xl font-bold mb-4">Rate the gravity of the situation</h3>
      <p class="text-xl mb-8">Aerospace needs UX posthaste</p>
  
      <!-- Mock Slider UI Element -->
      <div class="flex justify-center items-center">
        <label for="gravity-slider" class="mr-4">Gravity:</label>
        <input type="range" id="gravity-slider" name="gravity-slider" min="0" max="100" bind:value={gravity} class="w-full max-w-md">
      </div>
  
      <!-- Planet Component -->
      <div class="mb-8">
        <Planet verticalLabelOffset={1} gravity={gravity}>I need UX</Planet>
      </div>
    </div>
  </section>
    


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
  <!-- <Planet horizontalLabelOffset={1} verticalLabelOffset={1}>My Planet Label</Planet> -->


  <!-- Centered Section -->
  <section class="py-8">
    <div class="text-center">
      <h2 class="text-4xl font-bold mb-4">Why Choose Jzro?</h2>
      <p class="text-xl mb-8">Leading the frontier in aerospace UX design.</p>
      <div class="flex justify-center space-x-4">
        <div class="max-w-sm">
          <img src="/placeholder-icon-1.svg" alt="Icon 1" class="mx-auto">
          <h4 class="font-bold mt-2">Innovation</h4>
          <p>Pushing the boundaries of what's possible.</p>
        </div>
        <div class="max-w-sm">
          <img src="/placeholder-icon-2.svg" alt="Icon 2" class="mx-auto">
          <h4 class="font-bold mt-2">Reliability</h4>
          <p>Systems you can trust, in the most critical moments.</p>
        </div>
        <div class="max-w-sm">
          <img src="/placeholder-icon-3.svg" alt="Icon 3" class="mx-auto">
          <h4 class="font-bold mt-2">User-Centric</h4>
          <p>Designs focused on user experience and interface.</p>
        </div>
      </div>
    </div>
  </section>
  
  <footer class="border-t border-gray-800 text-center p-12 text-gray-600">
    <form class="flex justify-center items-center">
      <input type="email" placeholder="email away" class="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300" />
      <button class="bg-brandBlue rounded-r text-white px-4 py-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">Subscribe</button>
    </form>
  </footer>

  <!------------------------------>
  <style>
  </style>
