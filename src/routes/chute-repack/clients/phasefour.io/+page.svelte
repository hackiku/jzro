<!-- src/routes/chute-repack/clients/phasefour.io/+page.svelte -->

<script lang="ts">
  import ContentBefore from '$lib/chute-repack/clients/phasefour.io/ContentBefore.svelte';
  import ContentAfter from '$lib/chute-repack/clients/phasefour.io/ContentAfter.svelte';
  import { page } from '$app/stores';

  $: isAfter = $page.url.searchParams.get('view') === 'after';
</script>

{#if isAfter}
  <ContentAfter />
{:else}
  <ContentBefore />
{/if}