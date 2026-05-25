import Card from '../Card/Card';
import type { Pokemon } from '../../types/api';

interface CardListProps {
  pokemons: Pokemon[];
}

function CardList({ pokemons }: CardListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemons.map((p) => (
        <Card key={p.id} pokemon={p} />
      ))}
    </div>
  );
}

export default CardList;
