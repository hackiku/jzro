<!-- game controls sticky to the center bottom of screen -->
<!-- /grav/Controls.svelte -->

<script>
  
  import physicsStore from '$lib/grav/physicsStore.js'; // new

  import { onDestroy } from 'svelte';

  let localVelocity;

  // Subscribe to the physics store and update localVelocity accordingly
  const unsubscribe = physicsStore.subscribe(($physicsStore) => {
    localVelocity = $physicsStore.velocity;
  });

  function launchRocket() {
    console.log('Rocket launched at', localVelocity, 'km/s');
    // action
  }

  function handleVelocityChange(e) {
    localVelocity = parseFloat(e.target.value);
    physicsStore.setVelocity(localVelocity);
  }

  // Clean up the subscription when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="z-50 fixed bottom-6 mx-auto p-4 rounded-full backdrop-blur-md
  bg-gray-500 bg-opacity-10 opacity-10 hover:opacity-100 flex justify-center items-center
  w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5 inset-x-10">

<!-- <div class="z-50 fixed p-4 bottom-6 rounded-full backdrop-blur-md
  inset-x-12 flex justify-center items-center bg-gray-500 bg-opacity-10
  opacity-10 hover:opacity-100"> -->
  
  <button class="text-5xl mr-6 hover:bg-red-500 rounded-full" on:click={launchRocket}>💥</button>
  
  <!-- velocity container -->
  <div class="relative w-1/2 flex flex-col space-y-2 items-start
  group transition-opacity">
    <!-- velocity value -->
    <div class="flex flex-row items-center space-x-3 justify-center">
      <p>v = <span class="velocity">{localVelocity}</span> km/s</p>
    </div>
    
    <!-- slider -->
    <input type="range" min="1" max="100" value={localVelocity}
      class="slider w-full" id="velocitySlider"
      on:input={handleVelocityChange} />
  </div>
</div>

<style>
  .velocity {
    color: #FF3D00;
  }
</style>
