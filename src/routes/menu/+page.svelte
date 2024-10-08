<!-- routes/menu/+page.svelte -->
<script lang="ts">
  import MenuLayout from '$lib/menu/MenuLayout.svelte';
  import Nav from '$lib/menu/Nav.svelte';
  import SideMenu from '$lib/menu/SideMenu.svelte';
  import ContentCard from '$lib/menu/ContentCard.svelte';
  import { writable } from 'svelte/store';

  const activeCard = writable('');
</script>

<div class="relative w-screen h-screen bg-gray-900 text-white">
  <Nav />
  <MenuLayout>
    <SideMenu {activeCard} />
    <ContentCard {activeCard} />
  </MenuLayout>
</div>