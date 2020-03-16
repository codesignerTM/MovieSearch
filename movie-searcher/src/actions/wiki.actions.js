import axios from "axios";

export const wikiSearch = choosenMovie => {
  let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${choosenMovie}`;
  return axios.get(url);
};
