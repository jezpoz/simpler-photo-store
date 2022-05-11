<script>
  export let album;
</script>

<main>
  <div style="display: flex; flex-direction: row">
    <a href="/albums">Albums</a> /
  </div>
  <h1>{album.name}</h1>
  {@html album.summary}

  <h3>Photographers</h3>
  {#each album.photographers as photographer}
    <a href="{photographer.path}">
      <div>
        <h4>{photographer.name}</h4>
      </div>
    </a>
  {/each}
  <h3>Photos</h3>
  {#each album.photographs as photograph}
  <a href="{photograph.path}">
    <div>
      <h4>{photograph.name}</h4>
    </div>
    <div>
      <img src="{photograph.picture.variants[0].url}" alt="{photograph.picture.altText}"/>
    </div>
  </a>
  
  {/each}
</main>