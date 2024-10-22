<!-- src/routes/work/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from "$lib/components/ui/button";
  import { ArrowLeft, Globe, Github, ExternalLink } from 'lucide-svelte';
  import Nav from "$lib/components/Nav.svelte";
  import { tools } from '$lib/content/work/data/types';
  
  export let data;
  const { project } = data;
  
  $: projectTools = project.tools?.map(toolId => tools[toolId]) || [];
</script>

<svelte:head>
  <title>{project.title} | jzro</title>
  <meta name="description" content={project.description} />
</svelte:head>

<Nav />

<main class="min-h-screen bg-gradient-to-b from-[#0d1320] to-[#080c15] text-white pb-32">
  <!-- 1. Hero Section -->
  <div class="h-[70vh] relative overflow-hidden">
    <img 
      src={project.image} 
      alt={project.title}
      class="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#080c15]" />
    
    <div class="relative h-full container mx-auto px-4 lg:px-16 flex flex-col justify-end pb-16">
      <a href="/work" class="text-gray-400 hover:text-white mb-8 inline-flex items-center gap-2">
        <ArrowLeft size={20} />
        Back to Work
      </a>
      <h1 class="text-5xl sm:text-6xl font-thin mb-4">{project.title}</h1>
      <p class="text-xl max-w-2xl">{project.description}</p>
    </div>
  </div>

  <!-- Content Container -->
  <div class="container mx-auto px-4 lg:px-16">
    <!-- 2. Tools & Links -->
    <div class="flex flex-wrap justify-between items-center py-16 gap-8 border-b border-gray-800">
      <div class="flex gap-4 flex-wrap items-center">
        {#each projectTools as tool}
          <a 
            href={tool.url} 
            target="_blank" 
            class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <img src={tool.icon} alt={tool.name} class="w-6 h-6"/>
            <span class="text-sm">{tool.name}</span>
          </a>
        {/each}
      </div>
      
      <div class="flex gap-4">
        {#if project.liveUrl}
          <Button variant="secondary" asChild>
            <a href={project.liveUrl} target="_blank" class="inline-flex items-center">
              <Globe class="mr-2 h-4 w-4" />
              Visit Site
              <ExternalLink class="ml-2 h-4 w-4" />
            </a>
          </Button>
        {/if}
        {#if project.githubUrl}
          <Button variant="secondary" asChild>
            <a href={project.githubUrl} target="_blank" class="inline-flex items-center">
              <Github class="mr-2 h-4 w-4" />
              View Code
              <ExternalLink class="ml-2 h-4 w-4" />
            </a>
          </Button>
        {/if}
      </div>
    </div>

    <!-- 3. Long Description -->
    <div class="py-16 border-b border-gray-800">
      <p class="text-xl font-semibold leading-relaxed max-w-4xl">
        {project.longDescription}
      </p>
    </div>

    <!-- 4. Key Features -->
    <section class="py-16 border-b border-gray-800">
      <h2 class="text-2xl font-thin mb-8">Key Features</h2>
      <div class="grid md:grid-cols-3 gap-8">
        {#each project.keyFeatures as feature}
          <div class="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg">
            <p>{feature}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- 5 & 6. Problem & Solution -->
    <div class="grid md:grid-cols-2 gap-16 py-16 border-b border-gray-800">
      <section>
        <h2 class="text-2xl font-thin mb-8">Problem</h2>
        <p class="text-lg leading-relaxed">{project.problem}</p>
      </section>

      <section>
        <h2 class="text-2xl font-thin mb-8">Solution</h2>
        <p class="text-lg leading-relaxed">{project.solution}</p>
      </section>
    </div>

    <!-- 7. Gallery -->
    {#if project.assets?.gallery?.length}
      <section class="py-16 border-b border-gray-800">
        <h2 class="text-2xl font-thin mb-8">Gallery</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {#each project.assets.gallery as image}
            <img 
              src={image} 
              alt="Project detail"
              class="rounded-lg w-full hover:scale-105 transition-transform duration-300 cursor-zoom-in"
            />
          {/each}
        </div>
      </section>
    {/if}

    <!-- 8. Results -->
    <section class="py-16 border-b border-gray-800">
      <h2 class="text-2xl font-thin mb-8">Results</h2>
      <p class="text-lg leading-relaxed max-w-4xl">{project.results}</p>
    </section>

    <!-- 9. Next Project -->
    {#if data.nextProject}
      <div class="py-16">
        <a 
          href={`/work/${data.nextProject.id}`}
          class="group flex items-center justify-between hover:text-[#F4191D] transition-colors"
        >
          <div>
            <p class="text-sm text-gray-400 mb-2">Next Project</p>
            <h3 class="text-2xl font-thin">{data.nextProject.title}</h3>
          </div>
          <ArrowLeft size={24} class="rotate-180 transform group-hover:translate-x-2 transition-transform"/>
        </a>
      </div>
    {/if}
  </div>
</main>