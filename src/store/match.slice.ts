import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AWAY, HOME, SIMULATION_STATES } from '../constants';

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeFlag: string;
  awayFlag: string;
  lastScorer?: typeof HOME | typeof AWAY | null;
}

export type SimulationState =
  (typeof SIMULATION_STATES)[keyof typeof SIMULATION_STATES];
interface MatchState {
  matches: Match[];
  totalGoals: number;
  elapsed: number;
  simulationState: SimulationState;
}

const initialMatches: Match[] = [];

const initialState: MatchState = {
  matches: initialMatches,
  totalGoals: 0,
  elapsed: 0,
  simulationState: SIMULATION_STATES.IDLE,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    updateSimulationState: (
      state,
      action: PayloadAction<Partial<MatchState>>
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateSimulationState } = matchSlice.actions;

export default matchSlice.reducer;
