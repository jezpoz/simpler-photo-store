<script>
  import Image from '../components/Image.svelte';

  export let page;
</script>

<main>
  <h1>{page.title.content.text}</h1>
  {@html page.summary.content.html.join('')}

  {#each page.body.content.paragraphs as paragraph}
    {#if paragraph.title}
      <h2>{paragraph.title.text}</h2>
    {/if}
    {#if paragraph.body}
      {@html paragraph.body.html.join('')}
    {/if}
    {#if paragraph.images}
      {#each paragraph.images as image}
        <Image image={image} />
      {/each}
    {/if}
  {/each}
</main>
