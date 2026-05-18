import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

const STORAGE_KEY = 'searchTerm';

interface SearchProps {
  onSearch: (term: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? ''
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  }

  function handleSearch() {
    onSearch(inputValue);
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokémon by name…"
        className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 border-0 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/60 text-base"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-3 bg-red-900 text-white rounded-xl cursor-pointer hover:bg-red-950 transition-colors font-bold text-base shadow"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
