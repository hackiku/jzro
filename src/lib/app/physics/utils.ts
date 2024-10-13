// lib/app/physics/utils.ts

import { Vector3 } from 'three';

export function degreesToRadians(degrees: number): number {
	return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number): number {
	return radians * (180 / Math.PI);
}

export function vectorMagnitude(vector: Vector3): number {
	return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
}

export function normalizeVector(vector: Vector3): Vector3 {
	const mag = vectorMagnitude(vector);
	return new Vector3(vector.x / mag, vector.y / mag, vector.z / mag);
}

// more utility functions