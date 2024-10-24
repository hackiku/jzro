// src/lib/features/work/stores/portfolioStore.ts
import { writable, derived } from 'svelte/store';
import type { Project } from '../data/types';

export type PortfolioCategory = 'Product' | 'Writing' | 'Aerospace' | 'Dev' | 'All';

interface PortfolioState {
	selectedCategory: PortfolioCategory;
	isFixed: boolean;
	scrollY: number;
}

function createPortfolioStore() {
	const { subscribe, set, update } = writable<PortfolioState>({
		selectedCategory: 'All',
		isFixed: false,
		scrollY: 0
	});

	return {
		subscribe,
		setCategory: (category: PortfolioCategory) =>
			update(state => ({ ...state, selectedCategory: category })),
		updateScroll: (y: number) =>
			update(state => ({ ...state, scrollY: y, isFixed: y > 200 }))
	};
}

export const portfolioStore = createPortfolioStore();

