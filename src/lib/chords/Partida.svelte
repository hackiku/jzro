<script>
  import { onMount } from 'svelte';
  // Object to hold chords data, could be expanded or modified dynamically
  let chordsData = {};

  // Function to register and render chord data
  function registerChord(chord, element) {

    chordsData[chord] = { element };
    element.textContent = chord;
  }

  // Export chords data to parent component or use elsewhere
  export { chordsData };

  // On mount, register chords
  onMount(() => {
    document.querySelectorAll('[data-chord]').forEach(el => {
      const chord = el.getAttribute('data-chord');
      registerChord(chord, el);
      // applyGlobalStyle(chord, 'your-style-class');
    });
  });
</script>

<style>
    u[data-chord] {
        color: blue;
    }
</style>

<!-- <pre id="core" class="core">       -->
<pre>
  <u data-chord="Em"></u>       <u data-chord="B7"></u>                   <u data-chord="Em"></u>
  Nha cretcheu ja`m s`ta ta parti
  <u data-chord="D"></u>    <u data-chord="C"></u> <u data-chord="B7"></u>
  <u>D</u>    <u>C</u>      <u>B7</u>
  <u>D        C         B7</u>
  Oi partida sô bô podia separano
  <u data-chord="Am"></u>                                 <u data-chord="B7"></u>
  Nha cretcheu lavantá pam bem braçob

  Lavantá pam bem beijob
  <u data-chord="Em"></u>           <u data-chord="D"></u>
  Pam cariciob esse bô face.

  <u data-chord="G"></u>         <u data-chord="B7"></u>
  Sel ta sirvi pa leval
  <u data-chord="E"></u>
  Ma l`ta sirvi pa transportal
           <u data-chord="Am"></u>            <u data-chord="D"></u>
  Caminho longe, separação
          <u data-chord="Em"></u>
  Ê sofrimento d`nhamor pa bô
         <u data-chord="F#"></u>      <u data-chord="B7"></u>      <u data-chord="Em"></u>
  Oi partida bô leval bô ta torná trazel.

                                        <u data-chord="Am"></u>             <u data-chord="D"></u>
  Oi madrugada imagem di nh`alma
                                                  <u data-chord="Em"></u>
  Ma nha cretcheu intrega`m sês lagrimas
                  <u data-chord="C"></u>              <u data-chord="B7"></u>
  Pam ca sofrê nem tchorá

  Esse sofrimento ca ê sô pa mim
                                        <u data-chord="Em"></u>
  Oi partida bô ê um dor profundo.
</pre>

