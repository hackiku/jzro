// $lib/jzro/launchStore.ts

import { writable } from 'svelte/store';

function createLaunchStore() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		toggle: () => update(n => !n),
		reset: () => set(false)
	};
}

export const isLaunched = createLaunchStore();