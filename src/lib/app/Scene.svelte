<!-- src/lib/app/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { ContactShadows, Grid, OrbitControls } from '@threlte/extras';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { Vector3 } from 'three';
  import { isLaunched, launchTime, launchDirection, launchVelocity, resetLaunch } from '$lib/stores/launchStore';
  import { orbitPosition, orbitVelocity, isOrbiting, startOrbit, resetOrbit, isPaused } from '$lib/stores/orbitStore';
  import { selectedModel, autoRotate } from '$lib/stores/modelStore';
  import ModelLoader from './models/ModelLoader.svelte';
  import OrbitTrail from './world/OrbitTrail.svelte';
  import { SimpleTrajectorySystem } from '$lib/app/physics/simpleTrajectory';
  import { PLANET_RADIUS, ORBITAL_RADIUS, VELOCITY_FACTOR } from '$lib/app/physics/constants';

  let time = writable(0);
  let orbitTrail;

  const planetPosition = new Vector3(0, 1.2, -1.75);
  const modelInitialPosition = new Vector3(-7, 2.8, -9);

  const trajectorySystem = new SimpleTrajectorySystem(planetPosition);

  orbitPosition.set(modelInitialPosition);

  function updateSatellitePosition(t: number) {
    const speed = 0.5;
    return new Vector3(
      planetPosition.x + ORBITAL_RADIUS * Math.cos(t * speed),
      planetPosition.y,
      planetPosition.z + ORBITAL_RADIUS * Math.sin(t * speed)
    );
  }

  let satellitePosition = updateSatellitePosition(0);

  useFrame((_, delta) => {
    if (!$isPaused) {
      time.update(t => t + delta);
    }

    satellitePosition = updateSatellitePosition($time);

    if ($isLaunched && !$isPaused) {
      const elapsedTime = ($time - $launchTime) / 1000; // Convert to seconds
      const newPosition = trajectorySystem.updatePosition(elapsedTime);
      orbitPosition.set(newPosition);
      if (orbitTrail && orbitTrail.addPoint) {
        orbitTrail.addPoint(newPosition.x, newPosition.y, newPosition.z);
      }
    }
  });

  function handleReset() {
    resetLaunch();
    resetOrbit();
    orbitPosition.set(modelInitialPosition);
    time.set(0);
    if (orbitTrail && orbitTrail.reset) {
      orbitTrail.reset();
    }
  }

  onMount(() => {
    if (!$isLaunched) {
      handleReset();
    }
  });

  $: if (!$isLaunched) {
    handleReset();
  }

  $: {
    if ($isLaunched && !$isOrbiting && !$isPaused) {
      const orbitSpeed = Math.sqrt(PLANET_RADIUS / ORBITAL_RADIUS) * VELOCITY_FACTOR;
      const launchVelocityVector = new Vector3(
        $launchDirection.x * $launchVelocity * orbitSpeed,
        $launchDirection.y * $launchVelocity * orbitSpeed,
        $launchDirection.z * $launchVelocity * orbitSpeed
      );
      startOrbit($orbitPosition, launchVelocityVector, $time);
      trajectorySystem.startTrajectory($orbitPosition, launchVelocityVector);
    }
  }
</script>

<T.PerspectiveCamera makeDefault position={[-22, 10, -20]} fov={15}>
  <OrbitControls autoRotate={false} enableZoom={true} enableDamping autoRotateSpeed={0.5} target.y={1.5} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position={[5, 10, 0]} />
<T.AmbientLight intensity={0.2} />

<Grid 
  position.y={-0.01} 
  cellColor="#6b7280" 
  sectionColor="#6b7280" 
  sectionThickness={1} 
  fadeDistance={220}
  cellSize={2}
  sectionSize={10}
  infiniteGrid={true}
/>

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<!-- Planet -->
<T.Mesh position={[planetPosition.x, planetPosition.y, planetPosition.z]}>
  <T.SphereGeometry args={[PLANET_RADIUS, 32, 32]} />
  <T.MeshStandardMaterial color="#0059BA" />
</T.Mesh>

<!-- Satellite -->
<T.Mesh position={[satellitePosition.x, satellitePosition.y, satellitePosition.z]}>
  <T.SphereGeometry args={[0.3, 32, 32]} />
  <T.MeshStandardMaterial color="#F85122" />
</T.Mesh>

<!-- Launched Object -->
<ModelLoader 
  position={[$orbitPosition.x, $orbitPosition.y, $orbitPosition.z]}
  rotation={[0, $autoRotate ? $time : 0, 0]}
  scale={0.2}
>
  <T.MeshStandardMaterial color="#FFFFFF" opacity={$isLaunched ? 1 : 0.5} transparent={true} />
</ModelLoader>

<OrbitTrail bind:this={orbitTrail} maxPoints={500} fadeOut={true} color="#4169E1" />