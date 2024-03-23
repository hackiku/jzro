<!-- lib/portfolio/Portfolio.svelte -->
<script>
  import { portfolioData } from '$lib/portfolio/portfolioData.js';
  import { onMount } from 'svelte';

  let scrollContainer;

  // Function to enable dragging
  function enableDragging(element) {
    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });

    element.addEventListener('mouseleave', () => {
      isDown = false;
    });

    element.addEventListener('mouseup', () => {
      isDown = false;
    });

    element.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      element.scrollLeft = scrollLeft - walk;
    });
  }

  onMount(() => {
    enableDragging(scrollContainer);
  });
</script>

  <div class="border border-dashed border-gray-800
    flex items-center max-w-full">
    <div class="w-full relative">

      <div class="flex overflow-x-auto space-x-8 scrollbar-hide" bind:this={scrollContainer}>
        {#each portfolioData as item}
          <div class="flex-shrink-0 w-4/6 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 bg-cover bg-center shadow-lg rounded-3xl overflow-hidden">
            <img src={item.image} alt={item.description} class="min-w-full min-h-full object-cover" />
            <p>{item.tags}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }
</style>
