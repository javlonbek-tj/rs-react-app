'use client';

import { useAppDispatch, useAppSelector } from '../../app-apis/hooks';
import { togglePokemon } from '../../app-apis/selectedPokemonSlice';

interface Props {
  pokemonId: number;
}

export default function CheckboxToggle({ pokemonId }: Props) {
  const dispatch = useAppDispatch();
  const isChecked = useAppSelector((state) =>
    state.selectedPokemon.selectedIds.includes(pokemonId)
  );

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => dispatch(togglePokemon(pokemonId))}
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-3 right-3 cursor-pointer w-5 h-5"
    />
  );
}
