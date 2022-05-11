<script>
  import Image from '../../components/image/Image.svelte';

  export let photograph;
  export let photographers;
</script>

<main>
  <div style="display: flex; flex-direction: row">
    <a href="/photographs">Photographs</a> /
  </div>
  <h1>{photograph.name}</h1>
  {@html photograph.summary.join('')}

  <h3>Photographer</h3>
  {#each photographers as photographer}
    <a href="{photographer.path}">
      <h4>{photographer.name}</h4>
    </a>
  {/each}
  
  <Image image={photograph.image} />
</main>