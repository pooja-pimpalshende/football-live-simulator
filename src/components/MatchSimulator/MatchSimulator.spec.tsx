import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { MatchSimulation } from './MatchSimulator';
import { useMatchesData, useSimulation } from '../../hooks';

vi.mock('../../hooks', () => ({
  useMatchesData: vi.fn(),
  useSimulation: vi.fn(),
}));

const mockUseMatchesData = useMatchesData as unknown as Mock;
const mockUseSimulation = useSimulation as unknown as Mock;

describe('MatchSimulator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows skeletons when loading', () => {
    mockUseMatchesData.mockReturnValue({
      teamsPending: true,
      resultsPending: false,
      teamsError: false,
      resultsError: false,
    });
    render(<MatchSimulation />);
    expect(screen.getAllByTestId('match-score-skeleton')).toHaveLength(3);
  });

  it('shows error card on error', () => {
    mockUseMatchesData.mockReturnValue({
      teamsPending: false,
      resultsPending: false,
      teamsError: true,
      resultsError: false,
    });
    render(<MatchSimulation />);
    expect(screen.getByText(/Failed to load matches/i)).toBeInTheDocument();
  });

  it('renders matches and control panel when loaded', () => {
    mockUseMatchesData.mockReturnValue({
      teamsPending: false,
      resultsPending: false,
      teamsError: false,
      resultsError: false,
    });
    mockUseSimulation.mockReturnValue({
      simulationState: 'IDLE',
      totalGoals: 0,
      elapsed: 0,
      matches: [
        {
          id: 1,
          homeTeam: 'Team A',
          awayTeam: 'Team B',
          homeScore: 0,
          awayScore: 0,
          homeFlag: '🇦🇷',
          awayFlag: '🇧🇷',
          lastScorer: '',
        },
      ],
      startSimulation: vi.fn(),
      restartSimulation: vi.fn(),
      finishSimulation: vi.fn(),
    });
    render(<MatchSimulation />);
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
    expect(screen.getByTestId('match-score')).toBeInTheDocument();
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
  });
});
