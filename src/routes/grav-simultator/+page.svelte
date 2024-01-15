<script>
    let width, height;
    let origin, planet;
    let velocity = { vx: 2, vy: 1 }; // Initial velocity

    function initialize() {
        width = window.innerWidth;
        height = window.innerHeight;
        origin = { x: width / 2, y: height / 2 }; // Center of the screen
        planet = { x: width / 2, y: height / 2, gravity: 100 };
    }

    onMount(() => {
    initialize();
    window.addEventListener('resize', initialize);
    return () => {
        window.removeEventListener('resize', initialize);
    };
});

    $: path = calculateTrajectory(), planet, origin, width, height; // Recalculate when these dependencies change

    // Vector operations and gravity force calculation functions remain the same

    function calculateTrajectory() {
        let path = `M${origin.x},${origin.y}`;
        let x = origin.x;
        let y = origin.y;

        for (let i = 0; i < 100; i++) { // Arbitrary number of steps
            let force = calculateGravityForce(x, y);
            velocity.vx += force.fx;
            velocity.vy += force.fy;

            x += velocity.vx;
            y += velocity.vy;
            path += ` L${x},${y}`;
        }

        return path;
    }
</script>

<label for="gravity">Gravity: {planet.gravity}</label>
<input id="gravity" type="range" min="0" max="200" bind:value={planet.gravity} on:input={calculateTrajectory} />

<svg viewBox={`0 0 ${width} ${height}`}>
    <path d={calculateTrajectory()} fill="none" stroke="blue" />
    <circle cx={planet.x} cy={planet.y} r="{planet.gravity / 10}" fill="red" />
</svg>
    
<style>
    svg {
        width: 100%;
        height: 100%;
        border: 1px solid green;
    }
</style>