const getData = async (url) => {
   try {
      const res = await fetch(url);
      const data = await res.json();
      const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      return sortedData;
   } catch (error) {
      console.error(error);
   }
};

export default getData;