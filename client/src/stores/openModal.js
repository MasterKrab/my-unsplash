import { writable } from 'svelte/store';

const createOpenModal = () => {
   const { subscribe, set } = writable(false);

   const toggleModal = (openModal) => set(openModal);

   return {
      subscribe,
      set,
      toggleModal,
   };
};

const openModal = createOpenModal();

export default openModal;