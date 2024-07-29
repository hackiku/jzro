<script>
  import { onMount } from "svelte";
  let distortion = 1.0;
  let canvas;
  let ctx;

  onMount(() => {
    ctx = canvas.getContext("2d");
    drawIndicator();
  });

  function drawIndicator() {
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the attitude indicator (simplified for example)
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.stroke();

    // Apply distortion correction
    applyDistortion();
  }

  function applyDistortion() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const newData = new Uint8ClampedArray(data);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const factor = 1 + distortion * Math.pow(distance / 100, 2);

        const sx = Math.round(centerX + dx / factor);
        const sy = Math.round(centerY + dy / factor);

        if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
          const srcIndex = (sy * canvas.width + sx) * 4;
          const destIndex = (y * canvas.width + x) * 4;
          newData[destIndex] = data[srcIndex];
          newData[destIndex + 1] = data[srcIndex + 1];
          newData[destIndex + 2] = data[srcIndex + 2];
          newData[destIndex + 3] = data[srcIndex + 3];
        }
      }
    }

    ctx.putImageData(new ImageData(newData, canvas.width, canvas.height), 0, 0);
  }
</script>

<main>
  <canvas class="bg-gray-800 border border-red-300" bind:this={canvas} width="400" height="400"></canvas>
  <input type="range" min="0" max="2" step="0.01" bind:value={distortion} on:input={drawIndicator} />
</main>

<style>
  canvas {
    display: block;
    margin: 20px auto;
    background: white;
  }
</style>
