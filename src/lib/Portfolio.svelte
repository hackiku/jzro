<!-- Portfolio.svelte -->
<script>
  import { onMount } from 'svelte';
  import PortfolioItem from '$lib/PortfolioItem.svelte';

  let scrollContainer;

  let portfolioData = [
    {
      id: 1,
      logo: 'assets/svelte-logo.svg',
      image: 'portfolio/pipistrel-portfolio.png',
      description: 'Interactive airfoil design for Pipistrel Virus SW 121',
      link: 'https://pipistrel.streamlit.app'
    },
    {
      id: 2,
      logo: 'assets/figma-logo.svg',
      image: 'portfolio/mars-weather-portfolio.png',
      description: 'Mars weather aviation style with METARs and TAFs',
      link: '#'
    },
  ];  

  onMount(() => {
    const halfContainerWidth = scrollContainer.offsetWidth / 2;
    const halfContentWidth = scrollContainer.scrollWidth / 2;
    const startPosition = halfContentWidth - halfContainerWidth;
    
    scrollContainer.scrollLeft = startPosition;
  });
</script>


<section class="p-8 px-4 md:px-6 bg-lighterBg">
  <div class="flex flex-wrap items-center max-w-full mx-auto">
    <div class="w-full relative">
      <!-- Scrollable container for portfolio items -->
      <div class="flex overflow-x-auto space-x-2" bind:this={scrollContainer}>
        {#each portfolioData as item}
          <PortfolioItem item={item} />
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Hide scrollbar (optional, remove if you want the scrollbar visible) */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
