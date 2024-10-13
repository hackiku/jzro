<!-- $lib/app/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import ModelHUD from './hud/ModelHUD.svelte'
  import LaunchHUD from './hud/LaunchHUD.svelte'
  import FlightHUD from './hud/FlightHUD.svelte'
</script>

<div class="relative w-screen h-screen overflow-hidden text-white bg-gradient-to-b from-[#0d1320] to-[#080c15]">
  
  <Canvas>
    <Scene />
  </Canvas>

  <div class="absolute bottom-0 left-0 right-0 p-4 md:p-8">
    <!-- Desktop layout -->
    <div class="hidden md:flex justify-between items-end">
      <div class="w-1/4">
        <ModelHUD />
      </div>
      <div class="flex-grow flex justify-center">
        <LaunchHUD />
      </div>
      <div class="w-1/4">
        <FlightHUD />
      </div>
    </div>

    <!-- Mobile layout -->
    <div class="flex flex-col md:hidden">
      <div class="mb-4 flex justify-center">
        <LaunchHUD />
      </div>
      <div class="flex">
        <div class="w-1/3 pr-2">
          <ModelHUD />
        </div>
        <div class="w-2/3 pl-2">
          <FlightHUD />
        </div>
      </div>
    </div>
  </div>
</div>