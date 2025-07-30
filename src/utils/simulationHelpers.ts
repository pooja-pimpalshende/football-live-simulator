import React from 'react';
import { MAX_MINUTES } from '../constants';
import {
  AppDispatch,
  Match,
  setElapsed,
  setMatches,
  setSimulationState,
  setTotalGoals,
} from '../store';
import { clearLastScorer, updateMatchWithGoal } from './matchUtils';

const GOAL_INTERVAL = 10;
const TICK_INTERVAL_MS = 1000;
const GOAL_HIGHLIGHT_DURATION_MS = 1500;

type RunSimulationIntervalArguments = {
  intervalRef: React.RefObject<ReturnType<typeof setInterval> | null>;
  matchesRef: React.RefObject<Match[]>;
  totalGoalsRef: React.RefObject<number>;
  dispatch: AppDispatch;
  setMatches: typeof setMatches;
  setTotalGoals: typeof setTotalGoals;
  setElapsed: typeof setElapsed;
  setSimulationState: typeof setSimulationState;
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
  setMatches,
  setTotalGoals,
  setElapsed,
  setSimulationState,
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

      dispatch(setMatches(updatedMatches));
      dispatch(setTotalGoals(currentTotalGoals + 1));

      setTimeout(() => {
        dispatch(setMatches(clearLastScorer(updatedMatches)));
      }, GOAL_HIGHLIGHT_DURATION_MS);
    }

    dispatch(setElapsed(seconds));

    if (seconds >= MAX_MINUTES) {
      clearSimInterval(intervalRef);
      dispatch(setSimulationState('finished'));
      dispatch(setElapsed(seconds));
      return;
    }
  }, TICK_INTERVAL_MS);
}
