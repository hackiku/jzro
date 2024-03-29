<!-- lib/portfolio/CodePortfolio.svelte -->

<script>
  import { codePortfolioData, toolIcons } from '$lib/portfolio/codePortfolioData.js';
</script>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .scroll-container {
    position: relative;
    max-height: 70vh;
    overflow-y: auto;
  }
  .gradient-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 18vh;
    background: linear-gradient(to bottom, transparent, #09050E);
    pointer-events: none; /* Ensures clicks pass through to elements below */
  }
</style>

<div class="px-4 sm:px-6 lg:px-8 relative">
  <div class="scroll-container hide-scrollbar pb-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
      {#each codePortfolioData as item}
        <div class="mb-2 shadow-lg">
          <h2 class="text-xl font-semibold mb-4">{item.title}</h2>
          <img src={item.image} alt="{item.title} project image"
            class="w-full object-cover h-44"/>
          <div class="py-4 flex space-between">
            <div class="flex flex-row flex-wrap items-center space-x-4">
              {#each item.tools as toolName}
                <div class="flex items-center border border-gray-500 text-gray-500 text-sm font-medium px-4 py-2  rounded-full">
                  <img src={toolIcons[toolName]} alt={toolName} class="w-6 h-6" />
                  {toolName}
                </div>
              {/each}
              <a href={item.link} class="inline-block text-indigo-500 hover:text-indigo-600 transition duration-300">Visit →</a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="gradient-fade"></div>
</div>
