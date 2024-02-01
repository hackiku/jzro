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

<div class="flex justify-center mt-8">
  <div class="flex space-x-2">
    {#each metarData as segment}
      <div class="relative font-mono">
        <span class="{segment.color}">{segment.code}</span>
        <div class="absolute left-0 mt-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div class="bg-darkBg p-2 rounded whitespace-nowrap">
            <span class="text-white text-xs">{segment.explanation.replace('\n', '<br>')}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
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
