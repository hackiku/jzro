<!-- src/routes/chute-repack/gui/+page.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { onMount } from 'svelte';
  import { analyze, improve } from '$lib/chute-repack/utils/analyzer';
  import { saveWebsite, getWebsites } from '$lib/chute-repack/data/db';

  let url = '';
  let html = '';
  let css = '';
  let analysisResult = '';
  let improvedVersion = '';
  let websites = [];

  onMount(async () => {
    websites = await getWebsites();
  });

  async function handleAnalyze() {
    analysisResult = await analyze(url, html, css);
  }

  async function handleImprove() {
    improvedVersion = await improve(analysisResult);
  }

  async function handleSave() {
    await saveWebsite({ url, html, css, analysisResult, improvedVersion });
    websites = await getWebsites();
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Chute Repack Dashboard</h1>
  
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div>
      <Input bind:value={url} placeholder="Enter website URL" />
    </div>
    <div>
      <Button on:click={handleAnalyze}>Analyze</Button>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <Textarea bind:value={html} placeholder="Paste raw HTML here" />
    <Textarea bind:value={css} placeholder="Paste raw CSS here" />
  </div>

  <div class="mb-4">
    <Button on:click={handleImprove}>Improve</Button>
    <Button on:click={handleSave}>Save</Button>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <h2 class="text-xl font-semibold mb-2">Analysis Result</h2>
      <pre class="bg-gray-100 p-2 rounded">{analysisResult}</pre>
    </div>
    <div>
      <h2 class="text-xl font-semibold mb-2">Improved Version</h2>
      <pre class="bg-gray-100 p-2 rounded">{improvedVersion}</pre>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-xl font-semibold mb-2">Saved Websites</h2>
    <ul>
      {#each websites as website}
        <li>{website.url}</li>
      {/each}
    </ul>
  </div>
</div>