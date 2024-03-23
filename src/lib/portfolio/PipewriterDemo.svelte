<!-- $lib/portfolio/PipewriterDemo.svelte -->
<script>
  import { onMount } from 'svelte';

  export let highlight = {
    wire: 'portfolio/uploadcare-wire.png',
    ui: 'portfolio/uploadcare-ui.png',
  };

  // export let tilt = 0;
  let sliderPosition = 50;
  let isDragging = false;

  function handleMouseMove(event) {
    if (isDragging) {
      const slider = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - slider.left;
      sliderPosition = Math.max(0, Math.min(100, (x / slider.width) * 100));
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  onMount(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });
</script>

<div class="inset-0 flex justify-between p-4">
  <img class="h-8" src="portfolio/tool-icons/docs.svg" alt="Docs Logo">
  <img class="h-8" src="portfolio/tool-icons/figma.svg" alt="Figma Logo">
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative shadow-2xl shadow-blue-600/30 flex items-center justify-center"
  on:mousedown={() => (isDragging = true)} 
  on:mousemove={handleMouseMove}>


  <div class="relative w-full aspect-video">
      <!-- Wireframe Image -->
      <div class="absolute bg-no-repeat bg-cover inset-0
      rounded-lg md:rounded-3xl lg:rounded-4xl" 
          style="background-image: url({highlight.wire});
          background-size: contain;
          background-position: left center;
          clip-path: polygon(0 0, {sliderPosition}% 0, {sliderPosition}% 100%, 0% 100%);">
      </div>
      
      <!-- UI Image -->
      <div class="absolute bg-no-repeat bg-cover inset-0
        rounded-lg md:rounded-3xl lg:rounded-4xl" 
           style="background-image: url({highlight.ui});
           background-size: contain;
           background-position: right center; 
           clip-path: polygon({sliderPosition}% 0, 100% 0, 100% 100%, {sliderPosition}% 100%);">
      </div>
      
      <!-- Slider Handle -->
      <div class="absolute top-0 bg-blue-800 h-full w-1 cursor-col-resize" 
           style="left: {sliderPosition}%;">
      </div>
  </div>
</div>
