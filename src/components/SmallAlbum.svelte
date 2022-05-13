<script>
  import Image from './Image.svelte';

  export let album;
</script>

<div class="mini-album">
  <div class="mini-album-wrapper">
    {#if album.images[0]}
      <a href="{album.path}">
        <div class="mini-album-image-wrapper">
          <Image
            image={album.images[0]}
            sizes="300px"
            styles="object-fit: cover;"
            width={300}
            height={500}
          />
        </div>
      </a>
    {/if}
    <a href="{album.path}" class="mini-album-name-link">
      <div class="mini-album-details">
        <h4 class="mini-album-name">{album.name}</h4>
      </div>
      </a>
  </div>
</div>

<style>
  .mini-album {
    display: flex;
    flex-direction: row;
  }

  .mini-album-wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 12px 0;
    margin-right: 12px;
    background-color: #fefefe;
    width: 300px;
  }

  .mini-album-image-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
  }

  .mini-album-details {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
  }

  .mini-album-name-link {
    width: 100%;
  }

  .mini-album-name {
    padding: 0;
  }

  @media (max-width: 600px) {
    .mini-album-wrapper {
      flex-direction: row;
      height: auto;
      width: 100%;
      margin-right: 0;
    }

    .mini-album-details {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;
    }

    .mini-album-image-wrapper {
      height: auto;
      width: 200px;
      border-top-left-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-left-radius: 5px;
      overflow: hidden;
    }
  }
</style>