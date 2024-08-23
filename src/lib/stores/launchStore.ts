// $lib/stores/launchStore.ts

import { writable } from "svelte/store";

export const isLaunched = writable(false);
export const launchDirection = writable({ x: 0, y: 1, z: 0 });
export const launchVelocity = writable(5);
