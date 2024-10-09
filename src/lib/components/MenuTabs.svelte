<!-- $lib/menu/MenuTabs.svelte -->

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { isMenuOpen, activeTab, setActiveTab } from '$lib/stores/menuStore';

  const menuItems = ['Work', 'About', 'Contact'];
</script>
{#if $isMenuOpen}
  <div
    class="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg p-2 shadow-lg"
    transition:fly={{ y: -20, duration: 300 }}
  >
    <div class="flex flex-col space-y-2">
      {#each menuItems as item}
        <button
          on:click={() => setActiveTab(item.toLowerCase())}
          class="px-4 py-2 rounded-lg transition-colors duration-200 text-white text-xl text-left"
          class:border-white={$activeTab === item.toLowerCase()}
          class:border={$activeTab === item.toLowerCase()}
        >
          {item}
        </button>
      {/each}
    </div>
  </div>
{/if}
Now, let's update the Nav component to use the new MenuTabs:
<!-- $lib/components/Nav.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Menu, X } from 'lucide-svelte';
  import Jzro from '$lib/components/Jzro.svelte';
  import MenuTabs from '$lib/menu/MenuTabs.svelte';
  import { isMenuOpen, toggleMenu } from '$lib/stores/menuStore';

  let isJzroOpen = false;
  let navElement: HTMLElement;

  function toggleJzro() {
    isJzroOpen = !isJzroOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    if ((isJzroOpen || $isMenuOpen) && navElement && !navElement.contains(event.target as Node)) {
      isJzroOpen = false;
      if ($isMenuOpen) {
        toggleMenu();
      }
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>
<nav bind:this={navElement} class="fixed top-0 left-0 w-full p-4 flex justify-between items-start z-50">
  <div class="relative">
    <button
      on:click={toggleJzro}
      class="text-[#F3201D] text-2xl font-medium hover:underline"
    >
      {isJzroOpen ? 'Close' : 'jzro'}
    </button>
Copy<Jzro isOpen={isJzroOpen} />
  </div>
  <div class="relative">
    <button on:click={toggleMenu} class="text-white p-2">
      {#if $isMenuOpen}
        <X size={32} />
      {:else}
        <Menu size={32} />
      {/if}
    </button>
Copy<MenuTabs />
  </div>
</nav>
