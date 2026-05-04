import { Component } from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import Spinner from './components/Spinner/Spinner';
import ErrorTrigger from './components/ErrorTrigger/ErrorTrigger';
import { fetchPokemon } from './api/pokeapi';
import type { Pokemon } from './types/api';

const STORAGE_KEY = 'searchTerm';

interface AppState {
  searchTerm: string;
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      pokemon: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';
    this.setState({ searchTerm: saved });
    this.loadPokemon(saved);
  }

  loadPokemon = (term: string) => {
    this.setState({ loading: true, error: null });
    fetchPokemon(term)
      .then((data) => {
        this.setState({ pokemon: data, loading: false });
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Something went wrong.';
        this.setState({ error: message, pokemon: [], loading: false });
      });
  };

  handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (trimmed === this.state.searchTerm) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    this.setState({ searchTerm: trimmed });
    this.loadPokemon(trimmed);
  };

  render() {
    const { pokemon, loading, error } = this.state;

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
              <Search onSearch={this.handleSearch} />
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8">
          <div className="max-w-5xl mx-auto">
            {!loading && !error && pokemon.length > 0 && (
              <p className="text-slate-500 text-md mb-5 font-bold">
                {pokemon.length} result{pokemon.length !== 1 ? 's' : ''} found
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
              <CardList pokemon={pokemon} />
            )}
          </div>
        </main>

        <div className="px-6 pb-6 flex justify-end max-w-5xl mx-auto w-full">
          <ErrorTrigger />
        </div>
      </div>
    );
  }
}

export default App;
