<script>
    // You can add props here for dynamic control
    // For example, to change the orbit path or styles based on props
    export let strokeColor = 'white';
    export let strokeWidth = 2;
  </script>
  
  <svg class="absolute top-0 right-0 w-full h-full" viewBox="0 0 100 100" style="pointer-events: none;">
    <!-- Orbit Path -->
    <path d="M 100,0 Q 50,50 0,100" stroke={strokeColor} stroke-width={strokeWidth} fill="none"/>
  </svg>
  