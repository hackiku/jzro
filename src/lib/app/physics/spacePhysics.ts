// $lib/app/physics/spacePhysics.ts

import { Vector3 } from 'three';

export interface PhysicsObject {
	position: Vector3;
	velocity: Vector3;
	mass: number;
	radius: number;
	isActive: boolean;
}

export class SpacePhysicsSystem {
	private objects: PhysicsObject[] = [];
	private G = 6.674e-6; 

	addObject(object: PhysicsObject) {
		this.objects.push(object);
	}

	update(deltaTime: number) {
		for (let i = 0; i < this.objects.length; i++) {
			if (!this.objects[i].isActive) continue;

			let totalForce = new Vector3(0, 0, 0);

			for (let j = 0; j < this.objects.length; j++) {
				if (i === j || !this.objects[j].isActive) continue;

				const direction = new Vector3().subVectors(this.objects[j].position, this.objects[i].position);
				const distance = direction.length();

				if (distance > this.objects[i].radius + this.objects[j].radius) {
					const forceMagnitude = (this.G * this.objects[i].mass * this.objects[j].mass) / (distance * distance);
					const force = direction.normalize().multiplyScalar(forceMagnitude);
					totalForce.add(force);
				} else {
					this.handleCollision(this.objects[i], this.objects[j]);
				}
			}

			// Update velocity and position
			const acceleration = totalForce.divideScalar(this.objects[i].mass);
			this.objects[i].velocity.add(acceleration.multiplyScalar(deltaTime));
			this.objects[i].position.add(this.objects[i].velocity.clone().multiplyScalar(deltaTime));
		}
	}

	private handleCollision(obj1: PhysicsObject, obj2: PhysicsObject) {
		// Simple elastic collision
		const normal = new Vector3().subVectors(obj1.position, obj2.position).normalize();
		const relativeVelocity = new Vector3().subVectors(obj1.velocity, obj2.velocity);
		const separatingVelocity = relativeVelocity.dot(normal);
		const impulse = -2 * separatingVelocity / (1 / obj1.mass + 1 / obj2.mass);

		obj1.velocity.add(normal.clone().multiplyScalar(impulse / obj1.mass));
		obj2.velocity.add(normal.clone().multiplyScalar(-impulse / obj2.mass));
	}

	setObjectActive(index: number, active: boolean) {
		if (index >= 0 && index < this.objects.length) {
			this.objects[index].isActive = active;
		}
	}

	getDebugInfo(): string {
		return this.objects.map((obj, index) =>
			`Object ${index}: pos (${obj.position.x.toFixed(2)}, ${obj.position.y.toFixed(2)}, ${obj.position.z.toFixed(2)}), ` +
			`vel (${obj.velocity.x.toFixed(2)}, ${obj.velocity.y.toFixed(2)}, ${obj.velocity.z.toFixed(2)}), ` +
			`active: ${obj.isActive}`
		).join('\n');
	}
}