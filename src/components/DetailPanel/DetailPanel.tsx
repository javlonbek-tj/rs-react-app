import { useNavigate, useSearchParams } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { pokemonApi, useGetPokemonDetailQuery, extractErrorMessage } from '../../app/pokemonApi';
import Spinner from '../Spinner/Spinner';
import { typeColors } from '../../utils/typeColors';

function DetailPanel() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details') ?? '';

  const { data: pokemon, isLoading, isError, error } = useGetPokemonDetailQuery(id);

  function handleRefresh() {
    dispatch(pokemonApi.util.invalidateTags([{ type: 'PokemonDetail', id }]));
  }

  function close(e: React.MouseEvent) {
    e.stopPropagation();
    const next = new URLSearchParams(searchParams);
    next.delete('details');
    navigate({ pathname: '/', search: next.toString() });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">
          Details
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            aria-label="Refresh details"
            className="text-sm px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            Refresh
          </button>
          <button
            onClick={close}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-2xl leading-none cursor-pointer transition-colors"
            aria-label="Close details"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        {isLoading && <Spinner />}

        {isError && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">😔</p>
            <p className="text-red-500 font-semibold">{extractErrorMessage(error)}</p>
          </div>
        )}

        {pokemon && (
          <div className="flex flex-col items-center gap-6">
            <div className="bg-slate-50 dark:bg-slate-600 rounded-2xl w-full flex items-center justify-center py-10 relative">
              <span className="absolute top-4 right-4 text-sm text-slate-300 font-mono font-semibold">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-48 h-48 object-contain drop-shadow-xl"
              />
            </div>

            <h3 className="text-3xl font-black text-slate-800 capitalize">
              {pokemon.name}
            </h3>

            <div className="flex gap-2 flex-wrap justify-center">
              {pokemon.types.map((type) => (
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
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                  Height
                </p>
                <p className="text-slate-800 text-xl font-bold">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                  Weight
                </p>
                <p className="text-slate-800 text-xl font-bold">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPanel;
