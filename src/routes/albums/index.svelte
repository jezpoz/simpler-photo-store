<script>
  import SmallAlbum from "../../components/SmallAlbum.svelte";

  export let title;
  export let summary;
  export let albums;
</script>

<main>
  <h1>{title}</h1>
  {@html summary}

  <div class="albums">
    {#each albums as album}
      {#if album}
        <SmallAlbum album={album} />
      {/if}
    {/each}
  </div>
</main>

<style>
  .albums {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 600px) {
    .albums {
      flex-direction: column;
    }
  }
</style>