<!-- src/lib/app/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { ContactShadows, Grid, OrbitControls } from '@threlte/extras';
  import { writable } from 'svelte/store';
  import { isLaunched, launchDirection, launchVelocity } from '$lib/stores/launchStore';
  import { selectedModel } from '$lib/stores/modelStore';
  import { SimpleTrajectorySystem } from './physics/simpleTrajectory';
  import WING from './models/WING.svelte';
  import Virus from './models/Virus.svelte';
  import Ribs from './models/Ribs.svelte';
  import { Vector3 } from 'three';

  let time = writable(0);
  let debugInfo = '';

  const trajectorySystem = new SimpleTrajectorySystem();

  // Set up initial positions
  const planetPosition = new Vector3(0, 1.2, -1.75);
  const modelPosition = new Vector3(-7, 2.8, -9);

  // Add objects to the trajectory system
  trajectorySystem.setPlanet(planetPosition, 1);
  const modelObject = trajectorySystem.addObject(modelPosition, 0.2);

  useFrame((_, delta) => {
    time.update(n => n + delta);
    if ($isLaunched) {
      trajectorySystem.update(delta);
      debugInfo = trajectorySystem.getDebugInfo();
    }
  });

  $: {
    if ($isLaunched) {
      const launchVelocityVector = new Vector3(
        $launchDirection.x * $launchVelocity,
        $launchDirection.y * $launchVelocity,
        $launchDirection.z * $launchVelocity
      );
      trajectorySystem.launchObject(modelObject, launchVelocityVector);
    }
  }

  $: satellitePosition = [
    2 * Math.cos($time * 0.5) + planetPosition.x,
    planetPosition.y,
    2 * Math.sin($time * 0.5) + planetPosition.z
  ];

  const models = {
    WING,
    Virus,
    Ribs
  };
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-22, 10, -20]}
  fov={15}
>
  <OrbitControls
    autoRotate={false}
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.5}
    target.y={1.5}
  />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position={[5, 10, 0]} />
<T.AmbientLight intensity={0.2} />

<Grid position.y={-0.001} cellColor="#ffffff" sectionColor="#ffffff" sectionThickness={0} fadeDistance={75} cellSize={2} />

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<!-- Planet -->
<T.Mesh position={[planetPosition.x, planetPosition.y, planetPosition.z]}>
  <T.SphereGeometry args={[1, 32, 32]} />
  <T.MeshStandardMaterial color="#0059BA" />
</T.Mesh>

<!-- Satellite -->
<T.Mesh position={satellitePosition}>
  <T.SphereGeometry args={[0.3, 32, 32]} />
  <T.MeshStandardMaterial color="#F85122" />
</T.Mesh>

<!-- Model loading -->
<svelte:component this={models[$selectedModel]}
  position={[modelObject.position.x, modelObject.position.y, modelObject.position.z]}
  scale={0.2}
  rotation={[0, $isLaunched ? 0 : $time, 0]}
>
  <T.MeshStandardMaterial color="#FFFFFF" opacity={$isLaunched ? 1 : 0.5} transparent={true} />
</svelte:component>

<!-- Debug info -->
<div class="absolute top-0 left-0 text-white text-xs p-2 bg-black bg-opacity-50">
  {debugInfo}
</div>