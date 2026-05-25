import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse, delay } from 'msw';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { server } from './mocks/server';
import { mockPokemonDetail, mockPokemonList } from './mocks/handlers';
import selectedPokemonReducer from './app/selectedPokemonSlice';

function makeStore() {
  return configureStore({ reducer: { selectedPokemon: selectedPokemonReducer } });
}

function renderApp() {
  render(
    <Provider store={makeStore()}>
      <App />
    </Provider>
  );
}

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Integration', () => {
    it('makes an initial API call and renders results on mount', async () => {
      renderApp();

      const cards = await screen.findAllByText('bulbasaur');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('calls API with saved search term from localStorage on initial load', async () => {
      localStorage.setItem('searchTerm', 'bulbasaur');
      renderApp();

      expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    });

    it('shows loading spinner while API call is in progress', async () => {
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon', async () => {
          await delay('infinite');
          return HttpResponse.json(mockPokemonList);
        })
      );

      renderApp();

      expect(screen.getByText('Loading Pokemon...')).toBeInTheDocument();
    });

    it('hides loading spinner after API call completes', async () => {
      renderApp();

      await screen.findAllByText('bulbasaur');

      expect(screen.queryByText('Loading Pokemon...')).not.toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    it('renders pokemon cards on successful API response', async () => {
      renderApp();

      const cards = await screen.findAllByText('bulbasaur');
      expect(cards).toHaveLength(2);
    });

    it('displays error message on 404 API response', async () => {
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      localStorage.setItem('searchTerm', 'unknownmon');
      renderApp();

      expect(
        await screen.findByText('No Pokemon found with that name.')
      ).toBeInTheDocument();
    });

    it('displays error message on 500 API response', async () => {
      server.use(
        http.get('https://pokeapi.co/api/v2/pokemon', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      renderApp();

      expect(
        await screen.findByText('Something went wrong (500). Please try again.')
      ).toBeInTheDocument();
    });

    it('calls API with correct search term when user searches', async () => {
      let capturedUrl: string | undefined;
      server.use(
        http.get(
          /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/,
          ({ request }) => {
            capturedUrl = request.url;
            return HttpResponse.json(mockPokemonDetail);
          }
        )
      );

      const user = userEvent.setup();
      renderApp();

      await user.type(
        screen.getByPlaceholderText('Search Pokemon by name…'),
        'mewtwo'
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));
      await screen.findByText('bulbasaur');

      expect(capturedUrl).toBe('https://pokeapi.co/api/v2/pokemon/mewtwo');
    });

    it('does not call API again when same search term is submitted', async () => {
      let fetchCount = 0;
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          fetchCount++;
          return HttpResponse.json(mockPokemonDetail);
        })
      );

      const user = userEvent.setup();
      localStorage.setItem('searchTerm', 'bulbasaur');
      renderApp();

      await screen.findByText('bulbasaur');

      await user.clear(screen.getByPlaceholderText('Search Pokemon by name…'));
      await user.type(
        screen.getByPlaceholderText('Search Pokemon by name…'),
        'bulbasaur'
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(fetchCount).toBe(1);
    });
  });

  describe('State Management', () => {
    it('shows result count after successful API response', async () => {
      renderApp();

      expect(await screen.findByText(/results found/)).toBeInTheDocument();
    });

    it('clears previous results and shows error when API fails on new search', async () => {
      const user = userEvent.setup();
      renderApp();

      await screen.findAllByText('bulbasaur');

      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await user.type(
        screen.getByPlaceholderText('Search Pokemon by name…'),
        'unknown'
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));

      await screen.findByText('No Pokemon found with that name.');
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });

    it('saves search term to localStorage when user searches', async () => {
      const user = userEvent.setup();
      renderApp();

      await user.type(
        screen.getByPlaceholderText('Search Pokemon by name…'),
        'eevee'
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(localStorage.getItem('searchTerm')).toBe('eevee');
    });
  });
});
