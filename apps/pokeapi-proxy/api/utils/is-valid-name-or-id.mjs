import { fetchFromPokeAPI } from './fetch-from-pokeapi.mjs';
import { getCache, setCache } from './cache.mjs';

export const isValidNameOrId = async (pokemonIdOrName) => {
  try {
    const cachedValidNamesAndIds = getCache('validNamesAndIds');

    if (cachedValidNamesAndIds) {
      console.log('Checking valid names and ids in cache');
      return cachedValidNamesAndIds.includes(pokemonIdOrName);
    } else {
      const { data } = await fetchFromPokeAPI(
        `https://pokeapi.co/api/v2/pokemon/?limit=9000`
      );

      const validNamesAndIds = data.results.reduce((arr, currObj) => {
        arr.push(currObj.name);
        arr.push(currObj.url.split('/').filter(Boolean).pop());
        return arr;
      }, []);

      console.log('Setting valid names and ids in cache');
      setCache('validNamesAndIds', validNamesAndIds);
      return validNamesAndIds.includes(pokemonIdOrName);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
