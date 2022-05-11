<script>
  import SmallImage from '../../components/SmallImage.svelte';

  export let title;
  export let summary;
  export let photographs;
</script>

<main>
  <h1>{title}</h1>
  {@html summary}
  <div class="photos">
    {#each photographs as photograph}
      {#if photograph}
        <SmallImage image={photograph} />
      {/if}
    {/each}
  </div>
</main>

<style>
  .photos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    .photos {
      flex-direction: column;
    }
  }
</style>