<script>
  import openModal from "../stores/openModal";
  import images from "../stores/images";

  let errorMessage = "";

  const handleSubmit = async (e) => {
    const label = e.target.label.value.trim();
    const url = e.target.url.value.trim();

    if (!label || !url) {
      errorMessage = "Both fields are required";
      return;
    }

    try {
      const data = await fetch(
        "https:/image-uploader-backend-234.herokuapp.com/images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label, url }),
        }
      );
      const res = await data.json();

      if (res.state) {
        e.target.reset();
        errorMessage = "";
        openModal.toggleModal(false);
        images.update();
      } else {
        errorMessage =
          res.message === "Validation failed"
            ? "Both fields are required"
            : "An error has ocurred, try again later";
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="form">
  <h2 class="form__title">Add a new photo</h2>

  {#if errorMessage}
    <p class="error" role="alert">{errorMessage}</p>
  {/if}

  <label class="form__label" for="label">Label</label>
  <input class="form__input" type="text" id="label" name="label" />

  <label class="form__label" for="photo-url">Photo URL</label>
  <input class="form__input" type="text" id="photo-url" name="url" />

  <div class="form__buttons">
    <button
      class="form__button form__button--light"
      type="button"
      on:click={() => openModal.toggleModal(false)}>Cancel</button
    >
    <button class="form__button">Submit</button>
  </div>
</form>

<style lang="scss">
  .form {
    position: relative;
    background-color: #fff;
    width: 95%;
    max-width: 620px;
    padding: 1.5rem 2rem;
    border-radius: 0.75rem;

    &__title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    &__label {
      display: block;
      margin-bottom: 0.5rem;
    }

    &__input,
    &__button {
      border-radius: 0.75rem;
    }

    &__input {
      width: 100%;
      margin-bottom: 1.125rem;
      padding-left: 1rem;
      border: 1px solid var(--text-color);
      height: 55px;

      &::placeholder {
        color: var(--light-color);
      }
    }

    &__buttons {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    &__button {
      padding: 1rem;

      &--light {
        background-color: transparent;
        color: var(--light-color);
      }
    }
  }

  .error {
    position: absolute;
    top: 32.5px;
    right: 35px;
    color: var(--error-color);
  }
</style>
