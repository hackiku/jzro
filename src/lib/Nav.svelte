<!-- $lib/Nav.svelte -->
<script>
  import { onMount } from 'svelte';
  let isOpen = false;

  const navItems = [
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

<div class="absolute top-4 rounded-full bg-gray-900 bg-opacity-75 z-50
  inset-x-[8vw] md:inset-x-[20vw] px-6 py-4  lg:px-10 ">
  <header class="flex justify-between items-center">
    <a href="/" class="text-lg font-mono text-white hover:text-blue-500">🚁 jzro</a>
    
    <button class="lg:hidden text-white focus:outline-none" on:click={toggleMenu}>
      <span class="sr-only">Open menu</span>
      <!-- Hamburger icon -->
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>

    <nav class={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
      <ul class="flex flex-col lg:flex-row lg:space-x-4 items-center text-white">
        {#each navItems as { href, label }}
          <li><a href={href} class="block px-3 py-2 rounded-md text-base font-medium hover:text-[#F4191D]" on:click={toggleMenu}>{label}</a></li>
        {/each}
      </ul>
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
