<!-- routes/cta/+page.svelte -->
<!-- test page for call to action section -->

<script>
  import Planet from '$lib/Planet.svelte';
  import { writable } from 'svelte/store';

  let diameter = 340;

</script>

<!-- ------------------------------------- -->

<section class="flex flex-row mr-12 px-20 py-12 bg-darkBg text-white">
  <!-- Memes Images -->
  <div class="flex flex-col items-end space-y-4 p-14">
    <img src="memes/hello-friend.png" alt="Hello Friend Meme" 
    class="transform rotate-[15deg]">
    <img src="memes/choppa.png" alt="Get to the Choppa Meme" 
    class="transform rotate-[-15deg]">
  </div>

  <!-- Contact Form inside Planet SVG -->
  <div class="flex justify-center items-center text-white">
    <!-- SVG Circle with Contact Content -->
    <svg class="z-10" width="{diameter}" height="{diameter}" viewBox="0 0 {diameter} {diameter}">
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
