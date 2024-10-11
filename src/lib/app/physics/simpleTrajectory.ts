// src/lib/physics/simpleTrajectory.ts

import { Vector3 } from 'three';

export class SimpleTrajectorySystem {
	private initialPosition: Vector3;
	private initialVelocity: Vector3;
	private gravity: number = 9.8;
	private planetPosition: Vector3;
	private planetRadius: number;

	constructor(planetPosition: Vector3, planetRadius: number) {
		this.planetPosition = planetPosition;
		this.planetRadius = planetRadius;
	}

	startTrajectory(position: Vector3, velocity: Vector3) {
		this.initialPosition = position.clone();
		this.initialVelocity = velocity.clone();
	}

	updatePosition(elapsedTime: number): Vector3 {
		const x = this.initialPosition.x + this.initialVelocity.x * elapsedTime;
		const y = this.initialPosition.y + this.initialVelocity.y * elapsedTime - 0.5 * this.gravity * elapsedTime * elapsedTime;
		const z = this.initialPosition.z + this.initialVelocity.z * elapsedTime;

		const newPosition = new Vector3(x, y, z);

		// Check for collision with the planet
		if (newPosition.distanceTo(this.planetPosition) < this.planetRadius) {
			return this.planetPosition.clone().add(new Vector3(this.planetRadius, 0, 0));
		}

		return newPosition;
	}
}