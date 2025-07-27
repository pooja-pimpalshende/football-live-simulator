import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { App } from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

vi.mock('../hooks/useTeamsQuery', () => ({
  useTeamsQuery: () => ({
    data: [
      {
        id: 1,
        home: 'A',
        away: 'B',
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      },
      {
        id: 2,
        home: 'C',
        away: 'D',
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      },
      {
        id: 3,
        home: 'E',
        away: 'F',
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      },
    ],
    status: 'success',
    isPending: false,
    error: null,
  }),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    );
    expect(
      getAllByText(new RegExp('Football Live', 'gi')).length > 0
    ).toBeTruthy();
  });
});
