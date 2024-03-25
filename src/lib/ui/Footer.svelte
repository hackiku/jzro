<!-- lib/ui/Footer.svelte -->

<script>
  import { onMount } from 'svelte';
  
  let width = 0; 
  let height = 70;
  let atmoshpereOffset = 20;

  $: pathD = `M0,${height} Q${width / 2},0 ${width},${height} V${height} H0`;

  // Update the width on mount and when the window resizes
  onMount(() => {
    const updateWidth = () => {
      width = window.innerWidth;
      // Optionally, adjust the height based on the width or other conditions
      // height = calculateHeightBasedOnWidth(width);
    };
    
    window.addEventListener('resize', updateWidth);
    updateWidth();
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  });
</script>

<footer class="flex flex-col items-center justify-end w-full relative overflow-hidden">
  <div class="w-full px-20 pb-14 flex justify-end space-x-4 z-20">
    <a href="https://twitter.com" target="_blank" class="h-6 w-6"><img src="portfolio/tool-icons/figma.svg" alt="Twitter"></a>
    <a href="https://facebook.com" target="_blank" class="h-6 w-6"><img src="portfolio/tool-icons/whatsapp.svg" alt="Facebook"></a>
    <a href="https://instagram.com" target="_blank" class="h-6 w-6"><img src="portfolio/tool-icons/onshape.svg" alt="Instagram"></a>
  </div>
  
  <img src="ui/mcrn.svg" alt="MCRN flag" class="absolute left-[12vw] h-20 z-10">
  
  <svg class="w-full h-auto absolute bottom-0" viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
    <path d={pathD} fill="#F21D26"/>
    <path opacity="0.1" d={pathD + 40} fill="#F21D26"/>
    <path opacity="0.1" d="M557 0C201.913 0 0 75.1806 0 75.1806V120H1114V75.1806C1114 75.1806 912.088 0 557 0Z" fill="#F21D26"/>
  </svg>

  <path opacity="0.1" d="M557 0C201.913 0 0 75.1806 0 75.1806V120H1114V75.1806C1114 75.1806 912.088 0 557 0Z" fill="#F21D26"/>

  <div class="w-full flex mb-1 md:mb-2 items-end justify-center z-20">
    <p class="text-sm text-darkBg">Copyalright © 2024 jzro | Privacy | Terms</p>
  </div>
</footer>
