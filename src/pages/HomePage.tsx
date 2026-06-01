import { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import SearchBar from '../components/SearchBar/SearchBar';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination/Pagination';
import ErrorState from '../components/ErrorState/ErrorState';
import ErrorTrigger from '../components/ErrorTrigger/ErrorTrigger';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAppDispatch } from '../app/hooks';
import { pokemonApi, useGetPokemonListQuery, extractErrorMessage } from '../app/pokemonApi';
import Flyout from '../components/Flyout/Flyout';

const STORAGE_KEY = 'searchTerm';
const LIMIT = 9;

function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const detailId = searchParams.get('details');
  const [searchTerm, setSearchTerm] = useLocalStorage(STORAGE_KEY, '');

  const { data, isLoading, isError, error } = useGetPokemonListQuery({
    name: searchTerm,
    page,
    limit: LIMIT,
  });

  const pokemon = data?.pokemon ?? [];
  const total = data?.total ?? 0;

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleSearch(term: string) {
    const trimmed = term.trim();
    if (trimmed === searchTerm) return;
    setSearchTerm(trimmed);
    navigate('/?page=1');
  }

  function handleRefresh() {
    dispatch(pokemonApi.util.invalidateTags(['PokemonList', 'PokemonDetail']));
  }

  function closeDetails() {
    const next = new URLSearchParams(searchParams);
    next.delete('details');
    navigate({ pathname: '/', search: next.toString() });
  }

  return (
    <div className="flex flex-col flex-1">
      <SearchBar initialValue={searchTerm} onSearch={handleSearch} />

      <div className="relative flex flex-1 overflow-hidden">
        <main
          className={`flex-1 overflow-y-auto py-4  ${detailId ? 'cursor-pointer' : ''}`}
          onClick={detailId ? closeDetails : undefined}
        >
          {isLoading && <Spinner />}
          {!isLoading && isError && <ErrorState message={extractErrorMessage(error)} />}
          {!isLoading && !isError && pokemon.length > 0 && (
            <div className="max-w-5xl mx-auto px-6 lg:px-4">
              <p className="text-slate-500 text-md mb-5 font-bold dark:text-slate-300">
                {total} result{total !== 1 ? 's' : ''} found
              </p>
              <CardList pokemons={pokemon} />
              <div className="flex items-center justify-between pt-6">
                <Pagination total={total} limit={LIMIT} />
                <div className="flex gap-2">
                  <button
                    onClick={handleRefresh}
                    aria-label="Refresh results"
                    className="px-4 py-2 text-sm bg-slate-600 text-white rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
                  >
                    Refresh
                  </button>
                  <ErrorTrigger />
                </div>
              </div>
            </div>
          )}
        </main>

        {detailId && (
          <aside className="absolute right-0 top-0 bottom-0 w-96 border-l-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 overflow-y-auto shadow-xl z-10">
            <Outlet />
          </aside>
        )}
      </div>

      <Flyout pokemon={pokemon} />
    </div>
  );
}

export default HomePage;
