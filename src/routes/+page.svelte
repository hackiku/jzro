<!-- routes/+page.svelte -->

<script lang="ts">
  import App from '$lib/app/App.svelte';
</script>

<div class="app-container">
  <div class="navbar">
    <h1>jzro</h1>
    <nav>
      <!-- <a href="#">Home</a> -->
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
		<div>12312313123</div>
  </div>
	<App />
</div>


<style>
  body {
    margin: 0;
    /* overflow: hidden; */
  }

  .app-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }

  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar h1 {
    margin: 0;
  }

  .navbar nav a {
    margin-left: 1rem;
    color: white;
    text-decoration: none;
  }
</style>
