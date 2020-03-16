import axios from "axios";

export const imdbSearch = searchTerm => {
  let url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=4cd7149`;
  return axios.get(url);
};
