<!-- src/lib/app/Controls.svelte -->

<script>
  import katex from 'katex';
  import { onMount, afterUpdate } from 'svelte';

  export let localVelocity = 30;

  let velocityElement;

  function handleVelocityChange(e) {
    localVelocity = parseFloat(e.target.value);
  }

  function renderKatex() {
    if (velocityElement) {
      katex.render(`v_{\\text{launch}} = ${localVelocity} \\text{ km/s}`, velocityElement, {
        throwOnError: false,
        displayMode: true,
        color: '#FFFFFF'
      });
    }
  }

  afterUpdate(() => {
    renderKatex();
  });
</script>

<div class="p-6 w-64 bg-opacity-20 bg-gray-900 backdrop-blur-md rounded-lg">
  <div class="flex flex-col space-y-4">
    <div class="flex justify-center items-center">
      <div bind:this={velocityElement}></div>
    </div>
    <div class="relative">
      <div class="w-full h-2 bg-transparent border border-white rounded-full overflow-hidden">
        <div 
          class="h-full bg-purple-600 transition-all duration-300 ease-in-out" 
          style="width: {localVelocity}%;"
        ></div>		
      </div>
      <input 
        type="range" 
        min="1" 
        max="100" 
        value={localVelocity} 
        class="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer" 
        on:input={handleVelocityChange} 
      />
    </div>
  </div>
</div>

<style>
  @import 'katex/dist/katex.min.css';

  :global(.katex) {
    font-size: 1.1em;
  }

  :global(.katex-display) {
    margin: 0;
  }

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