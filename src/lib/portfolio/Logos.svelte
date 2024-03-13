<!-- Logos.svelte -->
<script>

  // opacity to balance colors on hover opacity
  export let logos = [
    { src: 'portfolio/logos/redocly-logo.svg', alt: 'Redocly', opacity: 1 },
    { src: 'portfolio/logos/uploadcare-logo.svg', alt: 'Uploadcare', opacity: 0.2 },
    { src: 'portfolio/logos/lenovo-logo.svg', alt: 'Lenovo', opacity: 1 },
    // { src: 'portfolio/logos/uploadcare-logo.svg', alt: 'extra', opacity: 0.2 },
    { src: 'portfolio/logos/linguado-logo.jpg', alt: 'Linguado', opacity: 0.2 },
    { src: 'portfolio/logos/stoovo-logo.svg', alt: 'Stoovo', opacity: 0.2 },
  ];
</script>

<div class="relative logo-container">
  

  <div class="flex flex-wrap justify-center items-center gap-8
    grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-800 ease-in-out
    sm:flex-nowrap sm:gap-12 opacity-75 ">
    {#each logos as logo}
      <div 
        class="inline-block logo-item filter"
        style={`opacity: ${logo.opacity}; transform: ${logo.alt === 'Linguado' ? 'scale(1.5) rotate(14deg)' : 'none'};
          margin: ${logo.alt === 'Linguado' ? '-10% 0' : '0'};`}>
        <img
          class="h-auto w-24 md:w-32 lg:w-40"
          src={logo.src} 
          alt={logo.alt}>
      </div>
    {/each}
  </div>
</div> 

<style>

  /* override to make opacity uniform */
  .logo-container:hover .logo-item {
    opacity: 1 !important;
  }
</style>
