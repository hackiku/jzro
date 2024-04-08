<script>
  import { onMount, reactive } from 'svelte';

  // Dynamic object to hold chords and their elements
  let chordsData = reactive({});

  // Simulated list of chords for demonstration, replace with your actual data
  let chordsList = ['Em', 'B7', 'D', 'C', 'Am', 'G', 'E', 'F#'];

  // Function to transpose chords; this is a placeholder, implement your logic
  function transposeChord(chord, interval) {
    // Implement logic to transpose chord by the interval and return new chord
    return chord; // Placeholder return
  }

  // Apply styles or any other chord-specific logic
  function applyChordLogic(chordElement, chord) {
    chordElement.textContent = chord; // Update text content with chord name
    chordElement.classList.add('your-style-class'); // Add any class for styling
  }

  // On mount, register chords and apply logic
  onMount(() => {
    chordsList.forEach((chord, index) => {
      let element = document.createElement('span'); // Create a span for each chord
      applyChordLogic(element, chord); // Apply logic (style, text content)
      chordsData[chord] = { element, index }; // Add to chords data
    });
  });

  // Optional: Example function to update all chords by transposing them
  function transposeAllChords(interval) {
    chordsList = chordsList.map(chord => transposeChord(chord, interval));
    // Logic to update the DOM elements as necessary
  }
</script>

<svelte:head>
    <style>
        span { /* Your styles for chord spans */ }
        .your-style-class { color: red; } /* Example custom class */
    </style>
</svelte:head>

<!-- Display chords dynamically -->
{#each chordsList as chord}
  <span on:mouseover={() => transposeChord(chord, 1)}>{chord}</span>
{/each}


<!-- <pre id="core" class="core">       -->
<pre >      
  <u data-chord="Em"></u>       <u data-chord="B7"></u>                   <u data-chord="Em"></u>
  Nha cretcheu ja`m s`ta ta parti
  <u data-chord="D"></u> <u data-chord="C"></u> <u data-chord="B7"></u>
  Oi partida sô bô podia separano
  <!-- Continue with your chord structure -->
</pre>


<pre id="core" class="core" style="line-height: 1.4em;">	  		
  <u><a onmouseover="MD(0)" rel="Em" id="a0" style="color: rgb(168, 41, 39);">Em</a></u>                        <u><a onmouseover="MD(1)" rel="B7" id="a1" style="color: rgb(168, 41, 39);">B7</a></u>           <u><a onmouseover="MD(2)" rel="Em" id="a2" style="color: rgb(168, 41, 39);">Em</a></u>  
  Nha cretcheu ja`m s`ta ta parti  
  <u><a onmouseover="MD(3)" rel="D" id="a3" style="color: rgb(168, 41, 39);">D</a></u>              <u><a onmouseover="MD(4)" rel="C" id="a4" style="color: rgb(168, 41, 39);">C</a></u>              <u><a onmouseover="MD(5)" rel="B7" id="a5" style="color: rgb(168, 41, 39);">B7</a></u>  
  Oi partida sô bô podia separano  
    <u><a onmouseover="MD(6)" rel="Am" id="a6" style="color: rgb(168, 41, 39);">Am</a></u>                                 <u><a onmouseover="MD(7)" rel="B7" id="a7" style="color: rgb(168, 41, 39);">B7</a></u>  
  Nha cretcheu lavantá pam bem braçob  
     
  Lavantá pam bem beijob  
                                    <u><a onmouseover="MD(8)" rel="Em" id="a8" style="color: rgb(168, 41, 39);">Em</a></u>           <u><a onmouseover="MD(9)" rel="D" id="a9" style="color: rgb(168, 41, 39);">D</a></u>  
  Pam cariciob esse bô face.  
     
                         <u><a onmouseover="MD(10)" rel="G" id="a10" style="color: rgb(168, 41, 39);">G</a></u>         <u><a onmouseover="MD(11)" rel="B7" id="a11" style="color: rgb(168, 41, 39);">B7</a></u>  
  Sel ta sirvi pa leval  
                                   <u><a onmouseover="MD(12)" rel="E" id="a12" style="color: rgb(168, 41, 39);">E</a></u>  
  Ma l`ta sirvi pa transportal  
                    <u><a onmouseover="MD(13)" rel="Am" id="a13" style="color: red;">Am</a></u>            <u><a onmouseover="MD(14)" rel="D" id="a14" style="color: rgb(168, 41, 39);">D</a></u>  
  Caminho longe, separação  
            <u><a onmouseover="MD(15)" rel="Em" id="a15" style="color: rgb(168, 41, 39);">Em</a></u>  
  Ê sofrimento d`nhamor pa bô  
            <u><a onmouseover="MD(16)" rel="F#" id="a16" style="color: rgb(168, 41, 39);">F#</a></u>        <u><a onmouseover="MD(17)" rel="B7" id="a17" style="color: rgb(168, 41, 39);">B7</a></u>                      <u><a onmouseover="MD(18)" rel="Em" id="a18" style="color: rgb(168, 41, 39);">Em</a></u>  
  Oi partida bô leval bô ta torná trazel.  
     
                                        <u><a onmouseover="MD(19)" rel="Am" id="a19" style="color: rgb(168, 41, 39);">Am</a></u>             <u><a onmouseover="MD(20)" rel="D" id="a20" style="color: rgb(168, 41, 39);">D</a></u>  
  Oi madrugada imagem di nh`alma  
                                                 <u><a onmouseover="MD(21)" rel="Em" id="a21" style="color: rgb(168, 41, 39);">Em</a></u>  
  Ma nha cretcheu intrega`m sês lagrimas  
                 <u><a onmouseover="MD(22)" rel="C" id="a22" style="color: rgb(168, 41, 39);">C</a></u>              <u><a onmouseover="MD(23)" rel="B7" id="a23" style="color: rgb(168, 41, 39);">B7</a></u>  
  Pam ca sofrê nem tchorá  
     
  Esse sofrimento ca ê sô pa mim  
                                       <u><a onmouseover="MD(24)" rel="Em" id="a24" style="color: rgb(168, 41, 39);">Em</a></u>  
  Oi partida bô ê um dor profundo. 
        </pre>