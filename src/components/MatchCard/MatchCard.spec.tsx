import { render, screen } from '@testing-library/react';
import { MatchCard } from './MatchCard';

const mockMatch = {
  id: 1,
  homeTeam: 'Team A',
  awayTeam: 'Team B',
  homeScore: 2,
  awayScore: 1,
  homeFlag: '🇦🇷',
  awayFlag: '🇧🇷',
  lastScorer: '',
};

describe('MatchCard', () => {
  it('renders match info and score', () => {
    render(<MatchCard match={{ ...mockMatch, lastScorer: 'home' }} />);
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('🇦🇷')).toBeInTheDocument();
    expect(screen.getByText('🇧🇷')).toBeInTheDocument();
    expect(screen.getByText('GOAL!')).toBeInTheDocument();
  });

  it('shows GOAL! badge for home scorer', () => {
    render(<MatchCard match={{ ...mockMatch, lastScorer: 'home' }} />);
    expect(screen.getByText('GOAL!')).toBeInTheDocument();
  });

  it('shows GOAL! badge for away scorer', () => {
    render(<MatchCard match={{ ...mockMatch, lastScorer: 'away' }} />);
    expect(screen.getByText('GOAL!')).toBeInTheDocument();
  });

  it('renders correct score colors for home scorer', () => {
    render(<MatchCard match={{ ...mockMatch, lastScorer: 'home' }} />);
    const homeScore = screen.getByText('2');
    expect(homeScore).toHaveClass('text-orange-500');
  });
});
