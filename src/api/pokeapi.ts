import type { Pokemon } from '../types/api';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokeListItem {
  name: string;
  url: string;
}

interface PokeListResponse {
  results: PokeListItem[];
}

interface PokeDetailResponse {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: Array<{ slot: number; type: { name: string } }>;
}

function parseDetail(data: PokeDetailResponse): Pokemon {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
  };
}

async function fetchDetail(url: string): Promise<Pokemon> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Something went wrong (${res.status}). Please try again.`);
  }
  return parseDetail((await res.json()) as PokeDetailResponse);
}

export async function fetchPokemon(name: string): Promise<Pokemon[]> {
  if (name.trim()) {
    const res = await fetch(`${BASE_URL}/pokemon/${name.trim().toLowerCase()}`);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('No Pokémon found with that name.');
      }
      throw new Error(
        `Something went wrong (${res.status}). Please try again.`
      );
    }
    const data = (await res.json()) as PokeDetailResponse;
    return [parseDetail(data)];
  }

  const res = await fetch(`${BASE_URL}/pokemon?limit=20&offset=0`);
  if (!res.ok) {
    throw new Error(`Something went wrong (${res.status}). Please try again.`);
  }
  const list = (await res.json()) as PokeListResponse;
  return Promise.all(list.results.map((p) => fetchDetail(p.url)));
}
