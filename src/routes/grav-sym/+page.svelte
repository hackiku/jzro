<!-- ./routes/grav-simulator/+page.svelte -->

<script>
  import { onMount } from 'svelte';

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
    }

    updateVelocityVectors() {
      for (let i = 0; i < this.masses.length; i++) {
        const mass = this.masses[i];
        mass.vx += mass.ax * this.dt;
        mass.vy += mass.ay * this.dt;
        mass.vz += mass.az * this.dt;
      }
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
            const f = this.g * massJ.m / (distSq * Math.sqrt(distSq + this.softeningConstant));
            ax += dx * f;
            ay += dy * f;
            az += dz * f;
          }
        }

        massI.ax = ax;
        massI.ay = ay;
        massI.az = az;
      }
    }
  }

  const g = 39.5;
  const dt = 0.008;
  const softeningConstant = 0.15;
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
  let ctx;
  let innerSolarSystem;
  let width, height;

  onMount(() => {
    ctx = canvas.getContext("2d");
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    innerSolarSystem = new nBodyProblem({
    g,
    dt,
    masses: JSON.parse(JSON.stringify(masses)),   
    softeningConstant
});

populateManifestations(innerSolarSystem.masses);
requestAnimationFrame(animate);
});

function populateManifestations(masses) {
masses.forEach(mass => {
mass.manifestation = new Manifestation(ctx, trailLength, radius);
});
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
      2 * Math.PI
    );
    this.ctx.fillStyle = `rgb(0, 12, 153, ${transparency})`;
    this.ctx.fill();
  }
}

}
function resetSimulation() {
    innerSolarSystem.masses = JSON.parse(JSON.stringify(masses));
    populateManifestations(innerSolarSystem.masses);
  }

  function animate() {
    innerSolarSystem.updatePositionVectors().updateAccelerationVectors().updateVelocityVectors();
    ctx.clearRect(0, 0, width, height);
    innerSolarSystem.masses.forEach(mass => {
    const x = width / 2 + mass.x * scale;
    const y = height / 2 + mass.y * scale;
    mass.manifestation.draw(x, y);
    if (mass.name) {
      ctx.font = "14px Arial";
      ctx.fillText(mass.name, x + 12, y + 4);
    }
  });

  requestAnimationFrame(animate);
  }

  const scale = 70;
  const radius = 4;
  const trailLength = 35;
</script>

<section class="absolute top-0 w-full p-4">
  <label for="masses-list" class="text-white">Mass of Added Planet</label>
  <select id="masses-list" class="bg-black text-white border border-gray-600">
    <option value="0.000003003">Earth</option>
    <option value="0.0009543">Jupiter</option>
    <option value="1">Sun</option>
    <option value="0.1">Red Dwarf Star</option>
  </select>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  on:click={resetSimulation}>Reset</button>

</section>
<canvas bind:this={canvas} class="w-full h-full"></canvas>

<style>
</style>