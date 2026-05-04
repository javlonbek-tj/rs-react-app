import type { Pokemon } from '../../types/api';

interface CardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  normal: 'bg-slate-100 text-slate-600',
  fire: 'bg-orange-100 text-orange-700',
  water: 'bg-blue-100 text-blue-700',
  electric: 'bg-yellow-100 text-yellow-700',
  grass: 'bg-green-100 text-green-700',
  ice: 'bg-cyan-100 text-cyan-700',
  fighting: 'bg-red-100 text-red-700',
  poison: 'bg-violet-100 text-violet-700',
  ground: 'bg-amber-100 text-amber-700',
  flying: 'bg-sky-100 text-sky-700',
  psychic: 'bg-pink-100 text-pink-700',
  bug: 'bg-lime-100 text-lime-700',
  rock: 'bg-stone-100 text-stone-600',
  ghost: 'bg-indigo-100 text-indigo-700',
  dragon: 'bg-purple-100 text-purple-700',
  dark: 'bg-slate-700 text-slate-100',
  steel: 'bg-slate-200 text-slate-600',
  fairy: 'bg-pink-100 text-pink-500',
};

function Card({ pokemon }: CardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-red-400 hover:shadow-lg transition-all overflow-hidden">
      <div className="bg-slate-50 flex items-center justify-center pt-6 pb-4 relative">
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
    </div>
  );
}

export default Card;
