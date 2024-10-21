<!-- src/lib/chute-repack/repacks/unbody/Section4.svelte -->

<script>
  // Import statements would go here
</script>

<section class="relative" style="width:100%;display:flex;flex-direction:column;align-items:center;gap:3rem;padding-bottom:3rem">
  <div class="text-center" style="width:100%;display:flex;flex-direction:column;align-items:center;gap:1rem">
    <h2 class="text-3xl pt-3 font-semibold text-center">
      What people are saying about Unbody
    </h2>
    <p class="text-paraghraph_gray text-base leading-6 text-center max-w-2xl">
      We are proud to have received positive feedback from our users. Here are some of the reviews we have received.
    </p>
    <div class="mt-5">
      <a href="/docs/get-started" class="transition-all duration-300 hover:scale-105 hover:shadow-lg p-0.5 cursor-pointer rounded-full w-56 h-12 text-base self-center flex flex-row items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white md:flex">
        <span class="pl-4">Get started</span>
        <div class="transition-all duration-300 w-11 h-11 rounded-full flex justify-center items-center bg-gray-100 text-gray-800">
          <!-- Add arrow icon here -->
        </div>
      </a>
    </div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 mb-28">
    <!-- Add testimonial cards here -->
    <!-- Example of one testimonial card: -->
    <div class="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-[340px]">
      <div class="flex p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large justify-between mb-2">
        <div class="flex gap-5">
          <img src="/images/reviews/arya.png" alt="Arya Mazahery" class="w-10 h-10 rounded-full" />
          <div class="flex flex-col gap-1 items-start justify-center">
            <h4 class="text-small font-semibold leading-none text-default-600">Arya Mazahery</h4>
            <h5 class="text-small tracking-tight text-default-400">Co-founder & CEO @ PanocularAI</h5>
          </div>
        </div>
      </div>
      <div class="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-3 py-0 text-small text-default-400">
        "Unbody is a creative product for the current complex AI solutions. The comprehensive set of feature makes it a unique product on the market in its domain."
      </div>
      <div class="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large gap-3">
        <div class="flex gap-1">P</div>
        <div class="flex gap-1">Product Hunt, April 25</div>
      </div>
    </div>
    <!-- Repeat for other testimonials -->
  </div>
</section>