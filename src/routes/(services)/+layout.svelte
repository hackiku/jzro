<!-- src/routes/(services)/+layout.svelte -->
<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "../../app.css";
</script>

<Nav />
<slot />
<Footer />