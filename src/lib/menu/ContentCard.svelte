<!-- $lib/menu/ContentCard.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';
  export let activeCard;

  $: content = getContent($activeCard);

  function getContent(card) {
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
</script>

<div class="w-4/5 h-full p-6 overflow-y-auto">
  {#if $activeCard}
    <div transition:fade>
      <h2 class="text-3xl mb-6">{content.title}</h2>
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
  {:else}
    <p class="text-2xl text-center mt-20">Select a card from the menu</p>
  {/if}
</div>