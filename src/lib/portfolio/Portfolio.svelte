<!-- lib/portfolio/Portfolio.svelte -->
<script>
  import { portfolioData, portfolioTags } from '$lib/portfolio/portfolioData.js';
  import { onMount } from 'svelte';

  let scrollContainer;
  // Default to showing 'all' items
  let selectedItem = 'all';

  // Dynamically count projects per tag
  $: projectsPerTag = Object.entries(portfolioTags).reduce((acc, [tag, id]) => {
    acc[tag] = portfolioData.filter(item => item.tags.includes(id)).length;
    return acc;
  }, {});

  // Filter displayedItems based on selectedItem
  $: displayedItems = selectedItem === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.tags.includes(portfolioTags[selectedItem]));

  onMount(() => { 
    enableDragging(scrollContainer);
  });

  // Accepts a tag name, updates selectedItem
  function setSelectedItem(tagName) {
    selectedItem = tagName;
  }

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
      const walk = (x - startX) * 3;
      element.scrollLeft = scrollLeft - walk;
    });
  }
</script>

<!-- Tags display section -->
<div class="flex mx-auto p-4 mb-6 items-center justify-center
  select-none bg-gray-900 rounded-full cursor-pointer
  bg-gray-900 bg-opacity-50 z-50 backdrop-blur-md
  px-6 transition-all duration-300 ease-in-out">
  {#each Object.keys(portfolioTags) as tag}
    <span class="text-sm text-gray-500 hover:text-white mr-4 cursor-pointer"
          on:click={() => setSelectedItem(tag)}>
      {tag}
      {selectedItem === tag ? ` (${projectsPerTag[tag]})` : ''}
    </span>
  {/each}
</div>

<!-- Projects display section -->
<div class="flex overflow-x-auto space-x-8 scrollbar-hide" bind:this={scrollContainer}>
  {#each displayedItems as item}
    <div class="flex-shrink-0 w-5/6 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 shadow-lg rounded-3xl overflow-hidden">
      <img src={item.image} alt={item.description} class="min-w-full min-h-full object-cover rounded-2xl" />
    </div>
  {/each}
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
