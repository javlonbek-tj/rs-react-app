import { useEffect, useReducer } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { fetchPokemonById } from '../../api/pokeapi';
import Spinner from '../Spinner/Spinner';
import type { PokemonDetail } from '../../types/api';
import { typeColors } from '../../utils/typeColors';

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

interface DetailPanelProps {
  id: string;
}

function DetailPanel({ id }: DetailPanelProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });

  useEffect(() => {
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
    const next = new URLSearchParams(searchParams);
    next.delete('details');
    navigate({ pathname: '/', search: next.toString() });
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
