<!-- src/lib/content/work/components/PortfolioFilter.svelte -->
<script lang="ts">
  import { portfolioStore, type PortfolioCategory } from '../stores/portfolioStore';
  
  const categories: Record<PortfolioCategory, string> = {
    'Product': 'Product design A-Z for my own products',
    'Writing': 'Copywriting and UX writing for tech interfaces',
    'Aerospace': 'Forays into code-first aerospace engineering',
    'Dev': 'Front-end and backend development',
    'All': 'Show everything'
  };
  
  $: tabs = Object.entries(categories) as [PortfolioCategory, string][];
  
  let y: number;

  $: if (typeof y !== 'undefined') {
    portfolioStore.updateScroll(y);
  }
</script>

<svelte:window bind:scrollY={y}/>

<div class="{$portfolioStore.isFixed ? 'fixed top-0 left-0 right-0' : ''} w-full z-30">
  <div class="container mx-auto px-4 md:px-16 py-4 
              {$portfolioStore.isFixed ? 'bg-gray-900/80 backdrop-blur-md' : ''}">
    <div class="flex gap-4 overflow-x-auto items-center">
      {#each tabs.filter(([cat]) => cat !== 'All') as [category, description]}
        <button 
          class="px-4 py-2 rounded-full transition-colors whitespace-nowrap
                 {$portfolioStore.selectedCategory === category 
                   ? 'bg-white text-gray-800' 
                   : 'bg-gray-800 text-white hover:bg-gray-700'}"
          on:click={() => portfolioStore.setCategory(category)}
        >
          {category}
        </button>
      {/each}
      
      <button 
        class="px-4 py-2 rounded-full transition-colors ml-auto whitespace-nowrap
               {$portfolioStore.selectedCategory === 'All'
                 ? 'bg-white text-gray-800'
                 : 'border border-white text-white hover:bg-gray-800'}"
        on:click={() => portfolioStore.setCategory('All')}
      >
        All
      </button>
    </div>
  </div>
</div>

{#if $portfolioStore.isFixed}
  <div class="h-16"></div>
{/if}