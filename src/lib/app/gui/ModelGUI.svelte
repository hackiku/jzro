<!-- src/lib/app/gui/ModelGUI.svelte -->
<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";
  import { selectedModel } from '$lib/stores/modelStore';
  import { launchDirection, launchVelocity } from '$lib/stores/launchStore';
  import { onMount } from 'svelte';
  import { ChevronUp } from 'lucide-svelte';

  const models = ['WING', 'Virus', 'Ribs'];

  let isOpen = false;
  let dirX = 0, dirY = 0, dirZ = 0;

  $: {
    dirX = $launchDirection.x;
    dirY = $launchDirection.y;
    dirZ = $launchDirection.z;
  }

  function updateDirection(axis: 'x' | 'y' | 'z', value: number) {
    launchDirection.update(dir => ({ ...dir, [axis]: value }));
  }

  function selectModel(model: string) {
    selectedModel.set(model);
    isOpen = false;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !event.target.closest('.dropdown')) {
        isOpen = false;
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="w-full flex flex-col items-start justify-end p-4 border border-gray-700 rounded-xl space-y-4">
  <div class="w-full space-y-4">
    <div class="flex space-x-4">
      <div class="flex-1">
        <label for="dirX" class="text-gray-400 text-xs block mb-1">X: {dirX.toFixed(2)}</label>
        <Slider id="dirX" min={-1} max={1} step={0.01} value={[dirX]} onValueChange={([value]) => updateDirection('x', value)} class="h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white" />
      </div>
      <div class="flex-1">
        <label for="dirY" class="text-gray-400 text-xs block mb-1">Y: {dirY.toFixed(2)}</label>
        <Slider id="dirY" min={-1} max={1} step={0.01} value={[dirY]} onValueChange={([value]) => updateDirection('y', value)} class="h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white" />
      </div>
      <div class="flex-1">
        <label for="dirZ" class="text-gray-400 text-xs block mb-1">Z: {dirZ.toFixed(2)}</label>
        <Slider id="dirZ" min={-1} max={1} step={0.01} value={[dirZ]} onValueChange={([value]) => updateDirection('z', value)} class="h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white" />
      </div>
    </div>
  </div>

  <div class="w-full mb-4">
    <label for="velocity" class="text-gray-400 text-xs block mb-1">Velocity: {$launchVelocity.toFixed(2)} km/s</label>
    <Slider id="velocity" min={0} max={20} step={0.1} value={[$launchVelocity]} onValueChange={([value]) => launchVelocity.set(value)} class="h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white" />
  </div>

  <div class="dropdown w-full relative">
    <button
      on:click={toggleDropdown}
      class="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
    >
      <span>{$selectedModel}</span>
      <ChevronUp size={20} class="ml-2" />
    </button>
    {#if isOpen}
      <div class="absolute z-10 w-full bottom-full mb-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg">
        {#each models as model}
          <button
            on:click={() => selectModel(model)}
            class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 focus:outline-none"
          >
            {model}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>