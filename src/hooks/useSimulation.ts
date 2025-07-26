import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  resetMatches,
  setElapsed,
  setMatches,
  setSimulationState,
  setTotalGoals,
} from '../store/match.slice';
import { clearSimInterval } from '../utils';

const MAX_GOALS = 9;
const MAX_MINUTES = 90;
const GOAL_INTERVAL = 10;
const TICK_INTERVAL_MS = 1000;
const LAST_SCORER_RESET_MS = 1500;

export function useSimulation() {
  const dispatch = useDispatch();
  const { simulationState, totalGoals, elapsed, matches } = useSelector(
    (state: RootState) => state.match
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const matchesRef = useRef(matches);
  const totalGoalsRef = useRef(totalGoals);

  useEffect(() => {
    matchesRef.current = matches;
    totalGoalsRef.current = totalGoals;
  }, [matches, totalGoals]);

  useEffect(() => {
    if (
      (totalGoals === MAX_GOALS || elapsed >= MAX_MINUTES) &&
      intervalRef.current
    ) {
      clearSimInterval(intervalRef);
      dispatch(setSimulationState('finished'));
    }
  }, [totalGoals, elapsed, dispatch]);

  const resetAllMatches = (matchesList: typeof matches) =>
    matchesList.map((match) => ({
      ...match,
      homeScore: 0,
      awayScore: 0,
      lastScorer: null,
    }));

  const updateMatchWithGoal = (
    matchesList: typeof matches,
    matchIndex: number,
    team: 'homeScore' | 'awayScore'
  ) =>
    matchesList.map((match, index) =>
      index === matchIndex
        ? {
            ...match,
            [team]: match[team] + 1,
            lastScorer: team === 'homeScore' ? 'home' : 'away',
          }
        : { ...match, lastScorer: null }
    );

  const clearLastScorer = (matchesList: typeof matches) =>
    matchesList.map((match) => ({
      ...match,
      lastScorer: null,
    }));

  const startSimulation = useCallback(() => {
    clearSimInterval(intervalRef);

    dispatch(setMatches(resetAllMatches(matches)));
    dispatch(setSimulationState('running'));
    dispatch(setElapsed(0));
    dispatch(setTotalGoals(0));

    let seconds = 0;
    intervalRef.current = setInterval(() => {
      seconds += 1;
      dispatch(setElapsed(seconds));

      const currentMatches = matchesRef.current;
      const currentTotalGoals = totalGoalsRef.current;

      if (
        seconds % GOAL_INTERVAL === 0 &&
        seconds <= MAX_MINUTES &&
        currentTotalGoals < MAX_GOALS
      ) {
        const matchIndex = Math.floor(Math.random() * currentMatches.length);
        const team = Math.random() < 0.5 ? 'homeScore' : 'awayScore';

        const updatedMatches = updateMatchWithGoal(
          currentMatches,
          matchIndex,
          team
        );

        dispatch(setMatches(updatedMatches));
        dispatch(setTotalGoals(currentTotalGoals + 1));

        setTimeout(() => {
          dispatch(setMatches(clearLastScorer(updatedMatches)));
        }, LAST_SCORER_RESET_MS);
      }
    }, TICK_INTERVAL_MS);
  }, [dispatch, matches]);

  const restartSimulation = useCallback(() => {
    clearSimInterval(intervalRef);
    dispatch(setTotalGoals(0));
    dispatch(resetMatches());
    dispatch(setSimulationState('idle'));
    dispatch(setElapsed(0));
    setTimeout(startSimulation, 0);
  }, [dispatch, startSimulation]);

  const finishSimulation = useCallback(() => {
    clearSimInterval(intervalRef);
    dispatch(resetMatches());
    dispatch(setSimulationState('finished'));
    dispatch(setElapsed(0));
    if (matches) {
      dispatch(setMatches(matches));
    }
  }, [dispatch, matches]);

  return {
    simulationState,
    totalGoals,
    elapsed,
    matches,
    startSimulation,
    restartSimulation,
    finishSimulation,
  };
}
