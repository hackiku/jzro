<!-- /grav/Controls.svelte -->
<!-- game controls sticky to the center bottom of screen -->

<script>
  let velocity = 17; // Voyager 1 speed
  function launchRocket() {
    console.log('Rocket launched at', velocity, 'km/s');
  }
</script>


<div class="z-50 fixed p-6 bottom-6 rounded-full backdrop-blur-md
  flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2
  opacity-10 hover:opacity-100">
  
  <button class="text-5xl mr-6 hover:bg-red-500 rounded-full" on:click={launchRocket}>💥</button>
  
  <!-- velocity container -->
  <div class="relative w-1/2 flex flex-col space-y-2 items-start
  group transition-opacity">
    
    <!-- velocity value -->
    <div class="flex flex-row items-center space-x-3 justify-center">
      <!-- <img class="h-8" src="game/rocket.png" alt=""> -->
      <p>v = <span class="velocity">{velocity}</span> km/s</p>
    </div>
    
    <!-- slider -->
    <input type="range" min="1" max="100" value={velocity}
      class="slider w-full" id="particleNumber"
      on:input={(e) => velocity = e.target.value} />
  
    </div>
</div>


<style>
  .velocity {
    color: #FF3D00;
  }
</style>