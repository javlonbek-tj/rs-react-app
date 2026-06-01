import Search from '../Search/Search';

interface SearchBarProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  return (
    <div className="bg-slate-100 border-b border-slate-200  dark:border-slate-600 px-6 py-4 shadow-sm dark:bg-slate-700">
      <div className="max-w-2xl mx-auto">
        <Search initialValue={initialValue} onSearch={onSearch} />
      </div>
    </div>
  );
}

export default SearchBar;
