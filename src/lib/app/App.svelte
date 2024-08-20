<!-- $lib/app/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Controls from './Controls.svelte'
</script>

<Canvas>
	<Scene />
</Canvas>

<Controls localVelocity={44}/>

<div class="absolute top-12 left-0 m-10 flex flex-col items-start space-y-2 text-white">
	<h1 class="text-3xl font-bold">Aerospace UX</h1>
	<p>Code & design that makes products fly.</p>
	<!-- <button class="px-4 py-2 bg-[#fe3d00] hover:bg-blue-700 text-white font-bold">Learn More</button> -->
</div>

<div class="description">
	<p>
		<strong>Click and drag</strong> to rotate the camera.
	</p>
	<p>
		<strong>Hover</strong> over the sphere to scale it up.
	</p>
</div>


<style>
  div.description {
    position: absolute;
    bottom: 10px;
    left: 10px;
    /* z-index: 10; */
    color: #fe3d00;
  }

</style>
