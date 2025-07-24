import { render, screen } from '@testing-library/react';
import { MatchCard } from './match-card';

const mockMatch = {
  id: 1,
  homeTeam: 'Team A',
  awayTeam: 'Team B',
  homeScore: 2,
  awayScore: 1,
  homeFlag: '🇦🇷',
  awayFlag: '🇧🇷',
  lastScorer: 'home',
};

describe('MatchCard', () => {
  it('renders match info and score', () => {
    render(<MatchCard match={mockMatch} started={true} elapsed={45} />);
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText("45'")).toBeInTheDocument();
    expect(screen.getByText('🇦🇷')).toBeInTheDocument();
    expect(screen.getByText('🇧🇷')).toBeInTheDocument();
    expect(screen.getByText('GOAL!')).toBeInTheDocument();
  });

  it('shows clock emjoi', () => {
    render(<MatchCard match={mockMatch} started={true} elapsed={45} />);
    expect(screen.getByRole('img', { name: 'clock' })).toBeInTheDocument();
  });

  it('shows 0 when match not started', () => {
    render(<MatchCard match={mockMatch} started={false} elapsed={0} />);
    expect(screen.getByText("0'")).toBeInTheDocument();
  });
});
