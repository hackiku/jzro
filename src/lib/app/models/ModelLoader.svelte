<!-- src/lib/app/models/ModelLoader.svelte -->

<script lang="ts">
  import { selectedModel } from '$lib/stores/modelStore';
  import Cat from './Cat.svelte';
  import Virus from './Virus.svelte';
  import Ribs from './Ribs.svelte';
  import { T } from '@threlte/core';

  export let position: [number, number, number];
  export let scale: number;
  export let rotation: [number, number, number];

  const models = {
    Cat,
    Virus,
    Ribs
  };

  const modelAdjustments = {
    Cat: { scale: 0.4, rotation: [Math.PI / 2, 0, 0] },
    Virus: { scale: 1, rotation: [0, 0, 0] },
    Ribs: { scale: 1, rotation: [0, 0, 0] }
  };

  $: ModelComponent = models[$selectedModel];
  $: adjustment = modelAdjustments[$selectedModel];
</script>

{#if ModelComponent}
  <T.Group {position} 
           scale={[scale * adjustment.scale, scale * adjustment.scale, scale * adjustment.scale]} 
           rotation={[rotation[0] + adjustment.rotation[0], 
                      rotation[1] + adjustment.rotation[1], 
                      rotation[2] + adjustment.rotation[2]]}>
    <svelte:component this={ModelComponent}>
      <slot />
    </svelte:component>
  </T.Group>
{/if}