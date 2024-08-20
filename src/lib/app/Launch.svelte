<!-- $lib/app/Launch.svelte -->

<script lang="ts">
  import { isLaunched } from './launchStore';
  import { fade, fly } from 'svelte/transition';

  let launched = false;
  isLaunched.subscribe(value => {
    launched = value;
  });

  function handleClick() {
    isLaunched.toggle();
  }
</script>

{#if launched}
  <button 
    on:click={handleClick}
    class="px-8 py-4 border border-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-md transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl active:shadow-md"
    in:fly="{{ y: 50, duration: 500 }}"
    out:fade
  >
    Restart
  </button>
{:else}
  <button 
    on:click={handleClick}
    class="px-8 py-4 bg-[#F3201D] hover:bg-[#D11C19] text-white text-xl font-bold rounded-md transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl active:shadow-md"
    in:fly="{{ y: 50, duration: 500 }}"
    out:fade
  >
    Launch
  </button>
{/if}