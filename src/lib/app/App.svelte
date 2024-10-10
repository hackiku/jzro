<!-- $lib/app/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Controls from './Controls.svelte'
  import Menu from './Menu.svelte'
  import Model from './Model.svelte'
  import LaunchControl from './LaunchControl.svelte'
  import ModelGUI from './gui/ModelGUI.svelte'
</script>

<div class="relative w-screen h-screen overflow-hidden text-white bg-gradient-to-b from-[#0d1320] to-[#080c15]">
  
  <Canvas>
    <Scene />
  </Canvas>

  <Menu />

  <div class="absolute bottom-0 left-0 right-0 flex justify-between items-end p-4 md:p-8">
    <div class="w-1/3 h-1/3 min-w-[200px] max-w-[300px]">
      <ModelGUI />
    </div>

    <div class="flex-grow flex justify-center items-end mx-4">
      <LaunchControl />
    </div>

    <div class="w-auto min-w-[200px]">
      <Controls />
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>