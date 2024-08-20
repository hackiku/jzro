<!-- src/lib/app/Controls.svelte -->

<script>
  import { spring } from 'svelte/motion';
  import Equation from './Equation.svelte';

  export let localVelocity = 30;

  const displayed = spring(localVelocity, {
    stiffness: 0.1,
    damping: 0.25
  });

  $: displayed.set(localVelocity);
  $: displayedValue = Math.round($displayed);

  function handleVelocityChange(event) {
    localVelocity = parseFloat(event.target.value);
  }
</script>

<div class="p-6 w-58">
  <div class="flex flex-col space-y-4">
    <div class="flex justify-center items-center h-16">
      <Equation velocity={displayedValue} />
    </div>
    <div class="relative">
      <div class="w-full h-4 bg-transparent border border-white rounded-full overflow-hidden">
        <div 
          class="h-full bg-purple-600 transition-all duration-100 ease-out" 
          style="width: {displayedValue}%;"
        ></div>    
      </div>
      <input 
        type="range" 
        min="1" 
        max="100" 
        bind:value={localVelocity}
        on:input={handleVelocityChange}
        class="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer" 
      />
    </div>
  </div>
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #F3201D;
    cursor: pointer;
    border: 2px solid white;
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #F3201D;
    cursor: pointer;
    border: 2px solid white;
  }
</style>