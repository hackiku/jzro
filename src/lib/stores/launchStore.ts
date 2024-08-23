// $lib/stores/launchStore.ts

import { writable } from 'svelte/store';

function createLaunchStore() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		launch: () => set(true),
		reset: () => set(false)
	};
}

export const isLaunched = createLaunchStore();