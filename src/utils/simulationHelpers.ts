import React from 'react';
import { MAX_MINUTES } from '../constants';
import {
  AppDispatch,
  setElapsed,
  setMatches,
  setSimulationState,
  setTotalGoals,
  store,
} from '../store';
import { clearLastScorer, updateMatchWithGoal } from '../store';

const GOAL_INTERVAL = 10;
const TICK_INTERVAL_MS = 1000;
const GOAL_HIGHLIGHT_DURATION_MS = 1500;

type RunSimulationIntervalArguments = {
  intervalRef: React.RefObject<ReturnType<typeof setInterval> | null>;
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
  dispatch,
  setTotalGoals,
  setElapsed,
  setSimulationState,
}: RunSimulationIntervalArguments) {
  let seconds = 0;
  intervalRef.current = setInterval(() => {
    seconds += 1;

    const state = store.getState();
    const currentMatches = state.match.matches;
    const currentTotalGoals = state.match.totalGoals;

    if (seconds % GOAL_INTERVAL === 0) {
      const matchIndex = Math.floor(Math.random() * currentMatches.length);
      const team = Math.random() < 0.5 ? 'homeScore' : 'awayScore';

      dispatch(updateMatchWithGoal({ matchIndex, team }));
      dispatch(setTotalGoals(currentTotalGoals + 1));

      setTimeout(() => {
        dispatch(clearLastScorer());
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
