<!-- lib/ui/Footer.svelte -->

<script>
  import { onMount } from 'svelte';
  
  let width = 0; 
  let height = 70;
  let atmosphereOffset = 20;

  $: pathD = `M0,${height} Q${width / 2},0 ${width},${height} V${height} H0`;
  // New path for the atmosphere layer
  $: pathDAtmosphere = `M0,${height - atmosphereOffset} Q${width / 2},${-atmosphereOffset} ${width},${height - atmosphereOffset} V${height} H0`;

  onMount(() => {
    const updateWidth = () => {
      width = window.innerWidth;
    };
    
    window.addEventListener('resize', updateWidth);
    updateWidth();
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  });
</script>

<footer class="flex flex-col items-center justify-end w-full relative overflow-hidden">
  
  <div class="w-full px-12 md:pr-32 xl:pr-72 pb-20 flex justify-end space-x-4 z-20">
    <a href="https://instagram.com" target="_blank" class="h-7 w-7 opacity-40 hover:opacity-100"><img src="ui/instagram-icon.svg" alt="Instagram"></a>
    <a href="https://tiktok.com" target="_blank" class="h-7 w-7 opacity-40 hover:opacity-100"><img src="ui/tiktok-icon.svg" alt="TikTok"></a>
    <a href="https://linkedin.com" target="_blank" class="h-7 w-7 opacity-40 hover:opacity-100"><img src="ui/linkedin-icon.svg" alt="LinkedIn"></a>
  </div>
  
  <!-- <img src="ui/mcrn.svg" alt="MCRN flag" class="absolute left-[16vw] h-20 z-10"> -->
  
  <svg class="w-full absolute bottom-0" viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
    <path d={pathDAtmosphere} fill="#F21D26" opacity="0.2"/>
    <path d={pathD} fill="#F21D26"/>
  </svg>
  
  <img src="ui/mcrn.svg" alt="MCRN flag" class="absolute left-[10vw] md:left-[38vh] h-20 z-10">
  <div class="w-full flex mb-1 md:mb-2 items-end justify-center z-20">
    <div class="text-sm text-darkBg">
      Copyalright © 2024 jzro |
      <a href="/privacy" target="_blank" class="mouse-pointer hover:underline hover:opacity-70">Privacy</a> |
      <a href="/terms" target="_blank" class="mouse-pointer hover:underline hover:opacity-70">Terms</a> |
    </div>
  </div>
</footer>
