<!-- src/lib/features/work/components/PortfolioFilter.svelte -->

<script lang="ts">
  import { portfolioStore, type PortfolioCategory } from '../stores/portfolioStore';
  import { scale } from 'svelte/transition';
  
  const categories: Record<PortfolioCategory, string> = {
    'Product': 'Product design A-Z for my own products',
    'Writing': 'Copywriting and UX writing for tech interfaces',
    'Aerospace': 'Forays into code-first aerospace engineering',
    'Dev': 'Front-end and backend development',
    'All': 'Show everything'
  };
  
  $: tabs = Object.entries(categories) as [PortfolioCategory, string][];
  
  function selectTab(category: PortfolioCategory) {
    portfolioStore.setCategory(category);
  }

  // Handle scroll position
  let y: number;
  $: if (typeof y !== 'undefined') {
    portfolioStore.updateScroll(y);
  }
</script>

<svelte:window bind:scrollY={y}/>

<div class:fixed={$portfolioStore.isFixed} 
     class="w-full z-30 transition-all duration-300 ease-in-out
            {$portfolioStore.isFixed ? 'bg-gray-900/80 backdrop-blur-md py-4' : 'py-2'}">
  <div class="container mx-auto px-4 md:px-16">
    <div class="flex gap-4 overflow-x-auto items-center">
      {#each tabs.filter(([cat]) => cat !== 'All') as [category, description]}
        <button 
          class="px-4 py-2 rounded-full transition-all whitespace-nowrap
                 {$portfolioStore.selectedCategory === category 
                   ? 'bg-white text-gray-800' 
                   : 'bg-gray-800 text-white hover:bg-gray-700'}"
          on:click={() => selectTab(category)}
        >
          {category}
        </button>
      {/each}
      
      <!-- All button with outline style -->
      <button 
        class="px-4 py-2 rounded-full transition-all ml-auto
               {$portfolioStore.selectedCategory === 'All'
                 ? 'bg-white text-gray-800'
                 : 'border border-white text-white hover:bg-gray-800'}"
        on:click={() => selectTab('All')}
      >
        All
      </button>
    </div>
  </div>
</div>
