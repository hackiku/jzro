<!-- $lib/menu/SideMenu.svelte -->

<script lang="ts">
  export let activeCard;

  const menuItems = ['Work', 'About', 'Contact'];

  function selectCard(item) {
    activeCard.set(item.toLowerCase());
  }
</script>

<div class="w-1/5 h-full bg-gray-800 p-6">
  <nav>
    {#each menuItems as item}
      <button
        on:click={() => selectCard(item)}
        class="block w-full text-left text-xl py-4 hover:bg-gray-700 transition-colors duration-200"
      >
        {item}
      </button>
    {/each}
  </nav>
</div>