<!-- /grav/CTA.svelte -->
<script>
  import { browser } from '$app/environment';
  import physicsStore from '$lib/grav/physicsStore.js';
  import { createEventDispatcher, onMount } from 'svelte';

</script>

<foreignObject x="0" y="0" width="{diameter}" height="{diameter}">
  <div xmlns="http://www.w3.org/1999/xhtml" style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
    <h3 class="text-4xl text-white mb-4">Let's Fly</h3>
    <a href="mailto:ivan@pipewriter.io" class="text-xl underline mb-4">ivan@pipewriter.io</a>
    <input type="range" min="10" max="100" class="slider w-48 mb-4"
      id="ctaSlider" bind:value={$sliderValue}/>
      <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
      <img class="h-24" src="assets/WhatsApp.svg" alt="WhatsApp">
    </a>
  </div>
</foreignObject>
