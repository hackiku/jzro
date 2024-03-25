<!-- $lib/Nav.svelte -->
<script>
  export let y;
  let lastY = 0; // Initialize lastY for comparison
  let navbarTop = 0; // This will hold the navbar's top value
  let isOpen = false;

  // Calculate the navbar's top value based on scroll direction
  $: {
    if (y > lastY) {
      // Scrolling down, move navbar up beyond the viewport's top
      navbarTop = '-5%';
    } else {
      navbarTop = '1em';
    }
    lastY = y; // Update lastY for the next comparison
  }

  const navItems = [
    { href: '/hero', label: 'hero' },
    { href: '/fiddle', label: 'fiddle' },
    { href: '/cta', label: 'cta' },
    { href: '/mars-metar', label: 'mars' },
  ];

  const toggleMenu = () => {
    isOpen = !isOpen;
  };
</script>


<!-- <svelte:window bind:scrollY={y} /> -->

<div class={`fixed top-0 inset-x-0 transition-all duration-300 ease-in-out ${isOpen ? 'mt-4' : ''} rounded-3xl lg:rounded-full bg-gray-900 bg-opacity-50 z-50 backdrop-blur-md inset-x-[6vw] sm:inset-x-[12vw] md:inset-x-[20vw] px-6`} style="top: {navbarTop};">
  <header class="flex flex-col py-4 lg:flex-row lg:items-center">


    <div class="flex justify-between">
      <a href="/" class="font-mono hover:text-[#F4191D] shrink-0">🚁 jzro {y}</a>
      <button class="lg:hidden" on:click={toggleMenu}>
        <span class="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {#if isOpen}
          <!-- Close icon -->
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    
    <nav class={`${isOpen ? 'flex' : 'hidden'} flex-col gap-6 lg:flex lg:flex-row lg:w-full`}>
      <ul class="flex flex-col mt-6 lg:mt-0 lg:flex-row lg:flex-grow lg:justify-end lg:space-x-6">
        {#each navItems as { href, label }}
          <li class="w-100 border-b border-gray-800 lg:border-none">
            <a href={href} class="block py-2 text-gray-600 hover:text-[#F4191D]" on:click={toggleMenu}>
              {label}
            </a>
          </li>
        {/each}
      </ul>
      <button class="px-6 py-2 rounded-full bg-[#F4191D]">say hi 👋</button>
    </nav>
  </header>
</div>
