import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setMatches, setTotalGoals, setElapsed, setSimulationState } from '../store';
import { SIMULATION_STATES } from '../constants';
import { clearSimInterval, resetAllMatches, runSimulationInterval } from '../utils';

export function useSimulation() {
  const dispatch = useDispatch();
  const { simulationState, totalGoals, elapsed, matches } = useSelector(
    (state: RootState) => state.match,
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const matchesRef = useRef(matches);
  const totalGoalsRef = useRef(totalGoals);

  useEffect(() => {
    matchesRef.current = matches;
    totalGoalsRef.current = totalGoals;
  }, [matches, totalGoals]);

  const startSimulation = useCallback(() => {
    clearSimInterval(intervalRef);

    dispatch(setMatches(resetAllMatches(matches)));
    dispatch(setTotalGoals(0));
    dispatch(setElapsed(0));
    dispatch(setSimulationState(SIMULATION_STATES.RUNNING));

    runSimulationInterval({
      intervalRef,
      matchesRef,
      totalGoalsRef,
      dispatch,
      setMatches,
      setTotalGoals,
      setElapsed,
      setSimulationState,
    });
  }, [dispatch, matches]);

  const restartSimulation = useCallback(() => {
    clearSimInterval(intervalRef);

    dispatch(setMatches(resetAllMatches(matches)));
    dispatch(setTotalGoals(0));
    dispatch(setElapsed(0));
    dispatch(setSimulationState(SIMULATION_STATES.IDLE));

    setTimeout(startSimulation, 0);
  }, [dispatch, startSimulation, matches]);

  const finishSimulation = useCallback(() => {
    clearSimInterval(intervalRef);
    dispatch(setMatches(resetAllMatches(matches)));
    dispatch(setSimulationState(SIMULATION_STATES.FINISHED));

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
