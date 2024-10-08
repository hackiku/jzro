<!-- $lib/app/Menu.svelte -->

<script lang="ts">
  import { fly } from 'svelte/transition';
  export let isOpen = false;
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={() => isOpen = false}></div>
  <nav class="fixed top-0 right-0 h-full w-64 bg-gray-900 z-50" transition:fly={{ x: 300, opacity: 1 }}>
    <div class="flex flex-col h-full">
      {#each ['Work', 'About', 'Contact'] as item}
        <a href="#{item.toLowerCase()}" class="text-white text-2xl p-6 hover:bg-gray-800 transition-colors duration-200">
          {item}
        </a>
      {/each}
    </div>
  </nav>
{/if}