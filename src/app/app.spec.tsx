import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { store } from '../store/store';
import { App } from './app';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: App,
});

const route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});
const router = createRouter({ routeTree: rootRoute.addChildren([route]) });

describe('App', () => {
  it('should render successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>,
    );
  });

  it('should have the title', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>,
    );
    expect(screen.getByText(/Football Live/i)).toBeInTheDocument();
  });
});
