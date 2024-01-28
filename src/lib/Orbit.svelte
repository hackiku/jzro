<script>
  import { onMount } from 'svelte';
  
  let canvas;
  let ctx;
  
  let positions = []; // Store recent positions
  
  onMount(() => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    drawOrbit();
    animate();
  });
  
  function drawOrbit() {
    if (!canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    positions.push({ x: newX, y: newY });
    if (positions.length > trailLength) {
      positions.shift(); // Remove the oldest position if we exceed the trail length
    }
    
    // Style the orbit
    ctx.strokeStyle = '#1ABCFE'; // Set stroke color
    ctx.lineWidth = 1; // Set stroke width
    
    // Optional: Add shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Draw the orbit
    // Draw the orbit
    ctx.beginPath();
    ctx.arc(newX, newY, 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw the motion trail
    for (let i = 0; i < positions.length; i++) {
      ctx.beginPath();
      ctx.arc(positions[i].x, positions[i].y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${i / positions.length / 2})`; // Decrease opacity for older positions
      ctx.fill();
    }
  }

  function animate() {
  drawOrbit();
  requestAnimationFrame(animate);
}


</script>

<!-- <canvas bind:this={canvas} style="position: fixed; top: 0; left: 0; z-index: 10; width: 100vw; height: 100vh;"></canvas> -->
