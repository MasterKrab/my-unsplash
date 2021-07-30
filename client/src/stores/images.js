import { writable } from 'svelte/store';
import getData from "../utils/apiCall";

const url = "https://images-39546.herokuapp.com/images";

const createImages = () => {
   const { subscribe, set } = writable(getData(url));

   const update = () => {
      window.scrollTo(0, 0);
      set(getData(url));
   }

   const filterByLabel = (label) => set(getData(`${url}/${label}`));

   return {
      subscribe,
      set,
      update,
      filterByLabel,
   };
};

const images = createImages();

export default images;