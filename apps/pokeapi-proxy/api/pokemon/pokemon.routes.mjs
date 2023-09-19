import { getAllPokemonNamesAndRoutes, getPokemonData } from './pokemon.handlers.mjs';
import {
  checkCache,
  validateNameOrId
} from './pokemon.middleware.mjs';
import express from 'express';
const router = express.Router();

router.get('/pokemon',
  checkCache,
  getAllPokemonNamesAndRoutes
);

router.get(
  '/pokemon/:pokemonIdOrName',
  checkCache,
  getAllPokemonNamesAndRoutes,
  validateNameOrId,
  getPokemonData
);

export { router };
