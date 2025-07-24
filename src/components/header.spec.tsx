import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Header', () => {
  it('renders title and total goals', () => {
    render(<Header totalGoals={5} />);
    expect(screen.getByText(/Football Live/i)).toBeInTheDocument();
    expect(screen.getByTestId('total-goals')).toHaveTextContent(
      'Total Goals: 5'
    );
  });

  it('shows the football and trophy emojis', () => {
    render(<Header totalGoals={5} />);
    expect(screen.getByText('⚽️')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });
});
