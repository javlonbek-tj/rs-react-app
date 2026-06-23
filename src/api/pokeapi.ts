import type { Pokemon, PokemonDetail } from '../types/api';

const BASE_URL = 'https://pokeapi.co/api/v2';

export interface FetchPokemonResult {
  pokemon: Pokemon[];
  total: number;
}

interface PokeListItem {
  name: string;
  url: string;
}

interface PokeListResponse {
  count: number;
  results: PokeListItem[];
}

interface PokeDetailResponse {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: Array<{ slot: number; type: { name: string } }>;
  height: number;
  weight: number;
}

function parseDetail(data: PokeDetailResponse): Pokemon {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
  };
}

function parseDetailFull(data: PokeDetailResponse): PokemonDetail {
  return {
    ...parseDetail(data),
    height: data.height,
    weight: data.weight,
  };
}

async function fetchDetail(url: string): Promise<Pokemon> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Something went wrong (${res.status}). Please try again.`);
  }
  return parseDetail((await res.json()) as PokeDetailResponse);
}

export async function fetchPokemon(
  pageOrName: number | string = 1,
  limit = 20,
  maybeName?: string
): Promise<FetchPokemonResult> {
  const legacyName = typeof pageOrName === 'string' ? pageOrName : undefined;
  const page = typeof pageOrName === 'number' ? pageOrName : 1;
  const name = (maybeName ?? legacyName)?.trim().toLowerCase();

  if (name) {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`);
    if (res.status === 404) throw new Error('No Pokemon found with that name.');
    if (!res.ok) {
      throw new Error(
        `Something went wrong (${res.status}). Please try again.`
      );
    }
    const data = (await res.json()) as PokeDetailResponse;
    return { pokemon: [parseDetail(data)], total: 1 };
  }

  const offset = (page - 1) * limit;
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) {
    throw new Error(`Something went wrong (${res.status}). Please try again.`);
  }
  const list = (await res.json()) as PokeListResponse;
  const pokemon = await Promise.all(
    list.results.map((p) => fetchDetail(p.url))
  );
  return { pokemon, total: list.count };
}

export async function fetchPokemonById(id: string): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) {
    throw new Error(`Something went wrong (${res.status}). Please try again.`);
  }
  return parseDetailFull((await res.json()) as PokeDetailResponse);
}

export async function fetchTotal(name?: string): Promise<number> {
  if (name) return 1;

  const res = await fetch(`${BASE_URL}/pokemon?limit=1`);
  if (!res.ok) throw new Error('Failed to fetch total');
  const data = await res.json();
  return data.count;
}
