<script>
    import { onMount } from 'svelte';
    // import { scrollPosition } from '$stores/scrollStore';
    import { scrollPosition } from '../stores/scrollStore';

    let pathD; // Path data for the SVG
    let height = 0; // Height of the document
    let width = 0; // Width of the viewport
  
    // Function to calculate the path based on scroll position
    function calculatePath(scrollY) {
      const controlPointX = width / 2;
      const controlPointY = (height * scrollY) / 100;
      const endPointX = width / 2;
      const endPointY = height;
  
      return `M ${width},0 Q ${controlPointX},${controlPointY} ${endPointX},${endPointY}`;
    }
  
    onMount(() => {
      // Set initial sizes
      width = window.innerWidth;
      height = document.body.offsetHeight;
  
      // Subscribe to scrollPosition store and update path based on it
      const unsubscribe = scrollPosition.subscribe(($scrollPosition) => {
        pathD = calculatePath($scrollPosition);
      });
  
      // Adjust path on resize
      const handleResize = () => {
        width = window.innerWidth;
        height = document.body.offsetHeight;
        pathD = calculatePath($scrollPosition);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        unsubscribe();
        window.removeEventListener('resize', handleResize);
      };
    });
  
    // Make pathD reactive
    $: pathD = calculatePath($scrollPosition);
  </script>
  
  <svg class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <path d={pathD} stroke="white" stroke-width="2" fill="none"/>
  </svg>