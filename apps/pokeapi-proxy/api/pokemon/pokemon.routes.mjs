import {
  getPokemonEndpointResources,
  getPokemonData
} from './pokemon.handlers.mjs';
import { checkCache, validateNameOrId } from './pokemon.middleware.mjs';
import express from 'express';
const router = express.Router();

router.get('/pokemon', checkCache, getPokemonEndpointResources);

router.get(
  '/pokemon/:pokemonIdOrName',
  checkCache,
  getPokemonEndpointResources,
  validateNameOrId,
  getPokemonData
);

export { router };
