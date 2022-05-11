<script>
  export let topic;
</script>

<main>
  <h1>{topic.name}</h1>
  {#if topic.parentTopic}
    back to <a href="/explore{topic.parentTopic.path}">{topic.parentTopic.name}</a>
  {:else}
    back to <a href="/explore">Explore</a>
  {/if}
  <div>
    {#each topic.subTopics as subTopic}
      <div>
        <a href="/explore{subTopic.path}">
          <h5>{subTopic.name}</h5>
        </a>
      </div>
    {/each}
    {#each topic.children as child}
      <div>
        <a href="{child.path}">
          <h5>{child.name}</h5>
        </a>
      </div>
    {/each}
  </div>
</main>