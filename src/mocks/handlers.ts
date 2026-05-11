import { http, HttpResponse } from 'msw';

export const mockPokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  sprites: { front_default: 'https://example.com/bulbasaur.png' },
  types: [
    { slot: 1, type: { name: 'grass' } },
    { slot: 2, type: { name: 'poison' } },
  ],
};

export const mockPokemonList = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ],
};

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json(mockPokemonList);
  }),

  http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
    return HttpResponse.json(mockPokemonDetail);
  }),
];
