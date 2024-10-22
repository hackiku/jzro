<!-- src/lib/content/work/WorkCard.svelte -->
<script lang="ts">
  import { scale } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import type { Project } from './data/types';
  
  export let project: Project;
  let isHovered = false;
  
  // Direct mapping for quick deployment
  const projectImages: Record<string, string> = {
    'wingy': '/work/projects/wingy/moneyshot.png',
    '6pack-avionics': '/work/projects/6pack-avionics/moneyshot.jpg',
    'omicron-blockchain': '/work/projects/omicron-blockchain/moneyshot.png',
    'pipewriter': '/work/projects/pipewriter/moneyshot.png',
    'uploadcare': '/work/projects/uploadcare/moneyshot.png',
    'wordagents': '/work/projects/wordagents/moneyshot.png',
    'redocly': '/work/projects/redocly/moneyshot.jpg',
    'flowmyfigma': '/work/projects/flowmyfigma/moneyshot.png',
    // 'spacefomo': '/work/projects/spacefomo/moneyshot.png'
  };

  // Get image with fallback
  $: imagePath = projectImages[project.id] || '/work/onshape-darkmode.png';
  
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
    src={imagePath}
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