// src/lib/jzro/orbitalMech.ts

import { Vector3 } from 'three';

const G = 6.67430e-11; // Gravitational constant
const M = 5.972e24;    // Mass of the Earth in kg

interface State {
	position: Vector3;
	velocity: Vector3;
}

export function computeGravitationalForce(position: Vector3, mass: number): Vector3 {
	const r = position.length();
	const forceMagnitude = (G * M * mass) / (r * r);
	const force = position.clone().normalize().multiplyScalar(-forceMagnitude);
	return force;
}

export function rk4(state: State, mass: number, dt: number): State {
	const position = state.position.clone();
	const velocity = state.velocity.clone();

	const k1v = computeGravitationalForce(position, mass).multiplyScalar(dt);
	const k1p = velocity.clone().multiplyScalar(dt);

	const k2v = computeGravitationalForce(position.clone().add(k1p.clone().multiplyScalar(0.5)), mass).multiplyScalar(dt);
	const k2p = velocity.clone().add(k1v.clone().multiplyScalar(0.5)).multiplyScalar(dt);

	const k3v = computeGravitationalForce(position.clone().add(k2p.clone().multiplyScalar(0.5)), mass).multiplyScalar(dt);
	const k3p = velocity.clone().add(k2v.clone().multiplyScalar(0.5)).multiplyScalar(dt);

	const k4v = computeGravitationalForce(position.clone().add(k3p), mass).multiplyScalar(dt);
	const k4p = velocity.clone().add(k3v).multiplyScalar(dt);

	const newVelocity = velocity
		.clone()
		.add(k1v)
		.add(k2v.clone().multiplyScalar(2))
		.add(k3v.clone().multiplyScalar(2))
		.add(k4v)
		.multiplyScalar(1 / 6);

	const newPosition = position
		.clone()
		.add(k1p)
		.add(k2p.clone().multiplyScalar(2))
		.add(k3p.clone().multiplyScalar(2))
		.add(k4p)
		.multiplyScalar(1 / 6);

	return {
		position: newPosition,
		velocity: newVelocity
	};
}
