import axios from 'axios';
import { getCache, setCache } from '../utils/cache.mjs';

export const getPokemonEndpointResources = async (req, res, next) => {
  try {
    const { pokemonIdOrName } = req.params;
    // Attempt to get all resources for the Pokémon endpoint from the cache
    let pokemonEndpointResources = getCache('pokemonEndpointResources');

    if (!pokemonEndpointResources) {
      console.log(
        'Fetching all resources for the Pokémon endpoint from PokéAPI'
      );
      const host = req.get('host');
      const protocol = host.match(/localhost:\d+/) ? 'http' : 'https';
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=9000`
      );
      const { count, results } = data;

      pokemonEndpointResources = {
        count,
        results: results.map(obj => {
          const { name, url } = obj;

          return {
            id: Number(url.split('/').filter(Boolean).pop()),
            name,
            url: url.replace(
              'https://pokeapi.co/api/v2/',
              `${protocol}://${host}/api/`
            )
          };
        })
      };

      // Cache all Pokémon names and routes
      setCache('pokemonEndpointResources', pokemonEndpointResources);
    }

    if (pokemonIdOrName) {
      // User is requesting a specific Pokémon, so pass the data to the next middleware
      // for id or name validation
      res.locals.pokemonEndpointResources = pokemonEndpointResources;
      next();
    } else {
      // User is requesting all Pokémon names and routes, so send the data as a response
      res.send(pokemonEndpointResources);
    }
  } catch (err) {
    next(err);
  }
};

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
          obj[key] = sprites[key];
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
