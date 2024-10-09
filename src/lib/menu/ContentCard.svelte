<!-- $lib/menu/ContentCard.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { activeCard, setActiveCard } from '$lib/stores/menuStore';
  import { X } from 'lucide-svelte';

  function getContent(card: string) {
    switch (card) {
      case 'work':
        return { title: 'Work', items: ['Project 1', 'Project 2', 'Project 3'] };
      case 'about':
        return { title: 'About', text: 'Information about jzro...' };
      case 'contact':
        return { title: 'Contact', text: 'Contact information and form...' };
      default:
        return null;
    }
  }

  $: content = getContent($activeCard);

  function closeCard() {
    setActiveCard('');
  }
</script>

{#if $activeCard}
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 flex items-center justify-center" transition:fade>
    <div 
      class="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg max-w-2xl w-full mx-4"
      transition:fade
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl">{content.title}</h2>
        <button on:click={closeCard} class="text-white">
          <X size={24} />
        </button>
      </div>
      {#if content.items}
        <ul>
          {#each content.items as item}
            <li class="mb-4 text-xl">{item}</li>
          {/each}
        </ul>
      {:else if content.text}
        <p class="text-xl">{content.text}</p>
      {/if}
    </div>
  </div>
{/if}