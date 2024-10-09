// $lib/stores/menuStore.ts

import { writable } from 'svelte/store';
export const isMenuOpen = writable(false);
export const activeTab = writable('');
export function toggleMenu() {
	isMenuOpen.update(value => !value);
}
export function setActiveTab(tab: string) {
	activeTab.set(tab);
	// Keep the menu open when a tab is selected
	isMenuOpen.set(true);
}
