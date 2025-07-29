import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { useSimulation } from '../../hooks';
import { Mock } from 'vitest';

vi.mock('../../hooks', () => ({
  useSimulation: vi.fn(),
}));

const mockedUseSimulation = useSimulation as unknown as Mock;

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and football emoji always', () => {
    mockedUseSimulation.mockReturnValue({ totalGoals: 0 });
    render(<Header />);
    expect(screen.getByText(/Football Live/i)).toBeInTheDocument();
    expect(screen.getByText('⚽️')).toBeInTheDocument();
  });

  it('does not show total goals or trophy when totalGoals is 0', () => {
    mockedUseSimulation.mockReturnValue({ totalGoals: 0 });
    render(<Header />);
    expect(screen.queryByTestId('total-goals')).not.toBeInTheDocument();
    expect(screen.queryByText('🏆')).not.toBeInTheDocument();
  });

  it('shows total goals and trophy when totalGoals > 0', () => {
    mockedUseSimulation.mockReturnValue({ totalGoals: 5 });
    render(<Header />);
    expect(screen.getByTestId('total-goals')).toHaveTextContent('Total Goals: 5');
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });
});
