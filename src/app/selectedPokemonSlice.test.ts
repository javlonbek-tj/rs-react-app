import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer, {
  togglePokemon,
  unselectAll,
} from './selectedPokemonSlice';

function makeStore() {
  return configureStore({ reducer: { selectedPokemon: selectedPokemonReducer } });
}

describe('selectedPokemonSlice', () => {
  describe('togglePokemon', () => {
    it('adds an id when not present', () => {
      const store = makeStore();
      store.dispatch(togglePokemon(1));
      expect(store.getState().selectedPokemon.selectedIds).toEqual([1]);
    });

    it('removes an id when already present', () => {
      const store = makeStore();
      store.dispatch(togglePokemon(1));
      store.dispatch(togglePokemon(1));
      expect(store.getState().selectedPokemon.selectedIds).toEqual([]);
    });

    it('handles multiple ids independently', () => {
      const store = makeStore();
      store.dispatch(togglePokemon(1));
      store.dispatch(togglePokemon(2));
      store.dispatch(togglePokemon(1));
      expect(store.getState().selectedPokemon.selectedIds).toEqual([2]);
    });
  });

  describe('unselectAll', () => {
    it('clears all selected ids', () => {
      const store = makeStore();
      store.dispatch(togglePokemon(1));
      store.dispatch(togglePokemon(2));
      store.dispatch(unselectAll());
      expect(store.getState().selectedPokemon.selectedIds).toEqual([]);
    });

    it('does nothing when no items are selected', () => {
      const store = makeStore();
      store.dispatch(unselectAll());
      expect(store.getState().selectedPokemon.selectedIds).toEqual([]);
    });
  });
});
