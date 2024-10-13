// lib/app/physics/orbitalMechanics/keplerian.ts

import { Vector3 } from 'three';
import { G } from '../constants';

export interface OrbitalElements {
	semiMajorAxis: number;
	eccentricity: number;
	inclination: number;
	longitudeOfAscendingNode: number;
	argumentOfPeriapsis: number;
	trueAnomaly: number;
}

export function calculateOrbitalPeriod(semiMajorAxis: number, centralMass: number): number {
	return 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / (G * centralMass));
}

export function calculatePositionFromElements(elements: OrbitalElements): Vector3 {
	// This is a simplified calculation and doesn't account for all orbital elements
	const { semiMajorAxis, eccentricity, trueAnomaly } = elements;
	const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(trueAnomaly));

	return new Vector3(
		r * Math.cos(trueAnomaly),
		r * Math.sin(trueAnomaly),
		0 // Assuming orbit is in the x-y plane for simplicity
	);
}

export function calculateVelocityFromElements(elements: OrbitalElements, centralMass: number): Vector3 {
	// This is a simplified calculation
	const { semiMajorAxis, eccentricity, trueAnomaly } = elements;
	const p = semiMajorAxis * (1 - eccentricity * eccentricity);
	const h = Math.sqrt(G * centralMass * p);

	return new Vector3(
		-h / p * Math.sin(trueAnomaly),
		h / p * (eccentricity + Math.cos(trueAnomaly)),
		0 // Assuming orbit is in the x-y plane for simplicity
	);
}