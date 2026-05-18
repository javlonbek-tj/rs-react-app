import { Link, useParams, useSearchParams } from 'react-router';
import type { Pokemon } from '../../types/api';
import { typeColors } from '../../utils/typeColors';

interface CardProps {
  pokemon: Pokemon;
}

function Card({ pokemon }: CardProps) {
  const [searchParams] = useSearchParams();
  const { id: selectedId } = useParams();
  const isSelected = selectedId === String(pokemon.id);

  return (
    <Link
      to={`/details/${pokemon.id}?${searchParams.toString()}`}
      onClick={(e) => e.stopPropagation()}
      className={`flex flex-col bg-white rounded-2xl border transition-all overflow-hidden
        ${isSelected ? 'border-red-500 shadow-lg shadow-red-100 scale-[1.02]' : 'border-slate-200 hover:border-red-400 hover:shadow-lg'}`}
    >
      <div className="bg-slate-50 flex items-center justify-center pt-4 pb-2 relative">
        <span className="absolute top-3 right-3 text-xs text-slate-300 font-mono font-semibold">
          #{String(pokemon.id).padStart(3, '0')}
        </span>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-28 h-28 object-contain drop-shadow-md"
        />
      </div>
      <div className="px-4 py-4 flex flex-col items-center gap-2">
        <p className="font-bold text-slate-900 text-base capitalize">
          {pokemon.name}
        </p>
        <div className="flex gap-1.5 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${typeColors[type] ?? 'bg-slate-100 text-slate-600'}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Card;
