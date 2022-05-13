<script>
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
  
  <div>
    {#each topic.subTopics as subTopic}
      <div>
        <a href="/explore{subTopic.path}">
          <h5>{subTopic.name}</h5>
        </a>
      </div>
    {/each}

    {#if topic.children.photographs.length}
      <div>
        <h4>Photographs</h4>
        {#each topic.children.photographs as child}
          <div>
            <a href="{child.path}">
              <h5>{child.name}</h5>
            </a>
          </div>
        {/each}
      </div>
    {/if}

    {#if topic.children.albums.length}
      <div>
        <h4>Albums</h4>
        {#each topic.children.albums as child}
          <div>
            <a href="{child.path}">
              <h5>{child.name}</h5>
            </a>
          </div>
        {/each}
      </div>
    {/if}

    {#if topic.children.photographers.length}
      <div>
        <h4>Photographers</h4>
        {#each topic.children.photographers as child}
          <div>
            <a href="{child.path}">
              <h5>{child.name}</h5>
            </a>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>