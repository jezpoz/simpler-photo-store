<script>
  export let profile;
  export let pictures;
</script>

<main>
  <h1>{profile.name}</h1>
  {@html profile.summary}

  <h3>Some of their work</h3>
  {#each pictures as picture}
    <a href="{picture.path}">
      <h4>{picture.name}</h4>
    </a>
  {/each}
</main>