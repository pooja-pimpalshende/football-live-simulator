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

export type SimulationState = (typeof SIMULATION_STATES)[keyof typeof SIMULATION_STATES];
interface MatchState {
  matches: Match[];
  totalGoals: number;
  elapsed: number;
  simulationState: SimulationState;
}

export type UpdateSimulationStatePayload = Partial<MatchState>;

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
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
    },
    setTotalGoals: (state, action: PayloadAction<number>) => {
      state.totalGoals = action.payload;
    },
    setElapsed: (state, action: PayloadAction<number>) => {
      state.elapsed = action.payload;
    },
    setSimulationState: (state, action: PayloadAction<SimulationState>) => {
      state.simulationState = action.payload;
    },
  },
});

export const { setMatches, setTotalGoals, setElapsed, setSimulationState } = matchSlice.actions;

export default matchSlice.reducer;
