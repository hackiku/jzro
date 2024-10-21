<!-- src/routes/chute-repack/repacks/unbody/+page.svelte -->

<script lang="ts">
  import Before from '$lib/chute-repack/repacks/unbody/Before.svelte';
  import After from '$lib/chute-repack/repacks/unbody/After.svelte';
  import { page } from '$app/stores';

  $: isAfter = $page.url.searchParams.get('view') === 'after';
</script>

{#if isAfter}
  <After />
{:else}
  <Before />
{/if}