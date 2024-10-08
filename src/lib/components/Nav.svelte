<!-- $lib/app/Nav.svelte -->

<script lang="ts">
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
  <a href="/" class="text-[#F3201D] text-xl font-medium hover:underline">jzro</a>
  <button on:click={toggleMenu} class="text-white">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  </button>
</nav>