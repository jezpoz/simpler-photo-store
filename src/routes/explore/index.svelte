<script>
  export let topics;
</script>

<main>
  <h1>Explore</h1>

  {#each topics as topic}
    <a href="/explore{topic.path}">
      <h4>{topic.name}</h4>
    </a>
    <div>
      {#each topic.subTopics as subTopic}
      <div>
        <a href="/explore{subTopic.path}">
          <h5>{subTopic.name}</h5>
        </a>
      </div>
      {/each}
    </div>
  {/each}
</main>
