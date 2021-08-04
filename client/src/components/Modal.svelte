<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import openModal from "../stores/openModal";
  import AddPhoto from "./AddPhoto.svelte";

  let parentNode;
  let firstFocus;
  let lastFocus;

  const focusElement = (element, event) => {
    element.focus();
    event.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      const focus = document.activeElement;

      if (
        (focus === firstFocus && e.shiftKey) ||
        (focus === lastFocus && !e.shiftKey)
      ) {
        focusElement(focus === firstFocus ? lastFocus : firstFocus, e);
      }
    } else if (e.key === "Escape") {
      openModal.toggleModal(false);
    }
  };

  onMount(() => {
    const focusableElements = parentNode.querySelectorAll("button, input");

    firstFocus = focusableElements[0];
    lastFocus = focusableElements[focusableElements.length - 1];

    firstFocus.focus();
  });
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
  class="modal"
  class:modal--open={openModal}
  role="dialog"
  aria-labelledby="add-photo-label"
  aria-modal="true"
  transition:fade={{ duration: 200 }}
  bind:this={parentNode}
>
  <AddPhoto />
</div>

<style lang="scss">
  .modal {
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(#000, 0.25);
    width: 100vw;
    height: 100vh;
  }
</style>
