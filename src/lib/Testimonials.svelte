<script>
  import { onMount } from 'svelte';
  import { testimonialData } from '$lib/testimonialData'; // Import your testimonial data and images

  let currentTestimonialIndex = 0;
  const totalTestimonials = testimonialData.length;

  function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
  }

  function previousTestimonial() {
    currentTestimonialIndex = 
      (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
  }
</script>

<section class="flex items-center justify-center py-8 px-4 md:px-6">
  <!-- Left navigation button -->
  <button
    class="p-4"
    on:click={previousTestimonial}
  > 
    <!-- This is a simple left arrow icon -->
    <svg viewBox="0 0 24 24" class="h-8 w-8 fill-current text-white">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </button>
  
  <!-- Testimonial content -->
  <div class="max-w-lg text-center">
    <blockquote class="mb-4">
      "{testimonialData[currentTestimonialIndex].quote}"
    </blockquote>
    <div class="flex items-center justify-center">
      <img
        src={testimonialData[currentTestimonialIndex].image}
        alt={testimonialData[currentTestimonialIndex].name}
        class="h-10 w-10 rounded-full mr-2"
      />
      <cite class="not-italic">
        {testimonialData[currentTestimonialIndex].name} @ {testimonialData[currentTestimonialIndex].company}
      </cite>
    </div>
  </div>

  <!-- Right navigation button -->
  <button
    class="border-none p-4"
    on:click={nextTestimonial}
  >
    <svg viewBox="0 0 24 24" class="h-8 w-8 fill-current"> <!-- This is a simple right arrow icon -->
      <!-- You can replace this SVG with any other icon you prefer -->
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
    </svg>
  </button>
</section>
