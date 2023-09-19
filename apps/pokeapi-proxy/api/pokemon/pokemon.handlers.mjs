import axios from 'axios';
import { getCache, setCache } from '../utils/cache.mjs';

export const getAllPokemonNamesAndRoutes = async (req, res, next) => {
  try {
    const { pokemonIdOrName } = req.params;
    // Attempt to get all Pokémon names and routes from cache
    let allPokemonNamesAndRoutes = getCache('allPokemonNamesAndRoutes');

    if (!allPokemonNamesAndRoutes) {
      console.log('Fetching all Pokémon names and routes from PokéAPI');
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=9000`
      );

      allPokemonNamesAndRoutes = data.results.map(obj => {
        const { name, url } = obj;
        return {
          name,
          url: url.replace(
            'https://pokeapi.co/api/v2/',
            `${req.protocol}://${req.get('host')}/api/`
          )
        };
      });

      // Cache all Pokémon names and routes
      setCache('allPokemonNamesAndRoutes', allPokemonNamesAndRoutes);
    }

    if (pokemonIdOrName) {
      // User is requesting a specific Pokémon, so pass the data to the next middleware
      // for id or name validation
      res.locals.allPokemonNamesAndRoutes = allPokemonNamesAndRoutes;
      next();
    } else {
      // User is requesting all Pokémon names and routes, so send the data as a response
      res.send(allPokemonNamesAndRoutes);
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
