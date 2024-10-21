<!-- src/lib/chute-repack/repacks/unbody/After.svelte -->

<main class="bg-black text-white">
  <!-- Improved Hero Section -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <video
      id="background-video"
      class="absolute w-full h-full object-cover"
      autoplay
      loop
      muted
      playsinline
      src="https://phasefour.io/wp-content/uploads/2023/06/phasefour-1.mp4"
    ></video>
    <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
    <div class="relative z-10 text-center max-w-4xl px-4">
      <h1 class="text-6xl font-bold mb-6 leading-tight">Revolutionizing Space Propulsion</h1>
      <p class="text-xl mb-8">Phase Four is reshaping the future of satellite mobility with next-generation electric propulsion solutions.</p>
      <a href="#learn-more" class="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">Explore Our Technology</a>
    </div>
  </section>

  <!-- Improved About Section -->
  <section id="learn-more" class="py-24 bg-gradient-to-b from-purple-900 to-black">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12">Pioneering the Future of Space Propulsion</h2>
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-lg leading-relaxed mb-6">
            At Phase Four, we're not just improving space propulsion - we're redefining it. Our revolutionary RF Thruster technology offers:
          </p>
          <ul class="list-disc list-inside space-y-2 mb-6">
            <li>Unparalleled cost-effectiveness</li>
            <li>Mass-manufacturability for rapid deployment</li>
            <li>Miniaturized power electronics for compact integration</li>
            <li>Propellant agnosticism, providing unmatched flexibility</li>
          </ul>
          <p class="text-lg leading-relaxed">
            Since achieving flight heritage in 2021, our Maxwell turn-key propulsion system has become the go-to choice for forward-thinking satellite operators worldwide.
          </p>
        </div>
        <div class="relative">
          <img src="https://phasefour.io/wp-content/uploads/2023/03/P4-Maxwell-Block-2-Render-transparent.png" alt="Phase Four Maxwell Thruster" class="rounded-lg shadow-2xl">
          <div class="absolute -bottom-4 -right-4 bg-blue-500 text-white py-2 px-4 rounded-full text-sm font-semibold">
            Maxwell Block 2 Thruster
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Improved News Section -->
  <section class="py-24 bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12">Latest Breakthroughs</h2>
      <div class="bg-black rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
        <div class="p-8">
          <h3 class="text-2xl font-bold mb-4">
            Phase Four and Redwire Join Forces to Revolutionize Hall Effect Thrusters
          </h3>
          <p class="text-lg mb-6">
            In a groundbreaking collaboration, Phase Four and Redwire are set to develop the next generation of Hall Effect Thrusters. The Valkyrie Thruster promises unparalleled efficiency and reliability, backed by a streamlined production process that will transform the satellite propulsion landscape.
          </p>
          <a
            href="https://www.prnewswire.com/news-releases/phase-four-partners-with-redwire-to-expand-space-propulsion-offerings-and-deliver-hall-effect-thrusters-302191608.html"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
          >
            Read Full Press Release
          </a>
        </div>
      </div>
    </div>
  </section>
</main>