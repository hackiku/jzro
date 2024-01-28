<!-- ./orbit-test -->
<script>
  import Planet from '$lib/Planet.svelte';
  import Orbit from '$lib/Orbit.svelte';
</script>

<Orbit />

<div class="planet mt-28" style="position: relative;">
  <!-- <Planet label="Earth" color="blue" initialGravity={10} /> -->
</div>
<!-- Add more Planet components as needed -->

<style>
  .planet {
    /* Adjust styles as needed */
  }
</style>
