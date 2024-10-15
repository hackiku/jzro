<!-- src/routes/(services)/chute-repack/+page.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import PricingTable from "$lib/services/chute-repack/PricingTable.svelte";
</script>

<svelte:head>
  <title>Chute Repack Service | jzro</title>
  <meta name="description" content="Redesign your landing pages for better conversion with jzro's Chute Repack service." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-gradient-to-b from-[#0d1320] to-[#080c15] text-white">
  <main class="flex-grow container mx-auto px-4 py-8">
    <section class="py-12">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-thin mb-4">Chute Repack Service</h1>
      <p class="text-xl mb-6">Redesign your landing pages for better conversion</p>
      <Button>Pre-Order Now</Button>
    </section>

    <section class="py-12 relative">
      <div class="absolute right-0 top-0 w-1/3 transform rotate-15">
        <!-- Replace with actual 3D model or image -->
        <div class="bg-gray-300 h-64 w-full"></div>
        <Tooltip>
          <TooltipTrigger>
            <p class="text-xs text-right mt-2 underline dotted">NOT sponsored by Ridge Wallet</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tooltip content here</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Rest of your sections -->

    <section class="py-12">
      <h3 class="text-2xl font-bold mb-4">Pricing</h3>
      <PricingTable />
    </section>

<section class="py-12 relative">
  <div class="absolute right-0 top-0 w-1/3 transform rotate-15">
    <!-- Replace with actual 3D model or image -->
    <div class="bg-gray-300 h-64 w-full"></div>
    <Tooltip>
      <TooltipTrigger>
        <p class="text-xs text-right mt-2 underline dotted">NOT sponsored by Ridge Wallet</p>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content here</p>
      </TooltipContent>
    </Tooltip>
  </div>
</section>

<section class="py-12">
  <div class="flex flex-col space-y-12">
    <div class="flex items-center">
      <div class="w-1/2">
        <h3 class="text-2xl font-bold mb-2">First Zigzag Section</h3>
        <p>Content for the first zigzag section goes here.</p>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <div class="w-1/2">
        <h3 class="text-2xl font-bold mb-2">Second Zigzag Section</h3>
        <p>Content for the second zigzag section goes here.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each Array(6) as _, i}
      <Card>
        <h4 class="text-xl font-bold mb-2">Blurb {i + 1}</h4>
        <p>Content for blurb {i + 1} goes here.</p>
      </Card>
    {/each}
  </div>
</section>

<section class="py-12 bg-gray-800 text-white">
  <h3 class="text-2xl font-bold mb-4">Testimonials</h3>
  <p>Placeholder for testimonials section</p>
</section>



<section class="py-12">
  <h3 class="text-2xl font-bold mb-4">Pricing</h3>
  <PricingTable />
</section>

  </main>
</div>
