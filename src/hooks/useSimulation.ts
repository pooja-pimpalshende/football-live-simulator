import { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setMatches,
  setTotalGoals,
  setElapsed,
  setSimulationState,
  resetSimulation,
} from '../store';
import { SIMULATION_STATES } from '../constants';
import { clearSimInterval, runSimulationInterval } from '../utils';

export function useSimulation() {
  const dispatch = useDispatch();
  const { simulationState, totalGoals, elapsed, matches } = useSelector(
    (state: RootState) => state.match,
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSimulation = useCallback(() => {
    clearSimInterval(intervalRef);

    dispatch(resetSimulation());
    dispatch(setSimulationState(SIMULATION_STATES.RUNNING));

    runSimulationInterval({
      intervalRef,
      dispatch,
      setMatches,
      setTotalGoals,
      setElapsed,
      setSimulationState,
    });
  }, [dispatch]);

  const restartSimulation = useCallback(() => {
    clearSimInterval(intervalRef);

    dispatch(setSimulationState(SIMULATION_STATES.IDLE));

    setTimeout(startSimulation, 0);
  }, [dispatch, startSimulation]);

  const finishSimulation = useCallback(() => {
    clearSimInterval(intervalRef);

    dispatch(setSimulationState(SIMULATION_STATES.FINISHED));
  }, [dispatch]);

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
