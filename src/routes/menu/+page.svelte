<!-- routes/menu/+page.svelte -->

<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Content from '$lib/menu/Content.svelte';
  import { isMenuOpen } from '$lib/stores/menuStore';
</script>

<div class="relative w-screen h-screen bg-gray-900 text-white overflow-hidden">
  <Nav />
  
  <main class="pt-20 px-4 h-full overflow-y-auto">
    {#if $isMenuOpen}
      <Content />
    {:else}
      <h1 class="text-4xl mb-4">Welcome to the Menu Test Page</h1>
      <p>Click the menu icon to explore different sections.</p>
    {/if}
  </main>
</div>