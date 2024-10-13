<!-- src/lib/app/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { ContactShadows, Grid, OrbitControls } from '@threlte/extras';
  import { writable } from 'svelte/store';
  import { isLaunched, launchTime, launchDirection, launchVelocity, resetLaunch } from '$lib/stores/launchStore';
  import { orbitPosition, orbitVelocity, orbitStartTime, isOrbiting, startOrbit, resetOrbit, isPaused } from '$lib/stores/orbitStore';
  import { Vector3 } from 'three';

	import ModelLoader from './models/ModelLoader.svelte';
  import OrbitTrail from './world/OrbitTrail.svelte';


  let time = writable(0);
  let pausedTime = 0;

	let orbitTrail;

  // Set up initial positions
  const planetPosition = new Vector3(0, 1.2, -1.75);
  const modelInitialPosition = new Vector3(-7, 2.8, -9);

  // Initialize orbit position with the initial model position
  orbitPosition.set(modelInitialPosition);

  function updateOrbitPosition(elapsedTime: number) {
    const radius = 10;
    const speed = 0.5;
    const height = 5;
    
    const x = planetPosition.x + radius * Math.cos(elapsedTime * speed);
    const y = planetPosition.y + height * Math.sin(elapsedTime * speed * 2);
    const z = planetPosition.z + radius * Math.sin(elapsedTime * speed);

    return new Vector3(x, y, z);
  }

  useFrame((_, delta) => {
    if (!$isPaused) {
      time.update(n => n + delta);
      if ($isOrbiting) {
        const elapsedTime = $time - $orbitStartTime;
        const newPosition = updateOrbitPosition(elapsedTime);
        orbitPosition.set(newPosition);
      }
    } else {
      pausedTime += delta;
    }
  });

  $: {
    if ($isLaunched && !$isOrbiting && !$isPaused) {
      const launchVelocityVector = new Vector3(
        $launchDirection.x * $launchVelocity,
        $launchDirection.y * $launchVelocity,
        $launchDirection.z * $launchVelocity
      );
      startOrbit(modelInitialPosition, launchVelocityVector, $time);
    }
  }

  $: satellitePosition = [
    2 * Math.cos(($isPaused ? pausedTime : $time) * 0.5) + planetPosition.x,
    planetPosition.y,
    2 * Math.sin(($isPaused ? pausedTime : $time) * 0.5) + planetPosition.z
  ];

  // Reset function
  function handleReset() {
    resetLaunch();
    resetOrbit();
    orbitPosition.set(modelInitialPosition);
    time.set(0);
    pausedTime = 0;
  }

  // Subscribe to isLaunched to trigger reset when it becomes false
  $: if (!$isLaunched) {
    handleReset();
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
  <T.SphereGeometry args={[1, 32, 32]} />
  <T.MeshStandardMaterial color="#0059BA" />
</T.Mesh>

<!-- Satellite -->
<T.Mesh position={satellitePosition}>
  <T.SphereGeometry args={[0.3, 32, 32]} />
  <T.MeshStandardMaterial color="#F85122" />
</T.Mesh>

<!-- Model loading -->
<ModelLoader 
  position={[$orbitPosition.x, $orbitPosition.y, $orbitPosition.z]}
  scale={0.2}
  rotation={[0, $isOrbiting && !$isPaused ? $time : 0, 0]}
>
  <T.MeshStandardMaterial color="#FFFFFF" opacity={$isOrbiting ? 1 : 0.5} transparent={true} />
</ModelLoader>