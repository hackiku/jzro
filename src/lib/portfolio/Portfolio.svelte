<!-- lib/portfolio/Portfolio.svelte -->
<script>
  import { portfolioData, portfolioTags } from '$lib/portfolio/portfolioData.js';
  import { onMount , onDestroy } from 'svelte';

  let scrollContainer;
  let selectedItem = 'all';
  let animationFrameId;
  let isDragging = false;

  // Dynamically count projects per tag
  $: projectsPerTag = Object.entries(portfolioTags).reduce((acc, [tag, id]) => {
    acc[tag] = portfolioData.filter(item => item.tags.includes(id)).length;
    return acc;
  }, {});

    // Filter displayedItems based on selectedItem, duplicating for seamless scrolling
    $: displayedItems = (selectedItem === 'all' ? 
    [...portfolioData, ...portfolioData] : [...portfolioData.filter(item => item.tags.includes(portfolioTags[selectedItem])), ...portfolioData.filter(item => item.tags.includes(portfolioTags[selectedItem]))]);


  function continuousScroll() {
    if (!isDragging) {
      scrollContainer.scrollLeft += 1; // speed
      
      // Reset scroll position to create an infinite loop effect
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - window.innerWidth) {
        scrollContainer.scrollLeft = 0;
      }
    }

    animationFrameId = requestAnimationFrame(continuousScroll);
  }

  onMount(() => { 
    enableDragging(scrollContainer);
    animationFrameId = requestAnimationFrame(continuousScroll); // Start scrolling
  });

  // Accepts a tag name, updates selectedItem
  function setSelectedItem(tagName) {
    selectedItem = tagName;
  }

  function enableDragging(element) {
  let startX;
  let scrollLeft;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });

  const stopDragging = () => {
    if (isDragging) {
      isDragging = false;
      animationFrameId = requestAnimationFrame(continuousScroll); // Resume scrolling
    }
  };

  element.addEventListener('mouseleave', stopDragging);
  element.addEventListener('mouseup', stopDragging);
  element.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 3; // Adjust scroll sensitivity as needed
    element.scrollLeft = scrollLeft - walk;
    cancelAnimationFrame(animationFrameId); // Pause scrolling
  });
}

</script>

  
<!-- projects slider -->
<div class="flex absolute left-0 bottom-0 overflow-x-auto space-x-12 scrollbar-hide w-screen" bind:this={scrollContainer}
      style="cursor: url(https://cdn.custom-cursor.com/db/cursor/32/NASA_Cursor.png) , default !important"
      >
  {#each displayedItems as item}
    <div class="flex-shrink-0 w-[18em] min-h-[13em] shadow-lg rounded-3xl overflow-hidden rotate-rtl">
    <!-- <div class="flex-shrink-0 w-3/6 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 shadow-lg rounded-3xl overflow-hidden"> -->
      <img src={item.image} alt={item.description} class="min-w-full min-h-full object-cover rounded-2xl" />
    </div>
  {/each}
</div>

<!-- tags -->
<div class="flex absolute bottom-56 flex-wrap max-w-md justify-start items-start">
  {#each Object.keys(portfolioTags) as tag}
    <span class="text-md font-mono text-gray-500 hover:text-white cursor-pointer
          {selectedItem === tag ? 'text-white' : 'text-gray-500'}"
          on:click={() => setSelectedItem(tag)}>
       {tag} {selectedItem === tag ? `(${projectsPerTag[tag]})` : ''} /&nbsp;
    </span>
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
