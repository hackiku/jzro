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
	
	function selectTab(tab: string) {
		selectedTab = tab;
	}

</script>

<div
  class="flex gap-4 overflow-hidden rounded-lg cursor-pointer group"
>
	{#each tabs as [tabName, decription]}
		<button 
			class="{selectedTab === tabName
					? 'bg-white text-gray-800'
					: 'bg-gray-800 text-white'
				} px-4 py-2 rounded-full transition-colors"
				on:click={() => selectTab(tabName)}
				tabindex="0"
		>
			{tabName}
		</button>
	{/each}

</div>