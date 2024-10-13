<!-- src/lib/app/world/OrbitTrail.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { LineBasicMaterial, BufferGeometry, Float32BufferAttribute, Color } from 'three';
  import { writable, derived } from 'svelte/store';

  export let maxPoints = 1000;
  export let fadeOut = true;
  export let color = "#FFFFFF";

  const points = writable([]);
  const geometry = derived(points, $points => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute($points.flat(), 3));
    return geometry;
  });

  export function addPoint(x: number, y: number, z: number) {
    points.update(p => {
      if (p.length >= maxPoints) p.shift();
      return [...p, [x, y, z]];
    });
  }

  export function reset() {
    points.set([]);
  }

  $: material = new LineBasicMaterial({ color: new Color(color), vertexColors: fadeOut });
</script>

<T.Line geometry={$geometry} {material} />