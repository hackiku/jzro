<!-- ./routes/grav-simulator/+page.svelte -->
<!-- https://codepen.io/thehappykoala/pen/wRRKEv -->

<script>
  import { onMount, writable } from "svelte";

  class nBodyProblem {
    constructor(params) {
      this.g = params.g;
      this.dt = params.dt;
      this.softeningConstant = params.softeningConstant;
      this.masses = params.masses;
    }

    updatePositionVectors() {
      for (let i = 0; i < this.masses.length; i++) {
        const mass = this.masses[i];
        mass.x += mass.vx * this.dt;
        mass.y += mass.vy * this.dt;
        mass.z += mass.vz * this.dt;
      }
      return this;
    }

    updateVelocityVectors() {
      for (let i = 0; i < this.masses.length; i++) {
        const mass = this.masses[i];
        mass.vx += mass.ax * this.dt;
        mass.vy += mass.ay * this.dt;
        mass.vz += mass.az * this.dt;
      }
      return this;
    }

    updateAccelerationVectors() {
      for (let i = 0; i < this.masses.length; i++) {
        let ax = 0;
        let ay = 0;
        let az = 0;
        const massI = this.masses[i];

        for (let j = 0; j < this.masses.length; j++) {
          if (i !== j) {
            const massJ = this.masses[j];
            const dx = massJ.x - massI.x;
            const dy = massJ.y - massI.y;
            const dz = massJ.z - massI.z;
            const distSq = dx * dx + dy * dy + dz * dz;
            const f =
              (this.g * massJ.m) /
              (distSq * Math.sqrt(distSq + this.softeningConstant));
            ax += dx * f;
            ay += dy * f;
            az += dz * f;
          }
        }

        massI.ax = ax;
        massI.ay = ay;
        massI.az = az;
      }
      return this;
    }
  }

  class Manifestation {
    constructor(ctx, trailLength, radius) {
      this.ctx = ctx;
      this.trailLength = trailLength;
      this.radius = radius;
      this.positions = [];
    }

    storePosition(x, y) {
      this.positions.push({ x, y });
      if (this.positions.length > this.trailLength) {
        this.positions.shift();
      }
    }

    draw(x, y) {
      this.storePosition(x, y);
      for (let i = 0; i < this.positions.length; i++) {
        let transparency, circleScaleFactor;
        const scaleFactor = i / this.positions.length;
        if (i === this.positions.length - 1) {
          transparency = 1;
          circleScaleFactor = 1;
        } else {
          transparency = scaleFactor / 2;
          circleScaleFactor = scaleFactor;
        }
        this.ctx.beginPath();
        this.ctx.arc(
          this.positions[i].x,
          this.positions[i].y,
          circleScaleFactor * this.radius,
          0,
          2 * Math.PI,
        );
        this.ctx.fillStyle = `rgba(0, 12, 153, ${transparency})`;
        this.ctx.fill();
      }
    }
  }

  const g = 39.5;
  const dt = 0.008;
  const softeningConstant = 0.15;
  const scale = 70;
  const radius = 4;
  const trailLength = 35;

  const masses = [{
      name: "Sun", //We use solar masses as the unit of mass, so the mass of the Sun is exactly 1
      m: 1,
      x: -1.50324727873647e-6,
      y: -3.93762725944737e-6,
      z: -4.86567877183925e-8,
      vx: 3.1669325898331e-5,
      vy: -6.85489559263319e-6,
      vz: -7.90076642683254e-7
    },
    {
      name: "Mercury",
      m: 1.65956463e-7,
      x: -0.346390408691506,
      y: -0.272465544507684,
      z: 0.00951633403684172,
      vx: 4.25144321778261,
      vy: -7.61778341043381,
      vz: -1.01249478093275
    },
    {
      name: "Venus",
      m: 2.44699613e-6,
      x: -0.168003526072526,
      y: 0.698844725464528,
      z: 0.0192761582256879,
      vx: -7.2077847105093,
      vy: -1.76778886124455,
      vz: 0.391700036358566
    },
    {
      name: "Earth",
      m: 3.0024584e-6,
      x: 0.648778995445634,
      y: 0.747796691108466,
      z: -3.22953591923124e-5,
      vx: -4.85085525059392,
      vy: 4.09601538682312,
      vz: -0.000258553333317722
    },
    {
      m: 3.213e-7,
      name: "Mars",
      x: -0.574871406752105,
      y: -1.395455041953879,
      z: -0.01515164037265145,
      vx: 4.9225288800471425,
      vy: -1.5065904473191791,
      vz: -0.1524041758922603
    }
  ];

  let canvas;
  const solarSystem = writable(null);

  function animate() {
    solarSystem.update(system => {
      if (system) {
        system.updatePositionVectors()
          .updateVelocityVectors()
          .updateAccelerationVectors();
        drawPlanets(system.masses, canvas.getContext("2d"), canvas.width, canvas.height);
      }
      return system;
    });

    requestAnimationFrame(animate);
  }


  onMount(() => {
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const newSystem = new nBodyProblem({
      g, dt, masses: JSON.parse(JSON.stringify(masses)), softeningConstant,
    });

    populateManifestations(newSystem.masses, ctx);
    solarSystem.set(newSystem);

    // Add event listener for window resize
    window.addEventListener("resize", () => {
      updateCanvasSize();
    });

    // Initial canvas size update
    updateCanvasSize();
    animate();  // Start the animation loop
  });

  function updateCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    drawPlanets(solarSystem.get().masses, canvas.getContext("2d"), width, height);
  }


  function populateManifestations(masses, ctx) {
    masses.forEach((mass) => {
      mass.manifestation = new Manifestation(ctx, trailLength, radius);
    });
  }

  function drawPlanets(masses, ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    masses.forEach((mass) => {
      const x = width / 2 + mass.x * scale;
      const y = height / 2 + mass.y * scale;
      mass.manifestation.draw(x, y);
      if (mass.name) {
        ctx.font = "14px Arial";
        ctx.fillText(mass.name, x + 12, y + 4);
      }
    });
  }

  function resetSimulation() {
    solarSystem.update((system) => {
      system.masses = JSON.parse(JSON.stringify(masses));
      populateManifestations(system.masses, canvas.getContext("2d"));  // Pass the context
      return system;
    });
  }

  function addPlanet(massValue) {
    const newMass = {
      name: "New Planet",
      m: parseFloat(massValue),
      x: Math.random() * 5 - 2.5, // Random position within a range
      y: Math.random() * 5 - 2.5,
      z: 0, // Assuming simulation is in 2D plane
      vx: (Math.random() - 0.5) * 2, // Random velocity
      vy: (Math.random() - 0.5) * 2,
      vz: 0
    };

    solarSystem.update(system => {
      system.masses.push(newMass);
      populateManifestations(system.masses, canvas.getContext("2d"));
      return system;
    });
  }

</script>

<section id="controls-wrapper">
  <label>Mass of Added Planet</label>
  <select id="masses-list" on:change="{(e) => addPlanet(e.target.value)}">
    <option value="0.000003003">Earth</option>
    <option value="0.0009543">Jupiter</option>
    <option value="1">Sun</option>
    <option value="0.1">Red Dwarf Star</option>
  </select>
  <button id="reset-button" on:click="{resetSimulation}">Reset</button>
</section>
<canvas bind:this="{canvas}"></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>