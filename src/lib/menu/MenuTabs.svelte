<!-- $lib/menu/MenuTabs.svelte -->

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { isMenuOpen, activeTab, setActiveTab } from '$lib/stores/menuStore';

  const menuItems = ['Work', 'About', 'Contact'];
</script>

{#if $isMenuOpen}
<!-- class="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-lg" -->
  <div
	  class="absolute top-1/2 right-full mt-3 mr-2 bg-gray-900 border border-gray-800 rounded-lg p-2 shadow-lg transform -translate-y-1/2"

    transition:fly={{ x: 20, duration: 300 }}
  >
    <div class="flex flex-row space-x-4">
      {#each menuItems as item}
        <button
          on:click={() => setActiveTab(item.toLowerCase())}
          class="px-6 py-3 rounded-lg transition-colors duration-200 text-white text-xl"
          class:bg-gray-800={$activeTab === item.toLowerCase()}
        >
          {item}
        </button>
      {/each}
    </div>
  </div>
{/if}