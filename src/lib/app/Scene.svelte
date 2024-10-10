<!-- src/lib/app/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { ContactShadows, Grid, OrbitControls } from '@threlte/extras';
  import { writable } from 'svelte/store';
  import { isLaunched, launchDirection, launchVelocity } from '$lib/stores/launchStore';
  import { selectedModel } from '$lib/stores/modelStore';
  import { SpacePhysicsSystem, type PhysicsObject } from './physics/spacePhysics';
  import WING from './models/WING.svelte';
  import Virus from './models/Virus.svelte';
  import Ribs from './models/Ribs.svelte';
  import { Vector3 } from 'three';

  let time = writable(0);
  let debugInfo = '';

  const physicsSystem = new SpacePhysicsSystem();

  // Set up initial positions and velocities
  const planetPosition = new Vector3(0, 1.2, -1.75);
  const modelPosition = new Vector3(-7, 2.8, -9);
  const cubePosition = new Vector3(3, 4, -3);

  // Add objects to the physics system
  physicsSystem.addObject({
    position: planetPosition,
    velocity: new Vector3(0, 0, 0),
    mass: 5000,
    radius: 1,
    isActive: true
  });

  const modelObject: PhysicsObject = {
    position: modelPosition,
    velocity: new Vector3(0, 0, 0),
    mass: 1000,
    radius: 0.2,
    isActive: false
  };
  physicsSystem.addObject(modelObject);

  const cubeObject: PhysicsObject = {
    position: cubePosition,
    velocity: new Vector3(0, 0, -1),
    mass: 500,
    radius: 0.5,
    isActive: true
  };
  physicsSystem.addObject(cubeObject);

  useFrame((_, delta) => {
    time.update(n => n + delta);
    physicsSystem.update(delta);
    debugInfo = physicsSystem.getDebugInfo();
  });

  $: {
    if ($isLaunched) {
      modelObject.velocity.set(
        $launchDirection.x * $launchVelocity,
        $launchDirection.y * $launchVelocity,
        $launchDirection.z * $launchVelocity
      );
      physicsSystem.setObjectActive(1, true);
    }
  }

  $: orbitPosition = [
    2 * Math.cos($time) + 0,
    1.2,
    2 * Math.sin($time) - 1.75
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
<T.Mesh position={planetPosition}>
  <T.SphereGeometry args={[1, 32, 32]} />
  <T.MeshStandardMaterial color="#0059BA" />
</T.Mesh>

<!-- Satellite -->
<T.Mesh position={orbitPosition}>
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

<!-- Cube -->
<T.Mesh position={[cubeObject.position.x, cubeObject.position.y, cubeObject.position.z]}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshStandardMaterial color="#F85122" />
</T.Mesh>

<!-- Debug info -->
<div class="absolute top-0 left-0 text-white text-xs p-2 bg-black bg-opacity-50">
  {debugInfo}
</div>