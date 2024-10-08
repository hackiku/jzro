<!-- $lib/menu/SideMenu.svelte -->

<script lang="ts">
  import { fly } from 'svelte/transition';
  export let activeCard;

  let isOpen = false;
  const menuItems = ['Work', 'About', 'Contact'];

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function selectCard(item) {
    activeCard.set(item.toLowerCase());
    isOpen = false;
  }
</script>

<div class="w-1/5 h-full bg-gray-800 p-6">
  <button on:click={toggleMenu} class="text-white mb-6">
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  </button>

  {#if isOpen}
    <nav transition:fly={{ x: 300, opacity: 1 }}>
      {#each menuItems as item}
        <button
          on:click={() => selectCard(item)}
          class="block w-full text-left text-xl py-4 hover:bg-gray-700 transition-colors duration-200"
        >
          {item}
        </button>
      {/each}
    </nav>
  {/if}
</div>