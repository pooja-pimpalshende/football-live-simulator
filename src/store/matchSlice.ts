import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeFlag: string;
  awayFlag: string;
  lastScorer?: 'home' | 'away' | null | string;
}

type SimulationState = 'idle' | 'running' | 'finished';

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
  simulationState: 'idle',
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setSimulationState: (state, action: PayloadAction<SimulationState>) => {
      state.simulationState = action.payload;
    },
    setTotalGoals: (state, action: PayloadAction<number>) => {
      state.totalGoals = action.payload;
    },
    setElapsed: (state, action: PayloadAction<number>) => {
      state.elapsed = action.payload;
    },
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
    },
    resetMatches(state) {
      state.matches = initialMatches.map((match) => ({
        ...match,
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      }));
    },
    updateMatch(state, action: PayloadAction<{ matches: Match[] }>) {
      state.matches = action.payload.matches;
    },
  },
});

export const {
  setSimulationState,
  setTotalGoals,
  setElapsed,
  setMatches,
  resetMatches,
  updateMatch,
} = matchSlice.actions;

export default matchSlice.reducer;
