import axios from 'axios';

export const fetchFromPokeAPI = async url => {
  console.log('Fetching from PokéAPI');
  return await axios.get(url);
};
