<!-- Jzro.svelte -->
<!-- mars weather METAR stye -->

<script>
  let metarData = [
    {
      code: "JZRO",
      explanation: "Jezero Crater\nSyrtis Major quadrangle\nMars",
      color: "text-red-600"
    },
    {
      code: "032151Z",
      explanation: "Day of the month and time in UTC",
      color: "text-white"
    },
    // ... add objects for each part of the METAR data
  ];
</script>

<div class="flex justify-center mt-8 text-2xl font-mono text-white">
  {#each metarData as segment}
    <div class="group relative mx-1">
      <span class="{segment.color}">{segment.code}</span>
      <div class="absolute left-0 right-0 bottom-0 mb-6 hidden group-hover:block bg-darkBg p-2 rounded">
        <span class="text-white text-xs whitespace-pre">{segment.explanation}</span>
      </div>
    </div>
  {/each}
</div>

<style>
  /* Ensure explanations are hidden initially and only appear on hover */

  .group-hover\:opacity-100:hover .group-hover\:opacity-100 {
    opacity: 1;
  }
	
  .text-red-600 {
    color: #F4191D;
  }
</style>
