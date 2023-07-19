import { getPokemonData } from './pokemon.handlers.mjs';
import { checkCache } from './pokemon.middleware.mjs';
import express from 'express';
const router = express.Router();

router.get('/pokemon/:pokemonIdOrName', checkCache, getPokemonData);

export { router };
