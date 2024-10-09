<!-- $lib/components/Jzro.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  
  export let isOpen = false;
</script>

{#if isOpen}
  <div
    class="absolute top-full left-0 mt-2 p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg w-[80vw] max-w-4xl"
    transition:fly={{ y: -20, duration: 300 }}
  >
    <h2 class="text-2xl font-bold mb-3">JZRO 242151Z 26007KT CLEAR -13/-76 Q0073</h2>
    <p class="text-sm text-gray-400 mb-3">March 24, 2024 / Sol 1100</p>
    <p class="text-base mb-6">
      The Ingenuity helicopter earned Mars ICAO: JZRO, the only official airport code outside
      of Earth. It doesn't get more 'aero+space' than that. Rest in peace wingy angel 💔
    </p>
    <a href="/" class="text-blue-500 hover:underline">Back to Home</a>
  </div>
{/if}