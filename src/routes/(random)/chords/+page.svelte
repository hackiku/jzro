<!-- routes/(random)/chords/+page.svelte -->

<script>
  import { onMount } from 'svelte';
  import Partida from '$lib/chords/Partida.svelte'
  import Tear from '$lib/chords/Tear.svelte'

  // Sample HTML-like content containing chords
  let htmlContent = `Em B7 Em...`; 

  // Extract chords from HTML content
  function extractChords(html) {
    // This regex matches chord names embedded in the structure you've provided
    const regex = /rel="([A-G][#b]?m?[7]?)"/g;
    let matches, chords = [];
    while ((matches = regex.exec(html)) !== null) {
      chords.push(matches[1]);
    }
    return chords;
  }

  let chords = extractChords(htmlContent);

  // Transpose functionality
  let transposeSteps = 0;

  function transposeChord(chord, steps) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let noteIndex = notes.findIndex(note => chord.name.startsWith(note));
    if (noteIndex !== -1) {
      let newIndex = (noteIndex + steps + 12) % 12;
      let newChordRoot = notes[newIndex];
      // Preserve chord quality (major, minor, etc.)
      let chordQuality = chord.name.substring(notes[noteIndex].length);
      return newChordRoot + chordQuality;
    }
    return chord.name;
  }

  function transposeAll(steps) {
    transposeSteps += steps;
    chords = chords.map(chord => transposeChord(chord, steps));
  }
</script>

<div class="text-center">div
  {#each chords as chord, index}
    diomerd<span class="
    inline-block bg-red-700 text-white py-1 px-3 m-1 rounded">
    {chord}</span>
  {/each}
</div>

<Partida />
<Tear />

<main class="px-4 md:px-16 lg:px-24">
  <!-- UI elements for transposition -->
  <div class="text-center my-4">
    <button class="bg-red-700 text-white py-2 px-4 rounded mr-2" on:click={() => transposeAll(-1)}>-</button>
    <button class="bg-red-700 text-white py-2 px-4 rounded" on:click={() => transposeAll(1)}>+</button>
  </div>
  
</main>
