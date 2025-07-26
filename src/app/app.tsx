import { Outlet } from '@tanstack/react-router';
import { Header, Footer } from '../components';
import { UseCombinedMatchesQuery } from '../hooks';

export function App() {
  const { teamsPending, teamsError, resultsPending, resultsError } =
    UseCombinedMatchesQuery();

  if (teamsPending || resultsPending) return <div>Loading...</div>;
  if (teamsError || resultsError) return <div>Error loading teams</div>;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
