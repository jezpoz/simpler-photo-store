<script>
  export let title;
  export let summary;
  export let photographs;
</script>

<main>
  <h1>{title}</h1>
  {@html summary}
  {#each photographs as photograph}
    {#if photograph}
      <a href="{photograph.path}">
        <div>
          {#if photograph.image}
            <img src={photograph.image.variants[0].url} alt={photograph.image.altText} />
          {/if}
          <h4>{photograph.name}</h4>
        </div>
      </a>
    {/if}
  {/each}
</main>