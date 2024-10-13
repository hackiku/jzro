// lib/app/physics/orbitalMechanics/propagator.ts

import { Vector3 } from 'three';
import { calculateJ2Perturbation } from './perturbations';
import { G } from '../constants';

interface State {
	position: Vector3;
	velocity: Vector3;
}

function accelerationDueToGravity(position: Vector3, centralMass: number): Vector3 {
	const r = position.length();
	return position.clone().multiplyScalar(-G * centralMass / Math.pow(r, 3));
}

export function propagateOrbit(initialState: State, duration: number, timestep: number, centralMass: number, planetRadius: number): State[] {
	let currentState = { ...initialState };
	const states: State[] = [currentState];

	for (let t = timestep; t <= duration; t += timestep) {
		const acceleration = accelerationDueToGravity(currentState.position, centralMass)
			.add(calculateJ2Perturbation(currentState.position, planetRadius, centralMass));

		// Simple Euler integration (you might want to use a more accurate method in practice)
		const newVelocity = currentState.velocity.clone().add(acceleration.multiplyScalar(timestep));
		const newPosition = currentState.position.clone().add(currentState.velocity.multiplyScalar(timestep));

		currentState = { position: newPosition, velocity: newVelocity };
		states.push(currentState);
	}

	return states;
}