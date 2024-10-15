<!-- src/lib/chute-repack/BeforeAfter.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  import { createEventDispatcher } from 'svelte';

  export let value = false;
  const dispatch = createEventDispatcher();

  function handleChange() {
    value = !value;
    dispatch('change', value);
  }
</script>

<div class="flex items-center space-x-2">
  <Button variant={value ? "outline" : "default"} on:click={handleChange}>Before</Button>
  <Switch checked={value} onCheckedChange={handleChange} />
  <Button variant={value ? "default" : "outline"} on:click={handleChange}>After</Button>
</div>