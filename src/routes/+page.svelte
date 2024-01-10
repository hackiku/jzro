<script>
  import { onMount } from 'svelte';

</script>

<div class="container mx-auto px-4">
  <header class="flex justify-between items-center py-4">
    <h1 class="text-md text-white font-mono">jzro</h1>
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
      <h2 class="text-4xl font-bold text-white mb-4">Aerospace UX</h2>
      <p class="text-xl text-gray-500 mb-8">jzro is a space-race-paced boutique user experience design lab.</p>
      <button class="bg-brandBlue rounded-r text-white px-4 py-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">Take me to Orbit</button>
    </div>
  </section>
  
  <!-- logos -->
  <section class="py-8 text-center mb-4">
    <!-- <h3 class="mb-4 text-xs text-gray-700 uppercase">We come in peace from hi tech</h3> -->
    <div class="grayscale	flex flex-wrap justify-center items-center space-x-4">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Northrop_Grumman_logo_blue-on-clear_2020.svg" alt="Logo 1" class="w-24 h-8">
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/European_Space_Agency_logo.svg" alt="Logo 2" class="w-24 h-8">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Lockheed_Martin_logo.svg" alt="Logo 3" class="w-24 h-8">
      <p class="text-gray-700">Logo</p>
    </div>
  </section>
  


  <section class="mt-8 py-8 flex justify-center items-center">
    <div class="max-w-md text-center">
      <h3 class="text-2xl font-mono text-gray-400 mb-4"># Work</h3>
    </div>
  </section>

  <!-- Zigzag Sections -->
  <section class="mt-8 py-8 px-8 md:px-8 max-w-2xl mx-auto">
    <div class="flex flex-wrap items-center">
      <div class="w-full p-8 md:w-1/2 opacity-15">
        <img src="https://via.placeholder.com/350" alt="Zigzag Image 1" class="w-full h-auto">
      </div>
      <div class="w-full md:w-1/2 p-4">
        <h3 class="text-2xl font-bold mb-3">SaaS level design for aerospace</h3>
        <p>The tech industry has PhD'ed user experience and short copy.</p>
      </div>
    </div>
  </section>
  
  <section class="mt-8 py-8 px-8 md:px-8 max-w-2xl mx-auto">
    <div class="flex flex-wrap items-center">
      <div class="w-full md:w-1/2 p-4">
        <h3 class="text-2xl font-bold mb-3">Innovative Aerospace Solutions</h3>
        <p>Exploring the unexplored in aerospace technology and design.</p>
      </div>
      <div class="w-full p-8 md:w-1/2 opacity-15">
        <img src="https://via.placeholder.com/350" alt="Zigzag Image 1" class="w-full h-auto">
      </div>
    </div>
  </section>
  
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
