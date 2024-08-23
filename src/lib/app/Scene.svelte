<!-- src/lib/app/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { ContactShadows, Grid, OrbitControls } from '@threlte/extras';
  import { writable } from 'svelte/store';
  import WING from './models/WING.svelte'
  import Virus from './models/Virus.svelte'
  import Ribs from './models/Ribs.svelte'

  // Define the time variable to control the orbit
  let time = writable(0);

  useFrame((_, delta) => {
    // Update the time variable
    time.update(n => n + delta);
  });

  // Calculate the position of the orbiting sphere based on time
  $: orbitPosition = [
    2 * Math.cos($time) + 0, // X position
    1.2,                    // Y position (constant)
    2 * Math.sin($time) - 1.75  // Z position
  ];
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-10, 10, 10]}
  fov={15}
>
  <OrbitControls
    autoRotate
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

<!-- Virus model -->
<Virus
  position={[3, 1, -1]}
  scale={0.2}
  rotation={[0, $time, 0]}
/>

<!-- Ribs model -->
<Ribs
  position={[-3, 1, -1]}
  scale={0.2}
  rotation={[0, -$time * 0.5, 0]}
/>

