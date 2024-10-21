<!-- src/lib/content/work/Pills.svelte -->

<script lang="ts">
  export let categories: string[];
</script>

<div class="flex flex-wrap gap-2">
  {#each categories as category}
    <span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-700 text-white">
      {category}
    </span>
  {/each}
</div>