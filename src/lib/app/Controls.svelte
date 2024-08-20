<!-- src/lib/app/Controls.svelte -->

<script>
  export let localVelocity = 1;

  function handleVelocityChange(e) {
    localVelocity = parseFloat(e.target.value);
  }
</script>

<div class="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-4 w-64">
  <div class="flex flex-col space-y-2">
    <div class="flex justify-between items-center">
      <span class="text-white">Velocity:</span>
      <span class="text-[#F3201D]">{localVelocity} km/s</span>
    </div>
    <input 
      type="range" 
      min="1" 
      max="100" 
      value={localVelocity} 
      class="w-full" 
      on:input={handleVelocityChange} 
    />
  </div>
</div>