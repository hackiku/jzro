<!-- lib/portfolio/codePortfolio.js -->
<script>
  import { codePortfolioData } from '$lib/portfolio/codePortfolioData.js';
  import { onMount } from 'svelte';

  let displayedItems = codePortfolioData.slice(0, 4);
  let showMore = false;

  function toggleShowMore() {
    showMore = !showMore;
    displayedItems = showMore ? codePortfolioData : codePortfolioData.slice(0, 4);
  }

  onMount(() => {
    // Optionally, do something when the component mounts
  });
</script>

<div class="py-8">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-wrap justify-between gap-2">
      {#each displayedItems as item}
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 flex flex-col rounded-lg shadow-lg overflow-hidden" style="max-width: 340px;">
          <img src={item.logo} alt="{item.title} logo" class="w-12 h-12 object-contain self-center" />
          <div class="flex-grow relative" style="padding-top: 56.25%;">
            <img src={item.image} alt="{item.title} project image" class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover" />
          </div>
          <div class="flex justify-between items-center mt-4">
            <p class="text-sm">{item.description}</p>
            <a href={item.link} class="text-indigo-500 hover:text-indigo-400 transition duration-300 text-sm">App →</a>
          </div>
        </div>
      {/each}
    </div>
    {#if codePortfolioData.length > 4}
      <div class="flex justify-center mt-6">
        <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300" on:click={toggleShowMore}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    {/if}
  </div>
</div>
