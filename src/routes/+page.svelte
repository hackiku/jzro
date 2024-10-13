<!-- routes/+page.svelte -->

<svelte:head>
	<title>jzro | Aerospace UX & Software</title>
	<meta name="description" content="Human-centered design & code for the space race. Websites, apps, avionics and hard-tech engineering for aero+space startups and enterprises." />
</svelte:head>

<script lang="ts">
  import Nav from '$lib/components/Nav.svelte'
  import App from '$lib/app/App.svelte';
  import { isLaunched } from '$lib/stores/launchStore';
  import { fade } from 'svelte/transition';
</script>

<div class="relative w-screen h-screen">
  <App />

  <Nav />
  
  {#if !$isLaunched}
    <div class="absolute top-24 left-4 sm:left-16 right-10 text-white" transition:fade>
      <h1 class="text-4xl md:text-5xl lg:text-5xl uppercase font-thin mb-2 opacity-80">Aerospace UX</h1>
      <p class="font-thin text-xl md:text-2xl lg:text-2xl opacity-60">Code & design make</p>
      <p class="font-thin text-xl md:text-2xl lg:text-2xl opacity-60">products fly</p>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>