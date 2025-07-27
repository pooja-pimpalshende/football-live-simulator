import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders title and total goals', () => {
    render(<Header />);
    expect(screen.getByText(/Football Live/i)).toBeInTheDocument();
    expect(screen.getByTestId('total-goals')).toHaveTextContent(
      'Total Goals: 5'
    );
  });

  it('shows the football and trophy emojis', () => {
    render(<Header />);
    expect(screen.getByText('⚽️')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });
});
