<!-- $lib/ui/ScreenSizeDebug.svelte -->
<script>
  import { dev } from '$app/environment';
  /**
   * NOTE: If you like using this for debugging purposes
   * it's good to display it on dev environment only
   * this way you will not have to delete it and write it
   * back again when switching from prod to dev and vice versa
   */
</script>

{#if dev}
  <div class="fixed bottom-0 right-0 z-50 p-2 bg-gray-800 text-white">
    <div class="sm:hidden">xs</div>
    <div class="hidden sm:block md:hidden">sm</div>
    <div class="hidden md:block lg:hidden">md</div>
    <div class="hidden lg:block xl:hidden">lg</div>
    <div class="hidden xl:block 2xl:hidden">xl</div>
    <div class="hidden 2xl:block">2xl</div>
  </div>
{/if}
