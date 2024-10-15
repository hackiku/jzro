<!-- src/routes/(services)/chute-repack/clients/phasefour.io/+layout.svelte -->

<script lang="ts">
  import BeforeAfter from '$lib/services/chute-repack/BeforeAfter.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let isAfter = $page.url.searchParams.get('view') === 'after';

  function handleChange(event: CustomEvent<boolean>) {
    const newView = event.detail ? 'after' : 'before';
    goto(`?view=${newView}`, { replaceState: true });
  }
</script>

<BeforeAfter bind:value={isAfter} on:change={handleChange} />

<slot />