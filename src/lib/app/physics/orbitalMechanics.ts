// lib/app/physics/orbitalMechanics.ts

import { Vector3 } from 'three';

const G = 6.67430e-11; // Gravitational constant

export class OrbitalBody {
	position: Vector3;
	velocity: Vector3;
	mass: number;

	constructor(position: Vector3, velocity: Vector3, mass: number) {
		this.position = position;
		this.velocity = velocity;
		this.mass = mass;
	}

	updatePosition(deltaTime: number) {
		this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
	}

	updateVelocity(acceleration: Vector3, deltaTime: number) {
		this.velocity.add(acceleration.clone().multiplyScalar(deltaTime));
	}
}

export function calculateGravitationalAcceleration(body: OrbitalBody, centralBody: OrbitalBody): Vector3 {
	const r = centralBody.position.clone().sub(body.position);
	const rSquared = r.lengthSq();
	const forceMagnitude = G * centralBody.mass / rSquared;
	return r.normalize().multiplyScalar(forceMagnitude);
}

export function simulateOrbit(body: OrbitalBody, centralBody: OrbitalBody, duration: number, timestep: number): Vector3[] {
	const positions: Vector3[] = [];
	let time = 0;

	while (time < duration) {
		positions.push(body.position.clone());

		const acceleration = calculateGravitationalAcceleration(body, centralBody);
		body.updateVelocity(acceleration, timestep);
		body.updatePosition(timestep);

		time += timestep;
	}

	return positions;
}