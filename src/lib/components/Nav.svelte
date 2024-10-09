<!-- $lib/components/Nav.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { Menu } from 'lucide-svelte';
  import Jzro from '$lib/components/Jzro.svelte';

  let isJzroOpen = false;
  let navElement: HTMLElement;

  function toggleJzro() {
    isJzroOpen = !isJzroOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    if (isJzroOpen && navElement && !navElement.contains(event.target as Node)) {
      isJzroOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<nav bind:this={navElement} class="fixed top-0 left-0 w-full px-4 md:px-12 lg:px-20 py-4 flex justify-between items-start z-50">
  <div class="relative">
    <button
      on:click={toggleJzro}
      class="text-[#F3201D] text-2xl font-medium hover:underline"
    >
      {isJzroOpen ? 'Close' : 'jzro'}
    </button>

    <Jzro isOpen={isJzroOpen} />
  </div>

  <button on:click class="text-white p-2">
    <Menu size={32} />
  </button>
</nav>