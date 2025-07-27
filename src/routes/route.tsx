import { createRootRoute, createRoute } from '@tanstack/react-router';
import { App } from '../app/app';
import { MatchSimulation } from '../components/MatchSimulator/MatchSimulator';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <App />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MatchSimulation,
});

export const routeTree = rootRoute.addChildren([indexRoute]);
