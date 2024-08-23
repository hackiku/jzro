<!-- $lib/app/Model.svelte -->
<script lang="ts">
  import * as Popover from "$lib/components/ui/popover";
  import { selectedModel } from '$lib/stores/modelStore';
  import { isLaunched, launchDirection, launchVelocity } from '$lib/stores/launchStore';

  function selectModel(model: string) {
    selectedModel.set(model);
  }

  function launchModel() {
    isLaunched.set(true);
  }

  function updateDirection(axis: 'x' | 'y' | 'z', value: number) {
    launchDirection.update(dir => ({ ...dir, [axis]: value }));
  }

  function updateVelocity(value: number) {
    launchVelocity.set(value);
  }

  let dirX = 0.6, dirY = 0.8, dirZ = 0.7;
  $: $launchDirection = { x: dirX, y: dirY, z: dirZ };
</script>

<div class="w-full h-full flex flex-col items-start justify-end p-4 bg-gray-800 bg-opacity-50 rounded-lg">
  <Popover.Root>
    <Popover.Trigger>
      <button class="border border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Select Model</button>
    </Popover.Trigger>
    <Popover.Content class="bg-gray-800 border border-gray-700 rounded-md shadow-lg">
      <div class="p-4">
        <button class="block w-full text-left py-2 px-4 text-white hover:bg-gray-700 rounded transition-colors" on:click={() => selectModel('WING')}>WING</button>
        <button class="block w-full text-left py-2 px-4 text-white hover:bg-gray-700 rounded transition-colors" on:click={() => selectModel('Virus')}>Virus</button>
        <button class="block w-full text-left py-2 px-4 text-white hover:bg-gray-700 rounded transition-colors" on:click={() => selectModel('Ribs')}>Ribs</button>
      </div>
    </Popover.Content>
  </Popover.Root>

  <div class="mt-4 grid grid-cols-3 gap-2 w-full">
    <div class="col-span-3 text-white font-bold">Launch Direction</div>
    <div>
      <label for="dirX" class="text-white text-sm">X: {dirX.toFixed(2)}</label>
      <input type="range" id="dirX" bind:value={dirX} min="-1" max="1" step="0.01" class="w-full" />
    </div>
    <div>
      <label for="dirY" class="text-white text-sm">Y: {dirY.toFixed(2)}</label>
      <input type="range" id="dirY" bind:value={dirY} min="-1" max="1" step="0.01" class="w-full" />
    </div>
    <div>
      <label for="dirZ" class="text-white text-sm">Z: {dirZ.toFixed(2)}</label>
      <input type="range" id="dirZ" bind:value={dirZ} min="-1" max="1" step="0.01" class="w-full" />
    </div>
    <div class="col-span-3">
      <label for="velocity" class="text-white text-sm">Velocity: {$launchVelocity.toFixed(2)}</label>
      <input type="range" id="velocity" min="0" max="20" step="0.1" bind:value={$launchVelocity} class="w-full" />
    </div>
  </div>

  <button class="mt-4 border border-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors" on:click={launchModel}>Launch</button>
</div>