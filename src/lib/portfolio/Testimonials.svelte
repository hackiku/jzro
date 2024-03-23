<!-- lib/portfolio/Testimonials.svelte -->
<script>
  import { onMount } from 'svelte';
  import { testimonialData } from '$lib/portfolio/testimonialData';

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

<div class="flex items-center justify-center">
  <!-- Left navigation button -->
  <button class="p-2" on:click={previousTestimonial}> 
    <svg viewBox="0 0 24 24" class="h-8 w-8 fill-current text-white">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </button>
  
  <!-- Testimonial content -->
  <div class="max-w-lg px-2 text-center">
    <blockquote class="text-lg mb-4">
      "{testimonialData[currentTestimonialIndex].quote}"
    </blockquote>
    <div class="flex items-center justify-center">
      <img
        src={testimonialData[currentTestimonialIndex].image}
        alt={testimonialData[currentTestimonialIndex].name}
        class="h-10 w-10 rounded-full mr-2"
      />
      <div class="flex flex-col items-start">
        <span class="text-md font-bold">
          {testimonialData[currentTestimonialIndex].name}
        </span>
        <span class="text-sm">
          {testimonialData[currentTestimonialIndex].role},
          {testimonialData[currentTestimonialIndex].company}
        </span>
      </div>
    </div>
  </div>

  <!-- Right navigation button -->
  <button class="p-2" on:click={nextTestimonial}>
    <svg viewBox="0 0 24 24" class="h-8 w-8 fill-current">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
    </svg>
  </button>
</div>
