<!-- src/lib/chute-repack/repacks/unbody/Section1.svelte -->

<script>
  // Import statements would go here
</script>

<div class="md:grid md:grid-cols-12 md:items-center md:justify-center" style="height:calc(100vh - var(--nextra-navbar-height))">
  <div class="md:col-span-5">
    <div class="text-balance mb-4 md:mb-0">
      <div class="text-4xl md:text-5xl text-left md:tracking-[0.96px] tracking-[0.8px] md:leading-[115%] leading-[130%] font-semibold py-8 md:py-0 flex flex-col">
        <span>Any Data,</span>
        <span>Any <span class="Hero_gradientText__KaLro">AI</span>,</span>
        <span><span class="Hero_gradientText__KaLro">One</span> API,</span>
        <span><span class="Hero_gradientText__KaLro">One</span> Line of Code</span>
      </div>
      <p class="text-gray-600 text-base hidden md:block py-6 max-w-lg">
        AI is just a tech, the value is in data. Applying AI to your data is complex and expensive. Unbody simplifies entire AI development pipeline with a single API, the only API you need to build AI-Native Apps.
      </p>
      <div class="md:flex w-full justify-center md:justify-start">
        <div class="flex space-x-4">
          <a href="/docs/get-started" class="transition-all duration-300 hover:scale-105 hover:shadow-lg p-0.5 cursor-pointer rounded-full w-56 h-12 text-base self-center flex flex-row items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <span class="pl-4">Get started</span>
            <div class="w-11 h-11 rounded-full flex justify-center items-center bg-gray-100 text-gray-800">
              <!-- Arrow icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.13782 4.15002C7.33785 3.94999 7.66215 3.94999 7.86218 4.15002L10.85 7.13782C10.946 7.23388 11 7.36416 11 7.5C11 7.63584 10.946 7.76612 10.85 7.86218L7.86218 10.85C7.66215 11.05 7.33785 11.05 7.13782 10.85C6.9378 10.65 6.9378 10.3257 7.13782 10.1256L9.25126 8.01219H4.5122C4.22932 8.01219 4 7.78288 4 7.5C4 7.21712 4.22932 6.9878 4.5122 6.9878H9.25126L7.13782 4.87437C6.9378 4.67435 6.9378 4.35004 7.13782 4.15002Z" fill="black"/>
              </svg>
            </div>
          </a>
          <a href="/demo" class="transition-all duration-300 hover:scale-105 hover:shadow-lg p-0.5 cursor-pointer rounded-full w-56 h-12 text-base self-center flex flex-row items-center justify-between border-neutral-500 bg-zinc-100 shadow-lg shadow-indigo-100/20 hidden md:flex">
            <span class="pl-4">Try live demo</span>
            <div class="w-11 h-11 rounded-full flex justify-center items-center bg-gray-100 text-gray-100">
              <!-- Arrow icon (same as above) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.13782 4.15002C7.33785 3.94999 7.66215 3.94999 7.86218 4.15002L10.85 7.13782C10.946 7.23388 11 7.36416 11 7.5C11 7.63584 10.946 7.76612 10.85 7.86218L7.86218 10.85C7.66215 11.05 7.33785 11.05 7.13782 10.85C6.9378 10.65 6.9378 10.3257 7.13782 10.1256L9.25126 8.01219H4.5122C4.22932 8.01219 4 7.78288 4 7.5C4 7.21712 4.22932 6.9878 4.5122 6.9878H9.25126L7.13782 4.87437C6.9378 4.67435 6.9378 4.35004 7.13782 4.15002Z" fill="black"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <div class="flex flex-col md:!flex-row md:col-start-6 md:col-end-13 items-center">
    <!-- Placeholder for the complex scrolling icons -->
    <div class="w-full h-[80vh] bg-gray-200 rounded-xl flex items-center justify-center">
      <p class="text-gray-500">Scrolling Icons Placeholder</p>
    </div>
    
    <!-- Placeholder for the code snippet -->
    <div class="w-full mt-4 md:mt-0 md:ml-4 bg-gray-800 rounded-xl p-4 text-white">
      <pre class="text-sm">
unbody
  .textDocuments
  .search.find(...)
  .groupBy(...)
  .generate
      </pre>
    </div>
  </div>
</div>

<style>
  .Hero_gradientText__KaLro {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500;
  }
</style>