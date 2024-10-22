<!-- src/routes/work/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from "$lib/components/ui/button";
  import { ArrowLeft, Globe, Github, ExternalLink } from 'lucide-svelte';
  import Nav from "$lib/components/Nav.svelte";
  import { tools } from '$lib/content/work/data/types';
  import { fade } from 'svelte/transition';
  
  export let data;
  const { project } = data;
  
  $: projectTools = project.tools?.map(toolId => tools[toolId]) || [];
</script>

<svelte:head>
  <title>{project.title} | jzro</title>
  <meta name="description" content={project.description} />
</svelte:head>

<Nav />

<main class="min-h-screen bg-gradient-to-b from-[#0d1320] to-[#080c15] text-white">
  <!-- Hero Section -->
  <div class="h-[70vh] relative overflow-hidden">
    <img 
      src={project.image} 
      alt={project.title}
      class="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#080c15]" />
    
    <div class="relative h-full container mx-auto px-4 md:px-16 flex flex-col justify-end pb-16">
      <a href="/work" class="text-gray-400 hover:text-white mb-8 inline-flex items-center gap-2">
        <ArrowLeft size={20} />
        Back to Work
      </a>
      <h1 class="text-5xl sm:text-6xl font-thin mb-4">{project.title}</h1>
      <p class="text-xl max-w-2xl">{project.description}</p>
    </div>
  </div>

  <!-- Content -->
  <div class="container mx-auto px-4 md:px-16 py-16">
    <!-- Tools & Links -->
    <div class="flex flex-wrap justify-between items-center mb-16 gap-8">
      <div class="flex gap-4 items-center">
        {#each projectTools as tool}
          <div class="flex items-center gap-2 text-gray-400">
            <img 
              src={tool.icon} 
              alt={tool.name} 
              class="w-6 h-6"
            />
            <span class="text-sm">{tool.name}</span>
          </div>
        {/each}
      </div>
      
      <div class="flex gap-4">
        {#if project.liveUrl}
          <Button variant="outline" as="a" href={project.liveUrl} target="_blank">
            <Globe class="mr-2 h-4 w-4" />
            Visit Site
            <ExternalLink class="ml-2 h-4 w-4" />
          </Button>
        {/if}
        {#if project.githubUrl}
          <Button variant="outline" as="a" href={project.githubUrl} target="_blank">
            <Github class="mr-2 h-4 w-4" />
            View Code
            <ExternalLink class="ml-2 h-4 w-4" />
          </Button>
        {/if}
      </div>
    </div>

    <!-- Key Features -->
    <section class="mb-16">
      <h2 class="text-2xl font-thin mb-8">Key Features</h2>
      <div class="grid md:grid-cols-3 gap-8">
        {#each project.keyFeatures as feature}
          <div class="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg">
            <p>{feature}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Screenshots Gallery -->
    {#if project.assets?.screenshots?.length}
      <section class="mb-16">
        <h2 class="text-2xl font-thin mb-8">Gallery</h2>
        <div class="grid grid-cols-2 gap-8">
          {#each project.assets.screenshots as screenshot}
            <img 
              src={screenshot} 
              alt="Project screenshot"
              class="rounded-lg w-full hover:scale-105 transition-transform cursor-zoom-in"
            />
          {/each}
        </div>
      </section>
    {/if}

    <!-- Videos if any -->
    {#if project.assets?.videos?.length}
      <section class="mb-16">
        <h2 class="text-2xl font-thin mb-8">Videos</h2>
        <div class="grid md:grid-cols-2 gap-8">
          {#each project.assets.videos as videoUrl}
            <div class="aspect-video">
              <iframe
                src={videoUrl}
                title="Project video"
                class="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  </div>

  <!-- Next Project -->
  {#if $page.data.nextProject}
    <div class="container mx-auto px-4 md:px-16 py-16 border-t border-gray-800">
      <a 
        href={`/work/${$page.data.nextProject.id}`}
        class="group flex items-center justify-between hover:text-[#F4191D]"
      >
        <div>
          <p class="text-sm text-gray-400 mb-2">Next Project</p>
          <h3 class="text-2xl font-thin">{$page.data.nextProject.title}</h3>
        </div>
        <ArrowLeft size={24} class="rotate-180 transform group-hover:translate-x-2 transition-transform"/>
      </a>
    </div>
  {/if}
</main>

<style>
  /* Add any specific styles here */
</style>