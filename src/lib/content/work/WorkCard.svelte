<!-- src/lib/content/work/WorkCard.svelte -->

<script lang="ts">
  import type { Project } from "./data/workData";
  
  export let project: Project;
</script>

<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2 pr-4">
    <img 
      src={project.image || '/work/headshots/heasdhot-placeholder.png'} 
      alt={project.title} 
      class="w-full h-auto rounded-lg"
    />
  </div>
  <div class="w-full md:w-1/2 mt-4 md:mt-0">
    <h3 class="text-xl font-semibold mb-2">Key Features</h3>
    <ul class="list-disc list-inside text-gray-400">
      {#each project.keyFeatures as feature}
        <li>{feature}</li>
      {/each}
    </ul>
  </div>
</div>