<script>
    let gamma = 1.4;
    let M1 = 1.25;
    let betaSonic = 66.406795;
    let deflectionAngle = '';
  
    // Function to find deflection angle for which M2 becomes 1 (sonic)
    const findDeflectionAngle = (betaSonic, M1, gamma) => {
      const betaRad = betaSonic * Math.PI / 180; // Convert beta angle to radians
      let thetaRad = 0; // Initial guess for deflection angle in radians
      let error = 1;
      let iteration = 0; // Iteration counter to prevent infinite loops
  
      while (error > 0.000001) {
        let sin2Theta = ((gamma - 1) * M1 ** 2 * Math.sin(betaRad) ** 2 + 2) /
                        (2 * gamma * M1 ** 2 * Math.sin(betaRad) ** 2 - (gamma - 1));
  
        let newThetaRad = Math.asin(Math.sqrt(sin2Theta)) + betaRad;
  
        if(newThetaRad > betaRad) {
          newThetaRad = betaRad - Math.asin(Math.sqrt(sin2Theta));
        }
  
        error = Math.abs(newThetaRad - thetaRad);
        thetaRad = newThetaRad;
  
        iteration++;
        if (iteration > 1000) {
          throw new Error('Solution did not converge');
        }
      }
      return thetaRad * (180 / Math.PI);
    };
  
    const handleSubmit = () => {
      deflectionAngle = findDeflectionAngle(betaSonic, M1, gamma).toFixed(6);
    };
  </script>
  
  <!-- ================================================= -->

  <div class="container mx-auto p-4">
    
    <p>In a supersonic flow of gas (ideal gas with γ = {gamma}), for a Mach number M1 = {M1},
        a shock wave forms at an angle that ensures sonic conditions (i.e., M2 = 1)
        downstream of the wave.</p>
    
    <form class="space-y-2" on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="gamma" class="block mb-2">Gamma (γ):</label>
        <input id="gamma" type="number" step="0.01" bind:value={gamma} class="p-2 border rounded text-gray-500"/>
      </div>
      
      <div>
        <label for="M1" class="block mb-2">Upstream Mach Number (M1):</label>
        <input id="M1" type="number" step="0.01" bind:value={M1} class="p-2 border rounded text-gray-500"/>
      </div>
      
      <div>
        <label for="betaSonic" class="block mb-2">Beta Sonic (β_sonic):</label>
        <input id="betaSonic" type="number" step="0.000001" bind:value={betaSonic} class="p-2 border rounded text-gray-500"/>
      </div>
  
      <button type="submit" class="px-4 py-2 border rounded">Calculate Deflection Angle</button>
  
      {#if deflectionAngle}
        <div class="mt-4">
          <h2 class="font-bold">Deflection Angle:</h2>
          <p>{deflectionAngle} degrees</p>
        </div>
      {/if}
    </form>
  </div>
  
  <style>
    .container {
      max-width: 640px;
    }
  </style>
  