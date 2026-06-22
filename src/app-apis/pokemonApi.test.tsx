import { renderHook, waitFor, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';
import { server } from '../mocks/server';
import { mockPokemonDetail, mockPokemonList } from '../mocks/handlers';
import { makeStore } from '../__tests__/test-utils';
import {
  pokemonApi,
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  extractErrorMessage,
} from './pokemonApi';

function wrapper({ children }: { children: React.ReactNode }) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('pokemonApi', () => {
  describe('useGetPokemonListQuery', () => {
    it('returns loading state initially', () => {
      const { result } = renderHook(
        () => useGetPokemonListQuery({ name: '', page: 1, limit: 9 }),
        { wrapper }
      );
      expect(result.current.isLoading).toBe(true);
    });

    it('returns pokemon list on success', async () => {
      const { result } = renderHook(
        () => useGetPokemonListQuery({ name: '', page: 1, limit: 9 }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.pokemon).toHaveLength(2);
      expect(result.current.data?.pokemon[0].name).toBe('bulbasaur');
    });

    it('returns single pokemon when name is provided', async () => {
      const { result } = renderHook(
        () => useGetPokemonListQuery({ name: 'bulbasaur', page: 1, limit: 9 }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.pokemon).toHaveLength(1);
      expect(result.current.data?.total).toBe(1);
    });

    it('returns error on 404 response', async () => {
      server.use(
        http.get(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/,
          () => new HttpResponse(null, { status: 404 })
        )
      );

      const { result } = renderHook(
        () => useGetPokemonListQuery({ name: 'unknown', page: 1, limit: 9 }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(extractErrorMessage(result.current.error)).toBe(
        'No Pokemon found with that name.'
      );
    });

    it('returns error on 500 response', async () => {
      server.use(
        http.get(
          'https://pokeapi.co/api/v2/pokemon',
          () => new HttpResponse(null, { status: 500 })
        )
      );

      const { result } = renderHook(
        () => useGetPokemonListQuery({ name: '', page: 1, limit: 9 }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(extractErrorMessage(result.current.error)).toBe(
        'Something went wrong (500). Please try again.'
      );
    });

    it('uses cached data for repeated queries with same args', async () => {
      let fetchCount = 0;
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon', () => {
          fetchCount++;
          return HttpResponse.json(mockPokemonList);
        }),
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () =>
          HttpResponse.json(mockPokemonDetail)
        )
      );

      const store = makeStore();
      const storeWrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result, rerender } = renderHook(
        () => useGetPokemonListQuery({ name: '', page: 1, limit: 9 }),
        { wrapper: storeWrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(fetchCount).toBe(1);

      rerender();
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(fetchCount).toBe(1);
    });

    it('refetches after cache invalidation', async () => {
      let fetchCount = 0;
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon', () => {
          fetchCount++;
          return HttpResponse.json(mockPokemonList);
        }),
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () =>
          HttpResponse.json(mockPokemonDetail)
        )
      );

      const store = makeStore();
      const storeWrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result } = renderHook(
        () => useGetPokemonListQuery({ name: '', page: 1, limit: 9 }),
        { wrapper: storeWrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(fetchCount).toBe(1);

      act(() => {
        store.dispatch(pokemonApi.util.invalidateTags(['PokemonList']));
      });

      await waitFor(() => expect(fetchCount).toBe(2));
    });
  });

  describe('useGetPokemonDetailQuery', () => {
    it('returns loading state initially', () => {
      const { result } = renderHook(() => useGetPokemonDetailQuery('1'), {
        wrapper,
      });
      expect(result.current.isLoading).toBe(true);
    });

    it('returns pokemon detail on success', async () => {
      const { result } = renderHook(() => useGetPokemonDetailQuery('1'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.name).toBe('bulbasaur');
      expect(result.current.data?.types).toEqual(['grass', 'poison']);
    });

    it('returns error on 500 response', async () => {
      server.use(
        http.get(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/,
          () => new HttpResponse(null, { status: 500 })
        )
      );

      const { result } = renderHook(() => useGetPokemonDetailQuery('1'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(extractErrorMessage(result.current.error)).toBe(
        'Something went wrong (500). Please try again.'
      );
    });

    it('caches detail data per pokemon id', async () => {
      let fetchCount = 0;
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          fetchCount++;
          return HttpResponse.json(mockPokemonDetail);
        })
      );

      const store = makeStore();
      const storeWrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      );

      const { result, rerender } = renderHook(
        () => useGetPokemonDetailQuery('1'),
        { wrapper: storeWrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(fetchCount).toBe(1);

      rerender();
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(fetchCount).toBe(1);
    });
  });

  describe('extractErrorMessage', () => {
    it('extracts message from CUSTOM_ERROR', () => {
      const error = { status: 'CUSTOM_ERROR', error: 'Something went wrong.' };
      expect(extractErrorMessage(error)).toBe('Something went wrong.');
    });

    it('extracts message from SerializedError', () => {
      const error = { message: 'Network error' };
      expect(extractErrorMessage(error)).toBe('Network error');
    });

    it('returns fallback for unknown error shape', () => {
      expect(extractErrorMessage(null)).toBe('Something went wrong.');
      expect(extractErrorMessage({})).toBe('Something went wrong.');
    });
  });
});
