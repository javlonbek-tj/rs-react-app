import { Component, type ChangeEvent, type KeyboardEvent } from 'react';

const STORAGE_KEY = 'searchTerm';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  inputValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { inputValue: '' };
  }

  componentDidMount() {
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';
    this.setState({ inputValue: saved });
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.onSearch(this.state.inputValue);
    }
  };

  handleSearch = () => {
    this.props.onSearch(this.state.inputValue);
  };

  render() {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search Pokémon by name…"
          className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 border-0 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/60 text-base"
        />
        <button
          onClick={this.handleSearch}
          className="px-6 py-3 bg-red-900 text-white rounded-xl cursor-pointer hover:bg-red-950 transition-colors font-bold text-base shadow"
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
