<script>
  export let title;
  export let summary;
  export let albums;
</script>

<main>
  <h1>{title}</h1>
  {@html summary}
  {#each albums as album}
    {#if album}
      <a href="{album.path}">
        <div>
          {#if album.image}
            <img src={album.image.variants[0].url} alt={album.image.altText} />
          {/if}
          <h4>{album.name}</h4>
        </div>
      </a>
    {/if}
  {/each}
</main>
