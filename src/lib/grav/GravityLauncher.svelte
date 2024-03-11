<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import gsap from 'gsap';
  import Planet from '$lib/Planet.svelte';
  
  let MotionPathPlugin;
  let velocity = 43;
  let trajectoryPath = '';
  let hitTarget = false;

</script>




