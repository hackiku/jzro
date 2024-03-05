<!-- Logos.svelte -->
<script>
  export let logos = [
    { src: 'portfolio/redocly-logo.svg', alt: 'Redocly' },
    { src: 'portfolio/uploadcare-logo.svg', alt: 'Uploadcare' },
    { src: 'portfolio/highfive-logo.svg', alt: 'HighFive' },
    { src: 'portfolio/linguado-logo.jpg', alt: 'Linguado' },
    { src: 'portfolio/uploadcare-logo.svg', alt: 'Uploadcare' },
  ];

  let grayscaleLogos = true;

  function toggleGrayscale() {
    grayscaleLogos = !grayscaleLogos;
  }
</script>

<div class="flex flex-wrap justify-center items-center gap-4
  sm:flex-nowrap sm:gap-6 md:gap-8 lg:gap-12">
  {#each logos as logo}
    <div 
      class="inline-block"
      style={`transform: ${logo.alt === 'Linguado' ? 'scale(1.5) rotate(14deg)' : 'none'}; margin: ${logo.alt === 'Linguado' ? '-10% 0' : '0'};`}>
      <img
        class={`object-contain ${grayscaleLogos ? 'opacity-90' : 'opacity-100'} h-auto w-24 md:w-32 lg:w-40`}
        src={logo.src} 
        alt={logo.alt}>
    </div>
  {/each}
</div>
