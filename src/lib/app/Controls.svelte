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

<div class="p-4 w-full max-w-[250px]">
  <div class="flex flex-col space-y-2">
    <div class="flex justify-center items-center h-12">
      <Equation velocity={displayedValue} />
    </div>
    <div class="relative">
      <div class="w-full h-3 bg-transparent border border-white rounded-full overflow-hidden">
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
        class="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer" 
      />
    </div>
  </div>
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #F3201D;
    cursor: pointer;
    border: 2px solid white;
  }

  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #F3201D;
    cursor: pointer;
    border: 2px solid white;
  }
</style>