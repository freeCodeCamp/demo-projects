import axios from 'axios';
import { getCache, setCache } from '../utils/cache.mjs';

export const checkCacheForPokemonData = (req, res, next) => {
  const { pokemonIdOrName } = req.params;

  try {
    const cachedPokemonData = getCache(pokemonIdOrName);

    if (cachedPokemonData) {
      console.log('Serving cached Pokémon data');
      return res.send(cachedPokemonData);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validateNameOrId = async (req, res, next) => {
  try {
    const { pokemonIdOrName } = req.params;
    const cachedValidNamesAndIds = getCache('validNamesAndIds');

    if (cachedValidNamesAndIds) {
      console.log('Checking valid names and ids in cache');
      if (cachedValidNamesAndIds.includes(pokemonIdOrName)) {
        return next();
      }
    }

    console.log('Fetching valid names and ids from PokéAPI');
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=9000`
    );

    const validNamesAndIds = data.results.reduce((arr, currObj) => {
      arr.push(currObj.name);
      arr.push(currObj.url.split('/').filter(Boolean).pop());
      return arr;
    }, []);

    console.log('Setting valid names and ids in cache');
    setCache('validNamesAndIds', validNamesAndIds);

    if (validNamesAndIds.includes(pokemonIdOrName)) {
      return next();
    }

    // Set custom error status code and message
    const invalidPokemonErr = new Error();
    invalidPokemonErr.statusCode = 404;
    invalidPokemonErr.message = 'Invalid Pokémon name or id';

    throw invalidPokemonErr;
  } catch (err) {
    next(err);
  }
};
