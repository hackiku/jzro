<!-- src/lib/content/work/ProjectCategoryTabs.svelte -->
<script lang="ts">
  import { scale } from 'svelte/transition';
  
  const workTabs: Record<string, string> = {
    'Product': 'Product design A-Z for my own products',
    'Writing': 'Copywriting and UX writing for tech interfaces',
    'Aerospace': 'Forays into code-first aerospace engineering',
    'Dev': 'Front-end and backend development'
  };
  
  $: tabs = Object.entries(workTabs);
  
  let selectedTab = 'product';
  let y: number;
  
  function selectTab(tab: string) {
    selectedTab = tab;
  }
</script>

<svelte:window bind:scrollY={y} />

<div class="sticky top-0 z-30 w-full bg-gray-900/80 backdrop-blur-md">
  <div class="container mx-auto px-4 md:px-16 py-4">
    <div class="flex gap-4 overflow-x-auto">
      {#each tabs as [tabName, description]}
        <button 
          class="{selectedTab === tabName
            ? 'bg-white text-gray-800'
            : 'bg-gray-800 text-white hover:bg-gray-700'
          } px-4 py-2 rounded-full transition-colors whitespace-nowrap"
          on:click={() => selectTab(tabName)}
          tabindex="0"
        >
          {tabName}
        </button>
      {/each}
    </div>
  </div>
</div>