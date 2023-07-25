import { fetchFromPokeAPI } from '../utils/fetch-from-pokeapi.mjs';
import { setCache } from '../utils/cache.mjs';

export const getPokemonData = async (req, res, next) => {
  try {
    const { pokemonIdOrName } = req.params;
    const { data } = await fetchFromPokeAPI(
      `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`
    );
    const {
      base_experience,
      height,
      id,
      name,
      order,
      sprites,
      stats,
      types,
      weight
    } = data;

    // Remove unnecessary data for the required project
    const simplifiedPokemonData = {
      base_experience,
      height,
      id,
      name,
      order,
      sprites: Object.keys(sprites)
        .filter(key => typeof sprites[key] === 'string')
        .reduce((obj, key) => {
          obj[key] = sprites[key].replace(
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/',
            'https://cdn.freecodecamp.org/pokeapi/'
          );
          return obj;
        }, {}),
      stats,
      types,
      weight
    };

    // Cache simplified data and send it as a response
    setCache(pokemonIdOrName, simplifiedPokemonData);
    res.send(simplifiedPokemonData);
  } catch (err) {
    // Set status code and message from the Axios response object
    next({
      statusCode: err?.response?.status,
      message: err?.response?.data
    });
  }
};
