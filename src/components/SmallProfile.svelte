<script>
  import Image from './Image.svelte';

  export let profile;
</script>

<div class="mini-profile">
  <div class="mini-profile-wrapper">
    <div class="mini-profile-image-wrapper">
      <Image
        image={profile.image}
        sizes="200px"
        styles="height: 100px; width: 100px; border-radius: 5px; overflow: hidden;object-fit: cover;"
        width={100}
        height={100}
      />
    </div>
    <div class="mini-profile-details">
      <a href="{profile.path}">
        <h4 class="mini-profile-name">{profile.name}</h4>
      </a>
    </div>
  </div>
</div>

<style>
  .mini-profile {
    display: flex;
    flex-direction: row;
  }

  .mini-profile-wrapper {
    display: flex;
    flex-direction: row;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 12px 0;
    margin-right: 12px;
    background-color: #fefefe;
  }

  .mini-profile-image-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 12px;
  }

  .mini-profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .mini-profile-name {
    padding: 0;
  }

  @media (max-width: 600px) {
    .mini-profile-wrapper {
      width: 100%;
      margin-right: 0;
    }
  }
</style>