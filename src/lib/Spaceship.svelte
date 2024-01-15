<script>
    let origin = { x: 2, y: 10 }; // Starting point
    let velocity = { vx: 2, vy: 1 }; // Initial velocity

    let planet = { x: 50, y: 50, gravity: 100 }; // Planet position and gravity

    function calculateGravityForce(x, y) {
        // Simple inverse-square law for gravity
        let dx = planet.x - x;
        let dy = planet.y - y;
        let distanceSquared = dx * dx + dy * dy;
        return { fx: planet.gravity * dx / distanceSquared, fy: planet.gravity * dy / distanceSquared };
    }

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

<svg viewBox="0 0 100 100" style="border: 0.01px solid black;">
    <path d={calculateTrajectory()} fill="none" stroke="blue"/>
    <circle cx={planet.x} cy={planet.y} r="{planet.gravity/10}" fill="red"/>
</svg>


