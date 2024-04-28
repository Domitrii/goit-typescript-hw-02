import axios from "axios";

const API_KEY = "v9m9SpTO3iPnChiG0z0xkMbedbTx_HGpbzJfJDGjnN0";
axios.defaults.baseURL = "https://api.unsplash.com/";

const ApiService = async <T>(query: string, page: number): Promise<T> => {
  const { data } = await axios.get<T>("/search/photos/", {
    params: {
      client_id: API_KEY,
      query: query,
      per_page: 10,
      page: page,
    },
  })
  return data;
};

export default ApiService;