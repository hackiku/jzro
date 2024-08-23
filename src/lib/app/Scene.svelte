<!-- src/lib/app/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { ContactShadows, Grid, OrbitControls } from '@threlte/extras';
  import { writable } from 'svelte/store';
  import { selectedModel } from '$lib/stores/modelStore';
  import { isLaunched } from '$lib/stores/launchStore';
  import WING from './models/WING.svelte'
  import Virus from './models/Virus.svelte'
  import Ribs from './models/Ribs.svelte'

  let time = writable(0);
  let modelPosition = { x: -7, y: 2.8, z: -9 };

  useFrame((_, delta) => {
    time.update(n => n + delta);
    if ($isLaunched) {
      modelPosition.y += delta * 5; // Adjust the speed as needed
      if (modelPosition.y > 20) {
        isLaunched.reset();
        modelPosition.y = 2.8;
      }
    }
  });

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
<T.Mesh position={[0, 1.2, -1.75]}>
  <T.SphereGeometry args={[1, 32, 32]} />
  <T.MeshStandardMaterial color="#0059BA" />
</T.Mesh>

<!-- Orbiting satellite -->
<T.Mesh position={orbitPosition}>
  <T.SphereGeometry args={[0.3, 32, 32]} />
  <T.MeshStandardMaterial color="#F85122" />
</T.Mesh>

<!-- Dynamic model loading -->
<svelte:component this={models[$selectedModel]}
  position={[modelPosition.x, modelPosition.y, modelPosition.z]}
  scale={0.2}
  rotation={[0, $time, 0]}
/>