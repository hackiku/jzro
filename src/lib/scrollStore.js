// $lib/grav/scrollStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createScrollStore() {
  const { subscribe, set, update } = writable({
    y: 0, // Current scroll position
    lastY: 0, // Previous scroll position to determine direction
    direction: 'none' // Scroll direction: 'up', 'down', 'none'
  });

  if (browser) {
    const handleScroll = () => {
      update(store => {
        const y = window.pageYOffset;
        const direction = y > store.lastY ? 'down' : y < store.lastY ? 'up' : 'none';
        return { ...store, lastY: store.y, y, direction };
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up event listener on destroy
    return {
      subscribe,
      destroy: () => window.removeEventListener('scroll', handleScroll)
    };
  }

  // Fallback for non-browser environment
  return { subscribe };
}

export const scrollStore = createScrollStore();
