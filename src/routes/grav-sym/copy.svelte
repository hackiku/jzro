<script>
  import { onMount, writable } from 'svelte';

  // nBodyProblem class definition remains the same
  class nBodyProblem {
    //... class definition ...
    // Ensure each method ends with "return this;"
  }

  const g = 39.5;
  const dt = 0.008;
  const softeningConstant = 0.15;
  const scale = 70;
  const radius = 4;
  const trailLength = 35;

  const masses = [/*...*/]; // Array of masses (planets)

  // Create a writable store for the solar system
  const solarSystem = writable(null);

  onMount(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const newSystem = new nBodyProblem({
      g,
      dt,
      masses: JSON.parse(JSON.stringify(masses)),
      softeningConstant
    });

    populateManifestations(newSystem.masses, ctx);

    solarSystem.set(newSystem);

    const update = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      solarSystem.update((system) => {
        system.updatePositionVectors().updateAccelerationVectors().updateVelocityVectors();
        drawPlanets(system.masses, ctx, width, height);
        return system;
      });

      window.requestAnimationFrame(update);
    };

    window.addEventListener('resize', update);
    update();
  });

  function populateManifestations(masses, ctx) {
    masses.forEach(mass => {
      mass.manifestation = new Manifestation(ctx, trailLength, radius);
    });
  }

  function drawPlanets(masses, ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    masses.forEach(mass => {
      const x = width / 2 + mass.x * scale;
      const y = height / 2 + mass.y * scale;
      mass.manifestation.draw(x, y);
      if (mass.name) {
        ctx.font = "14px Arial";
        ctx.fillText(mass.name, x + 12, y + 4);
      }
    });
  }

  // Manifestation class definition remains the same

  function resetSimulation() {
    solarSystem.update(system => {
      system.masses = JSON.parse(JSON.stringify(masses));
      populateManifestations(system.masses);
      return system;
    });
  }
</script>

<section class="absolute top-0 w-full p-4">
  <select id="masses-list" class="bg-black text-white border border-gray-600">
    <option value="0.000003003">Earth</option>
    <!-- ... Other options ... -->
  </select>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  on:click={resetSimulation}>Reset</button>
</section>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
