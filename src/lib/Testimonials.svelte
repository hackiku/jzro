<script>
  import { writable } from 'svelte/store';

  const testimonials = {
    writers: [
      { 
        name: 'Adam Altman', 
        text: 'I might be drawing weird sketches on LinkedIn to catch clients, but I know a good wireframing product when I see one. Pipewriter is great.', 
        role: 'Copywriter' 
      },
      // ... other testimonials
    ],
    clients: [
      // ... client testimonials
    ]
  };

  const currentTestimonialType = writable('writers');

  function selectTestimonialType(type) {
    currentTestimonialType.set(type);
  }
</script>

<div class="text-center space-y-4">
  <div class="flex justify-center space-x-4">
    <button on:click={() => selectTestimonialType('writers')} class="font-bold">Writers</button>
    <button on:click={() => selectTestimonialType('clients')} class="font-bold">Clients</button>
  </div>

  {#if $currentTestimonialType === 'writers'}
    {#each testimonials.writers as testimonial}
      <div class="testimonial">
        <p class="text-lg">{testimonial.text}</p>
        <div class="flex items-center justify-center space-x-2">
          <!-- Replace this with actual image and details -->
          <button class="bg-gray-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700">
            Hire {testimonial.name.split(' ')[0]} 👉
          </button>
        </div>
      </div>
    {/each}
  {:else}
    {#each testimonials.clients as testimonial}
      <div class="testimonial">
        <p class="text-lg">{testimonial.text}</p>
        <!-- Replace this with actual image and details -->
      </div>
    {/each}
  {/if}
</div>
