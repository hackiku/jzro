<script>
    import { onMount } from 'svelte';

    let gravityValues = [];

    // Function to calculate the trajectory of the curved lines based on gravity values
    function calculateTrajectory(gravityValues) {
        // Logic to calculate the trajectory based on gravity values
        // ...
    }

    onMount(() => {
        // Fetch gravity values from Planet components on the UI
        // ...
        // Pass the gravity values to the calculateTrajectory function
        calculateTrajectory(gravityValues);
    });
</script>

<svg>
    <!-- Curved lines that change trajectory based on gravity values -->
    <!-- Use the calculated trajectory to draw the curved lines -->
</svg>
