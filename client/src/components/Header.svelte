<script>
  import Form from "./Form.svelte";
</script>

<header class="header">
  <img src="./assets/my_unsplash_logo.svg" alt="My unsplash logo" />
  <Form />
</header>

<style lang="scss">
  .header {
    display: flex;

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }
</style>
