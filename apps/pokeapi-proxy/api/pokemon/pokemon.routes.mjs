import { getPokemonData } from './pokemon.handlers.mjs';
import { checkCacheForPokemonData, validateNameOrId } from './pokemon.middleware.mjs';
import express from 'express';
const router = express.Router();

router.get('/pokemon/:pokemonIdOrName', checkCacheForPokemonData, validateNameOrId, getPokemonData);

export { router };
