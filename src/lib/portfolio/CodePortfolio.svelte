<script>
  import { codePortfolioData  } from '$lib/portfolio/codePortfolioData.js';
  let portfolioItems = [
    // Sample data for 8 items
    { id: 1, title: 'Project 1', description: 'Description here...', logo: 'path-to-logo', image: 'link-to-image', link: '#' },
    { id: 2, title: 'Project 2', description: 'Description here...', logo: 'path-to-logo', image: 'link-to-image', link: '#' },
    // Add more items as per your requirement
  ];
</script>

<section class="py-8 bg-lighterBg">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each portfolioItems as item}
        <div class="rounded-lg shadow-lg overflow-hidden flex flex-col p-4 space-y-4" style="max-width: 340px;">
          <img src={item.logo} alt="Logo" class="w-12 h-12 object-contain" />
          <div class="flex-grow" style="padding-top: 56.25%; position: relative;">
            <img src={item.image} alt="Portfolio Image" class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover" />
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm">{item.description}</p>
            <a href={item.link} class="text-indigo-500 hover:text-indigo-400 transition duration-300 text-sm self-start mt-2">App →</a>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex justify-center mt-6">
      <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">Show More</button>
    </div>
  </div>
</section>
