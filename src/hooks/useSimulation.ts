import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateSimulationState } from '../store';
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

    dispatch(
      updateSimulationState({
        matches: resetAllMatches(matches),
        totalGoals: 0,
        elapsed: 0,
        simulationState: SIMULATION_STATES.RUNNING,
      }),
    );

    runSimulationInterval({
      intervalRef,
      matchesRef,
      totalGoalsRef,
      dispatch,
      updateSimulationState,
    });
  }, [dispatch, matches]);

  const restartSimulation = useCallback(() => {
    clearSimInterval(intervalRef);

    dispatch(
      updateSimulationState({
        matches: resetAllMatches(matches),
        totalGoals: 0,
        elapsed: 0,
        simulationState: SIMULATION_STATES.IDLE,
      }),
    );

    setTimeout(startSimulation, 0);
  }, [dispatch, startSimulation, matches]);

  const finishSimulation = useCallback(() => {
    clearSimInterval(intervalRef);
    dispatch(
      updateSimulationState({
        matches: resetAllMatches(matches),
        simulationState: SIMULATION_STATES.FINISHED,
      }),
    );
    if (matches) {
      dispatch(updateSimulationState({ matches }));
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
