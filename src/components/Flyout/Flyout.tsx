import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { unselectAll } from '../../app/selectedPokemonSlice';
import type { Pokemon } from '../../types/api';

interface FlyoutProps {
  pokemon: Pokemon[];
}

function Flyout({ pokemon }: FlyoutProps) {
  const selectedIds = useAppSelector(
    (state) => state.selectedPokemon.selectedIds
  );
  const dispatch = useAppDispatch();

  if (selectedIds.length === 0) return null;

  const selectedPokemon = pokemon.filter((p) => selectedIds.includes(p.id));

  function handleDownload() {
    const header = 'id,name,type,description,url';
    const rows = selectedPokemon.map((p: Pokemon) => {
      const description = `A ${p.types.join('/')} type Pokémon`;
      return `${p.id},${p.name},"${p.types.join('|')}","${description}",https://pokeapi.co/api/v2/pokemon/${p.id}`;
    });

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPokemon.length}_items.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <div className="font-bold dark:bg-gray-600 bg-slate-200 py-4 items-center sticky bottom-0">
      <div className="max-w-5xl mx-auto flex px-6 lg:px-4">
        <span className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg">
          Selected {selectedIds.length} Pokemon
        </span>
        <button
          className="px-4 py-2 ml-4 text-sm bg-red-500 text-white rounded-lg cursor-pointer"
          onClick={() => dispatch(unselectAll())}
        >
          Unselect all
        </button>
        <button
          className="px-4 py-2 ml-4 text-sm bg-blue-500 text-white rounded-lg cursor-pointer"
          onClick={handleDownload}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}

export default Flyout;
