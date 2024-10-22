<!-- src/lib/content/work/WorkCard.svelte -->

<script lang="ts">
  import { scale } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import type { Project } from './data/types';
  
  export let project: Project;
  let isHovered = false;
  
  function navigateToProject() {
    goto(`/work/${project.id}`);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="relative overflow-hidden rounded-lg cursor-pointer group"
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  on:click={navigateToProject}
>
  <img 
    src={project.image} 
    alt={project.title}
    class="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
  />
  
  {#if isHovered}
    <div 
      class="absolute inset-0 bg-black/60 flex items-center justify-center"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <h3 class="text-2xl font-light text-white">{project.title}</h3>
    </div>
  {/if}
</div>