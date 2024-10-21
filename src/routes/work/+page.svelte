<!-- src/routes/work/+page.svelte -->

<script lang="ts">
  import PortfolioPiece from "$lib/content/work/PortfolioPiece.svelte";
  import { projects } from "$lib/content/work/data/workData";
	import Nav from "$lib/components/Nav.svelte"
  // ... other imports
</script>

<svelte:head>
  <title>Work | jzro</title>
  <meta name="description" content="Redesign your landing pages for better conversion with jzro's Chute Repack service." />
</svelte:head>

<Nav />

<div class="min-h-screen flex flex-col bg-gradient-to-b from-[#0d1320] to-[#080c15] text-white">
  <main class="flex-grow container mx-auto px-4 py-8">
    <!-- ... other sections ... -->

    <section class="py-12">
      <h2 class="text-3xl font-bold mb-6">Portfolio</h2>
      <div class="space-y-12">
        {#each projects as project}
          <PortfolioPiece {project} />
        {/each}
      </div>
    </section>

    <!-- ... other sections ... -->
  </main>
</div>

<!-- <Footer /> -->