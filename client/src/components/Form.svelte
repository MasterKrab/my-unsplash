<script>
  import Modal from "./Modal.svelte";
  import openModal from "../stores/openModal";
  import images from "../stores/images";

  let label = "";

  const handleSearch = () => images.filterByLabel(label);
</script>

<form on:submit|preventDefault={handleSearch} class="form">
  <div class="form__icon">
    <input
      on:change={handleSearch}
      class="form__input"
      type="text"
      aria-label="Search by name"
      placeholder="Search by name"
      name="label"
      bind:value={label}
    />
  </div>
  <button
    on:click={() => openModal.toggleModal(true)}
    class="form__button"
    type="button">Add a photo</button
  >

  {#if $openModal}
    <Modal />
  {/if}
</form>

<style lang="scss">
  .form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;

    @media screen and (min-width: 768px) {
      justify-content: space-between;
      margin-top: 0;
      margin-left: 30px;
    }

    &__input,
    &__button {
      border-radius: 0.75rem;
    }

    &__icon {
      position: relative;

      &::before {
        content: url(../assets/search.svg);
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
      }
    }

    &__input {
      padding: 0.5rem 0.5rem 0.5rem 2.5rem;
      border: 1px solid var(--light-color);

      @media screen and (min-width: 768px) {
        width: 300px;
        height: 55px;
      }

      &::placeholder {
        color: var(--light-color);
      }
    }

    &__button {
      background-color: var(--button-color);
      padding: 0.65rem 1rem;
      box-shadow: 0px 1px 6px rgba(rgb(75, 27, 27), 0.1);
      border: none;
      color: #fff;

      @media screen and (min-width: 768px) {
        width: 137px;
        height: 55px;
      }
    }
  }
</style>
