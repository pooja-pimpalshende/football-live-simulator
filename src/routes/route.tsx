import { createRootRoute, createRoute } from '@tanstack/react-router';
import App from '../app/app';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

export const routeTree = rootRoute.addChildren([indexRoute]);
