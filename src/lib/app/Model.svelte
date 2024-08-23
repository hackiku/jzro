<!-- $lib/app/Model.svelte -->

<script lang="ts">
  import * as Popover from "$lib/components/ui/popover";
  import { selectedModel } from '$lib/stores/modelStore';
  import { isLaunched } from '$lib/stores/launchStore';

  function selectModel(model: string) {
    selectedModel.set(model);
  }

  function launchModel() {
    isLaunched.launch();
  }
</script>

<div class="w-full h-full flex flex-col items-start justify-end">
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

  <button class="mt-4 border border-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors" on:click={launchModel}>Launch</button>
</div>