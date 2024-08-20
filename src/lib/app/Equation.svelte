<!-- src/lib/app/Equation.svelte -->

<script>
  export let velocity = 30;
</script>

<div class="equation">
  v<sub>0</sub> = {velocity} <span class="unit">km/s</span>
</div>

<style>
  .equation {
    font-family: 'Times New Roman', serif;
    font-size: 1.8em;
    color: #FFFFFF;
  }
  sub {
    font-size: 0.5em;
    vertical-align: sub;
  }
  .unit {
    font-style: italic;
  }
</style>