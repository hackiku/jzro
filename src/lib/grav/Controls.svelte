<!-- game controls sticky to the center bottom of screen -->
<!-- /grav/Controls.svelte -->

<script>
  import physicsStore from '$lib/grav/physicsStore.js'; // new
  import { onDestroy } from 'svelte';

  export let y;
  let lastY = 0;
  let isOpen = false;

  let localVelocity = 0;
  // let OPEN = false;
  let HIDDEN = '-10%';
  let VISIBLE = '1em';
  let controlsBottom = '';

  $: {
    if (y > lastY) {
      controlsBottom = HIDDEN;
      isOpen = false;
    } else {
      controlsBottom = VISIBLE;
    }
    lastY = y;
  }

  // subscribe to physics store
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

  onDestroy(() => {
    unsubscribe();
  });

  // --------------- hide controls ---------------
  function showControls() {
    controlsBottom = VISIBLE; 
  }

  function hideControls() {
    controlsBottom = HIDDEN;
  }


</script>

<!-- ---------------------------------------------- -->
<!-- ---------------------------------------------- -->


<!-- svelte-ignore a11y-interactive-supports-focus -->
<div class="z-50 fixed bottom-6 mx-auto p-4 rounded-full backdrop-blur-md
  bg-gray-500 bg-opacity-10 opacity-60 hover:opacity-100 flex justify-center items-center
  w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5 inset-x-10"
  style="bottom: {controlsBottom};"
  on:mouseover={showControls} on:mouseout={hideControls} on:focus={showControls} on:blur={showControls}
  role="button">

  <button class="text-5xl mr-6 hover:bg-red-500 rounded-full" on:click={launchRocket}>💥</button>
  
  <!-- velocity container -->
  <div class="relative w-1/2 flex flex-col space-y-2 items-start
  group transition-opacity">
    <!-- velocity value -->
    <div class="flex flex-row items-center space-x-3 justify-center">
      <p>v = <span class="velocity">{localVelocity}</span> km/s</p>
    </div>
    
    <!-- v slider -->
    <input type="range" min="1" max="100" value={localVelocity}
      class="slider w-full" id="velocitySlider"
      on:input={handleVelocityChange} />
  </div>
</div>

<!-- ---------------------------------------------- -->
<!-- ---------------------------------------------- -->


<style>
  .velocity {
    color: #FF3D00;
  }
</style>
