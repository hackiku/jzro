<!-- $lib/menu/SideMenu.svelte -->

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { activeCard, setActiveCard } from '$lib/stores/menuStore';

  export let menuItems: string[];

  function selectCard(item: string) {
    setActiveCard(item.toLowerCase());
  }
</script>

<div class="w-1/4 h-full p-6 space-y-4 bg-gray-800">
  {#each menuItems as item, index}
    <button
      on:click={() => selectCard(item)}
      class="block w-full text-left text-xl py-4 px-6 bg-gray-900 border rounded-lg transition-colors duration-200"
      class:border-white={$activeCard === item.toLowerCase()}
      class:border-gray-800={$activeCard !== item.toLowerCase()}
      transition:fly={{ x: -20, duration: 300, delay: index * 100 }}
    >
      {item}
    </button>
  {/each}
</div>