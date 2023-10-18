import { getCache } from '../utils/cache.mjs';

export const checkCache = (req, res, next) => {
  const { pokemonIdOrName } = req.params;

  try {
    const cachedData = getCache(pokemonIdOrName || 'pokemonEndpointResources');

    if (cachedData) {
      console.log('Serving cached data');
      return res.send(cachedData);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validateNameOrId = async (req, res, next) => {
  try {
    const { pokemonIdOrName } = req.params;
    const validNamesAndIds = res.locals.pokemonEndpointResources.results.reduce(
      (arr, currObj) => {
        arr.push(currObj.name);
        arr.push(currObj.url.split('/').filter(Boolean).pop());
        return arr;
      },
      []
    );

    if (validNamesAndIds.includes(pokemonIdOrName)) {
      next();
    } else {
      // Set custom error status code and message
      const invalidPokemonErr = new Error();
      invalidPokemonErr.statusCode = 404;
      invalidPokemonErr.message = 'Invalid Pokémon name or id';

      throw invalidPokemonErr;
    }
  } catch (err) {
    next(err);
  }
};
