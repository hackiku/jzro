<!-- $lib/menu/Nav.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function toggleMenu() {
    dispatch('toggleMenu');
  }
</script>

<nav class="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
  <a href="/" class="text-[#F3201D] text-2xl font-medium hover:underline">jzro</a>
  <button on:click={toggleMenu} class="text-white p-2">
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  </button>
</nav>