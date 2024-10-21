<!-- src/routes/chute-repack/gui/+page.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { onMount } from 'svelte';
  import { analyze, improve } from '$lib/chute-repack/scripts/analyzer';
  import { saveWebsite, getWebsites, getMasterPrompt, setMasterPrompt } from '$lib/chute-repack/data/db';

  let url = '';
  let html = '';
  let css = '';
  let analysisResult = '';
  let improvedVersion = '';
  let websites = [];
  let masterPrompt = '';
  let images: FileList;

  onMount(async () => {
    websites = await getWebsites();
    masterPrompt = await getMasterPrompt();
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

  async function handleMasterPromptUpdate() {
    await setMasterPrompt(masterPrompt);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      images = target.files;
      // Here you would typically upload these files to a server
      // For now, we'll just store them in localStorage as base64 strings
      Array.from(images).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = function() {
          const base64String = reader.result as string;
          localStorage.setItem(`image_${file.name}`, base64String);
        }
        reader.readAsDataURL(file);
      });
    }
  }
</script>

<div class="min-h-screen bg-gray-900 text-white p-8">
  <h1 class="text-3xl font-bold mb-8">Chute Repack GUI</h1>

  <Card class="mb-8 bg-gray-800">
    <CardHeader>
      <CardTitle>Master Prompt</CardTitle>
    </CardHeader>
    <CardContent>
      <Textarea bind:value={masterPrompt} class="mb-4" />
      <Button on:click={handleMasterPromptUpdate}>Update Master Prompt</Button>
    </CardContent>
  </Card>

  <Card class="mb-8 bg-gray-800">
    <CardHeader>
      <CardTitle>Website Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      <Input bind:value={url} placeholder="Enter website URL" class="mb-4" />
      <Textarea bind:value={html} placeholder="Paste raw HTML here" class="mb-4" />
      <Textarea bind:value={css} placeholder="Paste raw CSS here" class="mb-4" />
      <Button on:click={handleAnalyze} class="mr-2">Analyze</Button>
      <Button on:click={handleImprove} class="mr-2">Improve</Button>
      <Button on:click={handleSave}>Save</Button>
    </CardContent>
  </Card>

  <Card class="mb-8 bg-gray-800">
    <CardHeader>
      <CardTitle>Image Upload</CardTitle>
    </CardHeader>
    <CardContent>
      <Input type="file" multiple accept="image/*" on:change={handleImageUpload} />
    </CardContent>
  </Card>

  <div class="grid grid-cols-2 gap-8">
    <Card class="bg-gray-800">
      <CardHeader>
        <CardTitle>Analysis Result</CardTitle>
      </CardHeader>
      <CardContent>
        <pre class="bg-gray-700 p-4 rounded">{analysisResult}</pre>
        <Button on:click={() => copyToClipboard(analysisResult)} class="mt-4">Copy to Clipboard</Button>
      </CardContent>
    </Card>

    <Card class="bg-gray-800">
      <CardHeader>
        <CardTitle>Improved Version</CardTitle>
      </CardHeader>
      <CardContent>
        <pre class="bg-gray-700 p-4 rounded">{improvedVersion}</pre>
        <Button on:click={() => copyToClipboard(improvedVersion)} class="mt-4">Copy to Clipboard</Button>
      </CardContent>
    </Card>
  </div>

  <Card class="mt-8 bg-gray-800">
    <CardHeader>
      <CardTitle>Saved Websites</CardTitle>
    </CardHeader>
    <CardContent>
      <ul>
        {#each websites as website}
          <li>{website.url}</li>
        {/each}
      </ul>
    </CardContent>
  </Card>
</div>