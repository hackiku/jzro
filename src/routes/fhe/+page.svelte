<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let balls = [
    { id: 1, label: 'Medical records', x: 100, y: 150, size: 'w-16 h-16' },
    { id: 2, label: 'Financials', x: 200, y: 100, size: 'w-12 h-12' },
    { id: 3, label: 'Support chat logs', x: 300, y: 200, size: 'w-14 h-14' },
    { id: 4, label: 'Social media stats', x: 400, y: 150, size: 'w-10 h-10' },
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
      extra: 'FHE: Fully Homomorphic Encryption'
    },
    {
      text: 'GPU owners power the open market and infrastructure to store, encrypt, transfer, and run the models.',
      span: 'GPU owners',
      extra: 'Read Whitepaper'
    },
    {
      text: 'AI developers deploy the very models, with prime quality private data the community keeps safe. No BigCo. required.',
      span: 'AI developers',
      extra: 'Join Community'
    }
  ];

  export let y = 0;
  export let verticalSpacing = '30vh'; // Adjustable vertical spacing
  export let scrollMultiplier = 0.2; // Dummy multiplier for speed vs scroll
  export let jiggleAmount = 10; // Amount for jiggle effect

  $: totalHeight = 1400
  // $: totalHeight = sections.length * parseInt(verticalSpacing) + window.innerHeight;
  $: updateScrollDepth(y, totalHeight);

  onMount(() => {
    animateBalls();
  });

  function updateScrollDepth(y, totalHeight) {
    console.log(`Scroll Depth: ${y}/${totalHeight}`);
  }

  function animateBalls() {
    // Jiggle effect
    balls.forEach(ball => {
      gsap.to(`#ball-${ball.id}`, {
        x: `+=${Math.random() * jiggleAmount - jiggleAmount / 2}`,
        y: `+=${Math.random() * jiggleAmount - jiggleAmount / 2}`,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 1,
      });
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".animation-container",
        start: "top top",
        end: `+=${totalHeight}`,
        scrub: scrollMultiplier,
        pin: true,
      }
    });

    balls.forEach((ball, index) => {
      const delay = index * 0.4; // 40% delay between balls
      tl.to(`#ball-${ball.id}`, {
        backgroundColor: 'blue',
        duration: 1,
        delay,
        onUpdate: () => {
          const lockIcon = document.querySelector(`#ball-${ball.id} .lock-icon`);
          if (gsap.getProperty(`#ball-${ball.id}`, "backgroundColor") === "rgb(0, 0, 255)") {
            gsap.to(lockIcon, { opacity: 1, duration: 1 });
          }
        }
      }, `+=${Math.random()}`);

      tl.to(`#ball-${ball.id} .tooltip`, {
        opacity: 0,
        duration: 1
      }, "<");

      tl.to(`#ball-${ball.id}`, {
        width: '+=20',
        height: '+=20',
        duration: 1,
        stagger: 0.2,
      });
    });

    tl.to('.ball', {
      backgroundColor: 'blue',
      duration: 1
    });

    tl.to('.tooltip', { opacity: 1, duration: 1 }, "<");

    // Lines connecting balls
    gsap.to('.line', {
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: ".animation-container",
        start: "top top",
        end: `+=${totalHeight}`,
        scrub: true,
      }
    });

    // Final stage - change labels and enlarge balls
    tl.to('.ball', {
      width: '+=20',
      height: '+=20',
      duration: 1,
      stagger: 0.2,
      backgroundColor: 'lightblue'
    });

    tl.to('.tooltip', {
      text: (i) => models[i]?.label || '',
      backgroundColor: 'blue',
      opacity: 1,
      duration: 1,
    });
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
    @apply absolute rounded-full bg-white flex justify-center items-center;
  }
  .lock-icon {
    @apply opacity-0;
  }
  .tooltip {
    @apply absolute bg-gray-700 text-white text-sm rounded-md p-2 shadow-lg;
  }
  .line {
    @apply absolute bg-gray-400 opacity-0;
  }
</style>

<svelte:window bind:scrollY={y} />

<!--  debug -->
<p class="fixed top-0 left-0 p-4 bg-gray-900 bg-opacity-60 text-gray-700">
  {y}/{totalHeight}
</p>



<main class="flex w-screen text-2xl">
  <section class="flex-1 p-8 space-y-72">
    {#each sections as { text, span, extra }}
      <div class="flex flex-col items-start justify-between p-20" style="margin-top: {verticalSpacing}">
        <p class="text-2xl mb-4">
          <span class="text-blue-500">{span}</span> {text}
        </p>
        {#if extra}
          {#if extra === 'FHE: Fully Homomorphic Encryption'}
            <div class="text-sm">
              <p class="text-blue-400">FHE</p>
              <p>Fully Homomorphic Encryption</p>
            </div>
          {:else if extra === 'Read Whitepaper'}
            <button class="text-white text-sm px-4 py-2 border border-white rounded-xl">Read Whitepaper</button>
          {:else if extra === 'Join Community'}
            <button class="bg-blue-500 text-white text-sm px-4 py-2 rounded">Join Community</button>
          {/if}
        {/if}
      </div>
    {/each}
  </section>
  <section class="animation-section">
    <div class="animation-container relative">
      {#each balls as ball}
        <div id="ball-{ball.id}" class={`ball ${ball.size}`} style="top: {ball.y}px; left: {ball.x}px;">
          <div class="lock-icon">🔒</div>
          <div class="relative">
            <div class="tooltip" style="left: 50%; transform: translateX(-50%); bottom: 150%;">{ball.label}</div>
          </div>
        </div>
      {/each}
      {#each models as model}
        <div id="model-{model.id}" class="ball w-12 h-12 bg-blue-500" style="top: {model.y}px; left: {model.x}px; opacity: 0;">
          <div class="relative">
            <div class="tooltip" style="left: 50%; transform: translateX(-50%); bottom: 150%;">{model.label}</div>
          </div>
        </div>
      {/each}
      <!-- Add lines connecting the balls -->
      <div class="line" style="top: 175px; left: 125px; height: 50px;"></div>
      <div class="line" style="top: 125px; left: 150px; width: 100px;"></div>
      <div class="line" style="top: 225px; left: 250px; height: 75px;"></div>
    </div>
  </section>
</main>

