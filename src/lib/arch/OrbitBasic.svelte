<script>
    import { onMount } from 'svelte';
  
    let canvas;
    let ctx;
    
    const planets = [
      // You would populate this with your actual static planet data
      { x: 100, y: 100, gravity: 10 },
      // Add more planets as needed
    ];
  
    onMount(() => {
      ctx = canvas.getContext('2d');
      drawOrbit();
    });
  
    function calculateGravitationalInfluence(x, y) {
      // Simplified gravitational influence calculation
      let influence = { x: 0, y: 0 };
      planets.forEach(planet => {
        const dx = planet.x - x;
        const dy = planet.y - y;
        const distanceSq = dx * dx + dy * dy;
        const force = planet.gravity / distanceSq;
        influence.x += force * dx;
        influence.y += force * dy;
      });
      return influence;
    }
  
    function drawOrbit() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let x = 0, y = 0; // Starting point of the orbit
      for (let i = 0; i < 1000; i++) { // Arbitrary number of steps
        const influence = calculateGravitationalInfluence(x, y);
        x += influence.x;
        y += influence.y;
        ctx.fillRect(x, y, 2, 2); // Draw a small rectangle at the current position
      }
    }
  </script>
  
  <canvas bind:this={canvas} width={800} height={600}></canvas>
  