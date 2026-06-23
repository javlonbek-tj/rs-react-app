import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchPokemon, fetchPokemonById } from '../api/pokeapi';
import type { FetchPokemonResult } from '../api/pokeapi';
import type { PokemonDetail } from '../types/api';

const CACHE_TTL = Number(process.env.NEXT_PUBLIC_CACHE_TTL ?? 60);

export interface ListQueryArg {
  name: string;
  page: number;
  limit: number;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['PokemonList', 'PokemonDetail'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<FetchPokemonResult, ListQueryArg>({
      queryFn: async ({ name, page, limit }) => {
        try {
          const data = await fetchPokemon(page, limit, name);
          return { data };
        } catch (err) {
          return {
            error: {
              status: 'CUSTOM_ERROR' as const,
              error:
                err instanceof Error ? err.message : 'Something went wrong.',
            },
          };
        }
      },
      providesTags: ['PokemonList'],
    }),

    getPokemonDetail: builder.query<PokemonDetail, string>({
      queryFn: async (id) => {
        try {
          const data = await fetchPokemonById(id);
          return { data };
        } catch (err) {
          return {
            error: {
              status: 'CUSTOM_ERROR' as const,
              error:
                err instanceof Error ? err.message : 'Something went wrong.',
            },
          };
        }
      },
      providesTags: (_, __, id) => [{ type: 'PokemonDetail', id }],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailQuery } = pokemonApi;

export function extractErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') return 'Something went wrong.';
  if ('error' in error) return String((error as { error: unknown }).error);
  if ('message' in error)
    return String((error as { message: unknown }).message);
  return 'Something went wrong.';
}
