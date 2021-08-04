<script>
  import Card from "./Card.svelte";
  import Loader from "./Loader.svelte";
  import images from "../stores/images";

  const handleDelete = async (e) => {
    fetch(`https://images-39546.herokuapp.com/images/${e.detail.id}`, {
      method: "DELETE",
    })
      .then(() => images.update())
      .catch((error) => console.error(error));
  };
</script>

<main class="main">
  {#await $images}
    <Loader />
  {:then images}
    {#if images.length}
      {#each images as { label, url, id }, index (id)}
        <Card on:delete={handleDelete} {label} {url} {id} {index} />
      {/each}
    {:else}
      <p class="message" role="alert">There is no images</p>
    {/if}
  {/await}
</main>

<style lang="scss">
  .main {
    position: relative;
    display: grid;
    grid-auto-rows: 10px;
    grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
    justify-content: center;
    column-gap: 20px;
    padding-top: 75px;
    --card-width: 300px;

    @media screen and (min-width: 450px) {
      --card-width: 320px;
    }

    @media screen and (min-width: 1000px) {
      --card-width: 420px;
      column-gap: 50px;
    }

    @media screen and (min-width: 1250px) {
      --card-width: 380px;
      justify-content: space-around;
      column-gap: 10px;
    }
  }

  .message {
    text-align: center;
    grid-column: span 3;
    font-size: 1.5rem;
  }
</style>
