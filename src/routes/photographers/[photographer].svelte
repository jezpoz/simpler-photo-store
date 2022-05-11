<script>
  import Image from '../../components/Image.svelte';
  import SmallImage from '../../components/SmallImage.svelte';

  export let profile;
  export let pictures;

  console.log(pictures);
</script>

<main>
  <div style="display: flex; flex-direction: row">
    <a href="/photographers">Photographers</a> /
  </div>
  <h1>{profile.name}</h1>
  {@html profile.summary}

  {#each profile.profilePictures as profilePicture}
    <Image image={profilePicture} />
  {/each}

  <h3>Some of their work</h3>
  <div class="photographs">
    {#each pictures as picture}
      {#if picture}
        <SmallImage image={picture} />
      {/if}
    {/each}
  </div>
</main>

<style>
  .photographs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    .photographs {
      flex-direction: column;
    }
  }
</style>