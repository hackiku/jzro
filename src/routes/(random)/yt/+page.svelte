<!-- routes/yt/+page.svelte -->

<script>
  import { onMount } from 'svelte';
  import Nav from '$lib/Nav.svelte';
  import Footer from '$lib/ui/Footer.svelte';

  let likes = [];

  onMount(async () => {
    const response = await fetch('/data/yt-likes.json');
    if (response.ok) {
      const data = await response.json();
      likes = data.filter(item => item.action === 'liked');
    } else {
      console.error('Failed to load likes data');
    }
  });


  let showJson = false;

  let y = 0;

</script>


<svelte:window bind:scrollY={y} />


<Nav {y}/>

<main class="px-4 md:px-16 lg:px-24">
  
  <section class="relative pt-28 min-h-screen">
    <div class="mx-auto px-4">
      
      
      <h1 class="text-4xl font-bold mb-2 text-center">YT likes</h1>
      <p class="p-2 rounded-full w-28 text-center mb-6 mx-auto bg-gray-800 bg-opacity-50 text-xs">5 Apr 2024</p>
      
    <!-- Sticky Container Start -->
    <div class="fixed top-24 right-0 z-40">
      <div class="flex flex-col space-y-2 z-50">
        <button class={`p-2 bg-gray-800 rounded hover:text-[#F3201D] hover:bg-opacity-75
          ${showJson ? 'text-[#F3201D]' : 'text-white'}`}
          on:click={() => showJson = !showJson}>
          JSON
        </button>
        <button class="p-2 bg-gray-800 text-white rounded hover:text-[#F3201D] hover:bg-opacity-75"
          on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑
        </button>
        <button class="p-2 bg-gray-800 text-white rounded hover:text-[#F3201D] hover:bg-opacity-75"
          on:click={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
          ↓
        </button>
      </div>
    </div>
    <!-- Sticky Container End -->
    
      {#if showJson}
        <pre class="bg-gray-700 text-xs p-4 rounded overflow-auto max-h-72 mb-6">
          {JSON.stringify(likes, null, 2)}
        </pre>
      {/if}

      
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each likes as video, index (video.video_link)}
        <div class="bg-gray-900 hover:bg-sky-950 p-5 rounded-lg shadow-lg transition duration-300 ease-in-out relative">
          <!-- number -->
          <div class="absolute bottom-4 right-4 bg-gray-800 text-white rounded-full h-6 w-6 flex items-center justify-center">
            {index + 1}
          </div>
      
          <h2 class="text-lg font-semibold mb-2">
              <a href={video.video_link} class="hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                {video.video_title}
              </a>
            </h2>
            <p class="">by <a href={video.author_link} class="hover:text-blue-300" target="_blank" rel="noopener noreferrer">
              {video.author_name}
            </a></p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
</main>

<Footer />
