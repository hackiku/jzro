<!-- src/lib/app/hud/ModelHUD.svelte -->

<script lang="ts">
  import { selectedModel, autoRotate } from '$lib/stores/modelStore';

  const models = ['Virus', 'Cat', 'Ribs'];

  function handleModelChange(event: Event) {
    selectedModel.set((event.target as HTMLSelectElement).value);
  }
</script>

<div class="w-full p-4 border border-gray-700 rounded-xl">
  <label for="model-select" class="block text-sm font-medium text-gray-400 mb-2">
    Select Model
  </label>
  <select
    id="model-select"
    class="bg-gray-700 text-white rounded-md p-2 w-full"
    on:change={handleModelChange}
  >
    {#each models as model}
      <option value={model} selected={$selectedModel === model}>
        {model}
      </option>
    {/each}
  </select>

  <div class="mt-4">
    <label class="flex items-center space-x-2">
      <input
        type="checkbox"
        bind:checked={$autoRotate}
        class="form-checkbox text-blue-600"
      />
      <span class="text-sm text-gray-400">Auto-rotate</span>
    </label>
  </div>
</div>