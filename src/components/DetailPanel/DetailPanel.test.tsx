import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Outlet, RouterProvider, useSearchParams } from 'react-router';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { makeStore } from '../../__tests__/test-utils';
import DetailPanel from './DetailPanel';

const mockDetail = {
  id: 1,
  name: 'bulbasaur',
  sprites: { front_default: 'https://example.com/bulbasaur.png' },
  types: [
    { slot: 1, type: { name: 'grass' } },
    { slot: 2, type: { name: 'poison' } },
  ],
  height: 7,
  weight: 69,
};

function MockHomePage() {
  const [searchParams] = useSearchParams();
  const detailId = searchParams.get('details');
  return (
    <div>
      <p>Home</p>
      {detailId && <Outlet />}
    </div>
  );
}

function renderDetailPanel(id = '1') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <MockHomePage />,
        children: [{ index: true, element: <DetailPanel /> }],
      },
    ],
    { initialEntries: [`/?page=1&details=${id}`] }
  );
  render(
    <Provider store={makeStore()}>
      <RouterProvider router={router} />
    </Provider>
  );
}

describe('DetailPanel Component', () => {
  beforeEach(() => {
    server.use(
      http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () =>
        HttpResponse.json(mockDetail)
      )
    );
  });

  describe('Loading state', () => {
    it('shows the loading spinner on initial render', () => {
      renderDetailPanel();
      expect(screen.getByText('Loading Pokemon...')).toBeInTheDocument();
    });
  });

  describe('Success state', () => {
    it('renders the pokemon name', async () => {
      renderDetailPanel();
      expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    });

    it('renders the pokemon image with correct alt text and src', async () => {
      renderDetailPanel();
      const img = await screen.findByAltText('bulbasaur');
      expect(img).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
    });

    it('renders the padded ID badge', async () => {
      renderDetailPanel();
      expect(await screen.findByText('#001')).toBeInTheDocument();
    });

    it('displays all type badges', async () => {
      renderDetailPanel();
      await screen.findByText('bulbasaur');
      expect(screen.getByText('grass')).toBeInTheDocument();
      expect(screen.getByText('poison')).toBeInTheDocument();
    });

    it('converts height from decimetres to metres', async () => {
      renderDetailPanel();
      expect(await screen.findByText('0.7 m')).toBeInTheDocument();
    });

    it('converts weight from hectograms to kilograms', async () => {
      renderDetailPanel();
      expect(await screen.findByText('6.9 kg')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    it('shows an error message when the fetch fails', async () => {
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () =>
          new HttpResponse(null, { status: 500 })
        )
      );
      renderDetailPanel();
      expect(
        await screen.findByText('Something went wrong (500). Please try again.')
      ).toBeInTheDocument();
    });
  });

  describe('Close button', () => {
    it('renders the close button', async () => {
      renderDetailPanel();
      await screen.findByText('bulbasaur');
      expect(
        screen.getByRole('button', { name: 'Close details' })
      ).toBeInTheDocument();
    });

    it('hides the details panel when the close button is clicked', async () => {
      const user = userEvent.setup();
      renderDetailPanel();
      await screen.findByText('bulbasaur');
      await user.click(screen.getByRole('button', { name: 'Close details' }));
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });
  });

  describe('Refresh button', () => {
    it('renders the refresh button', async () => {
      renderDetailPanel();
      await screen.findByText('bulbasaur');
      expect(
        screen.getByRole('button', { name: 'Refresh details' })
      ).toBeInTheDocument();
    });

    it('refetches data when refresh button is clicked', async () => {
      let fetchCount = 0;
      server.use(
        http.get(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.+/, () => {
          fetchCount++;
          return HttpResponse.json(mockDetail);
        })
      );

      const user = userEvent.setup();
      renderDetailPanel();
      await screen.findByText('bulbasaur');
      expect(fetchCount).toBe(1);

      await user.click(screen.getByRole('button', { name: 'Refresh details' }));
      await screen.findByText('bulbasaur');

      expect(fetchCount).toBe(2);
    });
  });
});
