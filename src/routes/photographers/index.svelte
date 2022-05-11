<script>
  import SmallProfile from '../../components/SmallProfile.svelte';

  export let title;
  export let summary;
  export let photographers;
</script>

<main>
  <h1>{title}</h1>
  {@html summary}
  
  <div class="photographers">
    {#each photographers as photographer}
      {#if photographer}
        <SmallProfile profile={photographer} />
      {/if}
    {/each}
  </div>
</main>

<style>
  .photographers {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 600px) {
    .photographers {
      flex-direction: column;
    }
  }
</style>
