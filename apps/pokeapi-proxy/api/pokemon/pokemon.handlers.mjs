import axios from 'axios';
import { setCache } from '../utils/cache.mjs';

export const getPokemonData = async (req, res, next) => {
  try {
    const { pokemonIdOrName } = req.params;
    console.log('Fetching Pokémon data from PokéAPI');
    const { data } = await axios.get(
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

    // Cache simplified data by id and name, then send it as a response
    setCache(simplifiedPokemonData.id, simplifiedPokemonData);
    setCache(simplifiedPokemonData.name, simplifiedPokemonData);

    res.send(simplifiedPokemonData);
  } catch (err) {
    next(err);
  }
};
