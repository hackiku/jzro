<!-- src/lib/app/LaunchControl.svelte -->

<script lang="ts">
  import { Play, Pause, RotateCcw } from 'lucide-svelte';
  import { isLaunched, launchTime, resetLaunch } from '$lib/stores/launchStore';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let intervalId: NodeJS.Timeout;

  onMount(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });

  function toggleLaunch() {
    isLaunched.update(value => !value);
    if ($isLaunched) {
      intervalId = setInterval(() => {
        launchTime.update(t => t + 10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }
  }

  function handleReset() {
    resetLaunch();
    if (intervalId) clearInterval(intervalId);
  }

  function formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  }
</script>

<div class="flex flex-col items-center p-4 bg-opacity-80 bg-gray-900 rounded-xl backdrop-blur-md"
     in:fly="{{ y: 50, duration: 500 }}"
     out:fade>
  <div class="text-2xl font-light text-gray-300 font-mono mb-4">{formatTime($launchTime)}</div>
  <div class="flex items-center gap-4">
    <button 
      on:click={toggleLaunch} 
      class="flex items-center justify-center gap-2 w-32 px-6 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
    >
      {#if $isLaunched}
        <Pause size={20} />
        <span class="font-semibold">Pause</span>
      {:else}
        <Play size={20} />
        <span class="font-semibold">Launch</span>
      {/if}
    </button>
    <button
      on:click={handleReset}
      class="flex items-center justify-center w-10 h-10 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <RotateCcw size={20} />
    </button>
  </div>
</div>