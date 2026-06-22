import { type ReactElement } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import { AppProviders, type AppStore } from './providers/app-providers';
import selectedPokemonReducer from '../app-apis/selectedPokemonSlice';
import { pokemonApi } from '../app-apis/pokemonApi';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: AppStore;
}

export function makeStore() {
  return configureStore({
    reducer: {
      selectedPokemon: selectedPokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
}

function customRender(
  ui: ReactElement,
  { store = makeStore(), ...options }: CustomRenderOptions = {}
) {
  return {
    store,
    ...render(ui, {
      wrapper: ({ children }) => (
        <AppProviders store={store}>{children}</AppProviders>
      ),
      ...options,
    }),
  };
}

export { customRender as render };
