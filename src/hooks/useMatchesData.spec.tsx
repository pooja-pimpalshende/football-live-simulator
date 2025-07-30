import * as reactRedux from 'react-redux';
import { renderHook } from '@testing-library/react';
import { setMatches } from '../store';
import { useMatchesData } from './useMatchesData';
import { Mock } from 'vitest';
import { useTeamsQuery } from './useTeamsQuery';
import { useResultsQuery } from './useResultsQuery';

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: vi.fn(() => vi.fn()),
  };
});

vi.mock('../store', () => ({
  setMatches: vi.fn((payload) => ({
    type: 'setMatches',
    payload,
  })),
}));

vi.mock('./useTeamsQuery', () => ({
  useTeamsQuery: vi.fn(),
}));
vi.mock('./useResultsQuery', () => ({
  useResultsQuery: vi.fn(),
}));

const mockUseTeamsQuery = useTeamsQuery as unknown as Mock;
const mockUseResultsQuery = useResultsQuery as unknown as Mock;

describe('UseCombinedMatchesQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading and error states from queries', () => {
    mockUseTeamsQuery.mockReturnValue({
      data: null,
      isPending: true,
      error: null,
    });
    mockUseResultsQuery.mockReturnValue({
      data: null,
      isPending: false,
      error: 'Some error',
    });

    const { result } = renderHook(() => useMatchesData());

    expect(result.current.teamsPending).toBe(true);
    expect(result.current.teamsError).toBe(null);
    expect(result.current.resultsPending).toBe(false);
    expect(result.current.resultsError).toBe('Some error');
  });

  it('should dispatch setMatches with correct matches when teams and results are loaded', () => {
    const teams = [
      { name: 'A', flag: '🇦🇷' },
      { name: 'B', flag: '🇧🇷' },
    ];
    const results = [{ homeTeam: 'A', awayTeam: 'B', homeScore: 2, awayScore: 1 }];

    mockUseTeamsQuery.mockReturnValue({
      data: teams,
      isPending: false,
      error: null,
    });
    mockUseResultsQuery.mockReturnValue({
      data: results,
      isPending: false,
      error: null,
    });

    const dispatch = vi.fn();
    vi.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

    renderHook(() => useMatchesData());

    expect(setMatches).toHaveBeenCalledWith([
      {
        id: 1,
        homeTeam: 'A',
        awayTeam: 'B',
        homeScore: 2,
        awayScore: 1,
        homeFlag: '🇦🇷',
        awayFlag: '🇧🇷',
        lastScorer: null,
      },
    ]);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should not dispatch if teams or results are missing', () => {
    mockUseTeamsQuery.mockReturnValue({
      data: null,
      isPending: false,
      error: null,
    });
    mockUseResultsQuery.mockReturnValue({
      data: null,
      isPending: false,
      error: null,
    });

    const dispatch = vi.fn();
    vi.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

    renderHook(() => useMatchesData());

    expect(dispatch).not.toHaveBeenCalled();
  });
});
