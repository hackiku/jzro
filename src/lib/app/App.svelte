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

  <div class="absolute bottom-10 left-10 w-1/3 h-1/3">
    <Model />
  </div>

  <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
    <Launch />
  </div>

  <div class="absolute bottom-10 right-10">
    <Controls />
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>