<div class="loader" role="alert" aria-label="Loading" />

<style lang="scss">
  @keyframes spin {

    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loader {
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    border: 5px solid #fff;
    border-left-color: var(--button-color);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: spin 1s ease-in infinite;
  }
</style>
