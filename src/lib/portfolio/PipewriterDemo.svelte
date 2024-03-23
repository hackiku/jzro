<!-- $lib/portfolio/PipewriterDemo.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import PortfolioItem from '$lib/content/PortfolioItem.svelte';
  import PortfolioTestimonial from '$lib/content/PortfolioTestimonial.svelte';
  import ButtonDoc from '$lib/ui/ButtonDoc.svelte';
  import { portfolioItems } from '$lib/content/portfolioData.js';

  export let tilt;
  let currentIndex = 1;

  // Calculate the index for the previous and next items with wrap-around
  $: previousIndex = currentIndex === 0 ? portfolioItems.length - 1 : currentIndex - 1;
  $: nextIndex = (currentIndex + 1) % portfolioItems.length;

  function navigate(direction) {
    currentIndex = direction === 'next' ? nextIndex : previousIndex;
  }
</script>

<style>
  /* :global(body) {
    overflow-x: hidden;
  } */

  .full-width-slider {
    width: 100vw;
    position: relative;
    margin-left: calc(-50vw + 50%);}
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>


<div class="full-width-slider flex snap-x snap-mandatory
  overflow-x-clip overflow-x-clip hide-scrollbar">

  <!-- Previous item (always visible with wrap-around) -->
  <div class="portfolio-item  opacity-10 hover:opacity-100" style="width: 20%;">
    <PortfolioItem item={portfolioItems[previousIndex]} bind:tilt/>
  </div>
  
  <!-- Current item (fully visible) -->
  <div class="space-y-20" style="width: 80%;">
    <div class="flex relative">
      <PortfolioItem item={portfolioItems[currentIndex]} bind:tilt/>      
      <div class="absolute right-0 bottom-0 mr-4">
        <ButtonDoc docName="See {portfolioItems[currentIndex].client} doc&nbsp;"/>
      </div>
    </div>
    
    <PortfolioTestimonial
      testimonial={portfolioItems[currentIndex].testimonial}
      person={portfolioItems[currentIndex].person}
      personPic={portfolioItems[currentIndex].personPic}
      client={portfolioItems[currentIndex].client}
      on:navigate={e => navigate(e.detail)}
    />
  </div>

  <!-- Next item (always visible with wrap-around) -->
  <div class="portfolio-item opacity-10 hover:opacity-100" style="width: 20%;">
    <PortfolioItem item={portfolioItems[nextIndex]} bind:tilt/>
  </div>
</div>
