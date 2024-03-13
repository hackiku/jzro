<!-- $lib/Nav.svelte -->
<script>
  import { onMount } from 'svelte';
  let isOpen = true;

  const navItems = [
    { href: '/hero', label: 'Hero' },
    { href: '/fiddle', label: 'Fiddle' },
    { href: '/orbit-test', label: 'Orbit' },
    { href: '/cta', label: 'CTA' },
    { href: '/grav-sym', label: 'Grav' },
    { href: '/mars-metar', label: 'JZRO' },
  ];

  const toggleMenu = () => {
    isOpen = !isOpen;
    console.log("Menu toggled, isOpen:", isOpen);
  };

  onMount(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<div class="fixed top-4 rounded-[1.5em] bg-gray-900 bg-opacity-75 z-50
  inset-x-[8vw] md:inset-x-[20vw] px-6 py-4 lg:px-10 ">
  <header class="flex flex-col">
    
    <div class="flex justify-between">
      
      <a href="/" class="text-lg font-mono text-white hover:text-[#F4191D]">
        🚁 jzro</a>
      
      <button class="" on:click={toggleMenu}>
        <span class="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {#if isOpen}
          <!-- Close icon -->
          <svg class="h-6 w-6 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <!-- Hamburger icon -->
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        {/if}
      </button>
    </div>

    <nav class={`${isOpen ? 'flex' : 'hidden'} flex-col w-full rounded-b-full lg:rounded-none`}>
      <ul class="flex flex-col lg:flex-row lg:space-x-4 items-center text-white w-full">
        {#each navItems as { href, label }}
          <li class="w-full border-b border-gray-800 lg:border-none">
            <a href={href} class="block py-2 hover:text-[#F4191D]" on:click={toggleMenu}>
              {label}
            </a>
          </li>
        {/each}
      </ul>
      <button>Say hi</button>
    </nav>
  
  </header>
</div>

<style>
  /* Ensure the nav doesn't affect the positioning of other elements */
  .nav-container {
    position: fixed;
    width: 100%;
    z-index: 10; /* Adjust z-index as needed */
  }
</style>
