// $lib/grav/scrollStore.js
import { writable } from 'svelte/store';

function createScrollStore() {
  let previousScrollY = 0;
  const { subscribe, set } = writable({
    scrollY: 0,
    isScrollingUp: false,
    scrollPercent: 0,
  });

  const updateScroll = () => {
    console.log("Scroll event triggered");
    const currentScrollY = window.scrollY;
    console.log(`Current Scroll Y: ${currentScrollY}`);

    const isScrollingUp = currentScrollY < previousScrollY;
    console.log(`Is Scrolling Up: ${isScrollingUp}`);

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = documentHeight - windowHeight;
    console.log(`Total Scrollable Height: ${totalScrollable}`);

    const scrollPercent = totalScrollable > 0 ? Math.min((currentScrollY / totalScrollable) * 100, 100) : 0;
    console.log(`Scroll Percent: ${scrollPercent.toFixed(2)}%`);

    set({ scrollY: currentScrollY, isScrollingUp, scrollPercent });

    previousScrollY = currentScrollY;
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      console.log("Window loaded, initializing scroll tracking"); // Debug 6: Check if load event works
      updateScroll(); // Initial update to set initial scroll values
    });
    window.addEventListener('scroll', updateScroll, { passive: true });
  }

  return {
    subscribe,
  };
}

export const scrollStore = createScrollStore();
