// lib/scrollStore.js
import { writable } from 'svelte/store';

// Store for the scroll position
export const scrollPosition = writable(0);

export function updateScrollPosition() {
  const scrollY = window.scrollY;
  const totalHeight = document.body.offsetHeight - window.innerHeight;
  console.log(`Scroll Y: ${scrollY}, Total Height: ${totalHeight}`);

  if (totalHeight <= 0) {
    // Set to 0% or 100% based on your preference
    // 0% if you consider no scroll to be at the start, 100% if at the end
    scrollPosition.set(0); // or scrollPosition.set(100);
  } else {
    const scrollPercentage = (scrollY / totalHeight) * 100;
    scrollPosition.set(scrollPercentage);
  }
}