<!-- Controls.svelte -->
<!-- game controls sticky to the center bottom of screen -->

<script>
  let velocity = 50; // default value for slider
</script>

<!-- PARTICLE SELECTOR -->
<div class="z-50 fixed p-6 bottom-12 rounded-full hover:backdrop-blur-md flex justify-center
items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2">
  <div class="
  relative flex flex-col justify-center group  hover:opacity-100 transition-opacity opacity-0">
    <div class="flex flex-row items-center justify-center">
      <img class="h-8" src="game/rocket.png" alt="">
      <p>v = <span class="velocity">{velocity}</span> · 10^6 m/s</p>
    </div>
      
      <!-- Slider -->
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