<!-- $lib/Nav.svelte -->

<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const isVisible = writable(true); // Nav is initially visible
  let lastScrollY = 0;

  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible.set(currentScrollY < lastScrollY || currentScrollY <= 0);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Compute the classes based on isVisible
  $: navClasses = `container mx-auto px-4 ${$isVisible ? 'fixed top-0 opacity-100' : 'opacity-0'} transition-opacity duration-300`;
</script>

<div class="{navClasses}">
  <header class="flex justify-between items-center py-4 px-20">
    <a class="text-md font-mono" href="/">🚁 jzro</a>
    <nav>
      <ul class="flex space-x-4 items-center relative">
        <li><a href="/hero" class="text-white hover:text-blue-500">hero</a></li>
        <li><a href="/boing" class="text-white hover:text-blue-500">boing</a></li>
        <li><a href="/fiddle" class="text-white hover:text-blue-500">fiddle</a></li>
        <li><a href="/orbit-test" class="text-white hover:text-blue-500">orbit</a></li>
        <li><a href="/cta" class="text-white hover:text-blue-500">cta</a></li>
        <li><a href="/grav-sym" class="text-[#F21D26] hover:text-blue-500">grav</a></li>
        <li><a href="/mars-metar" class="text-white hover:text-blue-500">jzro</a></li>
      </ul>
    </nav>
  </header>
</div>

<style>
  .fixed {
    position: fixed;
    width: 100%;
    z-index: 50; /* Adjust as necessary */
    background-color: rgba(0, 0, 0, 0.8); /* Or your desired background */
  }
</style>





