import { Link, useSearchParams } from 'react-router';
import type { Pokemon } from '../../types/api';
import { typeColors } from '../../utils/typeColors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { togglePokemon } from '../../app/selectedPokemonSlice';

interface CardProps {
  pokemon: Pokemon;
}

function Card({ pokemon }: CardProps) {
  const [searchParams] = useSearchParams();
  const isSelected = searchParams.get('details') === String(pokemon.id);
  const isChecked = useAppSelector((state) =>
    state.selectedPokemon.selectedIds.includes(pokemon.id)
  );
  const dispatch = useAppDispatch();

  const newParams = new URLSearchParams(searchParams);
  newParams.set('details', String(pokemon.id));

  return (
    <Link
      to={`/?${newParams.toString()}`}
      onClick={(e) => e.stopPropagation()}
      className={`flex flex-col bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden
        ${isSelected ? 'border-red-500 dark:border-red-600 shadow-lg shadow-red-100 dark:shadow-red-900 scale-[1.02]' : 'border-slate-200 hover:border-red-400 dark:hover:border-red-600 hover:shadow-lg'}`}
    >
      <div className="bg-slate-50 dark:bg-slate-800 flex items-center justify-center pt-4 pb-2 relative">
        <span className="absolute top-3 right-3 text-xs text-slate-300 dark:text-slate-200 font-mono font-semibold">
          #{String(pokemon.id).padStart(3, '0')}
        </span>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-28 h-28 object-contain drop-shadow-md"
        />
      </div>
      <div className="px-4 py-4 flex flex-col items-center gap-2 relative">
        <p className="font-bold text-slate-900 dark:text-slate-50 text-base capitalize">
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
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => dispatch(togglePokemon(pokemon.id))}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
        />
      </div>
    </Link>
  );
}

export default Card;
