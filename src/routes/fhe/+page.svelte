<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

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
      gsap.timeline({
          scrollTrigger: {
              trigger: ".animation-container",
              start: "top top",
              end: "bottom top",
              scrub: true,
          }
      })
      .to('.tooltip', { opacity: 0, duration: 1 })
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
  .animation-container {
      position: relative;
      height: 200vh;
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
