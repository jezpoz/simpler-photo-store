<script>
  export let image;
  export let sizes;
  export let styles;

  function getVariantSrc(variant) {
    return `${variant.url} ${variant.width}w`;
  }
  const std = image.variants.filter((variant) => variant.url && !variant.url.endsWith('.webp') && !variant.url.endsWith('.avif'))
  const webp = image.variants.filter((variant) => variant.url && variant.url.endsWith('.webp'));
  const avif = image.variants.filter((variant) => variant.url && variant.url.endsWith('.avif'));
  const srcSet = std.map(getVariantSrc).join(', ');
  const srcSetWebp = webp.map(getVariantSrc).join(', ');
  const srcSetAvif = avif.map(getVariantSrc).join(', ');
  
  let useWebP = srcSetWebp.length > 0;
  let useAvif = srcSetAvif.length > 0;
  /**
   * Only output Avif format if it is smaller than
   * webP. For the future: show only one of them when
   * the browser support for Avif is good enough
   */
  if (useWebP && useAvif) {
    const [firstWebp] = webp;
    const [firstAvif] = avif;
    if (firstWebp.size && firstAvif.size) {
      useAvif = firstWebp.size > firstAvif.size;
    }
  }
  let originalFileExtension = 'jpeg';
  if (std.length > 0) {
    const match = std[0].url.match(/\.(?<name>[^.]+)$/);
    originalFileExtension = match?.groups?.name || 'jpeg';
    // Provide correct mime type for jpg
    if (originalFileExtension === 'jpg') {
      originalFileExtension = 'jpeg';
    }
  }
</script>
{#if image}
  <figure>
    <picture>
      {#if useWebP}
        <source srcset="{srcSetWebp}" type="image/webp" sizes={sizes}/>
      {/if}
      {#if useAvif}
        <source srcset="{srcSetAvif}" type="image/avif" />
      {/if}
      {#if srcSet.length}
      <source
        srcSet={srcSet}
        type={`image/${originalFileExtension}`}
        sizes={sizes}
      />
      {/if}
      <img src={image.url} sizes={sizes} alt={image.altText} style={styles}/>
    </picture>
  </figure>
{/if}
<style>
  figure {
    margin: 0;
  }
  figure img {
    width: 100%;
  }
</style>