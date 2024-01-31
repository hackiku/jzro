<script>
    import { onMount } from 'svelte';

    let memes = []; // Your database of memes

    let selectedMeme = null;

    function handleHover(meme) {
        selectedMeme = meme;
    }

    function handleLeave() {
        selectedMeme = null;
    }

    onMount(() => {
        // Fetch memes from the database
        memes = [
            { id: 'choppa', url: 'memes/choppa.png' },
            { id: 'morty', url: 'memes/morty.png' },
            { id: 'fellow-engineers', url: 'memes/fellow-engineers.png' },
        ];
    });
</script>

<style>
    .tilted-image {
        transform: rotate(-15deg);
    }
</style>

<main>
    <h1>Main Page</h1>

    {#each memes as meme}
        <span on:mouseenter={() => handleHover(meme)} on:mouseleave={handleLeave}>
            Hover over me to see meme {meme.id}
        </span>
    {/each}

    {#if selectedMeme}
        <img src={selectedMeme.url} alt="Selected Meme" class="tilted-image" />
    {/if}
</main>