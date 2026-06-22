import Image from 'next/image';
import type { Pokemon } from '../../types/api';
import { typeColors } from '../../utils/typeColors';
import CheckboxToggle from './CheckboxToggle';
import CardLink from './CardLink';

interface CardProps {
  pokemon: Pokemon;
  detailId?: string;
  currentParams?: string;
}

export default function Card({
  pokemon,
  detailId,
  currentParams = '',
}: CardProps) {
  const isSelected = detailId === String(pokemon.id);

  const newParams = new URLSearchParams(currentParams);
  newParams.set('details', String(pokemon.id));

  return (
    <CardLink href={`/?${newParams.toString()}`} isSelected={isSelected}>
      <div className="bg-slate-50 dark:bg-slate-800 flex items-center justify-center pt-4 pb-2 relative">
        <span className="absolute top-3 right-3 text-xs text-slate-300 dark:text-slate-200 font-mono font-semibold">
          #{String(pokemon.id).padStart(3, '0')}
        </span>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={112}
          height={112}
          className="object-contain drop-shadow-md"
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
              className={`px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${
                typeColors[type] ?? 'bg-slate-100 text-slate-600'
              }`}
            >
              {type}
            </span>
          ))}
        </div>
        <CheckboxToggle pokemonId={pokemon.id} />
      </div>
    </CardLink>
  );
}
