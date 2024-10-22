<!-- src/lib/content/work/Pills.svelte -->
<script lang="ts">
  import { selectedCategories, toggleCategory } from './stores/categoryFilters';
  
  export let categories: string[];
  export let interactive = true; // Allow disabling interaction for display-only usage
  
  function handleClick(category: string) {
    if (!interactive) return;
    toggleCategory(category);
  }
  
  $: categoriesSet = new Set(categories);
</script>

<div class="flex flex-wrap gap-2">
  {#each Array.from(categoriesSet) as category}
    <button 
      class="px-4 py-2 text-sm font-medium rounded-full transition-all
        {$selectedCategories.has(category) 
          ? 'bg-[#F4191D] text-white' 
          : 'bg-gray-700 text-white hover:bg-gray-600'
        }"
      on:click={() => handleClick(category)}
      disabled={!interactive}
    >
      {category}
    </button>
  {/each}
</div>