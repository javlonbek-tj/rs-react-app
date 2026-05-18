import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router';
import { fetchPokemonById } from '../../api/pokeapi';
import Spinner from '../Spinner/Spinner';
import type { PokemonDetail } from '../../types/api';

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

type State =
  | { status: 'loading' }
  | { status: 'success'; pokemon: PokemonDetail }
  | { status: 'error'; message: string };

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; pokemon: PokemonDetail }
  | { type: 'FETCH_ERROR'; message: string };

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':  return { status: 'loading' };
    case 'FETCH_SUCCESS': return { status: 'success', pokemon: action.pokemon };
    case 'FETCH_ERROR':  return { status: 'error', message: action.message };
  }
}

function DetailPanel() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });

  useEffect(() => {
    if (!id) return;
    dispatch({ type: 'FETCH_START' });
    fetchPokemonById(id)
      .then((pokemon) => dispatch({ type: 'FETCH_SUCCESS', pokemon }))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Something went wrong.';
        dispatch({ type: 'FETCH_ERROR', message });
      });
  }, [id]);

  function close(e: React.MouseEvent) {
    e.stopPropagation();
    navigate({ pathname: '/', search: searchParams.toString() });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-bold text-slate-700">Details</h2>
        <button
          onClick={close}
          className="text-slate-400 hover:text-slate-700 text-2xl leading-none cursor-pointer transition-colors"
          aria-label="Close details"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 px-6 py-8">
        {state.status === 'loading' && <Spinner />}

        {state.status === 'error' && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">😔</p>
            <p className="text-red-500 font-semibold">{state.message}</p>
          </div>
        )}

        {state.status === 'success' && (
          <div className="flex flex-col items-center gap-6">
            <div className="bg-slate-50 rounded-2xl w-full flex items-center justify-center py-10 relative">
              <span className="absolute top-4 right-4 text-sm text-slate-300 font-mono font-semibold">
                #{String(state.pokemon.id).padStart(3, '0')}
              </span>
              <img
                src={state.pokemon.image}
                alt={state.pokemon.name}
                className="w-48 h-48 object-contain drop-shadow-xl"
              />
            </div>

            <h3 className="text-3xl font-black text-slate-800 capitalize">
              {state.pokemon.name}
            </h3>

            <div className="flex gap-2 flex-wrap justify-center">
              {state.pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${typeColors[type] ?? 'bg-slate-100 text-slate-600'}`}
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Height</p>
                <p className="text-slate-800 text-xl font-bold">{(state.pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Weight</p>
                <p className="text-slate-800 text-xl font-bold">{(state.pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPanel;
