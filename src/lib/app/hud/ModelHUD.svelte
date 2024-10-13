<!-- src/lib/app/hud/ModelHUD.svelte -->

<script lang="ts">
  import { selectedModel } from '$lib/stores/modelStore';
  import { onMount } from 'svelte';
  import { ChevronUp } from 'lucide-svelte';

  const models = ['WING', 'Virus', 'Ribs'];

  let isOpen = false;

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