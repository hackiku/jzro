<script>
  import Testimonials from "$lib/Testimonials.svelte";
  let phi = 1.61803399 // golden ratio
  let assetWidth = 18
  let assetHeight = assetWidth / phi
</script>


<!-- copywriting -->
<section class="py-8 px-8 md:px-8 bg-lighterBg">
  <div class="flex flex-wrap items-center max-w-xl mx-auto mt-8">
    <div class="w-full md:w-1/2 relative">
      <svg width="{assetWidth}em" height="{assetHeight}em" class="mx-auto mb-4">
        <rect x="0" y="0" width="100%" height="100%" rx="20" ry="20" fill="#141414" />
      </svg>
    </div>
    <div class="w-full md:w-2/5">
      <h5 class="mb-3">Portfolio</h5>
    </div>  
  </div>
</section>    

