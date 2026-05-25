import { useEffect, useReducer } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import SearchBar from '../components/SearchBar/SearchBar';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination/Pagination';
import ErrorState from '../components/ErrorState/ErrorState';
import ErrorTrigger from '../components/ErrorTrigger/ErrorTrigger';
import { fetchPokemon } from '../api/pokeapi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Pokemon } from '../types/api';
import Flyout from '../components/Flyout/Flyout';

const STORAGE_KEY = 'searchTerm';
const LIMIT = 9;

type State = {
  pokemon: Pokemon[];
  total: number;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; pokemon: Pokemon[]; total: number }
  | { type: 'FETCH_ERROR'; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        pokemon: action.pokemon,
        total: action.total,
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      return { pokemon: [], total: 0, loading: false, error: action.message };
  }
}

const initialState: State = {
  pokemon: [],
  total: 0,
  loading: true,
  error: null,
};

function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const detailId = searchParams.get('details');
  const [searchTerm, setSearchTerm] = useLocalStorage(STORAGE_KEY, '');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pokemon, total, loading, error } = state;

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fetchPokemon(searchTerm, page, LIMIT)
      .then(({ pokemon, total }) =>
        dispatch({ type: 'FETCH_SUCCESS', pokemon, total })
      )
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Something went wrong.';
        dispatch({ type: 'FETCH_ERROR', message });
      });
  }, [searchTerm, page]);

  function handleSearch(term: string) {
    const trimmed = term.trim();
    if (trimmed === searchTerm) return;
    setSearchTerm(trimmed);
    navigate('/?page=1');
  }

  function closeDetails() {
    const next = new URLSearchParams(searchParams);
    next.delete('details');
    navigate({ pathname: '/', search: next.toString() });
  }

  return (
    <div className="flex flex-col flex-1">
      <SearchBar onSearch={handleSearch} />

      <div className="relative flex flex-1 overflow-hidden">
        <main
          className={`flex-1 overflow-y-auto py-4  ${detailId ? 'cursor-pointer' : ''}`}
          onClick={detailId ? closeDetails : undefined}
        >
          {loading && <Spinner />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && pokemon.length > 0 && (
            <div className="max-w-5xl mx-auto px-6 lg:px-4">
              <p className="text-slate-500 text-md mb-5 font-bold dark:text-slate-300">
                {total} result{total !== 1 ? 's' : ''} found
              </p>
              <CardList pokemons={pokemon} />
              <div className="flex items-center justify-between pt-6">
                <Pagination total={total} limit={LIMIT} />
                <ErrorTrigger />
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
