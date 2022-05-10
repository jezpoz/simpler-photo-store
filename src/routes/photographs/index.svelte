<script context="module">
  export function get() {
    return {
      status: 200,
      body: {
        title: 'Photographs'
      }
    }
  }
</script>

<script>
  export let title;
</script>

<h1>{title}</h1>