import Card from '../Card/Card';
import type { Pokemon } from '../../types/api';

interface CardListProps {
  pokemons: Pokemon[];
}

function CardList({ pokemons }: CardListProps) {
  if (pokemons.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-slate-400 text-lg">No Pokémon to display.</p>
        <p className="text-slate-300 text-sm mt-1">
          Enter a name above and hit Search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemons.map((p) => (
        <Card key={p.id} pokemon={p} />
      ))}
    </div>
  );
}

export default CardList;
