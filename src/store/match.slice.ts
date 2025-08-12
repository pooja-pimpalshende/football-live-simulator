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
    updateMatchWithGoal: (
      state,
      action: PayloadAction<{
        matchIndex: number;
        team: 'homeScore' | 'awayScore';
      }>,
    ) => {
      const { matchIndex, team } = action.payload;
      state.matches = state.matches.map((match, index) =>
        index === matchIndex
          ? { ...match, [team]: match[team] + 1, lastScorer: team === 'homeScore' ? HOME : AWAY }
          : { ...match, lastScorer: null },
      );
    },
    clearLastScorer: (state) => {
      state.matches = state.matches.map((match) => ({
        ...match,
        lastScorer: null,
      }));
    },
    resetAllMatches: (state) => {
      state.matches = state.matches.map((match) => ({
        ...match,
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      }));
    },
    resetSimulation: (state) => {
      state.totalGoals = 0;
      state.elapsed = 0;
      state.simulationState = SIMULATION_STATES.IDLE;
      state.matches = state.matches.map((match) => ({
        ...match,
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      }));
    },
  },
});

export const {
  setMatches,
  setTotalGoals,
  setElapsed,
  setSimulationState,
  updateMatchWithGoal,
  clearLastScorer,
  resetAllMatches,
  resetSimulation,
} = matchSlice.actions;

export default matchSlice.reducer;
