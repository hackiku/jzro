// src/lib/stores/launchStore.ts

import { writable } from "svelte/store";

export const isLaunched = writable(false);
export const launchTime = writable(0);
export const launchDirection = writable({ x: 1, y: 0, z: 0 });
export const launchVelocity = writable(1);

export function resetLaunch() {
  isLaunched.set(false);
  launchTime.set(0);
}
