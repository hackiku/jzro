<!-- src/lib/app/GravityAttractor.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { useFrame } from '@threlte/core';
  import type { RigidBody } from '@dimforge/rapier3d-compat';

  export let planet: RigidBody;
  export let object: RigidBody;
  export let G = 6.674e-11; // Gravitational constant
  export let planetMass = 5.97e24; // Mass of the planet (Earth-like)
  export let objectMass = 1000; // Mass of the orbiting object

  onMount(() => {
    if (!planet || !object) {
      console.error('Planet or object RigidBody not provided to GravityAttractor');
      return;
    }
  });

  useFrame(() => {
    if (planet && object) {
      const planetPos = planet.translation();
      const objectPos = object.translation();

      const dx = planetPos.x - objectPos.x;
      const dy = planetPos.y - objectPos.y;
      const dz = planetPos.z - objectPos.z;

      const distanceSquared = dx * dx + dy * dy + dz * dz;
      const distance = Math.sqrt(distanceSquared);

      const forceMagnitude = (G * planetMass * objectMass) / distanceSquared;

      const fx = (forceMagnitude * dx) / distance;
      const fy = (forceMagnitude * dy) / distance;
      const fz = (forceMagnitude * dz) / distance;

      object.addForce({ x: fx, y: fy, z: fz }, true);
    }
  });
</script>