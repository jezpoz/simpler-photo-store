<script>
  import SmallAlbum from "../../components/SmallAlbum.svelte";
  import SmallImage from "../../components/SmallImage.svelte";
  import SmallProfile from "../../components/SmallProfile.svelte";

  export let topic;

</script>

<main>
  <div>
    {#if topic.parentTopic}
      <a href="/explore{topic.parentTopic.path}">{topic.parentTopic.name}</a> /
    {:else}
      <a href="/explore">Explore</a> /
    {/if}
  </div>
  <h1>{topic.name}</h1>
  
  <div class="sub-topics">
    {#each topic.subTopics as subTopic}
      <div class="sub-topic">
        <a class="sub-topic-link" href="/explore{subTopic.path}">
          <h5 class="sub-topic-name">{subTopic.name}</h5>
        </a>
      </div>
    {/each}
  </div>

  {#if topic.children.photographs.length}
    <h4>Photographs</h4>
    <div class="sub-topic-pictures">
      {#each topic.children.photographs as child}
        <SmallImage image={child} />
      {/each}
    </div>
  {/if}

  {#if topic.children.albums.length}
    <h4>Albums</h4>
    <div class="sub-topic-albums">
      {#each topic.children.albums as child}
        <SmallAlbum album={child} />
      {/each}
    </div>
  {/if}

  {#if topic.children.photographers.length}
    <h4>Photographers</h4>
    <div class="sub-topic-photographers">
      {#each topic.children.photographers as child}
        <SmallProfile profile={child} />
      {/each}
    </div>
  {/if}
</main>

<style>
  .sub-topics {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sub-topic {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fefefe;
    padding: 10px;
    margin: 6px;
  }

  .sub-topic-link {
    text-decoration: none;
  }

  .sub-topic-link:hover {
    text-decoration: underline;
  }

  .sub-topic-name {
    padding: 0;
  }

  .sub-topic-pictures {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .sub-topic-albums {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .sub-topic-photographers {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>