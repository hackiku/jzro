import { writable, onDestroy } from 'svelte/store';

// Store for the scroll position
export const scrollPosition = writable(0);

// Function to call when component using this store is mounted
export function startTrackingScrollPosition() {
  const updateScrollPosition = () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.offsetHeight - window.innerHeight;
    scrollPosition.set(scrollY / totalHeight * 100);
  };

  window.addEventListener('scroll', updateScrollPosition);

  // Cleanup function to remove the event listener when the component is destroyed
  onDestroy(() => {
    window.removeEventListener('scroll', updateScrollPosition);
  });
}
