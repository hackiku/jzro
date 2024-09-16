<!-- routes/+page.svelte -->

<script lang="ts">
  import App from '$lib/app/App.svelte';
  import { isLaunched } from '$lib/app/launchStore';
  import { fade } from 'svelte/transition';

  let launched = false;
  isLaunched.subscribe(value => {
    launched = value;
  });
</script>

<div class="relative w-screen h-screen">
  <App />
  
  {#if !launched}
    <div class="absolute top-20 left-10 right-10 text-white" transition:fade>
      <h1 class="text-2xl md:text-3xl lg:text-4xl uppercase font-thin mb-2 opacity-80">Aerospace UX</h1>
      <p class="font-thin text-md md:text-lg lg:text-2xl opacity-60">Code & design make</p>
      <p class="font-thin text-md md:text-lg lg:text-2xl opacity-60">products fly</p>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>