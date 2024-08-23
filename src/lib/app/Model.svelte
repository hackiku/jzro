<!-- $lib/app/Model.svelte -->


<script lang="ts">
  import * as Popover from "$lib/components/ui/popover";
  import { writable } from 'svelte/store';

  export const selectedModel = writable('WING');
  export const shootTrigger = writable(false);

  function selectModel(model: string) {
    selectedModel.set(model);
  }

  function shootModel() {
    shootTrigger.set(true);
  }
</script>

<div class="w-full h-full flex flex-col items-start justify-end">
  <Popover.Root>
    <Popover.Trigger>
      <button class="border border-blue-500 text-white px-4 py-2 rounded">Select Model</button>
    </Popover.Trigger>
    <Popover.Content>
      <div class="p-4 bg-white rounded shadow-lg">
        <button class="block w-full text-left py-2 hover:bg-gray-100" on:click={() => selectModel('WING')}>WING</button>
        <button class="block w-full text-left py-2 hover:bg-gray-100" on:click={() => selectModel('Virus')}>Virus</button>
        <button class="block w-full text-left py-2 hover:bg-gray-100" on:click={() => selectModel('Ribs')}>Ribs</button>
      </div>
    </Popover.Content>
  </Popover.Root>

  <button class="mt-4 border border-red-500 text-white px-4 py-2 rounded" on:click={shootModel}>Shoot</button>
</div>