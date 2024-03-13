// $lib/grav/scrollStore.js
import { writable } from 'svelte/store';

function createScrollDirectionStore() {
  const { subscribe, set } = writable(false); // Initially, not scrolling up

  let lastScrollY;
  let update = () => {};

  // We define a start function that sets up the scroll listener
  // This function should be called on the first subscription to the store
  function start() {
    lastScrollY = window.scrollY;

    update = () => {
      const scrollY = window.scrollY;
      const isScrollingUp = scrollY < lastScrollY;
      set(isScrollingUp);
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', update, { passive: true });
  }

  function stop() {
    window.removeEventListener('scroll', update);
  }

  // Customized subscribe function to handle starting and stopping the listener
  return {
    subscribe(run) {
      // When the first subscriber adds, we start the listener
      if (!lastScrollY) start();

      // Run the subscriber function immediately with the current value
      run(false);

      const unsubscribe = subscribe(run);
      return () => {
        unsubscribe();
        // If there are no more subscribers, we can stop the listener
        stop();
      };
    }
  };
}

export const scrollDirection = createScrollDirectionStore();
