import { createRootRoute, createRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { MatchSimulation } from '../components/MatchSimulator/MatchSimulator';
import { NotFound } from '../components/';
import { App } from '../app/app';

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

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$',
  component: NotFound,
});

export const routeTree = rootRoute.addChildren([indexRoute, catchAllRoute]);
