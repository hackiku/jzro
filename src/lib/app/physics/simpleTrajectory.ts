// src/lib/physics/simpleTrajectory.ts

import { Vector3 } from 'three';
import { PLANET_RADIUS, ORBITAL_RADIUS } from '$lib/app/physics/constants';

export class SimpleTrajectorySystem {
	private a: number; // Semi-major axis
	private e: number; // Eccentricity
	private planetPosition: Vector3;

	constructor(planetPosition: Vector3) {
		this.planetPosition = planetPosition;
		this.a = 0;
		this.e = 0;
	}

	startTrajectory(position: Vector3, velocity: Vector3) {
		const r = position.distanceTo(this.planetPosition);
		const v = velocity.length();

		// Approximate orbital elements
		this.a = (r + ORBITAL_RADIUS) / 2; // Simple approximation
		this.e = (ORBITAL_RADIUS - r) / (ORBITAL_RADIUS + r); // Simple approximation
	}

	updatePosition(elapsedTime: number): Vector3 {
		const period = 2 * Math.PI * Math.sqrt(this.a * this.a * this.a / PLANET_RADIUS);
		const meanAnomaly = (2 * Math.PI * elapsedTime) / period;

		// Approximating true anomaly with mean anomaly for simplicity
		const trueAnomaly = meanAnomaly;

		const distance = this.a * (1 - this.e * this.e) / (1 + this.e * Math.cos(trueAnomaly));

		const x = this.planetPosition.x + distance * Math.cos(trueAnomaly);
		const z = this.planetPosition.z + distance * Math.sin(trueAnomaly);
		const y = this.planetPosition.y; 

		return new Vector3(x, y, z);
	}
}