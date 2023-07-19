import { getCache } from '../utils/cache.mjs';

export const checkCache = async (req, res, next) => {
  const { pokemonIdOrName } = req.params;

  try {
    const cachedPokemonData = getCache(pokemonIdOrName);

    if (cachedPokemonData) {
      console.log('Serving cached data');
      return res.send(cachedPokemonData);
    }

    next();
  } catch (err) {
    next(err);
  }
};
