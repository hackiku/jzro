<!-- $lib/menu/Menu.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { isMenuOpen, activeCard } from '$lib/stores/menuStore';
  import ContentCard from './ContentCard.svelte';
</script>

{#if $isMenuOpen && $activeCard}
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 flex items-center justify-center" transition:fade>
    <ContentCard />
  </div>
{/if}