import { UnknownAction } from '@reduxjs/toolkit';
import { MAX_MINUTES } from '../constants';
import { AppDispatch, Match, UpdateSimulationStatePayload } from '../store';
import { clearLastScorer, updateMatchWithGoal } from './matchUtils';

const GOAL_INTERVAL = 10;
const TICK_INTERVAL_MS = 1000;
const GOAL_HIGHLIGHT_DURATION_MS = 1500;

type RunSimulationIntervalArguments = {
  intervalRef: React.RefObject<ReturnType<typeof setInterval> | null>;
  matchesRef: React.RefObject<Match[]>;
  totalGoalsRef: React.RefObject<number>;
  dispatch: AppDispatch;
  updateSimulationState: (state: UpdateSimulationStatePayload) => UnknownAction;
};

export function clearSimInterval(ref: React.RefObject<ReturnType<typeof setInterval> | null>) {
  if (ref.current) {
    clearInterval(ref.current);
    ref.current = null;
  }
}

export function runSimulationInterval({
  intervalRef,
  matchesRef,
  totalGoalsRef,
  dispatch,
  updateSimulationState,
}: RunSimulationIntervalArguments) {
  let seconds = 0;
  intervalRef.current = setInterval(() => {
    seconds += 1;

    const currentMatches = matchesRef.current;
    const currentTotalGoals = totalGoalsRef.current;

    if (seconds % GOAL_INTERVAL === 0) {
      const matchIndex = Math.floor(Math.random() * currentMatches.length);
      const team = Math.random() < 0.5 ? 'homeScore' : 'awayScore';

      const updatedMatches = updateMatchWithGoal(currentMatches, matchIndex, team);

      dispatch(
        updateSimulationState({
          matches: updatedMatches,
          totalGoals: currentTotalGoals + 1,
        }),
      );

      setTimeout(() => {
        dispatch(updateSimulationState({ matches: clearLastScorer(updatedMatches) }));
      }, GOAL_HIGHLIGHT_DURATION_MS);
    }

    dispatch(updateSimulationState({ elapsed: seconds }));

    if (seconds >= MAX_MINUTES) {
      clearSimInterval(intervalRef);
      dispatch(
        updateSimulationState({
          simulationState: 'finished',
          elapsed: seconds,
        }),
      );
      return;
    }
  }, TICK_INTERVAL_MS);
}
