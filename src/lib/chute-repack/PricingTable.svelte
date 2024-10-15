<!-- src/lib/services/chute-repack/PricingTable.svelte -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {#each ['Basic', 'Pro', 'Enterprise'] as plan}
    <div class="border p-6 rounded-lg">
      <h4 class="text-xl font-bold mb-2">{plan}</h4>
      <!-- Add pricing details here -->
    </div>
  {/each}
</div>