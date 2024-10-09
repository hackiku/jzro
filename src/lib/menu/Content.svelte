<!-- $lib/menu/Content.svelte -->

<script lang="ts">
  import { activeTab } from '$lib/stores/menuStore';

  // Import your specific content components here
  // import WorkContent from './WorkContent.svelte';
  // import AboutContent from './AboutContent.svelte';
  // import ContactContent from './ContactContent.svelte';
</script>

<div class="p-4">
  {#if $activeTab === 'work'}
    <h2 class="text-3xl mb-4">Work</h2>
    <!-- <WorkContent /> -->
    <p>Work content goes here</p>
  {:else if $activeTab === 'about'}
    <h2 class="text-3xl mb-4">About</h2>
    <!-- <AboutContent /> -->
    <p>About content goes here</p>
  {:else if $activeTab === 'contact'}
    <h2 class="text-3xl mb-4">Contact</h2>
    <!-- <ContactContent /> -->
    <p>Contact content goes here</p>
  {:else}
    <p>Select a tab to view content</p>
  {/if}
</div>