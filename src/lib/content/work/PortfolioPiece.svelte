<!-- src/lib/content/work/PortfolioPiece.svelte -->

<script lang="ts">
  import WorkCard from "./WorkCard.svelte";
  import Pills from "./Pills.svelte";
  import type { Project } from "./data/workData";
  
  export let project: Project;
</script>

<div class="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
  <div class="p-6">
    <Pills categories={project.categories} />
    <h2 class="text-2xl font-bold mt-4 mb-2">{project.title}</h2>
    <p class="text-gray-400 mb-4">{project.description}</p>
    <WorkCard {project} />
  </div>
</div>