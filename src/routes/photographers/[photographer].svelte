<script>
  import Image from '../../components/image/Image.svelte';

  export let profile;
  export let pictures;
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
  {#each pictures as picture}
    <a href="{picture.path}">
      <h4>{picture.name}</h4>
      <Image image={picture.image} />
    </a>
  {/each}
</main>