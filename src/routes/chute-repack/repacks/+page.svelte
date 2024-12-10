<!-- src/routes/chute-repack/repacks/+page.svelte -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  
  // Export load function to get repacks during SSR
  export let data;
</script>

<div class="min-h-screen bg-gradient-to-b from-[#0d1320] to-[#080c15] text-white p-8">
  <h1 class="text-4xl font-bold mb-8">Chute Repacks</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.repacks as repack}
      <Card class="bg-gray-800 hover:bg-gray-700 transition-colors">
        <CardHeader>
          <CardTitle>{repack.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-gray-400 mb-4">{repack.description}</p>
          <Button asChild>
            <a href="/chute-repack/repacks/{repack.slug}">View Repack</a>
          </Button>
        </CardContent>
      </Card>
    {/each}
  </div>
</div>