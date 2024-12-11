<!-- src/routes/chute-repack/repacks/[slug]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';
  
  // Get the view parameter
  $: isAfter = $page.url.searchParams.get('view') === 'after';
  
  // Get metadata for the current repack
  $: metadata = data?.metadata || {
    name: $page.params.slug,
    description: '',
    industry: '',
    completedDate: ''
  };
</script>

<svelte:head>
  {#if isAfter}
    <!-- SEO-optimized title and meta for "after" version -->
    <title>{metadata.name} Redesign Case Study | Aerospace UX Design</title>
    <meta name="description" content="See how we reimagined {metadata.name}'s landing page with aerospace-focused UX design principles." />
    
    <!-- Open Graph -->
    <meta property="og:title" content="{metadata.name} Space Industry Website Redesign" />
    <meta property="og:description" content="Explore our {metadata.industry} UX case study for {metadata.name}. See how we enhanced their web presence with aerospace-focused design." />
    
    <!-- Allow indexing for "after" version -->
    <meta name="robots" content="index, follow" />
  {:else}
    <!-- Generic title for "before" version -->
    <title>Website Redesign | {metadata.name}</title>
    
    <!-- Prevent indexing of "before" version -->
    <meta name="robots" content="noindex, nofollow" />
  {/if}
  
  <!-- Common meta tags -->
  <link rel="canonical" href="https://jzro.dev/chute-repack/repacks/{$page.params.slug}?view=after" />
</svelte:head>


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