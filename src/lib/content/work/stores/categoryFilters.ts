// src/lib/content/work/stores/categoryFilters.ts
import { writable } from 'svelte/store';

export const selectedCategories = writable<Set<string>>(new Set());

export function toggleCategory(category: string) {
	selectedCategories.update(selected => {
		const newSelected = new Set(selected);
		if (newSelected.has(category)) {
			newSelected.delete(category);
		} else {
			newSelected.add(category);
		}
		return newSelected;
	});
}