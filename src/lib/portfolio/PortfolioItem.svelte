<!-- PortfolioItem.svelte -->
<script>
  // Assuming Uploadcare's images are the focus
  let uploadcareExample = {
    ui: 'portfolio/uploadcare-ui.png',
    wire: 'portfolio/uploadcare-wire.png',
  };

  let tilt = 5;
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

  // Listen for mouseup events on the whole window to ensure dragging state is correctly reset
  onMount(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });
</script>

<style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .full-width-slider {
    width: 100vw;
    position: relative;
    margin-left: calc(-50vw + 50%);
  }
</style>

<div class="full-width-slider overflow-x-auto hide-scrollbar snap-x snap-mandatory">
  <div class="flex justify-center items-center h-full" on:mousemove={handleMouseMove}>
    <div class="relative w-full max-w-4xl mx-auto"
         on:mousedown={() => (isDragging = true)}
         style:transform={`rotate(${tilt}deg)`}>
      <div class="slider-container bg-white rounded-3xl shadow-xl shadow-blue-500/20 overflow-hidden">
        <div class="relative w-full aspect-w-16 aspect-h-9">
          <!-- Wireframe Image -->
          <div class="absolute bg-no-repeat bg-cover inset-0 rounded-3xl"
               style="background-image: url(${uploadcareExample.wire});
                      background-size: contain;
                      background-position: left center;
                      clip-path: polygon(0 0, {sliderPosition}% 0, {sliderPosition}% 100%, 0% 100%);">
          </div>
          <!-- UI Image -->
          <div class="absolute inset-0 bg-no-repeat bg-cover rounded-3xl"
               style="background-image: url(${uploadcareExample.ui});
                      background-size: contain;
                      background-position: right center;
                      clip-path: polygon({sliderPosition}% 0, 100% 0, 100% 100%, {sliderPosition}% 100%);">
          </div>
          <!-- Slider Handle -->
          <div class="absolute top-0 bg-blue-500 h-full w-1 cursor-col-resize"
               style="left: {sliderPosition}%;">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
