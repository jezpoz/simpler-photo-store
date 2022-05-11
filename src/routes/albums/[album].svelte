<script>
  import SmallProfile from '../../components/SmallProfile.svelte';
  import SmallImage from '../../components/SmallImage.svelte';

  export let album;
</script>

<main>
  <div style="display: flex; flex-direction: row">
    <a href="/albums">Albums</a> /
  </div>
  <h1>{album.name}</h1>
  {@html album.summary}

  <h3>Photographers</h3>
  <div class="album-photographers">
    {#each album.photographers as photographer}
      <SmallProfile profile={photographer} />
    {/each}
  </div>


  <h3>Photos</h3>
  <div class="album-photos">
    {#each album.photographs as photograph}
      <SmallImage image={photograph} />
    {/each}
  </div>
</main>

<style>
  .album-photographers {
    display: flex;
    flex-direction: row;
  }

  .album-photos {
    display: flex;
    flex-direction: row;
  }
</style>