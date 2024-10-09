<!-- $lib/components/Nav.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { Menu, X } from 'lucide-svelte';
  import Jzro from '$lib/components/Jzro.svelte';
  import MenuTabs from '$lib/menu/MenuTabs.svelte';
  import { isMenuOpen, toggleMenu } from '$lib/stores/menuStore';

  let isJzroOpen = false;
  let navElement: HTMLElement;
  let menuButtonElement: HTMLButtonElement;

  function toggleJzro() {
    isJzroOpen = !isJzroOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    if (navElement && !navElement.contains(event.target as Node)) {
      isJzroOpen = false;
      if ($isMenuOpen && !menuButtonElement.contains(event.target as Node)) {
        toggleMenu();
      }
    }
  }

  function handleMenuToggle(event: MouseEvent) {
    event.stopPropagation();
    toggleMenu();
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<nav bind:this={navElement} class="fixed top-0 left-0 w-full px-4 py-2 flex justify-between items-center z-50">
  <div class="relative">
    <button
      on:click={toggleJzro}
      class="text-[#F3201D] text-2xl font-medium hover:underline h-12 flex items-center"
    >
      {isJzroOpen ? 'Close' : 'jzro'}
    </button>

    <Jzro isOpen={isJzroOpen} />
  </div>

  <div class="relative">
    <button 
      bind:this={menuButtonElement}
      on:click={handleMenuToggle} 
      class="text-white w-12 h-12 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors duration-200"
    >
      <div class="w-8 h-8 flex items-center justify-center">
        {#if $isMenuOpen}
          <X size={24} />
        {:else}
          <Menu size={24} />
        {/if}
      </div>
    </button>

    <MenuTabs />
  </div>
</nav>