<script>
  export let label;
  export let url;
  export let id;

  import { createEventDispatcher, onMount } from "svelte";
  import { fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  const handleClick = () => dispatch("delete", { id });

  let card;
  let height;

  $: card?.style.setProperty("--row-end", `span ${parseInt(height / 10) + 2}`);

  let isFocus = false;

  const handleToggleFocus = () => (isFocus = !isFocus);
</script>

<article
  class="card"
  class:card--focus={isFocus}
  data-label={label}
  aria-label={label}
  bind:offsetHeight={height}
  bind:this={card}
  transition:fly={{ duration: 300, y: 25 }}
>
  <button
    on:focus={handleToggleFocus}
    on:blur={handleToggleFocus}
    on:click={handleClick}
    class="card__button"
    aria-label={`Delete ${label}`}>delete</button
  >
  <img class="card__image" src={url} alt={label} />
</article>

<style lang="scss">
  .card {
    position: relative;
    overflow: hidden;
    min-height: 150px;
    height: min-content;
    border-radius: 1rem;
    grid-row-end: var(--row-end);
    --opacity: 1;

    @media screen and (min-width: 768px) {
      --opacity: 0;

      &:hover,
      &--focus {
        --opacity: 1;
      }
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
    }

    &::before,
    &::after,
    &__button {
      opacity: var(--opacity);
      transition: opacity 0.2s;
    }

    &::before {
      top: 0;
      width: 100%;
      height: 99.5%;
      background-color: rgba(#000, 0.25);

      @media screen and (max-width: 768px) {
        opacity: 0;
      }
    }

    &::after {
      content: attr(data-label);
      bottom: 0;
      left: 15px;
      font-size: 1.125rem;
      margin-bottom: 1rem;
      color: #fff;
      filter: drop-shadow(0 0 5px rgba(#000, 0.5));
    }

    &__button {
      position: absolute;
      top: 18px;
      right: 18px;
      background-color: transparent;
      width: 75px;
      height: 30px;
      font-size: 1rem;
      border: 2px solid var(--button-color-2);
      color: var(--button-color-2);
      border-radius: 2.375rem;
      --outline-color: var(--button-color-2);

      &:focus {
        opacity: 1;
      }
    }

    &__image {
      width: 100%;
    }
  }
</style>
