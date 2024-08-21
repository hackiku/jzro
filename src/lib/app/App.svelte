<!-- $lib/app/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Controls from './Controls.svelte'
  import Nav from './Nav.svelte'
  import Menu from './Menu.svelte'
  import Launch from './Launch.svelte'
  import Model from './Model.svelte'
</script>

<div class="relative w-screen h-screen overflow-hidden text-white bg-gradient-to-b from-[#0d1320] to-[#080c15]">
  <Canvas>
    <Scene />
  </Canvas>

  <Nav />
  <Menu />

  <div class="absolute bottom-0 left-0 right-0 flex justify-between items-end p-4 md:p-8">
    <div class="w-1/5 h-1/5 min-w-[100px]">
      <Model />
    </div>

    <div class="flex-grow flex justify-center items-end mx-4">
      <Launch />
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