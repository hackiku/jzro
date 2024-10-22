<!-- src/lib/content/work/PortfolioPiece.svelte -->
<script lang="ts">
  import { tools } from './data/types';
  import WorkCard from "./WorkCard.svelte";
  import Pills from "./Pills.svelte";
  import type { EnrichedProject } from "./data/projectUtils";
  
  export let project: EnrichedProject;
  
  $: projectTools = project.tools?.map(toolId => tools[toolId]) || [];
</script>

<div class="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
  <!-- Card Image -->
  
  <!-- Content -->
  <div class="p-6">
		
		<div class="mb-4">
			<Pills categories={project.categories} interactive={false} />
		</div>
		
		<WorkCard {project} />
    <!-- Categories -->
    
    <!-- Title, Description, and Tools -->
    <div class="mt-6 space-y-6 lg:space-y-0 lg:flex lg:justify-between lg:items-start lg:gap-8">
      <div class="space-y-2">
        <h2 class="text-2xl font-bold">{project.title}</h2>
        <p class="text-gray-400">{project.description}</p>
      </div>
      
      <!-- Tools -->
      <div class="flex flex-wrap gap-4 lg:flex-nowrap lg:justify-end min-w-[200px]">
        {#each projectTools as tool}
          <a 
            href={tool.url} 
            target="_blank" 
            class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <img src={tool.icon} alt={tool.name} class="w-6 h-6"/>
            <span class="text-sm hidden lg:inline">{tool.name}</span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>