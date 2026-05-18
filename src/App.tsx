import { useEffect, useState } from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import Spinner from './components/Spinner/Spinner';
import ErrorTrigger from './components/ErrorTrigger/ErrorTrigger';
import { fetchPokemon } from './api/pokeapi';
import type { Pokemon } from './types/api';

const STORAGE_KEY = 'searchTerm';

function App() {
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? ''
  );
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemon(searchTerm);
  }, [searchTerm]);

  function loadPokemon(term: string) {
    setLoading(true);
    setError(null);
    fetchPokemon(term)
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Something went wrong.';
        setError(message);
        setLoading(false);
      });
  }

  function handleSearch(term: string) {
    const trimmed = term.trim();
    if (trimmed === searchTerm) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    setSearchTerm(trimmed);
    loadPokemon(trimmed);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="sticky top-0 z-50 bg-linear-to-b from-red-600 to-red-700 shadow-xl border-b-4 border-red-900">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white tracking-widest uppercase drop-shadow-md">
              Pokémon
            </span>
          </div>
          <div className="w-full max-w-2xl">
            <Search onSearch={handleSearch} />
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {!loading && !error && pokemons.length > 0 && (
            <p className="text-slate-500 text-md mb-5 font-bold">
              {pokemons.length} result{pokemons.length !== 1 ? 's' : ''} found
            </p>
          )}
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">😔</p>
              <p className="text-red-500 text-lg font-semibold">{error}</p>
              <p className="text-slate-400 text-sm mt-2">
                Check the spelling and try again.
              </p>
            </div>
          ) : (
            <CardList pokemons={pokemons} />
          )}
        </div>
      </main>

      <div className="px-6 pb-6 flex justify-end max-w-5xl mx-auto w-full">
        <ErrorTrigger />
      </div>
    </div>
  );
}

export default App;
