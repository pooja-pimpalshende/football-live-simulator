import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeFlag: string;
  awayFlag: string;
  lastScorer?: 'home' | 'away' | null | string;
}

const initialMatches: Match[] = [
  {
    id: 1,
    homeTeam: 'Germany',
    awayTeam: 'Poland',
    homeScore: 0,
    awayScore: 0,
    homeFlag: '🇩🇪',
    awayFlag: '🇵🇱',
    lastScorer: null,
  },
  {
    id: 2,
    homeTeam: 'Brazil',
    awayTeam: 'Mexico',
    homeScore: 0,
    awayScore: 0,
    homeFlag: '🇧🇷',
    awayFlag: '🇲🇽',
    lastScorer: null,
  },
  {
    id: 3,
    homeTeam: 'Argentina',
    awayTeam: 'Uruguay',
    homeScore: 0,
    awayScore: 0,
    homeFlag: '🇦🇷',
    awayFlag: '🇺🇾',
    lastScorer: null,
  },
];

interface MatchState {
  matches: Match[];
  totalGoals: number;
  elapsed: number;
  started: boolean;
}

const initialState: MatchState = {
  matches: initialMatches,
  totalGoals: 0,
  elapsed: 0,
  started: false,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setStarted: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
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
  setStarted,
  setTotalGoals,
  setElapsed,
  setMatches,
  resetMatches,
  updateMatch,
} = matchSlice.actions;

export default matchSlice.reducer;
