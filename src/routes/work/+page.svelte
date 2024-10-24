<!-- src/routes/work/+page.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
	import { portfolioStore } from '$lib/content/work/stores/portfolioStore';
  import { projects } from '$lib/content/work/data/workData';
  import PortfolioFilter from '$lib/content/work/components/PortfolioFilter.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import { scale } from 'svelte/transition';
	import PortfolioPiece from '$lib/content/work/PortfolioPiece.svelte';


  $: filteredProjects = $portfolioStore.selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.categories.includes($portfolioStore.selectedCategory));
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-b from-[#0d1320] to-[#080c15] text-white">
  <Nav />
  
  <main class="flex-grow container mx-auto px-4 md:px-16 py-8">
    <section class="mt-24 text-center">
      <h1 class="text-6xl sm:text-[8vw] font-thin mb-4">Work</h1>
      <p class="text-xl mb-6 font-thin">Full stack interface creative</p>
      <Button variant="secondary">Hire Away</Button>
    </section>

    <PortfolioFilter />

    <section class="py-12">
      <div class="space-y-12">
        {#each filteredProjects as project (project.id)}
          <div transition:scale|local={{ duration: 300 }}>
            <PortfolioPiece {project} />
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>
