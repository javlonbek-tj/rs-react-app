import Card from '../Card/Card';
import { fetchPokemon } from '@/api/pokeapi';

interface CardListProps {
  page?: number;
  limit?: number;
  name?: string;
  detailId?: string;
  currentParams?: string;
  pokemons?: Awaited<ReturnType<typeof fetchPokemon>>['pokemon'];
}

export default async function CardList({
  page = 1,
  limit = 20,
  name,
  detailId,
  currentParams = '',
  pokemons,
}: CardListProps) {
  const pokemon = pokemons ?? (await fetchPokemon(page, limit, name)).pokemon;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemon.map((p) => (
        <Card
          key={p.id}
          pokemon={p}
          detailId={detailId}
          currentParams={currentParams}
        />
      ))}
    </div>
  );
}
