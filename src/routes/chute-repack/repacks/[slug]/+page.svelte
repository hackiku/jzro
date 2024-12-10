<!-- src/routes/chute-repack/repacks/[slug]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';
  
  // Dynamic import of repack components based on slug
  const repackComponent = async () => {
    const slug = $page.params.slug;
    try {
      return await import(`../../../../lib/chute-repack/repacks/${slug}/ContentBefore.svelte`);
    } catch (e) {
      throw error(404, 'Repack not found');
    }
  };
</script>

{#await repackComponent()}
  <div class="flex items-center justify-center min-h-screen">
    <p>Loading repack...</p>
  </div>
{:then module}
  <svelte:component this={module.default} />
{:catch}
  <div class="flex items-center justify-center min-h-screen">
    <p>Repack not found</p>
  </div>
{/await}