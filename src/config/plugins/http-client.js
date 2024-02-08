import axios from "axios";

export const httpClient = {
   get: async (url) => {
      const { data } = await axios.get(url);

      return data;
   },
};
