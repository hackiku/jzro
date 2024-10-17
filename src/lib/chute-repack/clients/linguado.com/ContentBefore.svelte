<!-- src/lib/chute-repack/clients/phasefour.io/ContentBefore.svelte -->
<main class="bg-black text-white">
  <!-- Hero Section -->
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
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative z-10 text-center">
      <h1 class="text-5xl font-bold mb-4">Changing the Way We Move in Space</h1>
    </div>
  </section>

  <!-- About Section -->
  <section class="py-20 bg-gradient-to-b from-purple-900 to-black">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">ABOUT PHASE FOUR</h2>
      <p class="max-w-3xl mx-auto text-center text-lg leading-relaxed">
        Phase Four is a disruptive provider of next generation electric propulsion (EP) solutions
        for satellites. Phase Four's RF Thruster represents a revolutionary new architecture that
        realizes lower cost, mass-manufacturability, miniaturized power electronics, and propellant
        agnosticism over incumbent technologies, without compromising performance. In 2021 Phase Four's
        Maxwell turn-key propulsion system achieved flight heritage and is now being regularly utilized
        by satellite operators.
      </p>
      <div class="text-center mt-8">
        <a
          href="/about"
          class="inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          Learn More
        </a>
      </div>
    </div>
  </section>

  <!-- News Section -->
  <section class="py-20 bg-black">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        <h3 class="text-2xl font-bold mb-4">
          Phase Four Partners with Redwire to Expand Space Propulsion Offerings and Deliver Hall Effect Thrusters
        </h3>
        <p class="text-lg mb-6">
          Redwire and Phase Four will design and develop a reliable and efficient Hall Effect Thruster (HET),
          called the Valkyrie Thruster, based on an existing design. The highly flexible and streamlined design
          will yield a shorter production schedule enabling reliable, high-volume production.
        </p>
        <a
          href="https://www.prnewswire.com/news-releases/phase-four-partners-with-redwire-to-expand-space-propulsion-offerings-and-deliver-hall-effect-thrusters-302191608.html"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          Read More
        </a>
      </div>
    </div>
  </section>
</main>