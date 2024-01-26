<!-- homepage.svelte -->
<script>
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import Planet from '$lib/Planet.svelte';
import Portfolio from '$lib/Portfolio.svelte';
import Testimonials from '$lib/Testimonials.svelte';
import Spaceship from '$lib/Spaceship.svelte';

onMount(() => {
  // Additional setup if needed
});

let particleNumber = 50; // default value for slider

  // A store to hold the scroll position as a percentage
export const scrollPosition = writable(0);

onMount(() => {
  const updateScrollPosition = () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.offsetHeight - window.innerHeight;
    scrollPosition.set(scrollY / totalHeight * 100);
  };
  
  window.addEventListener('scroll', updateScrollPosition);
  return () => window.removeEventListener('scroll', updateScrollPosition);
});

</script>

<!-- <Spaceship /> -->

<!-- <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
  <circle class="opacity-20" cx="1em" cy="-36" r="32" fill="darkblue" />
</svg>   -->

<svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
  <circle class="opacity-20" cx="8vw" cy="-2vh" r="2vw" fill="darkblue" />
</svg>

<svg class="absolute top-0 left-0 w-full h-full" style="pointer-events: none;">
  <circle class="opacity-20" cx="80vw" cy="-22vh" r="18vw" fill="darkblue" />
</svg>

<!-- --------------------- nav --------------------- -->

<div class="container mx-auto px-4">
  <header class="flex justify-between items-center py-4 px-20
  ">
    <h1 class="text-sm text-white font-mono">jzro</h1>
    <nav>
      <ul class="flex space-x-4 items-center relative">
        <li><a href="#" class="text-white hover:text-gray-300">Work</a></li>
        <li><a href="#" class="text-white hover:text-gray-300">Play</a></li>
        <li><a href="#" class="text-white hover:text-gray-300">About</a></li>
        <li><a href="./grav-sym" class="text-white hover:text-gray-300">Grav</a></li>
      </ul>
    </nav>
  </header>
</div>

<!-- PARTICLE SELECTOR -->
<div class="fixed p-6 bottom-12 rounded-full flex justify-center items-center bg-gray-800 bg-opacity-10 left-1/2 transform -translate-x-1/2">
  <div class="relative flex justify-center group hover:opacity-100 transition-opacity opacity-0">
    <span class="absolute bottom-full mb-2">
    <!-- <span class="absolute bottom-full mb-2 transition-opacity"> -->
      Particle Number: {particleNumber}
    </span>

    <!-- Slider -->
    <input type="range" min="1" max="100" value={particleNumber}
           class="slider w-full" id="particleNumber"
           on:input={(e) => particleNumber = e.target.value} />
  </div>
</div>

<!-- --------------------- hero --------------------- -->
<section class="hero mt-24 py-8 flex justify-center items-center">
  <div class="max-w-md text-center">
    <h2 class="text-6xl  text-white mb-4">Aerospace UX</h2>
    <p class="text-2xl text-gray-500 mb-8">I write and design user experiences for those who make machines fly.</p>
    <!-- <Planet initialGravity={40} color="#F4191D" label="Fly me to Orbit" /> -->
    <Planet initialGravity={4} color="#F4191D" label="Fly me to Orbit" />
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


  <!------------------------ services ------------------------>
  <section class="mt-20 py-8 px-8 md:px-8 max-w-2xl mx-auto">
    <div class="flex flex-wrap items-center">
      <div class="w-full md:w-1/2 p-4"> <!-- left -->
        <h3 class="text-3xl mb-3">Product copy and UI/UX design</h3>
        <p class="text-md mb-4">I write wireframes that storytell and sell, and save you time on design.</p>
      </div>
      <div class="w-full mt-20 -mb-8 p-8 md:w-1/2"> <!-- right -->
        <Planet initialGravity={22} color="#1ABCFE" label="Work"/>
      </div>
    </div>
  </section>

  <div class="h-6 bg-gradient-to-b from-darkBg to-lighterBg mt-8 py-8 flex justify-center items-center"></div>
  
  <Portfolio />
  
  <!-- zigzag right -->
  <section class="py-8 px-8 md:px-8 bg-lighterBg">
    <div class="flex flex-wrap items-center max-w-xl mx-auto mt-8 py-12">
      <div class="w-full md:w-1/2 p-4 relative">
        <!-- <Planet initialGravity={40} color="blue" label="SaaS"/> -->
      </div>
    </div>
  </section>
  
  <img class="h-12" src="https://latvijasalfabets.lv/assets/images/ribbons/awwwards_honorable_white_right@2x.png" alt="">
  
  <Testimonials />

  <!--------------------------------------------------------->
  <section class="zigzag-section">
    <div class="zigzag-content">
      <div class="w-full md:w-1/2 p-4">
        <h3 class="text-2xl font-bold mb-3">Understanding the gravity of the situation</h3>
        <p class="mb-4">We bring the best lessons from SaaS and big tech design to the industry.</p>
        <button class="border-brandBlue border-2 rounded-full text-brandBlue px-6 py-2 hover:bg-gray-400 focus:ring-gray-300">
          Choose violence →
        </button>
      </div>
      <div class="w-full p-8 md:w-1/2">
      image
      </div>
  </section>

  <!-- ========= GRAVITY SITUATION =========  -->
<section class="py-8 px-8 md:px-8">
  <div class="max-w-xl mx-auto text-center">
    <h3 class="text-xl font-bold mb-4">Rate the gravity of the situation</h3>
    <p class="text-xl mb-8">Aerospace needs UX posthaste</p>
    <!-- <Planet initialGravity={30} color={"lightblue"} label={"gravity level"} /> -->
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
    .btn {
      @apply bg-brandBlue rounded-full text-white px-6 py-3 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300;
    }
    .zigzag-section {
      @apply py-8 px-8 md:px-8 bg-lighterBg;
    }
    .zigzag-content {
      @apply flex flex-wrap items-center max-w-xl mx-auto mt-8 py-12;
    }

  </style>
