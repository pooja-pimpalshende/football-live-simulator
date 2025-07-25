import { useDispatch, useSelector } from 'react-redux';
import { Header, MatchCard, ControlPanel, Footer } from '../components';
import { useSimulation, useTeamsQuery } from '../hooks';
import { useEffect } from 'react';
import { setMatches } from '../store/matchSlice';
import { RootState } from '../store/store';

export function App() {
  const dispatch = useDispatch();
  const { data: teams, isPending, error, status } = useTeamsQuery();
  const matches = useSelector((state: RootState) => state.match.matches);

  useEffect(() => {
    if (teams && status === 'success' && matches.length === 0) {
      dispatch(setMatches(teams));
    }
  }, [teams, dispatch, status, matches.length]);

  const {
    started,
    totalGoals,
    elapsed,
    // matches,
    startSimulation,
    restartSimulation,
    finishSimulation,
  } = useSimulation();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading teams</div>;

  return (
    <>
      <Header totalGoals={totalGoals} />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6 mb-8">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              started={started}
              elapsed={elapsed}
            />
          ))}
        </div>
        <ControlPanel
          started={started}
          totalGoals={totalGoals}
          elapsed={elapsed}
          onStart={startSimulation}
          onRestart={restartSimulation}
          onFinish={finishSimulation}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
