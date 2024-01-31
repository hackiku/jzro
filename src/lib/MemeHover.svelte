<script>
  import { onMount } from 'svelte';
  export let selectedMeme = null;

  // Memes data is encapsulated inside the component
  let memes = [
    { id: 'choppa', url: 'memes/choppa.png' },
    { id: 'morty', url: 'memes/morty.png' },
    { id: 'fellow-engineers', url: 'memes/fellow-engineers.png' },
  ];


  function handleHover(meme) {
    selectedMeme = meme;
  }

  function handleLeave() {
    selectedMeme = null;
  }

  onMount(() => {
    // Optional: If you need to fetch memes dynamically in the future
  });
</script>


<style>
  .tilted-image {
    transform: rotate(-10deg);
  }
  .meme-hover-text {
    cursor: pointer;
    /* Add more styles if needed */
  }
</style>

{#each memes as meme}
<span class="meme-hover-text" on:mouseenter={() => handleHover(meme)} on:mouseleave={handleLeave}>
  Hover over me to see meme /{meme.id}
</span>
{/each}

{#if selectedMeme}
<img src={selectedMeme.url} alt="Selected Meme" class="tilted-image" />
{/if}
