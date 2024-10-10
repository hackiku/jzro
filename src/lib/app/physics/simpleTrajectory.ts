// src/lib/app/physics/simpleTrajectory.ts

import { Vector3 } from 'three';

interface TrajectoryObject {
	position: Vector3;
	velocity: Vector3;
	radius: number;
	isLaunched: boolean;
}

export class SimpleTrajectorySystem {
	private planet: { position: Vector3; radius: number };
	private objects: TrajectoryObject[] = [];
	private initialPosition: Vector3;
	private time: number = 0;

	setPlanet(position: Vector3, radius: number) {
		this.planet = { position, radius };
	}

	addObject(position: Vector3, radius: number): TrajectoryObject {
		const object: TrajectoryObject = {
			position: position.clone(),
			velocity: new Vector3(),
			radius,
			isLaunched: false
		};
		this.objects.push(object);
		this.initialPosition = position.clone();
		return object;
	}

	launchObject(object: TrajectoryObject, velocity: Vector3) {
		object.velocity.copy(velocity);
		object.isLaunched = true;
		this.time = 0;
	}

	update(deltaTime: number) {
		this.time += deltaTime;
		for (const object of this.objects) {
			if (!object.isLaunched) continue;

			// Create a parabolic trajectory
			const t = this.time * 0.5; // Adjust this multiplier to change the speed of the orbit
			const radius = 10; // Adjust this to change the size of the orbit
			const height = 5; // Adjust this to change the height of the orbit

			object.position.x = this.initialPosition.x + radius * Math.cos(t);
			object.position.y = this.initialPosition.y + height * Math.sin(t * 2);
			object.position.z = this.initialPosition.z + radius * Math.sin(t);

			// Check for collision with the planet
			const distanceToCenter = object.position.distanceTo(this.planet.position);
			if (distanceToCenter < this.planet.radius + object.radius) {
				object.isLaunched = false;
			}
		}
	}

	getDebugInfo(): string {
		return this.objects.map((obj, index) =>
			`Object ${index}: pos (${obj.position.x.toFixed(2)}, ${obj.position.y.toFixed(2)}, ${obj.position.z.toFixed(2)}), ` +
			`vel (${obj.velocity.x.toFixed(2)}, ${obj.velocity.y.toFixed(2)}, ${obj.velocity.z.toFixed(2)}), ` +
			`launched: ${obj.isLaunched}`
		).join('\n');
	}
}