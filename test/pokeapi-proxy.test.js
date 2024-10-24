/* eslint-disable no-undef */
const portMap = require('../port-map.json');
const pokeapiProxyPort = portMap['pokeapi-proxy'];
const { baseUrl } = require('./jest-utils.js');

const BASE_URL = baseUrl(pokeapiProxyPort);

describe('Pokémon api', () => {
  it('Should return at minimum the first 151 Pokemon', async function () {
    const response = await fetch(new URL('/api/pokemon', BASE_URL));
    const pokedex = await response.json();
    expect(response.status).toBe(200);
    expect(pokedex.results.length).toBeGreaterThanOrEqual(151);
    expect(pokedex.count).toBeGreaterThanOrEqual(151);
  });

  it('Should return Pikachu by name', async function () {
    const response = await fetch(new URL('/api/pokemon/pikachu', BASE_URL));
    const pokemon = await response.json();
    expect(response.status).toBe(200);
    expect(pokemon.name).toBe('pikachu');
    expect(pokemon.id).toBe(25);
  });

  it('Should return Pikachu by id', async function () {
    const response = await fetch(new URL('/api/pokemon/25', BASE_URL));
    const pokemon = await response.json();
    expect(response.status).toBe(200);
    expect(pokemon.name).toBe('pikachu');
    expect(pokemon.id).toBe(25);
  });

  it('Should return the female Nidoran by name', async function () {
    const response = await fetch(new URL('/api/pokemon/nidoran-f', BASE_URL));
    const pokemon = await response.json();
    expect(response.status).toBe(200);
    expect(pokemon.name).toBe('nidoran-f');
    expect(pokemon.id).toBe(29);
  });

  it('Should return the female Nidoran by id', async function () {
    const response = await fetch(new URL('/api/pokemon/29', BASE_URL));
    const pokemon = await response.json();
    expect(response.status).toBe(200);
    expect(pokemon.name).toBe('nidoran-f');
    expect(pokemon.id).toBe(29);
  });

  it('Should return Mr. Mime by name', async function () {
    const response = await fetch(new URL('/api/pokemon/mr-mime', BASE_URL));
    const pokemon = await response.json();
    expect(response.status).toBe(200);
    expect(pokemon.name).toBe('mr-mime');
    expect(pokemon.id).toBe(122);
  });

  it('Should return Mr. Mime by id', async function () {
    const response = await fetch(new URL('/api/pokemon/122', BASE_URL));
    const pokemon = await response.json();
    expect(response.status).toBe(200);
    expect(pokemon.name).toBe('mr-mime');
    expect(pokemon.id).toBe(122);
  });
});
