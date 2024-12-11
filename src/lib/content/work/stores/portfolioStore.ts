// src/lib/content/work/stores/portfolioStore.ts
import { writable } from 'svelte/store';

export type PortfolioCategory = 'Product' | 'Writing' | 'Aerospace' | 'Dev' | 'All';

interface PortfolioState {
	selectedCategory: PortfolioCategory;
	isFixed: boolean;
	scrollY: number;
}

function createPortfolioStore() {
	const { subscribe, update } = writable<PortfolioState>({
		selectedCategory: 'All',
		isFixed: false,
		scrollY: 0
	});

	return {
		subscribe,
		setCategory: (category: PortfolioCategory) =>
			update(state => ({ ...state, selectedCategory: category })),
		updateScroll: (y: number) =>
			update(state => ({
				...state,
				scrollY: y,
				isFixed: y > 300 // Adjust this value based on when you want it to stick
			}))
	};
}

export const portfolioStore = createPortfolioStore();