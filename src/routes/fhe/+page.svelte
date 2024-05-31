<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let balls = [
      { id: 1, label: 'Medical records', x: 100, y: 150 },
      { id: 2, label: 'Financials', x: 200, y: 100 },
      { id: 3, label: 'Support chat logs', x: 300, y: 200 },
      { id: 4, label: 'Social media stats', x: 400, y: 150 },
  ];

  let models = [
      { id: 1, label: 'Drug interaction ML', x: 100, y: 350 },
      { id: 2, label: 'Legal rooboadvisor', x: 200, y: 300 },
      { id: 3, label: 'Chatbot LLM', x: 300, y: 400 },
      { id: 4, label: 'Patient intake LLM', x: 400, y: 350 },
  ];

  onMount(() => {
      animateBalls();
  });

  function animateBalls() {
      // Initial giggling animation
      balls.forEach(ball => {
          gsap.to(`#ball-${ball.id}`, {
              x: `+=${Math.random() * 20 - 10}`,
              y: `+=${Math.random() * 20 - 10}`,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
              duration: 2,
          });
      });

      // Scroll-based animation
      let tl = gsap.timeline({
          scrollTrigger: {
              trigger: ".animation-container",
              start: "top top",
              end: "bottom top",
              scrub: true,
              pin: true,
          }
      });

      tl.to('.tooltip', { opacity: 0, duration: 1 })
        .to('.ball', { backgroundColor: 'blue', duration: 1 }, "<")
        .to('.lock-icon', { opacity: 1, duration: 1 }, "<")
        .to('.ball', {
          width: '+=20',
          height: '+=20',
          duration: 1,
          stagger: 0.2,
      })
      .to('.tooltip', { opacity: 1, duration: 1 }, "<");
  }
</script>

<style>
  .animation-section {
      position: sticky;
      top: 0;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }
  .animation-container {
      position: relative;
      width: 100%;
      height: 100%;
  }
  .ball {
      position: absolute;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }
  .lock-icon {
      opacity: 0;
  }
</style>

<main class="flex h-screen w-screen text-2xl">
  <section class="flex-1 overflow-y-auto p-8 space-y-72">
    <div class="flex flex-col items-center justify-between mt-[40vh]">
        <p class="text-xl">
              <span class="text-blue-400">Data owners</span> sell smart contracts to access confidential data sets: the ones AI needs to train on to level up
          </p>
      </div>
      <div class="flex flex-ro2 items-center justify-between">
          <p class="text-xl">
              Your data is <span class="text-blue-400">encrypted on the blockchain</span> and will never be decrypted again. From now on, only AI can use it.
          </p>
          <div>
              <p class="text-blue-400">FHE</p>
              <p>Fully Homomorphic Encryption</p>
          </div>
      </div>
      <div class="flex flex-col items-start justify-between">
          <p class="text-xl">
              <span class="text-blue-400">GPU owners</span> power the open market and infrastructure to store, encrypt, transfer, and run the models.
          </p>
          <button class="text-white px-4 py-2 border border-white rounded-xl">Read Whitepaper</button>
      </div>
      <div class="flex items-center justify-between">
          <p class="text-xl">
              <span class="text-blue-400">AI developers</span> deploy the very models, with prime quality private data the community keeps safe. No BigCo. required.
          </p>
          <button class="bg-blue-500 text-white px-4 py-2 rounded">Join Community</button>
      </div>
  </section>
  <section class="animation-section">
      <div class="animation-container">
          {#each balls as ball}
              <div id="ball-{ball.id}" class="ball" style="top: {ball.y}px; left: {ball.x}px;">
                  <div class="lock-icon">🔒</div>
                  <div class="tooltip">{ball.label}</div>
              </div>
          {/each}
          {#each models as model}
              <div id="model-{model.id}" class="ball" style="top: {model.y}px; left: {model.x}px;">
                  <div class="tooltip">{model.label}</div>
              </div>
          {/each}
      </div>
  </section>
</main>
