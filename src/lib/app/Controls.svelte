<!-- src/lib/jzro/Controls.svelte -->

<script>
  export let localVelocity = 1;

  function launchRocket() {
    console.log('Rocket launched at', localVelocity, 'km/s');
  }

  function handleVelocityChange(e) {
    localVelocity = parseFloat(e.target.value);
  }
</script>

<!-- Game Controls -->
<div class="z-50 fixed mx-auto py-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out
  bg-gray-500 bg-opacity-10 opacity-60 hover:opacity-100 flex justify-center items-center
  w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5 inset-x-10"
  style="bottom: 1em;">

  <button class="text-5xl mr-6 hover:bg-red-500 rounded-full" on:click={launchRocket}>💥</button>
  
  <!-- velocity container -->
  <div class="relative w-1/2 flex flex-col space-y-2 items-start group transition-opacity">
    <!-- velocity value -->
    <div class="flex flex-row items-center space-x-3 justify-center">
      <p>v = <span class="velocity">{localVelocity}</span> km/s</p>
    </div>
    
    <!-- v slider -->
    <input type="range" min="1" max="100" value={localVelocity} class="slider w-full" id="velocitySlider" on:input={handleVelocityChange} />
  </div>
</div>

<!-- Styles -->
<style>
  .velocity {
    color: #FF3D00;
  }

  .glowing-bottom {
    transition: box-shadow 0.5s ease-in-out, color 0.3s ease-in-out;
    box-shadow: 0 0 1em #1ABCFE;
  }

  .glowing-bottom:hover {
    box-shadow: 0 0 0.8em #1ABCFE;
  }
</style>
