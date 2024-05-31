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

  const sections = [
      {
          text: 'Data owners sell smart contracts to access confidential data sets: the ones AI needs to train on to level up',
          span: 'Data owners',
          extra: ''
      },
      {
          text: 'Your data is encrypted on the blockchain and will never be decrypted again. From now on, only AI can use it.',
          span: 'encrypted on the blockchain',
          extra: `<div>
                    <p class="text-blue-400">FHE</p>
                    <p>Fully Homomorphic Encryption</p>
                  </div>`
      },
      {
          text: 'GPU owners power the open market and infrastructure to store, encrypt, transfer, and run the models.',
          span: 'GPU owners',
          extra: '<button class="text-white px-4 py-2 border border-white rounded-xl">Read Whitepaper</button>'
      },
      {
          text: 'AI developers deploy the very models, with prime quality private data the community keeps safe. No BigCo. required.',
          span: 'AI developers',
          extra: '<button class="bg-blue-500 text-white px-4 py-2 rounded">Join Community</button>'
      }
  ];

  export let y = 0;
  export let verticalSpacing = '70vh'; // Adjustable vertical spacing

  $: totalHeight = sections.length * parseInt(verticalSpacing);
  $: updateScrollDepth(y, totalHeight);

  onMount(() => {
      animateBalls();
  });

  function updateScrollDepth(y, totalHeight) {
      console.log(`Scroll Depth: ${y}/${totalHeight}`);
  }

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
      @apply sticky top-0 flex-1 flex justify-center items-center overflow-hidden;
  }
  .animation-container {
      @apply relative w-full h-full;
  }
  .ball {
      @apply absolute rounded-full w-12 h-12 bg-white flex justify-center items-center overflow-hidden;
  }
  .lock-icon {
      @apply opacity-0;
  }
</style>

<svelte:window bind:scrollY={y} />

<main class="flex w-screen text-2xl">
  <section class="flex-1 p-8" style="scroll-padding-top: 70vh;">
    {#each sections as { text, span, extra }}
      <div class="flex flex-col items-center justify-between p-20" style="margin-top: {verticalSpacing}">
        <p class="text-2xl">
          <span class="text-blue-500">{span}</span> {text}
        </p>
        {#if extra}
          <div innerHTML={extra}></div>
        {/if}
      </div>
    {/each}
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
  <p class="fixed top-0 left-0 p-4 bg-gray-700 text-white">{y}/{totalHeight}</p>
</main>
