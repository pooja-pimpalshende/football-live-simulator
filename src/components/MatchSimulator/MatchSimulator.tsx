import { FC } from 'react';
import { useMatchesData, useSimulation } from '../../hooks';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { MatchCard } from '../MatchCard/MatchCard';
import { MatchCardSkeleton } from '../MatchCardSkeleton';
import { ErrorCard } from '../ErrorCard';

export const MatchSimulation = () => {
  const { teamsPending, teamsError, resultsPending, resultsError } = useMatchesData();

  if (teamsPending || resultsPending)
    return (
      <div className="space-y-6 mb-8 w-1/2 mx-auto mt-8">
        <MatchCardSkeleton />
        <MatchCardSkeleton />
        <MatchCardSkeleton />
      </div>
    );
  if (teamsError || resultsError) return <ErrorCard message="Failed to load matches" />;

  return <MatchSimulatorContainer />;
};

const MatchSimulatorContainer: FC = () => {
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
          <MatchCard key={match.id} match={match} />
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
};
