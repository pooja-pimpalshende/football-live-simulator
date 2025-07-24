import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import matchReducer, { setTotalGoals } from '../store/matchSlice';
import { useSimulation } from './useSimulation';

vi.mock('../utils', () => ({
  clearSimInterval: (ref: any) => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
  },
}));

function createTestStore() {
  return configureStore({
    reducer: { match: matchReducer },
  });
}

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

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useSimulation(), { wrapper });

    expect(result.current.started).toBe(false);
    expect(result.current.totalGoals).toBe(0);
    expect(result.current.elapsed).toBe(0);
    expect(result.current.matches.length).toBe(3);
  });

  it('should start simulation and update elapsed time', () => {
    const store = createTestStore();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.startSimulation();
    });

    expect(result.current.started).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.elapsed).toBe(2);
  });

  it('should add a goal after 10 seconds', () => {
    const store = createTestStore();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.startSimulation();
    });

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.totalGoals).toBe(1);

    const matchesWithGoals = result.current.matches.filter(
      (match) => match.homeScore > 0 || match.awayScore > 0
    );
    expect(matchesWithGoals.length).toBeGreaterThan(0);
  });

  it('should stop simulation at 90 seconds', () => {
    const store = createTestStore();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.startSimulation();
    });

    act(() => {
      vi.advanceTimersByTime(90000);
    });

    expect(result.current.elapsed).toBe(90);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.started).toBe(false);
  });

  it('should restart simulation and reset scores', () => {
    const store = createTestStore();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useSimulation(), { wrapper });

    act(() => {
      result.current.startSimulation();
    });

    // Advance time by 20 seconds to get some goals
    act(() => {
      vi.advanceTimersByTime(20000);
    });

    // Should have some goals now
    expect(result.current.totalGoals).toBeGreaterThan(0);

    // Now restart
    act(() => {
      result.current.restartSimulation();
    });

    // Need to advance timer to allow the setTimeout in restartSimulation to execute
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.totalGoals).toBe(0);
    expect(result.current.elapsed).toBe(0);
    expect(result.current.started).toBe(true);
  });

  it('should stop after 9 goals', () => {
    const store = createTestStore();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useSimulation(), { wrapper });

    // Start simulation
    act(() => {
      result.current.startSimulation();
    });

    // Manually set total goals to 9 through the store action
    act(() => {
      store.dispatch(setTotalGoals(9));
    });

    // Advance a bit to trigger the stopping useEffect
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.started).toBe(false);
  });
});
