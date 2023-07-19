import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
const portNum = process.env.PORT || 3000;
const app = express();
// const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL_MINUTES * 60, checkperiod: 120 });
const cache = new NodeCache({ stdTTL: 30, checkperiod: 120 }); // testing cache

app.use(express.static('public'));

const checkCache = async (req, res, next) => {
  const { pokemonIdOrName } = req.params;

  try {
    const cachedPokemonData = cache.get(pokemonIdOrName);

    if (cachedPokemonData) {
      console.log('Serving cached data');
      return res.send(cachedPokemonData);
    }

    next();
  } catch (err) {
    next(err);
  }
};

const getPokemonData = async (req, res, next) => {
  try {
    console.log('Fetching new data');
    const { pokemonIdOrName } = req.params;
    const pokeAPIResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`
    );
    const { data } = pokeAPIResponse;
    const { base_experience, height, id, name, sprites, stats, types, weight } =
      data;

    // Remove unnecessary data for the required project
    const simplifiedPokemonData = {
      base_experience,
      height,
      id,
      name,
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
    cache.set(pokemonIdOrName, simplifiedPokemonData);
    res.send(simplifiedPokemonData);
  } catch (err) {
    next(err);
  }
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/pokemon/:pokemonIdOrName', checkCache, getPokemonData);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.message, err.stack);

  // Handle Axios errors first and mimic the response from the PokéAPI
  if (err?.response?.status === 404) {
    res.status(404).send('Not Found');
  } else {
    // Handle other errors
    res.status(500).send('Internal server error');
  }
});

app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});
