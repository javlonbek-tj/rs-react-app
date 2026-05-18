import { useEffect, useReducer } from 'react';
import { Outlet, useOutlet, useNavigate, useSearchParams } from 'react-router';
import SearchBar from '../components/SearchBar/SearchBar';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination/Pagination';
import ErrorState from '../components/ErrorState/ErrorState';
import ErrorTrigger from '../components/ErrorTrigger/ErrorTrigger';
import { fetchPokemon } from '../api/pokeapi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Pokemon } from '../types/api';

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
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const [searchTerm, setSearchTerm] = useLocalStorage(STORAGE_KEY, '');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pokemon, total, loading, error } = state;

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
    navigate({ pathname: '/', search: searchParams.toString() });
  }

  return (
    <div className="flex flex-col flex-1">
      <SearchBar onSearch={handleSearch} />

      <div className="relative flex flex-1 overflow-hidden">
        <main
          className={`flex-1 overflow-y-auto p-6 ${outlet ? 'cursor-pointer' : ''}`}
          onClick={outlet ? closeDetails : undefined}
        >
          {loading && <Spinner />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && pokemon.length > 0 && (
            <div className="max-w-5xl mx-auto">
              <p className="text-slate-500 text-md mb-5 font-bold">
                {total} result{total !== 1 ? 's' : ''} found
              </p>
              <CardList pokemons={pokemon} />
              <Pagination total={total} limit={LIMIT} />
            </div>
          )}
        </main>

        {outlet && (
          <aside className="absolute right-0 top-0 bottom-0 w-96 border-l-2 border-slate-200 bg-white overflow-y-auto shadow-xl z-10">
            <Outlet />
          </aside>
        )}
      </div>

      <div className="px-6 pb-4 flex justify-end max-w-5xl mx-auto w-full">
        <ErrorTrigger />
      </div>
    </div>
  );
}

export default HomePage;
