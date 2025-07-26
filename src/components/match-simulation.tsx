import { MatchCard, ControlPanel } from '../components';
import { useSimulation } from '../hooks';

export function MatchSimulation() {
  const {
    simulationState,
    totalGoals,
    elapsed,
    matches,
    startSimulation,
    restartSimulation,
    finishSimulation,
  } = useSimulation();

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-6 mb-8">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            simulationState={simulationState}
            elapsed={elapsed}
          />
        ))}
      </div>
      <ControlPanel
        simulationState={simulationState}
        totalGoals={totalGoals}
        elapsed={elapsed}
        onStart={startSimulation}
        onRestart={restartSimulation}
        onFinish={finishSimulation}
      />
    </main>
  );
}
