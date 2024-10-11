// src/lib/stores/orbitStore.ts

import { writable } from 'svelte/store';
import { Vector3 } from 'three';

export const orbitPosition = writable(new Vector3());
export const orbitVelocity = writable(new Vector3());
export const orbitStartTime = writable(0);
export const isOrbiting = writable(false);

export function startOrbit(initialPosition: Vector3, initialVelocity: Vector3, startTime: number) {
	orbitPosition.set(initialPosition);
	orbitVelocity.set(initialVelocity);
	orbitStartTime.set(startTime);
	isOrbiting.set(true);
}

export function resetOrbit() {
	isOrbiting.set(false);
	orbitStartTime.set(0);
}