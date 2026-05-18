import Search from '../Search/Search';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="max-w-2xl mx-auto">
        <Search onSearch={onSearch} />
      </div>
    </div>
  );
}

export default SearchBar;
