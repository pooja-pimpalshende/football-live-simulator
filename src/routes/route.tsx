import { createRootRoute, createRoute } from '@tanstack/react-router';
import App from '../app/app';
import { MatchSimulation } from '../components/match-simulation';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MatchSimulation,
});

export const routeTree = rootRoute.addChildren([indexRoute]);
