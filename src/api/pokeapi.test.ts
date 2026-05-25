import { http, HttpResponse } from 'msw';
import { fetchPokemon } from './pokeapi';
import { server } from '../mocks/server';
import { mockPokemonDetail, mockPokemonList } from '../mocks/handlers';

describe('fetchPokemon', () => {
  describe('Single Pokemon fetch (name provided)', () => {
    it('calls the correct URL when a name is provided', async () => {
      let capturedUrl: string | undefined;
      server.use(
        http.get(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/,
          ({ request }) => {
            capturedUrl = request.url;
            return HttpResponse.json(mockPokemonDetail);
          }
        )
      );

      await fetchPokemon('bulbasaur');

      expect(capturedUrl).toBe('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    });

    it('lowercases and trims the name before fetching', async () => {
      let capturedUrl: string | undefined;
      server.use(
        http.get(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/,
          ({ request }) => {
            capturedUrl = request.url;
            return HttpResponse.json(mockPokemonDetail);
          }
        )
      );

      await fetchPokemon('  BULBASAUR  ');

      expect(capturedUrl).toBe('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    });

    it('returns a parsed pokemon array on success', async () => {
      const result = await fetchPokemon('bulbasaur');

      expect(result.pokemon).toEqual([
        {
          id: 1,
          name: 'bulbasaur',
          image: 'https://example.com/bulbasaur.png',
          types: ['grass', 'poison'],
        },
      ]);
    });

    it('throws a friendly error on 404', async () => {
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(fetchPokemon('unknownmon')).rejects.toThrow(
        'No Pokemon found with that name.'
      );
    });

    it('throws a generic error with status code on non-404 failure', async () => {
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(fetchPokemon('bulbasaur')).rejects.toThrow(
        'Something went wrong (500). Please try again.'
      );
    });
  });

  describe('List fetch (no name provided)', () => {
    it('calls the list URL when name is empty', async () => {
      let capturedUrl: string | undefined;
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json(mockPokemonList);
        })
      );

      await fetchPokemon('');

      expect(capturedUrl).toBe(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
    });

    it('fetches detail for each pokemon URL returned in the list', async () => {
      const capturedUrls: string[] = [];
      server.use(
        http.get(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/,
          ({ request }) => {
            capturedUrls.push(request.url);
            return HttpResponse.json(mockPokemonDetail);
          }
        )
      );

      await fetchPokemon('');

      expect(capturedUrls).toContain('https://pokeapi.co/api/v2/pokemon/1/');
      expect(capturedUrls).toContain('https://pokeapi.co/api/v2/pokemon/4/');
    });

    it('returns a parsed array for all pokemon in the list', async () => {
      const result = await fetchPokemon('');

      expect(result.pokemon).toHaveLength(2);
      expect(result.pokemon[0]).toMatchObject({ name: 'bulbasaur' });
    });

    it('throws an error when the list fetch fails', async () => {
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(fetchPokemon('')).rejects.toThrow(
        'Something went wrong (500). Please try again.'
      );
    });
  });

  describe('Response parsing', () => {
    it('correctly maps id, name, image and types from API response', async () => {
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          return HttpResponse.json({
            id: 25,
            name: 'pikachu',
            sprites: { front_default: 'https://example.com/pikachu.png' },
            types: [{ slot: 1, type: { name: 'electric' } }],
          });
        })
      );

      const result = await fetchPokemon('pikachu');

      expect(result.pokemon[0]).toEqual({
        id: 25,
        name: 'pikachu',
        image: 'https://example.com/pikachu.png',
        types: ['electric'],
      });
    });
  });
});
