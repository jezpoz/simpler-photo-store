<script>
  export let topics;
</script>

<main>
  <h1>Explore</h1>
  <div class="topics">
    {#each topics as topic}
      <div class="topic">
        <a class="topic-link" href="/explore{topic.path}">
          <h4 class="topic-name">{topic.name}</h4>
        </a>
        <div class="sub-topics">
          {#each topic.subTopics as subTopic}
          <a class="sub-topic-link" href="/explore{subTopic.path}">
            <div class="sub-topic">
              <h5 class="sub-topic-name">{subTopic.name}</h5>
            </div>
          </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  .topics {
    display: flex;
    flex-direction: column;
  }

  .topic-link {
    text-decoration: none;
  }

  .topic-link:hover {
    text-decoration: underline;
  }

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

  .sub-topic:hover {

  }

  .sub-topic-name {
    padding: 0;
  }
</style>