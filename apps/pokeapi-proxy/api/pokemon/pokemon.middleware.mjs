import { getCache } from '../utils/cache.mjs';
import { isValidNameOrId } from '../utils/is-valid-name-or-id.mjs';

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
  const { pokemonIdOrName } = req.params;
  const isValidPath = await isValidNameOrId(pokemonIdOrName);

  try {
    if (isValidPath) {
      console.log('Is a valid Pokémon name or id');
      return next();
    }
    
    throw new Error();
  } catch (err) {
    next({
      statusCode: 404,
      message: 'Not Found: Is not a valid Pokémon name or id'
    });
  }
};
