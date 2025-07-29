import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import matchReducer from '../store/match.slice';
import { useSimulation } from './useSimulation';
import { SIMULATION_STATES } from '../constants';

vi.mock('./useTeamsQuery', () => ({
  useTeamsQuery: () => ({
    data: [
      {
        id: 1,
        home: 'A',
        away: 'B',
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      },
      {
        id: 2,
        home: 'C',
        away: 'D',
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      },
      {
        id: 3,
        home: 'E',
        away: 'F',
        homeScore: 0,
        awayScore: 0,
        lastScorer: null,
      },
    ],
    status: 'success',
    isPending: false,
    error: null,
  }),
}));

function createTestStore() {
  return configureStore({
    reducer: { match: matchReducer },
  });
}

const queryClient = new QueryClient();

const wrapper =
  (store: ReturnType<typeof createTestStore>) =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    );

describe('useSimulation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  it('should initialize with correct default values', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useSimulation(), {
      wrapper: wrapper(store),
    });

    expect(result.current.simulationState).toBe(SIMULATION_STATES.IDLE.toLowerCase());
    expect(result.current.totalGoals).toBe(0);
    expect(result.current.elapsed).toBe(0);
  });

  it('should start simulation and set state to RUNNING', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useSimulation(), {
      wrapper: wrapper(store),
    });

    act(() => {
      result.current.startSimulation();
    });

    expect(result.current.simulationState).toBe(SIMULATION_STATES.RUNNING.toLowerCase());
    expect(result.current.totalGoals).toBe(0);
    expect(result.current.elapsed).toBe(0);
  });

  it('should score goals every 10 seconds and finish after 90 seconds or 9 goals', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useSimulation(), {
      wrapper: wrapper(store),
    });

    act(() => {
      result.current.startSimulation();
    });

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.totalGoals).toBeGreaterThanOrEqual(1);

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.totalGoals).toBeGreaterThanOrEqual(1);

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.totalGoals).toBeGreaterThanOrEqual(3);

    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(
      result.current.simulationState === SIMULATION_STATES.FINISHED.toLowerCase() ||
        result.current.totalGoals === 9 ||
        result.current.elapsed === 90,
    ).toBe(true);

    if (result.current.totalGoals < 9) {
      expect(result.current.elapsed).toBe(90);
      expect(result.current.simulationState).toBe(SIMULATION_STATES.FINISHED.toLowerCase());
    } else {
      expect(result.current.totalGoals).toBe(9);
      expect(result.current.simulationState).toBe(SIMULATION_STATES.FINISHED.toLowerCase());
    }
  });

  it('should finish simulation when finishSimulation is called', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useSimulation(), {
      wrapper: wrapper(store),
    });

    act(() => {
      result.current.startSimulation();
    });

    act(() => {
      result.current.finishSimulation();
    });

    expect(result.current.simulationState).toBe(SIMULATION_STATES.FINISHED.toLowerCase());
  });

  it('should reset everything on restart', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useSimulation(), {
      wrapper: wrapper(store),
    });

    act(() => {
      result.current.startSimulation();
    });

    act(() => {
      vi.advanceTimersByTime(20000);
    });

    expect(result.current.totalGoals).toBeGreaterThan(0);

    act(() => {
      result.current.restartSimulation();
      vi.advanceTimersByTime(10);
    });

    expect(result.current.totalGoals).toBe(0);
    expect(result.current.elapsed).toBe(0);
    expect(result.current.simulationState).toBe(SIMULATION_STATES.RUNNING.toLowerCase());
  });
});
