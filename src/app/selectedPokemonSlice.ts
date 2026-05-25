import { createSlice } from '@reduxjs/toolkit';

export interface SelectedPokemonState {
  selectedIds: number[];
}

const initialState: SelectedPokemonState = {
  selectedIds: [],
};

export const selectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    togglePokemon: (state, action) => {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);
      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },
    unselectAll: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { togglePokemon, unselectAll } = selectedPokemonSlice.actions;

export default selectedPokemonSlice.reducer;
