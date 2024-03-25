<!-- game controls sticky to the center bottom of screen -->
<!-- /grav/Controls.svelte -->

<script>
  import physicsStore from '$lib/grav/physicsStore.js'; // new
  import { onDestroy } from 'svelte';

  export let y;
  let lastY = 0;
  let isVisible = false;

  let localVelocity = 0;
  // let OPEN = false;
  let HIDDEN = '-80vw';
  let VISIBLE = '1em';
  let controlsBottom = '';

  $: {
    if (y > lastY) {
      controlsBottom = HIDDEN;
      isVisible = false;
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

  {#if isVisible === false}
    <div class="fixed bottom-0 h-1 mx-auto z-50
       bg-[#1ABCFE] bg-opacity-20 glowing-bottom
      w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5 inset-x-10"
      >
    </div>
  {/if}

  
<!-- svelte-ignore a11y-interactive-supports-focus -->
<div class="z-50 fixed mx-auto py-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out
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

  .glowing-bottom {
    /* @apply transition-all duration-1000 ease-in-out; */
    transition: box-shadow 0.5s ease-in-out, color 0.3s ease-in-out;
    box-shadow : 0 0 1em #1ABCFE;
  }
  .glowing-bottom:hover {
    box-shadow: 0 0 0.8em #1ABCFE;
  }

</style>


