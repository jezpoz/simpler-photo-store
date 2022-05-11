<script>
  import Image from './Image.svelte';

  export let image;
</script>

<div class="small-image-card">
  <Image
    image={image.picture}
    sizes="300px"
    width="300"
    height="auto"
    styles="width: 300px; height: auto; object-fit: cover;"
  />
  <div class="small-image-details">
    <a href={image.path}>
      <h4 class="small-image-title">{image.name}</h4>
    </a>
    
  </div>
</div>

<style>
  .small-image-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fefefe;
    overflow: hidden;
    margin: 12px 0;
    margin-right: 12px;
  }

  .small-image-details {
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  .small-image-title {
    padding: 0;
  }

  @media (max-width: 600px) {
    .small-image-card {
      flex-direction: row;
      margin-right: 0;
    }
  }
</style>