<!-- routes/cta/+page.svelte -->
<!-- test page for call to action section -->

<script>
  import Planet from '$lib/Planet.svelte';
  import { writable } from 'svelte/store';

  let gravity = writable(100); // Assuming this controls the diameter
  let diameter = 400; // You can replace this with a store if you want dynamic updates

</script>

<!-- ------------------------------------- -->

<div class="mx-50 w-20">
  <img src="memes/hello-friend.png" alt="Hello Friend Meme" 
  class="transform rotate-[15deg]">
  <img src="memes/choppa.png" alt="Get to the Choppa Meme" 
  class="transform rotate-[-15deg]">
</div>









<section class="relative px-20 py-12 bg-darkBg text-white">
  <!-- Memes Images -->
  <div class="flex flex-col items-start space-y-4">
    <img src="memes/hello-friend.png" alt="Hello Friend Meme" 
    class="transform rotate-[15deg]">
    <img src="memes/choppa.png" alt="Get to the Choppa Meme" 
    class="transform rotate-[-15deg]">
  </div>

  <!-- Contact Form inside Planet SVG -->
  <div class="flex justify-center items-center text-white">
    <!-- SVG Circle with Contact Content -->
    <svg class="relative z-10" width="{diameter}" height="{diameter}" viewBox="0 0 {diameter} {diameter}">
      <circle cx="{diameter / 2}" cy="{diameter / 2}" r="{diameter / 2}" fill="#1B0087" />
      
      <!-- Contact Content inside SVG -->
      <foreignObject x="0" y="0" width="{diameter}" height="{diameter}" class="flex flex-col items-center justify-center">
        <div xmlns="http://www.w3.org/1999/xhtml" class="flex flex-col items-center justify-center text-center">
          <p class="text-4xl text-white mb-4">Let's Talk</p>
          <a href="mailto:ivan@jzro.co" class="text-2xl mb-4">ivan@jzro.co</a>
          <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" class="mb-4">
            <!-- Insert WhatsApp SVG here -->
          </a>
          <input type="range" min="1" max="100" class="slider w-64" id="ctaSlider" />
        </div>
      </foreignObject>
    </svg>
  </div>
  
</section>
