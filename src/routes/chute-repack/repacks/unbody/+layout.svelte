<!-- src/routes/chute-repack/repacks/unbody/+layout.svelte -->

<script lang="ts">
  import BeforeAfter from '$lib/chute-repack/BeforeAfter.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let isAfter = $page.url.searchParams.get('view') === 'after';

  function handleChange(event: CustomEvent<boolean>) {
    const newView = event.detail ? 'after' : 'before';
    goto(`?view=${newView}`, { replaceState: true });
  }
</script>


<slot />

<div class="fixed bottom-2 translate-x-0.5">
	<BeforeAfter bind:value={isAfter} on:change={handleChange} />
</div>