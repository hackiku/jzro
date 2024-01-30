import { writable } from 'svelte/store';

// Store for the scroll position
export const scrollPosition = writable(0);

// Function to update the scroll position
export function updateScrollPosition() {
  const scrollY = window.scrollY;
  const totalHeight = document.body.offsetHeight - window.innerHeight;
  scrollPosition.set(scrollY / totalHeight * 100);
}
