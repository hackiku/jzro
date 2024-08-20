<!-- $lib/app/Launch.svelte -->

<script lang="ts">
  function handleLaunch() {
    console.log('Launch initiated');
    // Add launch logic here
  }
</script>

<button 
  on:click={handleLaunch}
  class="px-8 py-4 border border-[#F3201D] hover:bg-[#D11C19] text-white text-xl font-bold rounded-md transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl active:shadow-md"
>
  Launch
</button>