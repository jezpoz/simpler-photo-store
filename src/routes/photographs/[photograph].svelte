<script>
  export let photograph;
  export let photographers;
</script>

<main>
  <h1>{photograph.name}</h1>
  {@html photograph.summary}

  <h3>Photographer</h3>
  {#each photographers as photographer}
    <a href="{photographer.path}">
      <h4>{photographer.name}</h4>
    </a>
  {/each}
</main>