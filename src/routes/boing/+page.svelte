<!-- routes/boing/+page.svelte -->
<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  let velocity = 50; // Default value for slider
  const fire = writable(false); // Store to trigger firing

  function shoot() {
    fire.set(true);
    setTimeout(() => {
      fire.set(false);
    }, 2000); // Reset after animation
  }

  onMount(() => {
    // Initialize animation or other logic here
  });
</script>

<!-- Page layout with cannon and game elements -->
<div class="flex flex-col items-center justify-start h-screen">

  <!-- Projectile and target area -->
  <div class="relative w-full flex-1">
    {#if fire}
      <img src="game/rocket.png" alt="rocket" class="absolute" style="left: 5vw; bottom: 20vh; animation: shoot 2s linear forwards;" />
    {/if}
    <svg class="absolute" style="right: 10vw; top: 10vh;" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
  </div>

  <!-- Velocity slider -->
  <div class="z-50 fixed p-6 bottom-12 rounded-full hover:backdrop-blur-md flex justify-center items-center bg-gray-500 bg-opacity-10 left-1/2 transform -translate-x-1/2">
    <button
    class="text-4xl"
    on:click={shoot}>
    💥
    </button>

    <div class="relative flex flex-col justify-center group hover:opacity-100 transition-opacity">
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
</div>

<style>
  @keyframes shoot {
    to { transform: translate(80vw, -80vh); } /* Adjust this for desired trajectory */
  }
  .velocity {
    color: #ff3d00;
  }
</style>
