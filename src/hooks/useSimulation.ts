import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  resetMatches,
  setElapsed,
  setMatches,
  setStarted,
  setTotalGoals,
} from '../store/matchSlice';
import { clearSimInterval } from '../utils';
import { useTeamsQuery } from './useTeamsQuery';

export function useSimulation() {
  const { data: teams, status } = useTeamsQuery();
  const dispatch = useDispatch();
  const { started, totalGoals, elapsed, matches } = useSelector(
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
    if ((totalGoals === 9 || elapsed >= 90) && intervalRef.current) {
      clearSimInterval(intervalRef);
      dispatch(setStarted(false));
    }
  }, [totalGoals, elapsed, matches, dispatch]);

  const startSimulation = useCallback(() => {
    clearSimInterval(intervalRef);
    dispatch(
      setMatches(
        matches.map((match) => ({
          ...match,
          homeScore: 0,
          awayScore: 0,
          lastScorer: null,
        }))
      )
    );
    dispatch(setStarted(true));
    dispatch(setElapsed(0));
    dispatch(setTotalGoals(0));
    let seconds = 0;
    intervalRef.current = setInterval(() => {
      seconds += 1;
      dispatch(setElapsed(seconds));
      const currentMatches = matchesRef.current;
      const currentTotalGoals = totalGoalsRef.current;
      if (seconds % 10 === 0 && seconds <= 90 && currentTotalGoals < 9) {
        const matchIndex = Math.floor(Math.random() * currentMatches.length);
        const team = Math.random() < 0.5 ? 'homeScore' : 'awayScore';
        const updatedMatches = currentMatches.map((match, index) =>
          index === matchIndex
            ? {
                ...match,
                [team]: match[team] + 1,
                lastScorer: team === 'homeScore' ? 'home' : 'away',
              }
            : { ...match, lastScorer: null }
        );
        dispatch(setMatches(updatedMatches));
        dispatch(setTotalGoals(currentTotalGoals + 1));
        setTimeout(() => {
          dispatch(
            setMatches(
              updatedMatches.map((match) => ({
                ...match,
                lastScorer: null,
              }))
            )
          );
        }, 1500);
      }
    }, 1000);
  }, [dispatch, matches]);

  const restartSimulation = useCallback(() => {
    clearSimInterval(intervalRef);
    dispatch(setTotalGoals(0));
    dispatch(resetMatches());
    dispatch(setStarted(false));
    dispatch(setElapsed(0));
    setTimeout(() => {
      startSimulation();
    }, 0);
  }, [dispatch, startSimulation]);

  const finishSimulation = useCallback(() => {
    clearSimInterval(intervalRef);
    dispatch(setTotalGoals(0));
    dispatch(resetMatches());
    dispatch(setStarted(false));
    dispatch(setElapsed(0));
    if (teams && status === 'success') {
      dispatch(setMatches(teams));
    }
  }, [dispatch, teams, status]);

  return {
    started,
    totalGoals,
    elapsed,
    matches,
    startSimulation,
    restartSimulation,
    finishSimulation,
  };
}
