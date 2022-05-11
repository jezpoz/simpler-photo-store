<script>
  import SmallProfile from '../../components/SmallProfile.svelte';
  import Image from '../../components/Image.svelte';

  export let photograph;
  export let photographers;
</script>

<main>
  <div style="display: flex; flex-direction: row">
    <a href="/photographs">Photographs</a> /
  </div>

  <h1>{photograph.name}</h1>

  <Image image={photograph.image} />

  
  {@html photograph.summary.join('')}

  <h3>Photographer</h3>
  {#each photographers as photographer}
    <SmallProfile profile={photographer} />
  {/each}
  
  
</main>