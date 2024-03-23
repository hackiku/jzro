<!-- PortfolioItem.svelte -->
<script>
    export let item;
  </script>
  
  <div class="portfolio-item rounded-lg shadow-lg overflow-hidden flex flex-col p-4 space-y-4">
    <img src={item.logo} alt="Logo" class="portfolio-logo w-12 h-12 object-contain" />
    <div class="portfolio-image-wrapper flex-grow">
        <img src={item.image} alt="Portfolio Image" class="portfolio-image w-full h-full object-cover" />
    </div>
    <div class="flex justify-between items-center">
      <p class="portfolio-description text-sm">{item.description}</p>
      <a href={item.link} class="portfolio-link text-indigo-500 hover:text-indigo-400 transition duration-300 text-sm self-start mt-2">App →</a>
    </div>
  </div>
  
  <style>
    .portfolio-item {
      /* Adjust the maximum width to control the size of the card */
      max-width: 340px;
    }
    
    .portfolio-image-wrapper {
      /* This value controls the aspect ratio of the image container */
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
      position: relative;
    }
  
    .portfolio-image {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </style>
  