# Football Live Simulator

A web application that simulates live football matches, displaying real-time scores, goal events, and match progress. Built with React, Redux Toolkit, TanStack Query, and Tailwind CSS. Includes a custom UI component library ([lib/shadcn-ui](lib/shadcn-ui/)) and an Express API backend.

## Features

- Simulate football matches with live score updates
- Start, finish, and restart simulations
- Animated goal events and progress bar
- Responsive UI with custom components
- End-to-end and unit tests

## Project Structure

- [`src/`](src/): Main frontend application (React, Redux, TanStack Query)
- [`api/`](api/): Express backend serving teams and results data
- [`lib/shadcn-ui/`](lib/shadcn-ui/): Custom UI component library
- [`e2e/`](e2e/): End-to-end Playwright tests

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Install dependencies

```sh
npm install
```

### Start the API and App

```sh
npm run start:app
```

- API: [http://localhost:3000](http://localhost:3000)
- App: [http://localhost:4200](http://localhost:4200)

### API Endpoints

- **GET** `/api/teams` — Returns a list of teams.
- **GET** `/api/results` — Returns match results.

### Run Tests

- **Unit tests:**
  ```sh
  npm run test
  ```
- **End-to-end tests:**
  ```sh
  npm run e2e
  ```

## Scripts

- `npm run start` - Start the app (via Nx)
- `npm run api` - Start only the API
- `npm run build` - Build all projects
- `npm run test` - Run unit tests
- `npm run e2e` - Run E2E tests

## Technologies Used

- React 19
- Redux
- TanStack Query & Router
- Tailwind CSS
- Express
- Playwright (E2E)
- Vitest (unit tests)
- Nx (monorepo management)

---

Experience the thrill of live football
