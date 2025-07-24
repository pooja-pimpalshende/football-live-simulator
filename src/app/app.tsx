import { Header, MatchCard, ControlPanel, Footer } from '../components';
import { useSimulation } from '../hooks';

export function App() {
  const {
    started,
    totalGoals,
    elapsed,
    matches,
    startSimulation,
    restartSimulation,
  } = useSimulation();

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
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
