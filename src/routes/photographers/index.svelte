<script>
  export let title;
  export let summary;
  export let photographers;
</script>

<main>
  <h1>{title}</h1>
  {@html summary}
  {#each photographers as photographer}
    {#if photographer}
      <a href="{photographer.path}">
        <div>
          {#if photographer.image}
            <img src={photographer.image.variants[0].url} alt={photographer.image.altText} />
          {/if}
          <h4>{photographer.name}</h4>
        </div>
      </a>
    {/if}
  {/each}
</main>
